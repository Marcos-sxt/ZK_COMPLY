/**
 * Script de Submissão Real para zkVerify
 * Baseado na API correta do zkverifyjs v0.16.1
 * 
 * Autor: Marcos Antonio Morais Braga
 * Data: 25/07/2025
 */

const { zkVerifySession } = require('zkverifyjs');
const { cryptoWaitReady } = require('@polkadot/util-crypto');
const fs = require('fs');

async function submitProofToZkVerify(proofFile, publicFile, vkeyFile) {
    console.log('🚀 SUBMETENDO PROVA PARA zkVerify');
    console.log('==================================');
    
    try {
        await cryptoWaitReady();
        
        // Seed phrase padrão para testes
        const seedPhrase = process.env.ZKVERIFY_SEED || "pole coach remind ocean argue turn announce eye age orchard food lazy";
        
        console.log('⚡ Conectando com zkVerify testnet...');
        
        // Conectar com zkVerify usando a API correta
        const session = await zkVerifySession.start().Volta().withAccount(seedPhrase);
        
        console.log('✅ Conectado com sucesso!');
        console.log('📱 Wallet:', session.address);
        
        // Carregar arquivos da prova
        console.log('\n📁 Carregando arquivos da prova...');
        
        if (!fs.existsSync(proofFile)) {
            throw new Error(`Arquivo de prova não encontrado: ${proofFile}`);
        }
        if (!fs.existsSync(publicFile)) {
            throw new Error(`Arquivo público não encontrado: ${publicFile}`);
        }
        if (!fs.existsSync(vkeyFile)) {
            throw new Error(`Arquivo vkey não encontrado: ${vkeyFile}`);
        }
        
        const proof = JSON.parse(fs.readFileSync(proofFile, 'utf8'));
        const publicInputs = JSON.parse(fs.readFileSync(publicFile, 'utf8'));
        const vkey = JSON.parse(fs.readFileSync(vkeyFile, 'utf8'));
        
        console.log('✅ Arquivos carregados com sucesso');
        console.log(`📊 Public inputs: ${JSON.stringify(publicInputs)}`);
        
        // Submeter prova usando a API direta do Polkadot
        console.log('\n🔐 Submetendo prova Groth16...');
        
        // Primeiro, registrar a verification key se necessário
        console.log('📝 Registrando verification key...');
        
        const vkCall = session.api.tx.settlementGroth16Pallet.registerVk(vkey);
        const vkTxHash = await vkCall.signAndSend(session.keyPair, { nonce: -1 });
        
        console.log(`🔑 VK registration TX: ${vkTxHash.toHex()}`);
        
        // Aguardar um pouco para processamento
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // Submeter a prova
        console.log('📤 Submetendo prova...');
        
        const proofCall = session.api.tx.settlementGroth16Pallet.submitProof(
            vkey,
            proof,
            publicInputs
        );
        
        const proofTxHash = await proofCall.signAndSend(session.keyPair, { nonce: -1 });
        
        console.log(`🎉 PROVA SUBMETIDA COM SUCESSO!`);
        console.log(`🔑 Transaction Hash: ${proofTxHash.toHex()}`);
        console.log(`🔗 Explorer: https://zkverify-testnet.subscan.io/extrinsic/${proofTxHash.toHex()}`);
        
        // Aguardar finalização
        console.log('\n⏳ Aguardando finalização...');
        
        return {
            success: true,
            vkTxHash: vkTxHash.toHex(),
            proofTxHash: proofTxHash.toHex(),
            explorerUrl: `https://zkverify-testnet.subscan.io/extrinsic/${proofTxHash.toHex()}`
        };
        
    } catch (error) {
        console.error('❌ Erro na submissão:', error.message);
        console.error('Stack:', error.stack);
        
        return {
            success: false,
            error: error.message
        };
    }
}

// Função principal
async function main() {
    if (process.argv.length !== 5) {
        console.log('Uso: node submit_to_zkverify.js <proof.json> <public.json> <vkey.json>');
        process.exit(1);
    }
    
    const [, , proofFile, publicFile, vkeyFile] = process.argv;
    
    const result = await submitProofToZkVerify(proofFile, publicFile, vkeyFile);
    
    if (result.success) {
        console.log('\n🎉 SUBMISSÃO FINALIZADA COM SUCESSO!');
        console.log(`📋 VK TX: ${result.vkTxHash}`);
        console.log(`📋 Proof TX: ${result.proofTxHash}`);
        console.log(`🔗 Link: ${result.explorerUrl}`);
    } else {
        console.log('\n❌ FALHA NA SUBMISSÃO');
        console.log(`💥 Erro: ${result.error}`);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { submitProofToZkVerify };
