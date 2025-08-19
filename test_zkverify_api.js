/**
 * Teste da API zkVerifyJS corrigida
 * Autor: Marcos Antonio Morais Braga  
 * Data: 25/07/2025
 */

const { zkVerifySession, Library, CurveType } = require('zkverifyjs');

async function testCorrectAPI() {
    try {
        console.log('🔍 Testando API zkVerifyJS corrigida...');
        
        // 1. Conectar em modo read-only para testar
        const session = await zkVerifySession.start().Volta().readOnly();
        console.log('✅ Sessão criada com sucesso');
        
        // 2. Verificar se métodos existem
        console.log('🔧 Verificando métodos:');
        console.log('  verify():', typeof session.verify);
        console.log('  batchVerify():', typeof session.batchVerify);
        console.log('  registerVerificationKey():', typeof session.registerVerificationKey);
        
        // 3. Testar builder de verificação
        if (session.verify) {
            console.log('🏗️ Testando builder verify()...');
            const verifyBuilder = session.verify();
            console.log('  Builder criado:', typeof verifyBuilder);
            
            // 4. Testar builder groth16
            const groth16Builder = verifyBuilder.groth16({
                library: Library.snarkjs,
                curve: CurveType.bn128
            });
            console.log('  Groth16 builder:', typeof groth16Builder);
            console.log('  Execute method:', typeof groth16Builder.execute);
        }
        
        // 5. Verificar enums
        console.log('📋 Enums disponíveis:');
        console.log('  Library.snarkjs:', Library.snarkjs);
        console.log('  CurveType.bn128:', CurveType.bn128);
        
        await session.close();
        console.log('🎉 Teste da API concluído com sucesso!');
        
    } catch (error) {
        console.error('❌ Erro no teste:', error.message);
        console.error('Stack:', error.stack);
    }
}

testCorrectAPI();
