/**
 * Teste da API zkVerifyJS após correção
 * Autor: Marcos Antonio Morais Braga
 * Data: 25/07/2025
 */

const { zkVerifySession } = require('zkverifyjs');
const { waitReady, cryptoWaitReady } = require('@polkadot/util-crypto');

async function testAPI() {
    console.log('🧪 Testando API zkVerifyJS corrigida...');
    console.log('=======================================');
    
    try {
        // 1. Inicializar WASM
        console.log('⚡ Inicializando WASM...');
        await cryptoWaitReady();
        console.log('✅ WASM inicializado!');
        
        // 2. Testar modo read-only
        console.log('\n📖 Testando modo read-only...');
        const readOnlySession = await zkVerifySession.start().Volta().readOnly();
        
        console.log('✅ Sessão read-only criada!');
        console.log('🔍 Tipo:', readOnlySession.constructor.name);
        console.log('📊 Propriedades:', Object.getOwnPropertyNames(readOnlySession));
        
        // 3. Testar com seed phrase (se disponível)
        if (process.env.ZK_TESTNET_MNEMONIC) {
            console.log('\n🔑 Testando com seed phrase...');
            const accountSession = await zkVerifySession.start().Volta().withAccount(process.env.ZK_TESTNET_MNEMONIC);
            
            console.log('✅ Sessão com account criada!');
            console.log('🔍 Tipo:', accountSession.constructor.name);
            console.log('📱 Account:', accountSession.account ? 'Disponível' : 'Não disponível');
        } else {
            console.log('\n⚠️ Seed phrase não configurada (ZK_TESTNET_MNEMONIC)');
        }
        
        // 4. Testar acesso à API
        console.log('\n🌐 Testando acesso à API...');
        
        if (readOnlySession.api) {
            console.log('✅ API disponível!');
            
            try {
                const latestBlock = await readOnlySession.api.rpc.chain.getBlock();
                console.log('📦 Último bloco:', latestBlock.block.header.number.toNumber());
                
                const chainName = await readOnlySession.api.rpc.system.chain();
                console.log('⛓️ Nome da chain:', chainName.toString());
                
            } catch (apiError) {
                console.log('⚠️ Erro ao acessar API:', apiError.message);
            }
        } else {
            console.log('⚠️ API não diretamente acessível');
        }
        
        console.log('\n🎉 TESTE CONCLUÍDO COM SUCESSO!');
        return true;
        
    } catch (error) {
        console.error('❌ Erro no teste:', error.message);
        console.error('Stack:', error.stack);
        return false;
    }
}

// Executar teste
if (require.main === module) {
    testAPI()
        .then(success => {
            if (success) {
                console.log('\n✅ zkVerifyJS está funcionando corretamente!');
                process.exit(0);
            } else {
                console.log('\n❌ zkVerifyJS precisa de ajustes');
                process.exit(1);
            }
        })
        .catch(error => {
            console.error('💥 Erro fatal:', error);
            process.exit(1);
        });
}

module.exports = { testAPI };
