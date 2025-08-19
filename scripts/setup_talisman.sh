#!/bin/bash

# Script de configuração para integração Talisman + zkVerify
# Autor: Marcos Antonio Morais Braga
# Data: 25/07/2025

echo "🦎 CONFIGURAÇÃO TALISMAN + zkVerify"
echo "===================================="
echo ""
echo "Para usar sua wallet Talisman com tokens \$tVFY reais:"
echo ""
echo "1. 🔐 Exporte sua seed phrase da Talisman:"
echo "   export TALISMAN_SEED_PHRASE=\"palavra1 palavra2 palavra3 ... palavra12\""
echo ""
echo "2. 🚀 Execute a integração real:"
echo "   node scripts/phase2_talisman_integration.js"
echo ""
echo "3. 🎯 Ou execute tudo de uma vez (exemplo):"
echo "   export TALISMAN_SEED_PHRASE=\"sua seed phrase aqui\" && node scripts/phase2_talisman_integration.js"
echo ""
echo "⚠️  ATENÇÃO SEGURANÇA:"
echo "   - Nunca compartilhe sua seed phrase"
echo "   - Use apenas em ambiente seguro"
echo "   - Considere usar wallet de teste para desenvolvimento"
echo ""
echo "📊 O que será executado:"
echo "   ✅ Conexão real com zkVerify testnet Volta"
echo "   ✅ Verificação de saldo \$tVFY na sua Talisman"
echo "   ✅ Registro de 6 verification keys (logp, pka, docking, qsar, dynamics, cyp450)"
echo "   ✅ Submissão de 6 provas zero-knowledge reais"
echo "   ✅ Monitoramento de transações on-chain"
echo "   ✅ Certificação de compliance farmacêutica"
echo ""
echo "💰 Custo estimado: ~2450 \$tVFY por módulo (total ~14.700 \$tVFY)"
echo ""

# Verificar se já tem tokens configurados
if [ ! -z "$TALISMAN_SEED_PHRASE" ]; then
    echo "✅ Seed phrase detectada! Executando integração..."
    node scripts/phase2_talisman_integration.js
else
    echo "⚠️  Configure sua seed phrase para continuar"
fi
