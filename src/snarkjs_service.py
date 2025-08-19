#!/usr/bin/env python3
"""
Serviço de Geração de Provas ZK usando snarkjs
Integra cálculos Python com circuitos Circom e submissão zkVerify

Autor: Marcos Antonio Morais Braga
Data: 25/07/2025
"""

import os
import json
import subprocess
import logging
from pathlib import Path
from typing import Dict, Any, Optional, Tuple
from datetime import datetime


class SnarkjsProofService:
    """Serviço para gerar e verificar provas ZK usando snarkjs"""
    
    def __init__(self, base_dir: str = "/home/user/Documents/ZK_COMPLY"):
        self.base_dir = Path(base_dir)
        self.circuits_dir = self.base_dir / "circuits"
        self.proofs_dir = self.base_dir / "proofs"
        self.powers_of_tau_dir = self.base_dir / "powers_of_tau"
        
        # Configurar logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        
        # Criar diretórios necessários
        self.proofs_dir.mkdir(exist_ok=True)
        
        # Verificar dependências
        self._check_dependencies()
    
    def _check_dependencies(self):
        """Verifica se snarkjs e circom estão instalados"""
        try:
            # snarkjs --version retorna exit code 99, mas funciona
            result = subprocess.run(['npx', 'snarkjs', '--version'], 
                                  capture_output=True, text=True)
            if "snarkjs" in result.stdout:
                self.logger.info(f"snarkjs available via npx")
            else:
                raise RuntimeError("snarkjs output não reconhecido")
        except FileNotFoundError:
            raise RuntimeError("npx não está disponível. Instale Node.js")
        
        try:
            result = subprocess.run(['circom', '--version'], 
                                  capture_output=True, text=True, check=True)
            self.logger.info(f"circom version: {result.stdout.strip()}")
        except (subprocess.CalledProcessError, FileNotFoundError):
            raise RuntimeError("circom não está instalado. Execute: cargo install --git https://github.com/iden3/circom.git")
    
    def generate_proof(self, circuit_name: str, witness_file: str, 
                      proof_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Gera prova ZK completa usando snarkjs
        
        Args:
            circuit_name: Nome do circuito (ex: 'simple_compliance')
            witness_file: Caminho para arquivo witness JSON
            proof_id: ID único para esta prova (opcional)
            
        Returns:
            Dict com resultado da geração de prova
        """
        if proof_id is None:
            proof_id = f"{circuit_name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        self.logger.info(f"🔐 Gerando prova ZK: {proof_id}")
        
        try:
            # 1. Verificar arquivos necessários
            circuit_file = self.circuits_dir / f"{circuit_name}.circom"
            r1cs_file = self.circuits_dir / f"{circuit_name}.r1cs"
            wasm_file = self.circuits_dir / f"{circuit_name}_js" / f"{circuit_name}.wasm"
            zkey_file = self.circuits_dir / "circuit.zkey"
            
            if not all([circuit_file.exists(), r1cs_file.exists(), 
                       wasm_file.exists(), zkey_file.exists()]):
                missing = [f for f in [circuit_file, r1cs_file, wasm_file, zkey_file] 
                          if not f.exists()]
                raise FileNotFoundError(f"Arquivos necessários não encontrados: {missing}")
            
            # 2. Validar witness
            witness_path = Path(witness_file)
            if not witness_path.exists():
                raise FileNotFoundError(f"Arquivo witness não encontrado: {witness_file}")
            
            with open(witness_path, 'r') as f:
                witness_data = json.load(f)
            
            self.logger.info(f"📋 Witness carregado: {len(witness_data)} inputs")
            
            # 3. Gerar arquivos de saída
            proof_file = self.proofs_dir / f"{proof_id}_proof.json"
            public_file = self.proofs_dir / f"{proof_id}_public.json"
            witness_wtns = self.proofs_dir / f"{proof_id}_witness.wtns"
            
            # 4. Calcular witness binário
            self.logger.info("🧮 Calculando witness...")
            cmd_witness = [
                'npx', 'snarkjs', 'wtns', 'calculate',
                str(wasm_file),
                str(witness_path),
                str(witness_wtns)
            ]
            
            result = subprocess.run(cmd_witness, capture_output=True, text=True, check=True)
            self.logger.info("✅ Witness calculado com sucesso")
            
            # 5. Gerar prova
            self.logger.info("🔐 Gerando prova Groth16...")
            cmd_prove = [
                'npx', 'snarkjs', 'groth16', 'prove',
                str(zkey_file),
                str(witness_wtns),
                str(proof_file),
                str(public_file)
            ]
            
            result = subprocess.run(cmd_prove, capture_output=True, text=True, check=True)
            self.logger.info("✅ Prova gerada com sucesso")
            
            # 6. Carregar e validar prova
            with open(proof_file, 'r') as f:
                proof_data = json.load(f)
            
            with open(public_file, 'r') as f:
                public_data = json.load(f)
            
            # 7. Verificar prova localmente
            verification_result = self.verify_proof(circuit_name, proof_file, public_file)
            
            # 8. Metadados da prova
            proof_metadata = {
                "proof_id": proof_id,
                "circuit": circuit_name,
                "timestamp": datetime.now().isoformat(),
                "witness_inputs": len(witness_data),
                "public_outputs": len(public_data),
                "verification": verification_result,
                "files": {
                    "proof": str(proof_file),
                    "public": str(public_file),
                    "witness_wtns": str(witness_wtns)
                }
            }
            
            # Salvar metadados
            metadata_file = self.proofs_dir / f"{proof_id}_metadata.json"
            with open(metadata_file, 'w') as f:
                json.dump(proof_metadata, f, indent=2)
            
            self.logger.info(f"🎉 Prova ZK gerada: {proof_id}")
            
            return {
                "success": True,
                "proof_id": proof_id,
                "metadata": proof_metadata,
                "proof_data": proof_data,
                "public_data": public_data
            }
            
        except subprocess.CalledProcessError as e:
            error_msg = f"Erro snarkjs: {e.stderr}"
            self.logger.error(error_msg)
            return {
                "success": False,
                "error": error_msg,
                "proof_id": proof_id
            }
        
        except Exception as e:
            error_msg = f"Erro interno: {str(e)}"
            self.logger.error(error_msg)
            return {
                "success": False,
                "error": error_msg,
                "proof_id": proof_id
            }
    
    def verify_proof(self, circuit_name: str, proof_file: str, public_file: str) -> Dict[str, Any]:
        """
        Verifica prova ZK localmente usando snarkjs
        
        Args:
            circuit_name: Nome do circuito
            proof_file: Arquivo da prova
            public_file: Arquivo dos inputs públicos
            
        Returns:
            Resultado da verificação
        """
        try:
            # Arquivo de verification key
            vkey_file = self.circuits_dir / "verification_key.json"
            
            if not vkey_file.exists():
                # Extrair verification key se não existir
                zkey_file = self.circuits_dir / "circuit.zkey"
                cmd_vkey = [
                    'npx', 'snarkjs', 'zkey', 'export', 'verificationkey',
                    str(zkey_file),
                    str(vkey_file)
                ]
                subprocess.run(cmd_vkey, capture_output=True, text=True, check=True)
            
            # Verificar prova
            cmd_verify = [
                'npx', 'snarkjs', 'groth16', 'verify',
                str(vkey_file),
                str(public_file),
                str(proof_file)
            ]
            
            result = subprocess.run(cmd_verify, capture_output=True, text=True, check=True)
            
            # Parse resultado
            is_valid = "OK" in result.stdout
            
            return {
                "valid": is_valid,
                "output": result.stdout.strip(),
                "verification_key": str(vkey_file)
            }
            
        except subprocess.CalledProcessError as e:
            return {
                "valid": False,
                "error": f"Erro na verificação: {e.stderr}",
                "output": e.stdout
            }
    
    def generate_full_proof_pipeline(self, smiles: str, circuit_type: str = "logp") -> Dict[str, Any]:
        """
        Pipeline completo: cálculo científico → witness → prova ZK
        
        Args:
            smiles: SMILES da molécula
            circuit_type: Tipo de circuito ('logp' ou 'multi')
            
        Returns:
            Resultado completo do pipeline
        """
        self.logger.info(f"🚀 Iniciando pipeline completo para: {smiles}")
        
        try:
            # 1. Gerar witness usando WitnessGenerator
            import sys
            from pathlib import Path
            sys.path.append(str(Path(__file__).parent))
            
            from witness_generator import WitnessGenerator
            
            generator = WitnessGenerator()
            
            if circuit_type == "logp":
                witness_data = generator.generate_logp_witness(smiles)
                circuit_name = "simple_compliance"
            elif circuit_type == "multi":
                witness_data = generator.generate_multi_criteria_witness(smiles)
                circuit_name = "compliance_circuit"  # Circuito mais complexo
            else:
                raise ValueError(f"Tipo de circuito inválido: {circuit_type}")
            
            # 2. Salvar witness
            witness_file = self.proofs_dir / f"input_{circuit_type}_{datetime.now().strftime('%H%M%S')}.json"
            generator.save_witness_file(witness_data, str(witness_file))
            
            # 3. Gerar prova ZK
            proof_result = self.generate_proof(circuit_name, str(witness_file))
            
            # 4. Combinar resultados
            pipeline_result = {
                "smiles": smiles,
                "circuit_type": circuit_type,
                "witness_generation": {
                    "success": True,
                    "metadata": witness_data["metadata"],
                    "file": str(witness_file)
                },
                "proof_generation": proof_result,
                "pipeline_success": proof_result["success"]
            }
            
            self.logger.info(f"✅ Pipeline completo finalizado para: {smiles}")
            return pipeline_result
            
        except Exception as e:
            error_msg = f"Erro no pipeline: {str(e)}"
            self.logger.error(error_msg)
            return {
                "smiles": smiles,
                "circuit_type": circuit_type,
                "pipeline_success": False,
                "error": error_msg
            }
    
    def list_proofs(self) -> Dict[str, Any]:
        """Lista todas as provas geradas"""
        try:
            proof_files = list(self.proofs_dir.glob("*_proof.json"))
            
            proofs = []
            for proof_file in proof_files:
                metadata_file = proof_file.with_name(proof_file.stem.replace("_proof", "_metadata") + ".json")
                
                if metadata_file.exists():
                    with open(metadata_file, 'r') as f:
                        metadata = json.load(f)
                    proofs.append(metadata)
            
            return {
                "total_proofs": len(proofs),
                "proofs": sorted(proofs, key=lambda x: x["timestamp"], reverse=True)
            }
            
        except Exception as e:
            return {
                "total_proofs": 0,
                "error": str(e),
                "proofs": []
            }


def main():
    """Função principal para teste standalone"""
    import sys
    
    if len(sys.argv) != 3:
        print("Uso: python snarkjs_service.py <smiles> <circuit_type>")
        print("Tipos: logp, multi")
        sys.exit(1)
    
    smiles = sys.argv[1]
    circuit_type = sys.argv[2]
    
    service = SnarkjsProofService()
    result = service.generate_full_proof_pipeline(smiles, circuit_type)
    
    if result["pipeline_success"]:
        print("🎉 Pipeline executado com sucesso!")
        print(f"SMILES: {result['smiles']}")
        print(f"Proof ID: {result['proof_generation']['proof_id']}")
    else:
        print(f"❌ Erro no pipeline: {result.get('error', 'Erro desconhecido')}")
        sys.exit(1)


if __name__ == "__main__":
    main()
