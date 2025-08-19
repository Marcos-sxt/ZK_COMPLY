/**
 * zkVerify Talisman Test - TESTE SEGURO
 * Autor: Marcos Antonio Morais Braga
 * Data: 25/07/2025
 * 
 * Teste seguro da integração Talisman (SEM GASTAR TOKENS)
 * Objetivo: Validar seed phrase e conexão antes da submissão real
 */

const { zkVerifySession } = require('zkverifyjs');
const { cryptoWaitReady } = require('@polkadot/util-crypto');

async function testTalismanSafely() {
    console.log('🧪 TESTE SEGURO DA INTEGRAÇÃO TALISMAN');
    console.log('======================================');
    
    try {
        // 1. Verificar configuração
        const seedPhrase = process.env.TALISMAN_SEED_PHRASE;
        
        if (!seedPhrase) {
            console.log(`
❌ SEED PHRASE DA TALISMAN NECESSÁRIA!

Para testar sua wallet Talisman:

1. 🔑 Exporte sua seed phrase da Talisman (12 palavras)
2. 🚀 Execute: export TALISMAN_SEED_PHRASE="palavra1 palavra2 ... palavra12"
3. 🧪 Execute o teste: node scripts/test_talisman.js

⚠️  ESTE É UM TESTE SEGURO - NÃO GASTARÁ TOKENS!
`);
            return false;
        }
        
        // 2. Inicializar WASM
        console.log('⚡ Inicializando WASM...');
        await cryptoWaitReady();
        console.log('✅ WASM inicializado!');
        
        // 3. Testar seed phrase
        console.log('\n🔑 Testando seed phrase...');
        console.log('Seed phrase:', seedPhrase.substring(0, 20) + '...');
        
        // Validar seed phrase usando Polkadot
        const { mnemonicValidate } = require('@polkadot/util-crypto');
        const isValid = mnemonicValidate(seedPhrase);
        
        if (!isValid) {
            throw new Error('Seed phrase inválida!');
        }
        
        console.log('✅ Seed phrase válida!');
        
        // 4. Testar conexão zkVerify com account
        console.log('\n🔌 Testando conexão zkVerify com sua wallet...');
        
        const session = await zkVerifySession.start().Volta().withAccount(seedPhrase);
        
        console.log('✅ Conexão estabelecida com sua Talisman!');
        
        // 5. Mostrar informações da conta
        if (session.account) {
            console.log('\n📱 Informações da sua wallet:');
            console.log('Endereço:', session.account.address);
            console.log('Tipo:', session.account.type || 'sr25519');
        }
        
        // 6. Testar métodos disponíveis
        console.log('\n🛠️  Métodos zkVerify disponíveis:');
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(session))
            .filter(name => typeof session[name] === 'function');
        
        methods.forEach(method => {
            console.log(`   - ${method}`);
        });
        
        // 7. Verificar se podemos acessar a API
        if (session.api) {
            console.log('\n🌐 Testando acesso à rede...');
            const chainInfo = await session.api.rpc.system.chain();
            const blockNumber = await session.api.rpc.chain.getHeader();
            
            console.log('Chain:', chainInfo.toString());
            console.log('Último bloco:', blockNumber.number.toNumber());
        }
        
        console.log('\n🎉 TESTE CONCLUÍDO COM SUCESSO!');
        console.log('✅ Sua Talisman está pronta para submissões reais!');
        console.log('\n📋 Próximos passos:');
        console.log('1. 💰 Certifique-se de ter tokens $tVFY suficientes');
        console.log('2. 🚀 Execute: node scripts/talisman_integration.js');
        console.log('3. 🎯 Aguarde a submissão real na blockchain!');
        
        return true;
        
    } catch (error) {
        console.error('❌ Erro no teste:', error.message);
        console.error('\n🔧 Possíveis soluções:');
        console.error('- Verifique se a seed phrase está correta');
        console.error('- Certifique-se de ter conexão com a internet');
        console.error('- Tente novamente em alguns minutos');
        
        return false;
    }
}

// Executar teste
if (require.main === module) {
    testTalismanSafely()
        .then(success => {
            if (success) {
                console.log('\n🎯 TESTE APROVADO!');
                process.exit(0);
            } else {
                console.log('\n❌ TESTE FALHOU!');
                process.exit(1);
            }
        })
        .catch(error => {
            console.error('💥 Erro crítico:', error);
            process.exit(1);
        });
}

module.exports = { testTalismanSafely };
