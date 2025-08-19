"""
Serviço de Integração com zkVerify
Submete provas Groth16 para a blockchain zkVerify e extrai transaction hashes

Autor: Marcos Antonio Morais Braga
Data: 25/07/2025
"""

import os
import json
import subprocess
import logging
import asyncio
from pathlib import Path
from typing import Dict, Any, Optional
from datetime import datetime
from dataclasses import dataclass

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class ProofSubmissionResult:
    """Resultado da submissão de prova para zkVerify"""
    success: bool
    transaction_hash: Optional[str] = None
    proof_id: Optional[str] = None
    status: Optional[str] = None
    explorer_url: Optional[str] = None
    error_message: Optional[str] = None

class ZKVerifyService:
    """Serviço para submeter provas para zkVerify blockchain"""
    
    def __init__(self, base_dir: str = "/home/user/Documents/ZK_COMPLY"):
        self.base_dir = Path(base_dir)
        self.scripts_dir = self.base_dir / "scripts"
        self.proofs_dir = self.base_dir / "proofs"
        
        # Configurar logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        
        # Verificar dependências
        self._check_dependencies()
    
    def _check_dependencies(self):
        """Verifica se Node.js e zkverifyjs estão disponíveis"""
        try:
            result = subprocess.run(['node', '--version'], 
                                  capture_output=True, text=True, check=True)
            self.logger.info(f"Node.js version: {result.stdout.strip()}")
        except (subprocess.CalledProcessError, FileNotFoundError):
            raise RuntimeError("Node.js não está instalado")
        
        # Verificar se zkverifyjs está instalado
        package_json = self.base_dir / "package.json"
        if package_json.exists():
            with open(package_json, 'r') as f:
                package_data = json.load(f)
                if "zkverifyjs" not in package_data.get("dependencies", {}):
                    self.logger.warning("zkverifyjs pode não estar instalado")
    
    async def test_connection(self) -> Dict:
        """Testa conexão com zkVerify"""
        try:
            logger.info("🧪 Testando conexão zkVerify...")
            
            result = subprocess.run([
                "node", 
                str(self.scripts_dir / "test_zkverify_connection.js")
            ], 
            cwd=self.project_root,
            capture_output=True, 
            text=True, 
            timeout=30
            )
            
            if result.returncode == 0:
                logger.info("✅ Conexão zkVerify: SUCESSO")
                return {
                    "success": True,
                    "output": result.stdout,
                    "zkverifyjs_available": True
                }
            else:
                logger.error(f"❌ Erro na conexão: {result.stderr}")
                return {
                    "success": False,
                    "error": result.stderr,
                    "zkverifyjs_available": False
                }
                
        except Exception as e:
            logger.error(f"❌ Exceção no teste de conexão: {e}")
            return {
                "success": False,
                "error": str(e),
                "zkverifyjs_available": False
            }
    
    async def submit_proof(self, 
                          proof_path: str,
                          vk_path: str, 
                          module_name: str,
                          smiles: str = None) -> ProofSubmissionResult:
        """Submete prova ZK para zkVerify blockchain"""
        
        logger.info(f"🚀 Submetendo prova {module_name} para zkVerify...")
        
        try:
            # Verificar se arquivos existem
            proof_file = Path(proof_path)
            vk_file = Path(vk_path)
            
            if not proof_file.exists():
                raise FileNotFoundError(f"Arquivo de prova não encontrado: {proof_path}")
            if not vk_file.exists():
                raise FileNotFoundError(f"Verification key não encontrada: {vk_path}")
            
            # Ler dados dos arquivos
            with open(proof_file, 'rb') as f:
                proof_data = f.read()
            with open(vk_file, 'rb') as f:
                vk_data = f.read()
            
            # Preparar dados para submissão
            submission_data = {
                "proof": proof_data.hex(),
                "verification_key": vk_data.hex(),
                "module": module_name,
                "smiles": smiles,
                "project": "ZK_COMPLY",
                "network": self.network
            }
            
            logger.info(f"📊 Dados preparados: prova={len(proof_data)}bytes, vk={len(vk_data)}bytes")
            
            # Por enquanto, simular submissão (implementação real será feita conforme docs zkVerifyJS)
            await asyncio.sleep(1)  # Simular tempo de submissão
            
            # TODO: Implementar submissão real usando zkverifyjs
            # Este será o próximo passo quando tivermos acesso à testnet
            
            logger.info("✅ Prova preparada para submissão (modo simulação)")
            
            return ProofSubmissionResult(
                success=True,
                transaction_hash="0x" + "0" * 64,  # Simulado
                proof_id=f"proof_{module_name}_{hash(smiles) if smiles else 'test'}",
                status="SIMULATED",
                explorer_url=f"https://testnet.zkverify.io/tx/0x{'0' * 64}",
                error_message=None
            )
            
        except Exception as e:
            logger.error(f"❌ Erro na submissão: {e}")
            return ProofSubmissionResult(
                success=False,
                error_message=str(e)
            )
    
    async def submit_compliance_batch(self, 
                                    smiles: str,
                                    proofs_data: Dict[str, Dict]) -> Dict:
        """Submete todas as provas de compliance para zkVerify"""
        
        logger.info(f"🎯 Iniciando submissão em lote para {smiles}")
        
        modules = ['logp', 'pka', 'docking', 'qsar', 'dynamics', 'cyp450']
        results = []
        
        for module in modules:
            if module in proofs_data:
                logger.info(f"📤 Submetendo módulo {module}...")
                
                result = await self.submit_proof(
                    proof_path=proofs_data[module]['proof_path'],
                    vk_path=proofs_data[module]['vk_path'],
                    module_name=module,
                    smiles=smiles
                )
                
                results.append({
                    "module": module,
                    "submission": result.__dict__
                })
                
                if result.success:
                    logger.info(f"✅ {module}: {result.proof_id}")
                else:
                    logger.error(f"❌ {module}: {result.error_message}")
        
        compliance_certified = all(r['submission']['success'] for r in results)
        
        return {
            "smiles": smiles,
            "total_modules": len(modules),
            "submitted": len(results),
            "successful": sum(1 for r in results if r['submission']['success']),
            "results": results,
            "compliance_certified": compliance_certified,
            "batch_id": f"batch_{hash(smiles)}_{len(results)}"
        }
    
    def submit_proof_to_zkverify(self, proof_file: str, public_file: str, 
                                vkey_file: str, proof_id: str) -> Dict[str, Any]:
        """
        Submete prova Groth16 para zkVerify blockchain
        
        Args:
            proof_file: Arquivo da prova JSON
            public_file: Arquivo dos inputs públicos JSON
            vkey_file: Arquivo da verification key JSON
            proof_id: ID único da prova
            
        Returns:
            Resultado da submissão com transaction hash
        """
        self.logger.info(f"📤 Submetendo prova para zkVerify: {proof_id}")
        
        try:
            # 1. Verificar arquivos necessários
            files_to_check = [proof_file, public_file, vkey_file]
            for file_path in files_to_check:
                if not Path(file_path).exists():
                    raise FileNotFoundError(f"Arquivo não encontrado: {file_path}")
            
            # 2. Criar script de submissão temporário
            submission_script = self._create_submission_script(
                proof_file, public_file, vkey_file, proof_id
            )
            
            # 3. Executar submissão
            cmd = ['node', str(submission_script)]
            result = subprocess.run(cmd, capture_output=True, text=True, 
                                  cwd=str(self.base_dir), timeout=300)
            
            # 4. Parse resultado
            if result.returncode == 0:
                output = result.stdout
                
                # Extrair transaction hash do output
                tx_hash = self._extract_transaction_hash(output)
                
                submission_result = {
                    "success": True,
                    "proof_id": proof_id,
                    "transaction_hash": tx_hash,
                    "block_explorer_url": f"https://zkverify-testnet.subscan.io/extrinsic/{tx_hash}" if tx_hash else None,
                    "submission_time": datetime.now().isoformat(),
                    "output": output
                }
                
                # Salvar resultado da submissão
                self._save_submission_result(proof_id, submission_result)
                
                self.logger.info(f"✅ Prova submetida com sucesso: {tx_hash}")
                return submission_result
                
            else:
                error_msg = f"Erro na submissão: {result.stderr}"
                self.logger.error(error_msg)
                return {
                    "success": False,
                    "proof_id": proof_id,
                    "error": error_msg,
                    "output": result.stdout
                }
                
        except subprocess.TimeoutExpired:
            error_msg = "Timeout na submissão para zkVerify"
            self.logger.error(error_msg)
            return {
                "success": False,
                "proof_id": proof_id,
                "error": error_msg
            }
            
        except Exception as e:
            error_msg = f"Erro interno: {str(e)}"
            self.logger.error(error_msg)
            return {
                "success": False,
                "proof_id": proof_id,
                "error": error_msg
            }
        
        finally:
            # Limpar script temporário
            if 'submission_script' in locals():
                try:
                    submission_script.unlink(missing_ok=True)
                except:
                    pass
    
    def _create_submission_script(self, proof_file: str, public_file: str, 
                                 vkey_file: str, proof_id: str) -> Path:
        """
        Cria script Node.js temporário para submissão zkVerify
        
        Returns:
            Caminho para o script temporário
        """
        script_content = f'''
const zkverifyjs = require('zkverifyjs');
const fs = require('fs');

async function submitProof() {{
    try {{
        console.log('🔗 Conectando com zkVerify...');
        
        // Conectar com zkVerify testnet
        const session = await zkverifyjs.zkVerifySession.start().Volta().withAccount(
            process.env.ZKVERIFY_SEED || 'pole coach remind ocean argue turn announce eye age orchard food lazy'
        );
        
        // Carregar arquivos
        console.log('📁 Carregando arquivos da prova...');
        const proof = JSON.parse(fs.readFileSync('{proof_file}', 'utf8'));
        const publicInputs = JSON.parse(fs.readFileSync('{public_file}', 'utf8'));
        const vkey = JSON.parse(fs.readFileSync('{vkey_file}', 'utf8'));
        
        console.log('📤 Submetendo prova Groth16...');
        
        // Submeter prova Groth16 usando API correta zkVerifyJS
        const {{ Library, CurveType }} = require('zkverifyjs');
        
        const {{ events, transactionResult }} = await session
            .verify()
            .groth16({{
                library: Library.snarkjs,
                curve: CurveType.bn128
            }})
            .execute({{
                proofData: {{
                    vk: vkey,
                    proof: proof,
                    publicSignals: publicInputs
                }}
            }});
        
        console.log('✅ Prova submetida com sucesso!');
        
        // Aguardar confirmação
        console.log('⏳ Aguardando confirmação...');
        const transactionInfo = await transactionResult;
        
        console.log('🎉 Prova confirmada na blockchain!');
        console.log('Transaction Hash:', transactionInfo.txHash);
        console.log('Block Hash:', transactionInfo.blockHash);
        console.log('Block Number:', transactionInfo.blockNumber);
        
        await session.close();
        
    }} catch (error) {{
        console.error('❌ Erro na submissão:', error);
        process.exit(1);
    }}
}}

submitProof();
'''
        
        script_path = self.base_dir / f"temp_submit_{proof_id}.js"
        
        with open(script_path, 'w') as f:
            f.write(script_content)
        
        return script_path
    
    def _extract_transaction_hash(self, output: str) -> Optional[str]:
        """
        Extrai transaction hash do output da submissão
        
        Args:
            output: Output do script de submissão
            
        Returns:
            Transaction hash ou None se não encontrado
        """
        lines = output.split('\n')
        
        for line in lines:
            if 'Transaction Hash:' in line:
                return line.split('Transaction Hash:')[-1].strip()
            elif 'Final Transaction Hash:' in line:
                return line.split('Final Transaction Hash:')[-1].strip()
        
        # Tentar extrair hash com regex se não encontrado
        import re
        hash_pattern = r'0x[a-fA-F0-9]{64}'
        matches = re.findall(hash_pattern, output)
        
        if matches:
            return matches[-1]  # Retornar último hash encontrado
        
        return None
    
    def _save_submission_result(self, proof_id: str, result: Dict[str, Any]):
        """
        Salva resultado da submissão em arquivo
        
        Args:
            proof_id: ID da prova
            result: Resultado da submissão
        """
        try:
            submission_file = self.proofs_dir / f"{proof_id}_submission.json"
            
            with open(submission_file, 'w') as f:
                json.dump(result, f, indent=2)
            
            self.logger.info(f"💾 Resultado da submissão salvo: {submission_file}")
            
        except Exception as e:
            self.logger.error(f"Erro ao salvar resultado: {str(e)}")
    
    def verify_transaction(self, tx_hash: str) -> Dict[str, Any]:
        """
        Verifica status de uma transação na zkVerify
        
        Args:
            tx_hash: Hash da transação
            
        Returns:
            Status da transação
        """
        try:
            # Script para verificar transação
            verify_script = self._create_verify_script(tx_hash)
            
            cmd = ['node', str(verify_script)]
            result = subprocess.run(cmd, capture_output=True, text=True, 
                                  cwd=str(self.base_dir), timeout=60)
            
            if result.returncode == 0:
                return {
                    "success": True,
                    "tx_hash": tx_hash,
                    "status": "confirmed",
                    "output": result.stdout
                }
            else:
                return {
                    "success": False,
                    "tx_hash": tx_hash,
                    "error": result.stderr,
                    "output": result.stdout
                }
                
        except Exception as e:
            return {
                "success": False,
                "tx_hash": tx_hash,
                "error": str(e)
            }
        
        finally:
            if 'verify_script' in locals():
                try:
                    verify_script.unlink(missing_ok=True)
                except:
                    pass
    
    def _create_verify_script(self, tx_hash: str) -> Path:
        """Cria script para verificar transação"""
        script_content = f'''
const {{ zkVerify }} = require('zkverifyjs');

async function verifyTransaction() {{
    try {{
        const api = await zkVerify.new({{
            wsProvider: 'wss://zkverify-testnet.gelato.network'
        }});
        
        console.log('🔍 Verificando transação:', '{tx_hash}');
        
        const txInfo = await api.getTransaction('{tx_hash}');
        
        console.log('Transaction Info:', JSON.stringify(txInfo, null, 2));
        
        await api.disconnect();
        
    }} catch (error) {{
        console.error('❌ Erro na verificação:', error);
        process.exit(1);
    }}
}}

verifyTransaction();
'''
        
        script_path = self.base_dir / f"temp_verify_{tx_hash[:8]}.js"
        
        with open(script_path, 'w') as f:
            f.write(script_content)
        
        return script_path
    
    def list_submissions(self) -> Dict[str, Any]:
        """Lista todas as submissões realizadas"""
        try:
            submission_files = list(self.proofs_dir.glob("*_submission.json"))
            
            submissions = []
            for submission_file in submission_files:
                with open(submission_file, 'r') as f:
                    submission_data = json.load(f)
                submissions.append(submission_data)
            
            return {
                "total_submissions": len(submissions),
                "submissions": sorted(submissions, 
                                    key=lambda x: x.get("submission_time", ""), 
                                    reverse=True)
            }
            
        except Exception as e:
            return {
                "total_submissions": 0,
                "error": str(e),
                "submissions": []
            }


def main():
    """Função principal para teste standalone"""
    import sys
    
    if len(sys.argv) != 5:
        print("Uso: python zkverify_service.py <proof_file> <public_file> <vkey_file> <proof_id>")
        sys.exit(1)
    
    proof_file, public_file, vkey_file, proof_id = sys.argv[1:5]
    
    service = ZKVerifyService()
    result = service.submit_proof_to_zkverify(proof_file, public_file, vkey_file, proof_id)
    
    if result["success"]:
        print("🎉 Prova submetida com sucesso!")
        print(f"Transaction Hash: {result['transaction_hash']}")
        print(f"Explorer: {result['block_explorer_url']}")
    else:
        print(f"❌ Erro na submissão: {result.get('error', 'Erro desconhecido')}")
        sys.exit(1)


if __name__ == "__main__":
    main()
