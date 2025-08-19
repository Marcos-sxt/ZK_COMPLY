/**
 * Quick TX Hash Finder
 * Busca rápida por transações ZK recentes
 */

const { zkVerifySession } = require('zkverifyjs');
const { cryptoWaitReady } = require('@polkadot/util-crypto');

async function quickHashSearch() {
    console.log('🔍 BUSCA RÁPIDA DE TX HASHES');
    console.log('===========================');
    
    try {
        // Use environment variable for seed phrase (if needed for specific operations)
        const seedPhrase = process.env.ZKVERIFY_SEED_PHRASE;
        
        await cryptoWaitReady();
        console.log('⚡ Conectando...');
        
        const session = await zkVerifySession.start().Volta().readOnly();
        
        // Seu endereço conhecido
        const address = "5CfyQWJdZtCNoHJAWkBRSyJF7UPUfNXH4dEpTZSeB83Nnye6";
        console.log('📱 Buscando transações de:', address);
        
        if (session.api) {
            const latestBlock = await session.api.rpc.chain.getHeader();
            const currentBlockNumber = latestBlock.number.toNumber();
            
            console.log('📡 Bloco atual:', currentBlockNumber);
            console.log('🔍 Verificando últimos 20 blocos...\n');
            
            // Verificar apenas os últimos 20 blocos para acelerar
            for (let i = 0; i < 20; i++) {
                const blockNumber = currentBlockNumber - i;
                
                try {
                    const blockHash = await session.api.rpc.chain.getBlockHash(blockNumber);
                    const block = await session.api.rpc.chain.getBlock(blockHash);
                    
                    // Verificar extrinsics diretamente
                    block.block.extrinsics.forEach((ext, index) => {
                        if (ext.signer && ext.signer.toString() === address) {
                            const txHash = ext.hash.toHex();
                            console.log(`🎯 TRANSAÇÃO ENCONTRADA!`);
                            console.log(`📦 Bloco: ${blockNumber}`);
                            console.log(`🔑 Hash: ${txHash}`);
                            console.log(`🔗 Link: https://zkverify-testnet.subscan.io/extrinsic/${txHash}`);
                            console.log(`📊 Método: ${ext.method.section}.${ext.method.method}`);
                            console.log('---');
                        }
                    });
                    
                } catch (error) {
                    // Ignorar erros silenciosamente
                }
            }
            
            console.log('\n✅ Busca concluída!');
            
        } else {
            console.log('❌ API não disponível');
        }
        
    } catch (error) {
        console.error('❌ Erro:', error.message);
    }
}

quickHashSearch()
    .then(() => process.exit(0))
    .catch(error => {
        console.error('💥 Erro:', error);
        process.exit(1);
    });
