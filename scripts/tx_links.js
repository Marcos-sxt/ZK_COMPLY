/**
 * zkVerify Transaction Links Generator
 * Autor: Marcos Antonio Morais Braga
 * Data: 25/07/2025
 * 
 * Gera links diretos para verificar transações no explorer
 */

console.log('🔗 LINKS PARA VERIFICAÇÃO DAS TRANSAÇÕES');
console.log('=========================================');

const walletAddress = '5CfyQWJdZtCNoHJAWkBRSyJF7UPUfNXH4dEpTZSeB83Nnye6';

console.log('\n📱 SUA WALLET:');
console.log(`Endereço: ${walletAddress}`);
console.log(`🔗 Explorer: https://volta.subscan.io/account/${walletAddress}`);

console.log('\n🌐 EXPLORADORES zkVerify Volta:');
console.log('🔗 Principal: https://volta.subscan.io/');
console.log('🔗 Alternativo: https://testnet.zkverify.io/');

console.log('\n📋 INSTRUÇÕES:');
console.log('1. Acesse qualquer um dos links do explorer');
console.log('2. Cole o endereço da wallet na busca se necessário');
console.log('3. Procure por transações recentes (últimos 30 minutos)');
console.log('4. Transações zkVerify aparecem como "poe" ou "zkVerify"');

console.log('\n⏰ HORÁRIO DA SUBMISSÃO:');
console.log('Data: 25/07/2025');
console.log('Hora: ~20:49 UTC (17:49 local)');
console.log('Módulo: LogP (etanol - CCO)');

console.log('\n🎯 O QUE PROCURAR:');
console.log('- Transações do tipo "poe.submitProof"');
console.log('- Valor gasto: ~2450 $tVFY');
console.log('- Status: Success ✅');

module.exports = { walletAddress };
