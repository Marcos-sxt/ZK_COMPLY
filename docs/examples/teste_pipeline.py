import subprocess
import os
import sys
import json

# Caminhos dos scripts
SCRIPTS = {
    "logp":      "zk-comply-logp/compute_logp.py",
    "docking":   "zk-comply-docking/compute_docking.py",
    "pka":       "zk-comply-pka/compute_pka.py",
    "qsar":      "zk-comply-qsar/compute_qsar.py",
    "dynamics":  "zk-comply-dynamics/compute_dynamics.py",
    "cyp450":    "zk-comply-cyp450/compute_cyp450.py",
}

# Funções auxiliares para geração de arquivos

def smiles_to_pdb(smiles, pdb_file):
    with open('ligand.smi', 'w') as f:
        f.write(smiles)
    subprocess.run(['obabel', '-ismi', 'ligand.smi', '-opdb', '--gen3D', '-O', pdb_file], check=True)

def pdb_to_gro_top(pdb_file, gro_file, top_file):
    # Usa ACPYPE para gerar topologia e coordenadas para moléculas pequenas
    import shutil
    acpype_cmd = [
        'acpype', '-i', pdb_file, '-b', 'ligand'
    ]
    subprocess.run(acpype_cmd, check=True)
    # ACPYPE gera arquivos em ligand.acpype/
    acpype_dir = 'ligand.acpype'
    # Copia o .gro e .itp gerados para os nomes esperados
    shutil.copyfile(f'{acpype_dir}/ligand_GMX.gro', gro_file)
    shutil.copyfile(f'{acpype_dir}/ligand_GMX.itp', top_file)

# Função para rodar cada script e mostrar saída
def run_script(module, smiles, ligand_gro=None, ligand_top=None):
    script = SCRIPTS[module]
    if module == "dynamics":
        args = [smiles, ligand_gro, ligand_top, "1.0"]
    elif module == "docking":
        args = [smiles]  # Ajuste se precisar passar arquivos
    else:
        args = [smiles]
    cmd = [sys.executable, script] + args
    print(f"\n--- Rodando {module} ---")
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        print(result.stdout)
        # Tenta ler o witness gerado
        witness_file = None
        if module == "logp":
            witness_file = "zk-comply-logp/witness_logp.json"
        elif module == "docking":
            witness_file = "zk-comply-docking/witness_docking.json"
        elif module == "pka":
            witness_file = "zk-comply-pka/witness_pka.json"
        elif module == "qsar":
            witness_file = "zk-comply-qsar/witness_qsar.json"
        elif module == "dynamics":
            witness_file = "zk-comply-dynamics/witness_dynamics.json"
        elif module == "cyp450":
            witness_file = "zk-comply-cyp450/witness_cyp450.json"
        if witness_file and os.path.exists(witness_file):
            with open(witness_file) as f:
                print(f"Witness {module}: {json.load(f)}")
        else:
            print(f"Witness file não encontrado para {module}.")
    except subprocess.CalledProcessError as e:
        print(f"Erro ao rodar {module}: {e}\nSaída:\n{e.stdout}\nErro:\n{e.stderr}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python teste_pipeline.py \"SMILES\"")
        sys.exit(1)
    smiles = sys.argv[1]
    # Gera arquivos auxiliares a partir do SMILES
    pdb_file = "ligand.pdb"
    gro_file = "ligand.gro"
    top_file = "ligand.top"
    print("\n--- Gerando arquivos auxiliares a partir do SMILES ---")
    smiles_to_pdb(smiles, pdb_file)
    pdb_to_gro_top(pdb_file, gro_file, top_file)
    # Executa todos os módulos
    for module in SCRIPTS:
        if module == "dynamics":
            run_script(module, smiles, ligand_gro=gro_file, ligand_top=top_file)
        else:
            run_script(module, smiles) 