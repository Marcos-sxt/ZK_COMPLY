/**
 * Debug zkVerifyJS - Conexão REAL
 * Verificando importação e estrutura da biblioteca
 */

console.log('🔍 Debugando zkVerifyJS...');

try {
    // Verificar diferentes formas de importação
    console.log('📦 Testando importação...');
    
    const zkVerify = require('zkverifyjs');
    console.log('✅ zkverifyjs importado');
    console.log('🔧 Tipo:', typeof zkVerify);
    console.log('🔧 Chaves:', Object.keys(zkVerify));
    
    // Verificar se zkVerifySession existe
    if (zkVerify.zkVerifySession) {
        console.log('✅ zkVerifySession encontrado');
        console.log('🔧 Tipo zkVerifySession:', typeof zkVerify.zkVerifySession);
        
        // Testar inicialização
        console.log('\n🚀 Testando inicialização...');
        const sessionBuilder = zkVerify.zkVerifySession.start();
        console.log('✅ Session builder criado:', typeof sessionBuilder);
        
        // Verificar métodos disponíveis
        console.log('🔧 Métodos do builder:', Object.getOwnPropertyNames(sessionBuilder));
        
    } else {
        console.log('❌ zkVerifySession NÃO encontrado');
        console.log('🔧 Métodos disponíveis:', Object.getOwnPropertyNames(zkVerify));
    }
    
} catch (error) {
    console.error('❌ Erro na importação:', error.message);
    console.error('🔧 Stack:', error.stack);
}
