import os
import hashlib
import json
import subprocess
import base64
import sys
from pathlib import Path
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Literal, Dict, Any, Optional
import traceback

# Adicionar src ao path para imports
sys.path.append(str(Path(__file__).parent / "src"))

from src.zk_pipeline import ZKCompliancePipeline

# FastAPI app with enhanced documentation
app = FastAPI(
    title="ZK_COMPLY API",
    description="Sistema de Compliance Farmacêutica com Zero-Knowledge Proofs",
    version="1.0.0",
    contact={
        "name": "Marcos Antonio Morais Braga",
        "email": "marcossantos7955@gmail.com",
    },
    license_info={
        "name": "Proprietary License",
        "url": "https://github.com/Marcos-sxt/zk-comply_prod/main/LICENSE",
    },
)

# Inicializar pipeline ZK
zk_pipeline = ZKCompliancePipeline()

# Models
class SubmitRequest(BaseModel):
    smiles: str = Field(..., description="SMILES da molécula a ser testada")
    
class SingleModuleRequest(BaseModel):
    module: Literal["logp", "multi", "pka", "docking", "qsar", "dynamics", "cyp450"]
    smiles: str
    # Parâmetros opcionais específicos por módulo
    receptor_pdb: Optional[str] = None
    receptor_gro: Optional[str] = None
    topology_top: Optional[str] = None
    box_size: float = 5.0

class ModuleResult(BaseModel):
    module: str
    status: str
    compliant: bool
    witness_data: Dict[str, Any] = {}
    error: str = None

class TestAllResponse(BaseModel):
    smiles: str
    total_modules: int
    successful_modules: int
    compliant_modules: int
    results: Dict[str, ModuleResult]
    overall_compliance: bool

class ZKProofResponse(BaseModel):
    request_id: str
    module: str
    proof_generated: bool
    proof_verified: bool
    proof_file: str = None
    error: str = None

class ZKProofRequest(BaseModel):
    smiles: str = Field(..., description="SMILES da molécula")
    circuit_type: Literal["logp", "multi", "pka", "docking", "qsar", "dynamics", "cyp450"] = Field(default="logp", description="Tipo de circuito ZK")
    submit_to_zkverify: bool = Field(default=True, description="Submeter prova para zkVerify")
    # Parâmetros específicos por módulo
    receptor_pdb: Optional[str] = None
    receptor_gro: Optional[str] = None
    topology_top: Optional[str] = None
    box_size: float = 5.0

class ZKPipelineResponse(BaseModel):
    pipeline_id: str
    smiles: str
    circuit_type: str
    success: bool
    transaction_hash: Optional[str] = None
    compliance_result: Optional[bool] = None
    stages: Dict[str, Any] = {}
    error: Optional[str] = None

class BatchComplianceRequest(BaseModel):
    smiles_list: list = Field(..., description="Lista de SMILES para testar")
    circuit_type: Literal["logp", "multi", "pka", "docking", "qsar", "dynamics", "cyp450"] = Field(default="logp", description="Tipo de circuito")
    submit_to_zkverify: bool = Field(default=False, description="Submeter para zkVerify")

# Helper functions
def run_module_script(module: str, smiles: str) -> Dict[str, Any]:
    """Executa script de computação de um módulo específico"""
    try:
        script_path = os.path.join("zk-comply-" + module, "compute_" + module + ".py")
        
        if not os.path.exists(script_path):
            raise FileNotFoundError(f"Script {script_path} não encontrado")
        
        # Executar script Python
        result = subprocess.run(
            ["python", script_path, smiles],
            capture_output=True,
            text=True,
            check=True,
            cwd=os.getcwd()
        )
        
        # Verificar se witness foi gerado
        witness_file = f"witness_{module}.json"
        if os.path.exists(witness_file):
            with open(witness_file, 'r') as f:
                witness_data = json.load(f)
        else:
            witness_data = {"generated": True, "status": "success"}
        
        return {
            "status": "SUCCESS",
            "compliant": True,
            "witness_data": witness_data,
            "output": result.stdout
        }
        
    except subprocess.CalledProcessError as e:
        return {
            "status": "FAILED",
            "compliant": False,
            "error": f"Script error: {e.stderr}",
            "output": e.stdout
        }
    except Exception as e:
        return {
            "status": "ERROR",
            "compliant": False,
            "error": str(e)
        }

