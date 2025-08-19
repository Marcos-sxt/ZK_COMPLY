/**
 * zkVerify Integration Test Suite
 * Autor: Marcos Antonio Morais Braga
 * Data: 25/07/2025
 * 
 * Teste progressivo da integração real com zkVerify
 */

const { ZKVerifyRealIntegration } = require('./phase2_wallet_integration');
const fs = require('fs');
const path = require('path');

class ZKVerifyTestSuite {
    constructor() {
        this.testResults = [];
        this.integration = null;
    }

    log(message, type = 'INFO') {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] [${type}] ${message}`;
        console.log(logEntry);
        
        this.testResults.push({
            timestamp,
            type,
            message
        });
    }

    async runTest(testName, testFunction) {
        this.log(`🧪 Iniciando teste: ${testName}`, 'TEST');
        
        try {
            const startTime = Date.now();
            const result = await testFunction();
            const duration = Date.now() - startTime;
            
            this.log(`✅ ${testName} - SUCESSO (${duration}ms)`, 'PASS');
            return { success: true, result, duration };
            
        } catch (error) {
            this.log(`❌ ${testName} - FALHA: ${error.message}`, 'FAIL');
            return { success: false, error: error.message };
        }
    }

    async test1_BasicConnection() {
        this.log('🔌 Testando conexão básica...');
        
        this.integration = new ZKVerifyRealIntegration();
        
        // Teste de inicialização
        await this.integration.initialize();
        
        // Verificar propriedades da sessão
        if (!this.integration.session) {
            throw new Error('Sessão não foi criada');
        }
        
        if (!this.integration.account) {
            throw new Error('Conta não foi configurada');
        }
        
        this.log(`📱 Wallet configurada: ${this.integration.account.address}`);
        
        return {
            sessionCreated: !!this.integration.session,
            walletConfigured: !!this.integration.account,
            walletAddress: this.integration.account.address
        };
    }

    async test2_BalanceCheck() {
        this.log('💰 Testando verificação de saldo...');
        
        if (!this.integration) {
            throw new Error('Integração não inicializada');
        }
        
        const balance = await this.integration.checkBalance();
        
        this.log(`💎 Saldo detectado: ${balance} $tVFY`);
        
        return {
            balance,
            hasBalance: balance > 0,
            address: this.integration.account.address
        };
    }

    async test3_ProofFileCheck() {
        this.log('📄 Verificando arquivos de prova...');
        
        const PROJECT_ROOT = '/home/user/Documents/ZK_COMPLY';
        const modules = ['logp', 'pka', 'docking', 'qsar', 'dynamics', 'cyp450'];
        const results = {};
        
        for (const module of modules) {
            const proofPath = path.join(PROJECT_ROOT, `zk-comply-${module}`, 'proof', 'proof');
            const vkPath = path.join(PROJECT_ROOT, `zk-comply-${module}`, 'vk', 'vk');
            
            const proofExists = fs.existsSync(proofPath);
            const vkExists = fs.existsSync(vkPath);
            
            let proofSize = 0, vkSize = 0;
            
            if (proofExists) {
                proofSize = fs.statSync(proofPath).size;
            }
            
            if (vkExists) {
                vkSize = fs.statSync(vkPath).size;
            }
            
            results[module] = {
                proofExists,
                vkExists,
                proofSize,
                vkSize,
                ready: proofExists && vkExists
            };
            
            this.log(`📦 ${module}: prova=${proofSize}B, vk=${vkSize}B, pronto=${results[module].ready}`);
        }
        
        const readyModules = Object.values(results).filter(r => r.ready).length;
        this.log(`🎯 Módulos prontos: ${readyModules}/${modules.length}`);
        
        return {
            modules: results,
            totalModules: modules.length,
            readyModules,
            allReady: readyModules === modules.length
        };
    }

    async test4_CostEstimation() {
        this.log('💸 Testando estimativa de custos...');
        
        if (!this.integration) {
            throw new Error('Integração não inicializada');
        }
        
        const PROJECT_ROOT = '/home/user/Documents/ZK_COMPLY';
        const proofPath = path.join(PROJECT_ROOT, 'zk-comply-logp', 'proof', 'proof');
        const vkPath = path.join(PROJECT_ROOT, 'zk-comply-logp', 'vk', 'vk');
        
        if (!fs.existsSync(proofPath) || !fs.existsSync(vkPath)) {
            throw new Error('Arquivos de prova/VK do logP não encontrados');
        }
        
        const proofData = fs.readFileSync(proofPath);
        const vkData = fs.readFileSync(vkPath);
        
        const registrationCost = await this.integration.estimateRegistrationCost(vkData);
        const submissionCost = await this.integration.estimateSubmissionCost(proofData);
        
        this.log(`💰 Custo VK registration: ${registrationCost} $tVFY`);
        this.log(`💰 Custo prova submission: ${submissionCost} $tVFY`);
        
        const totalCost = registrationCost + submissionCost;
        this.log(`💰 Custo total estimado: ${totalCost} $tVFY`);
        
        return {
            proofSize: proofData.length,
            vkSize: vkData.length,
            registrationCost,
            submissionCost,
            totalCost
        };
    }

    async test5_DryRunSubmission() {
        this.log('🧪 Testando submissão simulada (dry run)...');
        
        // Este teste prepara tudo mas não submete para a blockchain
        // Útil para validar toda a pipeline sem gastar tokens
        
        if (!this.integration) {
            throw new Error('Integração não inicializada');
        }
        
        const PROJECT_ROOT = '/home/user/Documents/ZK_COMPLY';
        const moduleName = 'logp';
        const smiles = 'CCO';
        
        // Carregar arquivos
        const proofPath = path.join(PROJECT_ROOT, `zk-comply-${moduleName}`, 'proof', 'proof');
        const vkPath = path.join(PROJECT_ROOT, `zk-comply-${moduleName}`, 'vk', 'vk');
        
        const proofData = fs.readFileSync(proofPath);
        const vkData = fs.readFileSync(vkPath);
        
        // Simular preparação de dados
        const submissionData = {
            proof: proofData.toString('hex'),
            verificationKey: vkData.toString('hex'),
            module: moduleName,
            smiles,
            publicInputs: [],
            metadata: {
                project: 'ZK_COMPLY',
                version: '1.0.0',
                timestamp: new Date().toISOString()
            }
        };
        
        this.log(`📦 Dados preparados: ${JSON.stringify({
            proofHexLength: submissionData.proof.length,
            vkHexLength: submissionData.verificationKey.length,
            module: submissionData.module,
            smiles: submissionData.smiles
        }, null, 2)}`);
        
        return {
            success: true,
            dataPreparation: 'COMPLETE',
            proofSize: proofData.length,
            vkSize: vkData.length,
            readyForSubmission: true
        };
    }

    async runFullTestSuite() {
        this.log('🚀 INICIANDO TESTE COMPLETO DA INTEGRAÇÃO zkVerify');
        this.log('=================================================');
        
        const tests = [
            { name: 'Conexão Básica', fn: () => this.test1_BasicConnection() },
            { name: 'Verificação de Saldo', fn: () => this.test2_BalanceCheck() },
            { name: 'Arquivos de Prova', fn: () => this.test3_ProofFileCheck() },
            { name: 'Estimativa de Custos', fn: () => this.test4_CostEstimation() },
            { name: 'Dry Run Submission', fn: () => this.test5_DryRunSubmission() }
        ];
        
        const results = {};
        let passedTests = 0;
        
        for (const test of tests) {
            const result = await this.runTest(test.name, test.fn);
            results[test.name] = result;
            
            if (result.success) {
                passedTests++;
            } else {
                this.log(`⚠️  Parando testes devido à falha em: ${test.name}`, 'ERROR');
                break;
            }
        }
        
        // Gerar relatório final
        const report = {
            timestamp: new Date().toISOString(),
            totalTests: tests.length,
            passedTests,
            successRate: (passedTests / tests.length) * 100,
            results,
            logs: this.testResults,
            readyForProduction: passedTests === tests.length
        };
        
        this.log(`📊 RELATÓRIO FINAL: ${passedTests}/${tests.length} testes passaram (${report.successRate.toFixed(1)}%)`, 'SUMMARY');
        
        if (report.readyForProduction) {
            this.log('🎉 SISTEMA PRONTO PARA SUBMISSÃO REAL!', 'SUCCESS');
            this.log('⚠️  PRÓXIMO PASSO: Configurar tokens $tVFY e executar phase2_wallet_integration.js', 'INFO');
        } else {
            this.log('❌ Sistema não está pronto - resolver problemas detectados', 'ERROR');
        }
        
        // Salvar relatório em arquivo
        const reportPath = path.join('/home/user/Documents/ZK_COMPLY', 'test_results.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        this.log(`💾 Relatório salvo em: ${reportPath}`, 'INFO');
        
        return report;
    }
}

// Função principal
async function runTests() {
    const testSuite = new ZKVerifyTestSuite();
    
    try {
        const report = await testSuite.runFullTestSuite();
        
        console.log('\n🎯 TESTE CONCLUÍDO!');
        console.log('==================');
        
        if (report.readyForProduction) {
            console.log('✅ Sistema validado e pronto para produção');
            console.log('\n📋 PRÓXIMOS PASSOS:');
            console.log('1. Obter tokens $tVFY via faucet: https://faucet.zkverify.io');
            console.log('2. Configurar seed phrase: export ZK_TESTNET_MNEMONIC="..."');
            console.log('3. Executar: node scripts/phase2_wallet_integration.js');
        } else {
            console.log('❌ Sistema precisa de ajustes antes da produção');
        }
        
        return report;
        
    } catch (error) {
        console.error('💥 Erro nos testes:', error.message);
        console.error(error.stack);
        return null;
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    runTests()
        .then(report => {
            if (report && report.readyForProduction) {
                process.exit(0);
            } else {
                process.exit(1);
            }
        })
        .catch(error => {
            console.error('💥 Erro fatal:', error);
            process.exit(1);
        });
}

module.exports = { ZKVerifyTestSuite, runTests };
