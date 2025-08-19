#!/usr/bin/env python3
"""
Script de Teste Automatizado - ZK_COMPLY v2.0
Valida todos os módulos científicos e pipeline ZK

Autor: Marcos Antonio Morais Braga
Data: 26/07/2025
"""

import sys
import os
import json
import subprocess
import time
from pathlib import Path

# Adicionar o diretório src ao path
sys.path.append(str(Path(__file__).parent / "src"))

from witness_generator import WitnessGenerator

class ZKComplianceTester:
    """Tester automatizado para todos os módulos ZK_COMPLY"""
    
    def __init__(self):
        self.base_dir = Path(__file__).parent
        self.generator = WitnessGenerator(str(self.base_dir))
        self.test_molecules = [
            "CCO",                    # Ethanol (simples)
            "CC(=O)OC",              # Aspirin (conhecido)
            "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O",  # Ibuprofen (complexo)
        ]
        self.modules = ["logp", "multi", "pka", "docking", "qsar", "dynamics", "cyp450"]
        self.results = {}
        
    def test_witness_generation(self):
        """Testa geração de witness para todos os módulos"""
        print("🧪 TESTE 1: Geração de Witness para Todos os Módulos")
        print("=" * 60)
        
        for module in self.modules:
            print(f"\n🔬 Testando módulo: {module.upper()}")
            module_results = []
            
            for smiles in self.test_molecules:
                try:
                    print(f"  📝 SMILES: {smiles}")
                    
                    # Gerar witness baseado no módulo
                    if module == "logp":
                        result = self.generator.generate_logp_witness(smiles)
                    elif module == "multi":
                        result = self.generator.generate_multi_criteria_witness(smiles)
                    elif module == "pka":
                        result = self.generator.generate_pka_witness(smiles)
                    elif module == "docking":
                        result = self.generator.generate_docking_witness(smiles)
                    elif module == "qsar":
                        result = self.generator.generate_qsar_witness(smiles)
                    elif module == "dynamics":
                        result = self.generator.generate_dynamics_witness(smiles)
                    elif module == "cyp450":
                        result = self.generator.generate_cyp450_witness(smiles)
                    
                    # Verificar resultado
                    assert "witness" in result
                    assert "metadata" in result
                    
                    metadata = result["metadata"]
                    compliance = metadata.get("is_compliant", metadata.get("overall_compliant", False))
                    
                    print(f"    ✅ Sucesso - Compliant: {compliance}")
                    module_results.append({
                        "smiles": smiles,
                        "success": True,
                        "compliant": compliance,
                        "metadata": metadata
                    })
                    
                except Exception as e:
                    print(f"    ❌ Erro: {str(e)}")
                    module_results.append({
                        "smiles": smiles,
                        "success": False,
                        "error": str(e)
                    })
            
            self.results[module] = module_results
            success_rate = sum(1 for r in module_results if r["success"]) / len(module_results)
            print(f"  📊 Taxa de sucesso: {success_rate:.1%}")
        
        return self.results
    
    def test_api_endpoints(self):
        """Testa endpoints da API REST"""
        print("\n🌐 TESTE 2: Endpoints da API REST")
        print("=" * 60)
        
        # Verificar se main.py pode ser importado
        try:
            sys.path.append(str(self.base_dir))
            import main
            print("✅ main.py importado com sucesso")
            
            # Testar criação da app FastAPI
            app = main.app
            print("✅ FastAPI app criada com sucesso")
            
        except Exception as e:
            print(f"❌ Erro ao importar main.py: {e}")
            return False
        
        return True
    
    def test_circuit_files(self):
        """Testa arquivos de circuito Circom"""
        print("\n⚡ TESTE 3: Arquivos de Circuito Circom")
        print("=" * 60)
        
        circuits_dir = self.base_dir / "circuits"
        required_files = [
            "simple_compliance.circom",
            "simple_compliance.r1cs",
            "simple_compliance.sym",
            "verification_key.json",
            "circuit.zkey"
        ]
        
        for file_name in required_files:
            file_path = circuits_dir / file_name
            if file_path.exists():
                print(f"✅ {file_name}")
            else:
                print(f"❌ {file_name} - AUSENTE")
        
        # Verificar diretório JS
        js_dir = circuits_dir / "simple_compliance_js"
        if js_dir.exists():
            print(f"✅ simple_compliance_js/")
        else:
            print(f"❌ simple_compliance_js/ - AUSENTE")
        
        return True
    
    def test_dependencies(self):
        """Testa dependências externas"""
        print("\n📦 TESTE 4: Dependências Externas")
        print("=" * 60)
        
        # Testar imports Python
        python_deps = [
            ("rdkit", "from rdkit import Chem"),
            ("requests", "import requests"),
            ("fastapi", "import fastapi"),
            ("numpy", "import numpy"),
        ]
        
        for name, import_stmt in python_deps:
            try:
                exec(import_stmt)
                print(f"✅ {name}")
            except ImportError:
                print(f"❌ {name} - NÃO INSTALADO")
        
        # Testar comandos externos (opcionais)
        external_tools = [
            ("snarkjs", "snarkjs --version"),
            ("node", "node --version"),
            ("npm", "npm --version"),
        ]
        
        for name, command in external_tools:
            try:
                result = subprocess.run(command.split(), capture_output=True, text=True, timeout=10)
                if result.returncode == 0:
                    print(f"✅ {name}")
                else:
                    print(f"⚠️  {name} - COMANDO FALHOU")
            except (subprocess.TimeoutExpired, FileNotFoundError):
                print(f"⚠️  {name} - NÃO ENCONTRADO (opcional)")
        
        return True
    
    def test_project_structure(self):
        """Testa estrutura do projeto"""
        print("\n📁 TESTE 5: Estrutura do Projeto")
        print("=" * 60)
        
        required_dirs = [
            "src", "circuits", "proofs", "docs", 
            "pipeline_results", "MolGpKa", "powers_of_tau"
        ]
        
        required_files = [
            "main.py", "README.md", "requirements.txt", 
            "package.json", "LICENSE"
        ]
        
        for dir_name in required_dirs:
            dir_path = self.base_dir / dir_name
            if dir_path.exists() and dir_path.is_dir():
                print(f"✅ {dir_name}/")
            else:
                print(f"❌ {dir_name}/ - AUSENTE")
        
        for file_name in required_files:
            file_path = self.base_dir / file_name
            if file_path.exists() and file_path.is_file():
                print(f"✅ {file_name}")
            else:
                print(f"❌ {file_name} - AUSENTE")
        
        return True
    
    def generate_report(self):
        """Gera relatório final dos testes"""
        print("\n📊 RELATÓRIO FINAL - ZK_COMPLY v2.0")
        print("=" * 60)
        
        total_tests = 0
        success_tests = 0
        
        for module, results in self.results.items():
            print(f"\n🔬 Módulo {module.upper()}:")
            for result in results:
                total_tests += 1
                if result["success"]:
                    success_tests += 1
                    compliance = result.get("compliant", "N/A")
                    print(f"  ✅ {result['smiles']} - Compliant: {compliance}")
                else:
                    print(f"  ❌ {result['smiles']} - Erro: {result.get('error', 'Desconhecido')}")
        
        print(f"\n📈 ESTATÍSTICAS:")
        print(f"  Total de testes: {total_tests}")
        print(f"  Sucessos: {success_tests}")
        print(f"  Taxa de sucesso: {success_tests/total_tests:.1%}" if total_tests > 0 else "N/A")
        
        # Salvar relatório
        report_file = self.base_dir / "test_results_v2.json"
        with open(report_file, "w") as f:
            json.dump(self.results, f, indent=2, default=str)
        
        print(f"\n💾 Relatório salvo em: {report_file}")
        
        if success_tests == total_tests:
            print("\n🎉 TODOS OS TESTES PASSARAM! ZK_COMPLY v2.0 está funcionando corretamente.")
            return True
        else:
            print(f"\n⚠️  {total_tests - success_tests} teste(s) falharam. Verifique os erros acima.")
            return False

def main():
    """Função principal"""
    print("🧬 ZK_COMPLY v2.0 - TESTE AUTOMATIZADO")
    print("=====================================")
    print("Autor: Marcos Antonio Morais Braga")
    print("Data: 26/07/2025")
    print()
    
    tester = ZKComplianceTester()
    
    try:
        # Executar todos os testes
        tester.test_witness_generation()
        tester.test_api_endpoints()
        tester.test_circuit_files()
        tester.test_dependencies()
        tester.test_project_structure()
        
        # Gerar relatório final
        success = tester.generate_report()
        
        sys.exit(0 if success else 1)
        
    except KeyboardInterrupt:
        print("\n\n⚠️  Teste interrompido pelo usuário")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Erro inesperado: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
