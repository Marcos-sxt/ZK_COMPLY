/**
 * Teste básico da conexão zkVerify
 * Autor: Marcos Antonio Morais Braga
 * Data: 25/07/2025
 */

const { zkVerifySession } = require('zkverifyjs');
const { cryptoWaitReady } = require('@polkadot/util-crypto');

async function testBasicConnection() {
    console.log('🧪 TESTE BÁSICO: Conectando com zkVerify');
    console.log('========================================');
    
    try {
        // 1. Inicializar WASM
        console.log('⚡ Inicializando WASM...');
        await cryptoWaitReady();
        console.log('✅ WASM pronto!');
        
        // 2. Conectar em modo read-only
        console.log('🔌 Conectando com zkVerify Volta (read-only)...');
        const session = await zkVerifySession.start().Volta().readOnly();
        console.log('✅ Conexão estabelecida!');
        
        // 3. Verificar sessão
        console.log('\n📊 Informações da sessão:');
        console.log('Tipo:', session.constructor.name);
        console.log('Tem API?', !!session.api);
        
        if (session.api) {
            console.log('API pronta:', !!session.api.isReady);
            
            // 4. Testar uma consulta básica
            console.log('\n🔍 Testando consulta básica...');
            const lastHeader = await session.api.rpc.chain.getHeader();
            console.log('✅ Último bloco:', lastHeader.number.toNumber());
            
            // 5. Verificar propriedades da chain
            const chainName = await session.api.rpc.system.chain();
            const version = await session.api.rpc.system.version();
            console.log('✅ Chain:', chainName.toString());
            console.log('✅ Versão:', version.toString());
        }
        
        console.log('\n🎉 TESTE CONCLUÍDO COM SUCESSO!');
        return true;
        
    } catch (error) {
        console.error('❌ ERRO NO TESTE:', error.message);
        console.error('Stack:', error.stack);
        return false;
    }
}

// Executar teste
if (require.main === module) {
    testBasicConnection()
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('💥 Erro fatal:', error);
            process.exit(1);
        });
}

module.exports = { testBasicConnection };
