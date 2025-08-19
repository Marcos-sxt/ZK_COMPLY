#!/bin/bash

# ZK_COMPLY v2.0 Setup Script
echo "🧬 ZK_COMPLY v2.0 - Setup Completo"
echo "=================================="

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para log
log_info() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar Python 3.13+
echo "🐍 Verificando Python..."
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version | cut -d' ' -f2)
    log_info "Python encontrado: $PYTHON_VERSION"
else
    log_error "Python3 não encontrado. Instale Python 3.13+ primeiro."
    exit 1
fi

# Verificar Node.js
echo "📟 Verificando Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    log_info "Node.js encontrado: $NODE_VERSION"
else
    log_warn "Node.js não encontrado. Algumas funcionalidades podem não funcionar."
fi

# Verificar npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    log_info "npm encontrado: $NPM_VERSION"
else
    log_warn "npm não encontrado."
fi

# Criar diretórios necessários
echo "📁 Criando estrutura de diretórios..."
mkdir -p proofs/examples/{logp,multi,pka,docking,qsar,dynamics,cyp450,pipeline}
mkdir -p proofs/archive/historical_tests
mkdir -p pipeline_results
mkdir -p data/receptors
mkdir -p docs/{technical,legacy,examples}
log_info "Estrutura de diretórios criada"

# Instalar dependências Python
echo "📦 Instalando dependências Python..."
if pip install -r requirements.txt; then
    log_info "Dependências Python instaladas"
else
    log_error "Falha ao instalar dependências Python"
    exit 1
fi

# Instalar dependências Node.js (se disponível)
if command -v npm &> /dev/null; then
    echo "📦 Instalando dependências Node.js..."
    if npm install; then
        log_info "Dependências Node.js instaladas"
    else
        log_warn "Falha ao instalar dependências Node.js"
    fi
fi

# Verificar RDKit
echo "🧪 Verificando RDKit..."
if python3 -c "from rdkit import Chem" 2>/dev/null; then
    log_info "RDKit disponível"
else
    log_warn "RDKit não encontrado. Instalando..."
    if pip install rdkit; then
        log_info "RDKit instalado"
    else
        log_error "Falha ao instalar RDKit"
    fi
fi

# Verificar circuitos Circom
echo "⚡ Verificando circuitos Circom..."
if [ -f "circuits/simple_compliance.circom" ]; then
    log_info "Circuitos Circom encontrados"
else
    log_warn "Circuitos Circom não encontrados"
fi

# Executar teste rápido
echo "🧪 Executando teste rápido..."
if python3 -c "
import sys
sys.path.append('src')
from witness_generator import WitnessGenerator
generator = WitnessGenerator()
result = generator.generate_logp_witness('CCO')
assert 'witness' in result
assert 'metadata' in result
print('Teste básico passou!')
" 2>/dev/null; then
    log_info "Teste básico passou"
else
    log_warn "Teste básico falhou - pode haver problemas de configuração"
fi

# Fazer scripts executáveis
chmod +x test_automated_v2.py

# Sumário final
echo ""
echo "🎉 SETUP CONCLUÍDO!"
echo "=================="
echo "Próximos passos:"
echo "1. Executar testes: python test_automated_v2.py"
echo "2. Iniciar API: python main.py"
echo "3. Testar módulo: python src/witness_generator.py 'CCO' logp"
echo "4. Pipeline completo: python src/zk_pipeline.py --smiles 'CCO' --module logp"
echo ""
echo "📚 Documentação: docs/technical_overview.md"
echo "🔬 Exemplos: proofs/examples/"
echo ""

log_info "ZK_COMPLY v2.0 pronto para uso!"