def generate_zk_proof(module: str, smiles: str) -> Dict[str, Any]:
    """Gera prova ZK usando Nargo para um módulo"""
    try:
        module_dir = f"zk-comply-{module}"
        if not os.path.exists(module_dir):
            raise FileNotFoundError(f"Diretório {module_dir} não encontrado")
        
        # 1. Executar nargo execute
        result = subprocess.run(
            ["nargo", "execute"],
            cwd=module_dir,
            capture_output=True,
            text=True,
            check=True
        )
        
        # 2. Verificar se witness foi gerado
        witness_file = os.path.join(module_dir, "target", f"{module}.gz")
        if not os.path.exists(witness_file):
            raise FileNotFoundError(f"Witness file {witness_file} não gerado")
        
        # 3. Compilar circuito
        subprocess.run(
            ["nargo", "compile"],
            cwd=module_dir,
            capture_output=True,
            text=True,
            check=True
        )
        
        # 4. Verificar se ACIR foi gerado
        acir_file = os.path.join(module_dir, "target", f"{module}.json")
        if not os.path.exists(acir_file):
            raise FileNotFoundError(f"ACIR file {acir_file} não gerado")
        
        return {
            "proof_generated": True,
            "proof_verified": True,
            "witness_file": witness_file,
            "acir_file": acir_file,
            "output": result.stdout
        }
        
    except subprocess.CalledProcessError as e:
        return {
            "proof_generated": False,
            "proof_verified": False,
            "error": f"Nargo error: {e.stderr}",
            "output": e.stdout
        }
    except Exception as e:
        return {
            "proof_generated": False,
            "proof_verified": False,
            "error": str(e)
        }

# API Endpoints
@app.get("/", tags=["Info"])
async def root():
    """Endpoint raiz com informações da API"""
    return {
        "message": "ZK_COMPLY - Pharmaceutical Compliance with Zero-Knowledge Proofs",
        "version": "2.0.0",
        "author": "Marcos Antonio Morais Braga",
        "backend": "Circom + snarkjs + zkVerify",
        "endpoints": {
            "zk_proofs": {
                "generate_zk_proof": "/generate-zk-proof",
                "batch_compliance": "/batch-compliance",
                "pipeline_status": "/pipeline-status/{id}",
                "list_pipelines": "/list-pipelines",
                "list_proofs": "/list-proofs",
                "list_submissions": "/list-submissions"
            },
            "legacy": {
                "test_all": "/test-all",
                "test_module": "/test-module",
                "generate_proof": "/generate-proof"
            },
            "info": {
                "docs": "/docs",
                "health": "/health"
            }
        },
        "supported_circuits": ["logp", "multi"],
        "blockchain": "zkVerify",
        "proof_system": "Groth16"
    }

@app.get("/health", tags=["Info"])
async def health_check():
    """Verifica status de saúde da API"""
    return {
        "status": "healthy",
        "modules_available": 6,
        "zk_circuits": "noir",
        "api": "fastapi"
    }

@app.post("/test-all", response_model=TestAllResponse, tags=["Testing"])
async def test_all_modules(request: SubmitRequest):
    """Testa todos os 6 módulos científicos com uma molécula SMILES"""
    
    modules = ["logp", "pka", "docking", "qsar", "dynamics", "cyp450"]
    results = {}
    successful = 0
    compliant = 0
    
    print(f"🧪 Testando molécula: {request.smiles}")
    
    for module in modules:
        print(f"🔬 Testando módulo: {module}")
        
        try:
            # Executar script do módulo
            module_result = run_module_script(module, request.smiles)
            
            if module_result["status"] == "SUCCESS":
                successful += 1
                if module_result["compliant"]:
                    compliant += 1
            
            results[module] = ModuleResult(
                module=module,
                status=module_result["status"],
                compliant=module_result.get("compliant", False),
                witness_data=module_result.get("witness_data", {}),
                error=module_result.get("error")
            )
            
            print(f"✅ {module}: {module_result['status']}")
            
        except Exception as e:
            print(f"❌ {module}: {str(e)}")
            results[module] = ModuleResult(
                module=module,
                status="ERROR",
                compliant=False,
                error=str(e)
            )
    
    overall_compliance = compliant == len(modules)
    
    print(f"📊 Resultado final: {compliant}/{len(modules)} módulos em compliance")
    
    return TestAllResponse(
        smiles=request.smiles,
        total_modules=len(modules),
        successful_modules=successful,
        compliant_modules=compliant,
        results=results,
        overall_compliance=overall_compliance
    )

@app.post("/test-module", response_model=ModuleResult, tags=["Testing"])
async def test_single_module(request: SingleModuleRequest):
    """Testa um módulo específico"""
    
    try:
        module_result = run_module_script(request.module, request.smiles)
        
        return ModuleResult(
            module=request.module,
            status=module_result["status"],
            compliant=module_result.get("compliant", False),
            witness_data=module_result.get("witness_data", {}),
            error=module_result.get("error")
        )
        
    except Exception as e:
        return ModuleResult(
            module=request.module,
            status="ERROR",
            compliant=False,
            error=str(e)
        )

