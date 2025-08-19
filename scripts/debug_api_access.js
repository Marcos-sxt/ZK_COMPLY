/**
 * Debug API Access - Understanding zkVerify API structure
 */

const { zkVerifySession } = require('zkverifyjs');

async function debugAPIAccess() {
    console.log('🔍 DEBUG: Investigando estrutura da API zkVerify');
    
    try {
        const session = await zkVerifySession.start().Volta();
        console.log('✅ Sessão criada');
        
        console.log('\n📊 Propriedades da sessão:');
        console.log('Keys:', Object.keys(session));
        console.log('Type:', typeof session);
        
        console.log('\n🔍 Investigando startSession:');
        if (session.startSession) {
            console.log('startSession type:', typeof session.startSession);
            console.log('startSession keys:', Object.keys(session.startSession));
        }
        
        console.log('\n⚙️ Investigando options:');
        if (session.options) {
            console.log('options:', session.options);
        }
        
        console.log('\n🔍 Tentando diferentes formas de acessar a API...');
        
        // Tentar acessar via startSession
        if (session.startSession && session.startSession.api) {
            console.log('✅ API encontrada em session.startSession.api');
            console.log('API keys:', Object.keys(session.startSession.api));
        }
        
        // Tentar métodos do protocolo Substrate/Polkadot
        try {
            const api = session.startSession || session;
            if (api.query) {
                console.log('✅ Query encontrado!');
            }
            if (api.rpc) {
                console.log('✅ RPC encontrado!');
            }
        } catch (e) {
            console.log('❌ Erro ao tentar acessar query/rpc:', e.message);
        }
        
        return session;
        
    } catch (error) {
        console.error('❌ Erro:', error.message);
        throw error;
    }
}

debugAPIAccess()
    .then(() => console.log('✅ Debug concluído'))
    .catch(error => console.error('💥 Falha:', error));
