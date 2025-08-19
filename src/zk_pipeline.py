#!/usr/bin/env python3
"""
Pipeline Completo ZK_COMPLY
Integra cálculo científico → witness → prova ZK → submissão zkVerify

Autor: Marcos Antonio Morais Braga
Data: 25/07/2025
"""

import os
import json
import logging
from pathlib import Path
from typing import Dict, Any, Optional
from datetime import datetime

# Fix imports for standalone execution
import sys
sys.path.append(str(Path(__file__).parent))

from witness_generator import WitnessGenerator
from snarkjs_service import SnarkjsProofService
from zkverify_service import ZKVerifyService


class ZKCompliancePipeline:
    """Pipeline completo de compliance farmacêutica com ZK proofs"""
    
    def __init__(self, base_dir: str = "/home/user/Documents/ZK_COMPLY"):
        self.base_dir = Path(base_dir)
        
        # Configurar logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        
        # Inicializar serviços
        self.witness_generator = WitnessGenerator()
        self.proof_service = SnarkjsProofService(str(self.base_dir))
        self.zkverify_service = ZKVerifyService(str(self.base_dir))
        
        self.logger.info("🚀 ZK_COMPLY Pipeline inicializado")
    
    def run_complete_pipeline(self, smiles: str, circuit_type: str = "logp", 
                             submit_to_zkverify: bool = True, **kwargs) -> Dict[str, Any]:
        """
        Executa pipeline completo de compliance ZK
        
        Args:
            smiles: SMILES da molécula
            circuit_type: Tipo de circuito ('logp', 'multi', 'pka', 'docking', 'qsar', 'dynamics', 'cyp450')
            submit_to_zkverify: Se deve submeter para zkVerify
            **kwargs: Argumentos específicos por módulo (receptor_pdb, etc.)
            
        Returns:
            Resultado completo do pipeline
        """
        pipeline_id = f"pipeline_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        self.logger.info(f"🏁 Iniciando pipeline completo: {pipeline_id}")
        self.logger.info(f"   SMILES: {smiles}")
        self.logger.info(f"   Circuito: {circuit_type}")
        self.logger.info(f"   Submeter zkVerify: {submit_to_zkverify}")
        
        pipeline_result = {
            "pipeline_id": pipeline_id,
            "smiles": smiles,
            "circuit_type": circuit_type,
            "timestamp": datetime.now().isoformat(),
            "stages": {},
            "success": False,
            "final_transaction_hash": None
        }
        
        try:
            # Etapa 1: Gerar witness
            self.logger.info("📊 Etapa 1: Gerando witness científico...")
            witness_result = self._generate_witness_stage(smiles, circuit_type, **kwargs)
            pipeline_result["stages"]["witness_generation"] = witness_result
            
            if not witness_result["success"]:
                raise RuntimeError("Falha na geração de witness")
            
            # Etapa 2: Gerar prova ZK
            self.logger.info("🔐 Etapa 2: Gerando prova ZK...")
            proof_result = self._generate_proof_stage(
                witness_result["witness_file"], 
                circuit_type, 
                pipeline_id
            )
            pipeline_result["stages"]["proof_generation"] = proof_result
            
            if not proof_result["success"]:
                raise RuntimeError("Falha na geração de prova ZK")
            
            # Etapa 3: Submeter para zkVerify (opcional)
            if submit_to_zkverify:
                self.logger.info("📤 Etapa 3: Submetendo para zkVerify...")
                submission_result = self._submit_to_zkverify_stage(
                    proof_result["proof_file"],
                    proof_result["public_file"],
                    proof_result["vkey_file"],
                    pipeline_id
                )
                pipeline_result["stages"]["zkverify_submission"] = submission_result
                
                if submission_result["success"]:
                    pipeline_result["final_transaction_hash"] = submission_result["transaction_hash"]
            
            # Sucesso completo
            pipeline_result["success"] = True
            self.logger.info(f"🎉 Pipeline completo finalizado: {pipeline_id}")
            
            # Salvar resultado completo
            self._save_pipeline_result(pipeline_result)
            
            return pipeline_result
            
        except Exception as e:
            error_msg = f"Erro no pipeline: {str(e)}"
            self.logger.error(error_msg)
            pipeline_result["error"] = error_msg
            pipeline_result["success"] = False
            
            # Salvar resultado com erro
            self._save_pipeline_result(pipeline_result)
            
            return pipeline_result
    
    def _generate_witness_stage(self, smiles: str, circuit_type: str, **kwargs) -> Dict[str, Any]:
        """Etapa de geração de witness para todos os módulos científicos"""
        try:
            # Mapear tipos de circuito para métodos do witness generator
            witness_methods = {
                "logp": lambda: self.witness_generator.generate_logp_witness(smiles),
                "multi": lambda: self.witness_generator.generate_multi_criteria_witness(smiles),
                "pka": lambda: self.witness_generator.generate_pka_witness(smiles),
                "docking": lambda: self.witness_generator.generate_docking_witness(
                    smiles, kwargs.get("receptor_pdb")
                ),
                "qsar": lambda: self.witness_generator.generate_qsar_witness(smiles),
                "dynamics": lambda: self.witness_generator.generate_dynamics_witness(
                    smiles, 
                    kwargs.get("receptor_gro"),
                    kwargs.get("topology_top"), 
                    kwargs.get("box_size", 5.0)
                ),
                "cyp450": lambda: self.witness_generator.generate_cyp450_witness(smiles)
            }
            
            if circuit_type not in witness_methods:
                raise ValueError(f"Tipo de circuito inválido: {circuit_type}. "
                               f"Tipos suportados: {list(witness_methods.keys())}")
            
            # Gerar witness usando o método apropriado
            witness_data = witness_methods[circuit_type]()
            
            # Mapear para nomes de circuito (por enquanto todos usam simple_compliance)
            circuit_mapping = {
                "logp": "simple_compliance",
                "multi": "compliance_circuit", 
                "pka": "simple_compliance",
                "docking": "simple_compliance",
                "qsar": "simple_compliance", 
                "dynamics": "simple_compliance",
                "cyp450": "simple_compliance"
            }
            
            circuit_name = circuit_mapping[circuit_type]
            
            # Salvar witness
            witness_file = self.base_dir / "proofs" / f"input_{circuit_type}_{datetime.now().strftime('%H%M%S')}.json"
            witness_file.parent.mkdir(exist_ok=True)
            
            self.witness_generator.save_witness_file(witness_data, str(witness_file))
            
            return {
                "success": True,
                "circuit_name": circuit_name,
                "witness_file": str(witness_file),
                "metadata": witness_data["metadata"],
                "compliance_result": witness_data["metadata"].get("is_compliant", False)
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def _generate_proof_stage(self, witness_file: str, circuit_type: str, pipeline_id: str) -> Dict[str, Any]:
        """Etapa de geração de prova ZK para todos os módulos"""
        try:
            # Mapear tipos de circuito para nomes de arquivo Circom
            circuit_mapping = {
                "logp": "simple_compliance",
                "multi": "compliance_circuit",
                "pka": "simple_compliance",      # Por enquanto usa o mesmo circuito
                "docking": "simple_compliance",  # Por enquanto usa o mesmo circuito
                "qsar": "simple_compliance",     # Por enquanto usa o mesmo circuito
                "dynamics": "simple_compliance", # Por enquanto usa o mesmo circuito
                "cyp450": "simple_compliance"    # Por enquanto usa o mesmo circuito
            }
            
            circuit_name = circuit_mapping.get(circuit_type, "simple_compliance")
            
            # Gerar prova usando snarkjs
            proof_result = self.proof_service.generate_proof(circuit_name, witness_file, pipeline_id)
            
            if proof_result["success"]:
                # Adicionar caminhos dos arquivos necessários para zkVerify
                circuits_dir = self.base_dir / "circuits"
                vkey_file = circuits_dir / "verification_key.json"
                
                proof_result["vkey_file"] = str(vkey_file)
                proof_result["proof_file"] = proof_result["metadata"]["files"]["proof"]
                proof_result["public_file"] = proof_result["metadata"]["files"]["public"]
            
            return proof_result
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def _submit_to_zkverify_stage(self, proof_file: str, public_file: str, 
                                 vkey_file: str, pipeline_id: str) -> Dict[str, Any]:
        """Etapa de submissão para zkVerify"""
        try:
            # Verificar se verification key existe
            if not Path(vkey_file).exists():
                # Extrair verification key se não existir
                circuits_dir = self.base_dir / "circuits"
                zkey_file = circuits_dir / "circuit.zkey"
                
                if zkey_file.exists():
                    import subprocess
                    cmd = [
                        'snarkjs', 'zkey', 'export', 'verificationkey',
                        str(zkey_file), str(vkey_file)
                    ]
                    subprocess.run(cmd, check=True)
                    self.logger.info(f"Verification key extraída: {vkey_file}")
                else:
                    raise FileNotFoundError("Arquivo circuit.zkey não encontrado")
            
            # Submeter para zkVerify
            submission_result = self.zkverify_service.submit_proof_to_zkverify(
                proof_file, public_file, vkey_file, pipeline_id
            )
            
            return submission_result
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def _save_pipeline_result(self, result: Dict[str, Any]):
        """Salva resultado completo do pipeline"""
        try:
            results_dir = self.base_dir / "pipeline_results"
            results_dir.mkdir(exist_ok=True)
            
            result_file = results_dir / f"{result['pipeline_id']}_complete.json"
            
            with open(result_file, 'w') as f:
                json.dump(result, f, indent=2)
            
            self.logger.info(f"💾 Resultado do pipeline salvo: {result_file}")
            
        except Exception as e:
            self.logger.error(f"Erro ao salvar resultado: {str(e)}")
    
    def get_pipeline_status(self, pipeline_id: str) -> Dict[str, Any]:
        """Obtém status de um pipeline executado"""
        try:
            results_dir = self.base_dir / "pipeline_results"
            result_file = results_dir / f"{pipeline_id}_complete.json"
            
            if result_file.exists():
                with open(result_file, 'r') as f:
                    return json.load(f)
            else:
                return {
                    "error": f"Pipeline {pipeline_id} não encontrado"
                }
                
        except Exception as e:
            return {
                "error": f"Erro ao carregar pipeline: {str(e)}"
            }
    
    def list_pipelines(self) -> Dict[str, Any]:
        """Lista todos os pipelines executados"""
        try:
            results_dir = self.base_dir / "pipeline_results"
            
            if not results_dir.exists():
                return {
                    "total_pipelines": 0,
                    "pipelines": []
                }
            
            pipeline_files = list(results_dir.glob("*_complete.json"))
            
            pipelines = []
            for pipeline_file in pipeline_files:
                with open(pipeline_file, 'r') as f:
                    pipeline_data = json.load(f)
                
                # Resumo do pipeline
                summary = {
                    "pipeline_id": pipeline_data["pipeline_id"],
                    "smiles": pipeline_data["smiles"],
                    "circuit_type": pipeline_data["circuit_type"],
                    "timestamp": pipeline_data["timestamp"],
                    "success": pipeline_data["success"],
                    "transaction_hash": pipeline_data.get("final_transaction_hash")
                }
                
                pipelines.append(summary)
            
            # Ordenar por timestamp (mais recente primeiro)
            pipelines.sort(key=lambda x: x["timestamp"], reverse=True)
            
            return {
                "total_pipelines": len(pipelines),
                "pipelines": pipelines
            }
            
        except Exception as e:
            return {
                "total_pipelines": 0,
                "error": str(e),
                "pipelines": []
            }
    
    def run_batch_compliance(self, smiles_list: list, circuit_type: str = "logp", 
                           submit_to_zkverify: bool = False) -> Dict[str, Any]:
        """
        Executa compliance em lote para múltiplas moléculas
        
        Args:
            smiles_list: Lista de SMILES para testar
            circuit_type: Tipo de circuito
            submit_to_zkverify: Se deve submeter para zkVerify
            
        Returns:
            Resultados de todos os pipelines
        """
        batch_id = f"batch_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        self.logger.info(f"🔄 Iniciando compliance em lote: {batch_id}")
        self.logger.info(f"   Total moléculas: {len(smiles_list)}")
        
        batch_results = {
            "batch_id": batch_id,
            "total_molecules": len(smiles_list),
            "circuit_type": circuit_type,
            "submit_to_zkverify": submit_to_zkverify,
            "timestamp": datetime.now().isoformat(),
            "results": [],
            "summary": {
                "successful": 0,
                "failed": 0,
                "compliant": 0,
                "non_compliant": 0
            }
        }
        
        for i, smiles in enumerate(smiles_list):
            self.logger.info(f"🧪 Processando molécula {i+1}/{len(smiles_list)}: {smiles}")
            
            # Executar pipeline individual
            pipeline_result = self.run_complete_pipeline(smiles, circuit_type, submit_to_zkverify)
            batch_results["results"].append(pipeline_result)
            
            # Atualizar estatísticas
            if pipeline_result["success"]:
                batch_results["summary"]["successful"] += 1
                
                # Verificar compliance
                witness_stage = pipeline_result["stages"].get("witness_generation", {})
                if witness_stage.get("compliance_result"):
                    batch_results["summary"]["compliant"] += 1
                else:
                    batch_results["summary"]["non_compliant"] += 1
            else:
                batch_results["summary"]["failed"] += 1
        
        # Salvar resultado do lote
        self._save_batch_result(batch_results)
        
        self.logger.info(f"🏁 Compliance em lote finalizado: {batch_id}")
        self.logger.info(f"   Sucessos: {batch_results['summary']['successful']}")
        self.logger.info(f"   Falhas: {batch_results['summary']['failed']}")
        
        return batch_results
    
    def _save_batch_result(self, result: Dict[str, Any]):
        """Salva resultado do lote"""
        try:
            results_dir = self.base_dir / "batch_results"
            results_dir.mkdir(exist_ok=True)
            
            result_file = results_dir / f"{result['batch_id']}_batch.json"
            
            with open(result_file, 'w') as f:
                json.dump(result, f, indent=2)
            
            self.logger.info(f"💾 Resultado do lote salvo: {result_file}")
            
        except Exception as e:
            self.logger.error(f"Erro ao salvar lote: {str(e)}")


def main():
    """Função principal para teste standalone"""
    import sys
    
    if len(sys.argv) < 2:
        print("Uso: python zk_pipeline.py <smiles> [circuit_type] [submit_zkverify]")
        print("Exemplo: python zk_pipeline.py 'CCO' logp true")
        sys.exit(1)
    
    smiles = sys.argv[1]
    circuit_type = sys.argv[2] if len(sys.argv) > 2 else "logp"
    submit_zkverify = sys.argv[3].lower() == "true" if len(sys.argv) > 3 else False
    
    pipeline = ZKCompliancePipeline()
    result = pipeline.run_complete_pipeline(smiles, circuit_type, submit_zkverify)
    
    if result["success"]:
        print("🎉 Pipeline executado com sucesso!")
        print(f"Pipeline ID: {result['pipeline_id']}")
        if result.get("final_transaction_hash"):
            print(f"Transaction Hash: {result['final_transaction_hash']}")
    else:
        print(f"❌ Erro no pipeline: {result.get('error', 'Erro desconhecido')}")
        sys.exit(1)


if __name__ == "__main__":
    main()