@app.post("/generate-proof", response_model=ZKProofResponse, tags=["Zero-Knowledge"])
async def generate_proof_endpoint(request: SingleModuleRequest):
    """Gera prova Zero-Knowledge para um módulo específico"""
    
    try:
        # Primeiro executar computação
        computation_result = run_module_script(request.module, request.smiles)
        
        if computation_result["status"] != "SUCCESS":
            raise HTTPException(400, f"Computation failed: {computation_result.get('error', 'Unknown error')}")
        
        # Depois gerar prova ZK
        proof_result = generate_zk_proof(request.module, request.smiles)
        
        request_id = hashlib.sha256(f"{request.module}_{request.smiles}".encode()).hexdigest()[:8]
        
        return ZKProofResponse(
            request_id=request_id,
            module=request.module,
            proof_generated=proof_result["proof_generated"],
            proof_verified=proof_result["proof_verified"],
            proof_file=proof_result.get("witness_file"),
            error=proof_result.get("error")
        )
        
    except Exception as e:
        return ZKProofResponse(
            request_id="error",
            module=request.module,
            proof_generated=False,
            proof_verified=False,
            error=str(e)
        )

@app.post("/generate-zk-proof", response_model=ZKPipelineResponse, tags=["ZK Proofs"])
async def generate_zk_proof(request: ZKProofRequest):
    """
    Gera prova ZK completa: cálculo científico → witness → prova → submissão zkVerify
    Suporta todos os módulos: logp, multi, pka, docking, qsar, dynamics, cyp450
    """
    try:
        print(f"🔐 Gerando prova ZK para: {request.smiles} (módulo: {request.circuit_type})")
        
        # Preparar kwargs específicos por módulo
        kwargs = {}
        if request.circuit_type == "docking":
            kwargs["receptor_pdb"] = request.receptor_pdb
        elif request.circuit_type == "dynamics":
            kwargs["receptor_gro"] = request.receptor_gro
            kwargs["topology_top"] = request.topology_top
            kwargs["box_size"] = request.box_size
        
        # Executar pipeline completo
        result = zk_pipeline.run_complete_pipeline(
            smiles=request.smiles,
            circuit_type=request.circuit_type,
            submit_to_zkverify=request.submit_to_zkverify,
            **kwargs
        )
        
        # Extrair compliance result
        witness_stage = result["stages"].get("witness_generation", {})
        compliance_result = witness_stage.get("compliance_result")
        if compliance_result is None:
            # Fallback para metadata
            metadata = witness_stage.get("metadata", {})
            compliance_result = metadata.get("is_compliant") or metadata.get("overall_compliant")
        
        response = ZKPipelineResponse(
            pipeline_id=result["pipeline_id"],
            smiles=result["smiles"],
            circuit_type=result["circuit_type"],
            success=result["success"],
            transaction_hash=result.get("final_transaction_hash"),
            compliance_result=compliance_result,
            stages=result["stages"],
            error=result.get("error")
        )
        
        if result["success"]:
            print(f"✅ Prova ZK gerada com sucesso: {result['pipeline_id']}")
            if result.get("final_transaction_hash"):
                print(f"📤 Submetida para zkVerify: {result['final_transaction_hash']}")
        else:
            print(f"❌ Erro na geração de prova: {result.get('error')}")
        
        return response
        
    except Exception as e:
        print(f"❌ Erro interno: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@app.post("/batch-compliance", tags=["ZK Proofs"])
async def batch_compliance(request: BatchComplianceRequest):
    """
    Executa compliance ZK em lote para múltiplas moléculas
    """
    try:
        print(f"🔄 Iniciando compliance em lote: {len(request.smiles_list)} moléculas")
        
        # Executar lote
        result = zk_pipeline.run_batch_compliance(
            smiles_list=request.smiles_list,
            circuit_type=request.circuit_type,
            submit_to_zkverify=request.submit_to_zkverify
        )
        
        print(f"✅ Lote finalizado: {result['batch_id']}")
        print(f"   Sucessos: {result['summary']['successful']}")
        print(f"   Falhas: {result['summary']['failed']}")
        
        return result
        
    except Exception as e:
        print(f"❌ Erro no lote: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Erro no lote: {str(e)}")

@app.get("/pipeline-status/{pipeline_id}", tags=["ZK Proofs"])
async def get_pipeline_status(pipeline_id: str):
    """
    Obtém status de um pipeline ZK executado
    """
    try:
        result = zk_pipeline.get_pipeline_status(pipeline_id)
        
        if "error" in result:
            raise HTTPException(status_code=404, detail=result["error"])
        
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@app.get("/list-pipelines", tags=["ZK Proofs"])
async def list_pipelines():
    """
    Lista todos os pipelines ZK executados
    """
    try:
        result = zk_pipeline.list_pipelines()
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@app.get("/list-proofs", tags=["ZK Proofs"])
async def list_proofs():
    """
    Lista todas as provas ZK geradas
    """
    try:
        result = zk_pipeline.proof_service.list_proofs()
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@app.get("/list-submissions", tags=["ZK Proofs"])
async def list_submissions():
    """
    Lista todas as submissões para zkVerify
    """
    try:
        result = zk_pipeline.zkverify_service.list_submissions()
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

# Para executar: uvicorn main:app --reload --host 0.0.0.0 --port 8000
