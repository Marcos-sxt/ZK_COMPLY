/**
 * zkVerify Connection Test - TALISMAN READY
 * Autor: Marcos Antonio Morais Braga
 * Data: 25/07/2025
 * 
 * TESTE DE CONECTIVIDADE SEM GASTAR TOKENS
 * Objetivo: Validar se tudo está funcionando antes da submissão real
 */

const { zkVerifySession } = require('zkverifyjs');
const fs = require('fs');
const path = require('path');
const { cryptoWaitReady } = require('@polkadot/util-crypto');

// Configuração do projeto
const PROJECT_ROOT = '/home/user/Documents/ZK_COMPLY';
const MODULES = ['logp', 'pka', 'docking', 'qsar', 'dynamics', 'cyp450'];

class ZKVerifyConnectionTest {
    constructor() {
        this.session = null;
    }

    async testConnection() {
        console.log('🧪 TESTE DE CONECTIVIDADE zkVerify');
        console.log('==================================');
        
        try {
            // 1. Inicializar WASM
            console.log('⚡ Inicializando WASM do Polkadot...');
            await cryptoWaitReady();
            console.log('✅ WASM inicializado!');
            
            // 2. Conectar em modo read-only
            console.log('🔌 Conectando com zkVerify Volta (read-only)...');
            this.session = await zkVerifySession.start().Volta().readOnly();
            console.log('✅ Conexão estabelecida!');
            
            // 3. Investigar estrutura da sessão
            console.log('\n🔍 INVESTIGANDO ESTRUTURA DA SESSÃO:');
            console.log('Tipo:', typeof this.session);
            console.log('Constructor:', this.session.constructor.name);
            console.log('Propriedades:', Object.getOwnPropertyNames(this.session));
            console.log('Métodos do protótipo:', Object.getOwnPropertyNames(Object.getPrototypeOf(this.session)));
            
            // 4. Testar acesso à API (se disponível)
            if (this.session.api) {
                console.log('\n📡 TESTANDO API DA BLOCKCHAIN:');
                
                try {
                    const header = await this.session.api.rpc.chain.getHeader();
                    console.log('✅ Último bloco:', header.number.toNumber());
                    
                    const chainName = await this.session.api.rpc.system.chain();
                    console.log('✅ Chain:', chainName.toString());
                    
                } catch (apiError) {
                    console.log('⚠️  Erro na API:', apiError.message);
                }
            } else {
                console.log('⚠️  API não diretamente acessível');
            }
            
            // 5. Verificar arquivos de prova
            console.log('\n📄 VERIFICANDO ARQUIVOS DE PROVA:');
            
            let allFilesReady = true;
            
            for (const module of MODULES) {
                const proofPath = path.join(PROJECT_ROOT, `zk-comply-${module}`, 'proof', 'proof');
                const vkPath = path.join(PROJECT_ROOT, `zk-comply-${module}`, 'vk', 'vk');
                
                const proofExists = fs.existsSync(proofPath);
                const vkExists = fs.existsSync(vkPath);
                
                if (proofExists && vkExists) {
                    const proofSize = fs.statSync(proofPath).size;
                    const vkSize = fs.statSync(vkPath).size;
                    console.log(`✅ ${module}: prova=${proofSize}B, vk=${vkSize}B`);
                } else {
                    console.log(`❌ ${module}: arquivos faltando`);
                    allFilesReady = false;
                }
            }
            
            // 6. Resumo da validação
            console.log('\n📊 RESUMO DO TESTE:');
            console.log('===================');
            console.log(`✅ Conexão zkVerify: FUNCIONANDO`);
            console.log(`✅ Arquivos de prova: ${allFilesReady ? 'TODOS PRONTOS' : 'ALGUNS FALTANDO'}`);
            console.log(`✅ Módulos disponíveis: ${MODULES.length}`);
            
            if (allFilesReady) {
                console.log('\n🎉 SISTEMA 100% PRONTO PARA SUBMISSÃO REAL!');
                console.log('📋 Próximo passo: configurar Talisman e executar:');
                console.log('   ./scripts/setup_talisman.sh');
            } else {
                console.log('\n⚠️  Gerar provas faltando primeiro');
            }
            
            return {
                success: true,
                connection: 'WORKING',
                filesReady: allFilesReady,
                readyForSubmission: allFilesReady
            };
            
        } catch (error) {
            console.error('❌ ERRO no teste:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// Executar teste
async function runConnectionTest() {
    const test = new ZKVerifyConnectionTest();
    
    try {
        const result = await test.testConnection();
        
        console.log('\n🎯 RESULTADO FINAL:');
        console.log(JSON.stringify(result, null, 2));
        
        if (result.success && result.readyForSubmission) {
            console.log('\n🚀 PRONTO PARA PRODUÇÃO!');
            console.log('Use: ./scripts/setup_talisman.sh para configurar sua wallet');
        }
        
    } catch (error) {
        console.error('💥 Erro no teste:', error);
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    runConnectionTest()
        .then(() => process.exit(0))
        .catch(error => {
            console.error('💥 Erro fatal:', error);
            process.exit(1);
        });
}

module.exports = { ZKVerifyConnectionTest, runConnectionTest };
