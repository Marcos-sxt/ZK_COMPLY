# ZK_COMPLY - Diretório de Proofs e Exemplos

Este diretório contém exemplos de witness data e provas ZK para todos os módulos científicos do ZK_COMPLY.

## Estrutura

### `examples/`
Exemplos atuais e representativos de cada módulo científico:

- **`logp/`** - Coeficiente de partição (Lipinski Rule)
- **`multi/`** - Regra de Lipinski completa (MW, LogP, HBA, HBD)
- **`pka/`** - Constante de acidez (MolGpKa API)
- **`docking/`** - Afinidade molecular (AutoDock Vina)
- **`qsar/`** - Predição de toxicidade (ML models)
- **`dynamics/`** - Simulação molecular (GROMACS)
- **`cyp450/`** - Metabolismo enzimático (CYP450)
- **`pipeline/`** - Pipeline completo com proof ZK e submissão zkVerify

### `archive/`
Arquivos históricos de testes e desenvolvimento:

- **`historical_tests/`** - Testes antigos mantidos para referência histórica

## Tipos de Arquivos

- **`input_*.json`** - Witness data para os circuitos Circom
- **`input_*_metadata.json`** - Metadados científicos e debugging info
- **`pipeline_*_proof.json`** - Provas ZK geradas (Groth16)
- **`pipeline_*_public.json`** - Sinais públicos da prova
- **`pipeline_*_witness.wtns`** - Witness compilado (formato binário)
- **`pipeline_*_submission.json`** - Dados de submissão para zkVerify

## Como Usar

1. **Gerar novo witness:**
   ```bash
   python src/witness_generator.py "CC(=O)OC" logp
   ```

2. **Executar pipeline completo:**
   ```bash
   python src/zk_pipeline.py --smiles "CC(=O)OC" --module logp
   ```

3. **Testar todos os módulos:**
   ```bash
   python src/witness_generator.py "CC(=O)OC" multi
   python src/witness_generator.py "CC(=O)OC" pka
   # ... outros módulos
   ```

## Módulos Científicos (ADMET)

- **Absorption:** LogP, Multi (Lipinski)
- **Distribution:** pKa, Docking
- **Metabolism:** CYP450
- **Excretion:** Dynamics (GROMACS)
- **Toxicity:** QSAR models

Todos os módulos implementam fallbacks robustos caso as ferramentas externas não estejam disponíveis.
