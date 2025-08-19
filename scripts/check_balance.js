/**
 * zkVerify Balance Check - VERIFICAÇÃO DE SALDO
 * Autor: Marcos Antonio Morais Braga
 * Data: 25/07/2025
 * 
 * Verifica saldo $tVFY na wallet Talisman (SEM GASTAR)
 */

const { zkVerifySession } = require('zkverifyjs');
const { cryptoWaitReady } = require('@polkadot/util-crypto');

async function checkTalismanBalance() {
    console.log('💰 VERIFICAÇÃO DE SALDO TALISMAN');
    console.log('================================');
    
    try {
        const seedPhrase = process.env.TALISMAN_SEED_PHRASE;
        
        if (!seedPhrase) {
            console.log('❌ Configure primeiro: export TALISMAN_SEED_PHRASE="sua seed phrase"');
            return false;
        }
        
        // Inicializar
        await cryptoWaitReady();
        console.log('⚡ Conectando com zkVerify...');
        
        const session = await zkVerifySession.start().Volta().withAccount(seedPhrase);
        
        // Extrair endereço da sessão corretamente
        let address;
        if (session.account && session.account.address) {
            address = session.account.address;
        } else {
            // Fallback: usar Keyring para extrair endereço da seed phrase
            const { Keyring } = require('@polkadot/keyring');
            const { cryptoWaitReady } = require('@polkadot/util-crypto');
            await cryptoWaitReady();
            
            const keyring = new Keyring({ type: 'sr25519' });
            const keyPair = keyring.addFromMnemonic(seedPhrase);
            address = keyPair.address;
        }
        
        console.log('📱 Endereço da Talisman:', address);
        
        if (session.api) {
            console.log('\n💎 Verificando saldo...');
            
            const accountInfo = await session.api.query.system.account(address);
            const balance = accountInfo.data;
            
            // Mostrar em diferentes formatos
            console.log('Raw balance:', balance.free.toString());
            
            // Tentar converter para tokens
            const freeBalance = balance.free.toBn();
            const reservedBalance = balance.reserved.toBn();
            
            console.log('Free balance (Wei):', freeBalance.toString());
            console.log('Reserved balance (Wei):', reservedBalance.toString());
            
            // Estimar se tem saldo suficiente
            const hasBalance = !freeBalance.isZero();
            
            if (hasBalance) {
                console.log('✅ SUA TALISMAN TEM TOKENS $tVFY!');
                console.log('🚀 Pronta para submissões reais!');
            } else {
                console.log('⚠️  Saldo zero detectado');
                console.log('🚰 Obtenha tokens via: https://faucet.zkverify.io');
                console.log('📱 Seu endereço:', address);
            }
            
        } else {
            console.log('⚠️  API não disponível para verificação de saldo');
        }
        
        return true;
        
    } catch (error) {
        console.error('❌ Erro:', error.message);
        return false;
    }
}

if (require.main === module) {
    checkTalismanBalance()
        .then(() => process.exit(0))
        .catch(error => {
            console.error('💥 Erro:', error);
            process.exit(1);
        });
}

module.exports = { checkTalismanBalance };
