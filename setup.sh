#!/bin/bash

echo "🚀 ZK_COMPLY - Setup Script"
echo "================================"

# Verificar se o Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 não encontrado. Por favor, instale Python 3.8+"
    exit 1
fi

# Verificar se o Nargo está instalado
if ! command -v nargo &> /dev/null; then
    echo "❌ Nargo não encontrado. Instalando..."
    curl -L https://raw.githubusercontent.com/noir-lang/noirup/main/install | bash
    source ~/.bashrc
    noirup
fi

echo "✅ Verificações de dependências concluídas"

# Instalar dependências Python
echo "📦 Instalando dependências Python..."
pip install -r requirements.txt

# Configurar cada módulo Noir
modules=("logp" "pka" "docking" "qsar" "dynamics" "cyp450")

for module in "${modules[@]}"; do
    echo "🔧 Configurando módulo $module..."
    cd "zk-comply-$module"
    
    # Verificar se o Nargo.toml existe
    if [ ! -f "Nargo.toml" ]; then
        echo "⚠️  Nargo.toml não encontrado em zk-comply-$module"
        cd ..
        continue
    fi
    
    # Executar comandos Noir
    nargo check
    if [ $? -eq 0 ]; then
        echo "✅ $module: Sintaxe verificada"
    else
        echo "❌ $module: Erro de sintaxe"
    fi
    
    cd ..
done

echo ""
echo "🎉 Setup completo!"
echo ""
echo "Para testar o sistema:"
echo "1. Execute a API: python main.py"
echo "2. Execute os testes: python test_api.py"
echo ""
echo "Para mais informações, consulte o README.md"
