"""
BarretenbergService - Automação de Provas ZK
Autor: Marcos Antonio Morais Braga
Data: 25/07/2025

Serviço Python para automação completa do Barretenberg:
- Compilação de circuitos Noir
- Geração de provas ZK
- Verificação de provas
- Integração com todos os 6 módulos científicos
"""

import subprocess
import asyncio
import logging
import json
import os
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
import tempfile
import shutil

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class ProofGenerationResult:
    """Resultado da geração de prova ZK"""
    success: bool
    module_name: str
    proof_path: Optional[str] = None
    vk_path: Optional[str] = None
    public_inputs_path: Optional[str] = None
    proof_size_bytes: Optional[int] = None
    vk_size_bytes: Optional[int] = None
    generation_time_seconds: Optional[float] = None
    error_message: Optional[str] = None

@dataclass
class CircuitCompilationResult:
    """Resultado da compilação de circuito Noir"""
    success: bool
    module_name: str
    compiled_circuit_path: Optional[str] = None
    witness_path: Optional[str] = None
    compilation_time_seconds: Optional[float] = None
    error_message: Optional[str] = None

class BarretenbergService:
    """Serviço de automação completa para Barretenberg"""
    
    def __init__(self, 
                 project_root: str = "/home/user/Documents/ZK_COMPLY",
                 bb_path: str = "/home/user/.bb/bb"):
        self.project_root = Path(project_root)
        self.bb_path = bb_path
        
        # Verificar dependências
        self._verify_dependencies()
        
        # Módulos disponíveis
        self.available_modules = [
            'logp', 'pka', 'docking', 'qsar', 'dynamics', 'cyp450'
        ]
    
    def _verify_dependencies(self):
        """Verifica se todas as dependências estão disponíveis"""
        
        # Verificar nargo
        try:
            result = subprocess.run(['nargo', '--version'], 
                                   capture_output=True, text=True, timeout=10)
            if result.returncode != 0:
                raise FileNotFoundError("nargo não encontrado")
            logger.info(f"✅ Nargo disponível: {result.stdout.strip()}")
        except Exception as e:
            raise FileNotFoundError(f"Nargo não encontrado: {e}")
        
        # Verificar barretenberg
        if not Path(self.bb_path).exists():
            raise FileNotFoundError(f"Barretenberg não encontrado em: {self.bb_path}")
        
        logger.info(f"✅ Barretenberg disponível: {self.bb_path}")
    
    def _get_module_path(self, module_name: str) -> Path:
        """Retorna o path do módulo"""
        module_path = self.project_root / f"zk-comply-{module_name}"
        if not module_path.exists():
            raise FileNotFoundError(f"Módulo não encontrado: {module_path}")
        return module_path
    
    def _get_compiled_files(self, module_name: str) -> Tuple[Optional[Path], Optional[Path]]:
        """Detecta automaticamente os arquivos compilados de um módulo"""
        module_path = self._get_module_path(module_name)
        target_dir = module_path / "target"
        
        if not target_dir.exists():
            return None, None
        
        # Procurar arquivos .json e .gz
        json_files = list(target_dir.glob("*.json"))
        gz_files = list(target_dir.glob("*.gz"))
        
        if json_files and gz_files:
            # Assumir que há apenas um arquivo de cada tipo
            return json_files[0], gz_files[0]
        
        return None, None
    
    async def compile_circuit(self, module_name: str) -> CircuitCompilationResult:
        """Compila circuito Noir de um módulo"""
        
        logger.info(f"🔨 Compilando circuito {module_name}...")
        start_time = asyncio.get_event_loop().time()
        
        try:
            module_path = self._get_module_path(module_name)
            
            # Executar nargo compile
            result = subprocess.run([
                'nargo', 'compile'
            ], 
            cwd=module_path,
            capture_output=True, 
            text=True, 
            timeout=60
            )
            
            compilation_time = asyncio.get_event_loop().time() - start_time
            
            if result.returncode == 0:
                # Verificar arquivos gerados
                target_dir = module_path / "target"
                compiled_circuit = target_dir / f"zk_comply_{module_name}.json"
                witness = target_dir / f"zk_comply_{module_name}.gz"
                
                if compiled_circuit.exists() and witness.exists():
                    logger.info(f"✅ Compilação {module_name}: SUCESSO ({compilation_time:.2f}s)")
                    return CircuitCompilationResult(
                        success=True,
                        module_name=module_name,
                        compiled_circuit_path=str(compiled_circuit),
                        witness_path=str(witness),
                        compilation_time_seconds=compilation_time
                    )
                else:
                    raise FileNotFoundError("Arquivos compilados não encontrados")
            else:
                raise subprocess.CalledProcessError(result.returncode, 'nargo', result.stderr)
                
        except Exception as e:
            compilation_time = asyncio.get_event_loop().time() - start_time
            logger.error(f"❌ Erro na compilação {module_name}: {e}")
            return CircuitCompilationResult(
                success=False,
                module_name=module_name,
                compilation_time_seconds=compilation_time,
                error_message=str(e)
            )
    
    async def generate_proof(self, module_name: str, 
                           force_recompile: bool = False) -> ProofGenerationResult:
        """Gera prova ZK para um módulo"""
        
        logger.info(f"🚀 Gerando prova ZK para {module_name}...")
        start_time = asyncio.get_event_loop().time()
        
        try:
            module_path = self._get_module_path(module_name)
            
            # Compilar se necessário
            if force_recompile:
                compilation_result = await self.compile_circuit(module_name)
                if not compilation_result.success:
                    return ProofGenerationResult(
                        success=False,
                        module_name=module_name,
                        error_message=f"Falha na compilação: {compilation_result.error_message}"
                    )
            
            # Paths dos arquivos
            target_dir = module_path / "target"
            proof_dir = module_path / "proof"
            vk_dir = module_path / "vk"
            
            # Detectar arquivos compilados automaticamente
            compiled_circuit, witness = self._get_compiled_files(module_name)
            
            # Criar diretórios se não existirem
            proof_dir.mkdir(exist_ok=True)
            vk_dir.mkdir(exist_ok=True)
            
            # Verificar se arquivos compilados existem
            if compiled_circuit is None or witness is None or not compiled_circuit.exists() or not witness.exists():
                # Tentar compilar automaticamente
                compilation_result = await self.compile_circuit(module_name)
                if not compilation_result.success:
                    return ProofGenerationResult(
                        success=False,
                        module_name=module_name,
                        error_message=f"Arquivos compilados não encontrados: {compilation_result.error_message}"
                    )
                # Re-detectar após compilação
                compiled_circuit, witness = self._get_compiled_files(module_name)
            
            # Gerar prova
            logger.info(f"📊 Gerando prova para {module_name}...")
            prove_result = subprocess.run([
                self.bb_path, 'prove',
                '-b', str(compiled_circuit),
                '-w', str(witness),
                '-o', str(proof_dir)
            ], 
            cwd=module_path,
            capture_output=True, 
            text=True, 
            timeout=120
            )
            
            if prove_result.returncode != 0:
                raise subprocess.CalledProcessError(prove_result.returncode, 'bb prove', prove_result.stderr)
            
            # Gerar verification key
            logger.info(f"🔑 Gerando verification key para {module_name}...")
            vk_result = subprocess.run([
                self.bb_path, 'write_vk',
                '-b', str(compiled_circuit),
                '-o', str(vk_dir)
            ], 
            cwd=module_path,
            capture_output=True, 
            text=True, 
            timeout=60
            )
            
            if vk_result.returncode != 0:
                raise subprocess.CalledProcessError(vk_result.returncode, 'bb write_vk', vk_result.stderr)
            
            # Verificar arquivos gerados
            proof_file = proof_dir / "proof"
            vk_file = vk_dir / "vk"
            public_inputs_file = proof_dir / "public_inputs"
            
            if not proof_file.exists() or not vk_file.exists():
                raise FileNotFoundError("Arquivos de prova não foram gerados")
            
            # Obter tamanhos dos arquivos
            proof_size = proof_file.stat().st_size
            vk_size = vk_file.stat().st_size
            
            generation_time = asyncio.get_event_loop().time() - start_time
            
            logger.info(f"✅ Prova {module_name}: SUCESSO ({generation_time:.2f}s)")
            logger.info(f"📊 Tamanhos: prova={proof_size}bytes, vk={vk_size}bytes")
            
            return ProofGenerationResult(
                success=True,
                module_name=module_name,
                proof_path=str(proof_file),
                vk_path=str(vk_file),
                public_inputs_path=str(public_inputs_file) if public_inputs_file.exists() else None,
                proof_size_bytes=proof_size,
                vk_size_bytes=vk_size,
                generation_time_seconds=generation_time
            )
            
        except Exception as e:
            generation_time = asyncio.get_event_loop().time() - start_time
            logger.error(f"❌ Erro na geração de prova {module_name}: {e}")
            return ProofGenerationResult(
                success=False,
                module_name=module_name,
                generation_time_seconds=generation_time,
                error_message=str(e)
            )
    
    async def verify_proof(self, module_name: str) -> Dict:
        """Verifica prova ZK de um módulo"""
        
        logger.info(f"🔍 Verificando prova {module_name}...")
        
        try:
            module_path = self._get_module_path(module_name)
            
            proof_file = module_path / "proof" / "proof"
            vk_file = module_path / "vk" / "vk"
            public_inputs_file = module_path / "proof" / "public_inputs"
            
            if not proof_file.exists() or not vk_file.exists():
                return {
                    "success": False,
                    "error": "Arquivos de prova não encontrados"
                }
            
            # Verificar prova
            verify_result = subprocess.run([
                self.bb_path, 'verify',
                '-k', str(vk_file),
                '-p', str(proof_file),
                '-i', str(public_inputs_file)
            ], 
            cwd=module_path,
            capture_output=True, 
            text=True, 
            timeout=30
            )
            
            if verify_result.returncode == 0:
                logger.info(f"✅ Verificação {module_name}: SUCESSO")
                return {
                    "success": True,
                    "module": module_name,
                    "verification": "PASSED"
                }
            else:
                logger.error(f"❌ Verificação {module_name}: FALHOU")
                return {
                    "success": False,
                    "module": module_name,
                    "verification": "FAILED",
                    "error": verify_result.stderr
                }
                
        except Exception as e:
            logger.error(f"❌ Erro na verificação {module_name}: {e}")
            return {
                "success": False,
                "module": module_name,
                "error": str(e)
            }
    
    async def generate_all_proofs(self, 
                                modules: List[str] = None,
                                force_recompile: bool = False) -> Dict:
        """Gera provas ZK para múltiplos módulos"""
        
        if modules is None:
            modules = self.available_modules
        
        logger.info(f"🎯 Gerando provas para {len(modules)} módulos: {modules}")
        
        results = {}
        successful = 0
        
        for module in modules:
            logger.info(f"\n--- Processando módulo {module} ---")
            
            # Gerar prova
            proof_result = await self.generate_proof(module, force_recompile)
            
            # Verificar se foi bem-sucedida
            if proof_result.success:
                verification_result = await self.verify_proof(module)
                successful += 1
            else:
                verification_result = {"success": False, "error": "Prova não gerada"}
            
            results[module] = {
                "proof_generation": proof_result.__dict__,
                "verification": verification_result
            }
        
        logger.info(f"\n🎉 Resumo: {successful}/{len(modules)} módulos com sucesso")
        
        return {
            "total_modules": len(modules),
            "successful": successful,
            "success_rate": successful / len(modules),
            "results": results
        }

# Função de teste
async def test_barretenberg_service():
    """Teste do BarretenbergService"""
    print("🧪 Testando BarretenbergService...")
    
    service = BarretenbergService()
    
    # Testar módulo logP primeiro
    print("\n1. Testando módulo logP...")
    logp_result = await service.generate_proof("logp", force_recompile=True)
    print(f"Resultado logP: {logp_result}")
    
    # Testar todos os módulos se logP funcionou
    if logp_result.success:
        print("\n2. Testando todos os módulos...")
        all_results = await service.generate_all_proofs(force_recompile=False)
        print(f"Resultados gerais: {all_results}")

if __name__ == "__main__":
    asyncio.run(test_barretenberg_service())
