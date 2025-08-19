pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/comparators.circom";

/**
 * Circuito de Compliance Farmacêutica
 * Verifica se uma molécula atende aos critérios de Lipinski's Rule of Five
 * 
 * Autor: Marcos Antonio Morais Braga
 * Data: 25/07/2025
 */

template PharmacomplaceCheck() {
    // Inputs privados (witness) - valores reais da molécula
    signal input logp_value;        // LogP * 1000 (ex: 2.34 -> 2340)
    signal input molecular_weight;  // Peso molecular
    signal input hbd_count;         // Hydrogen Bond Donors
    signal input hba_count;         // Hydrogen Bond Acceptors
    signal input molecule_hash;     // Hash da molécula para tracking
    
    // Inputs públicos (limites regulatórios)
    signal input logp_threshold;        // 5000 (5.0 * 1000) - Lipinski limit
    signal input mw_threshold;          // 500000 (500 Da * 1000) 
    signal input hbd_threshold;         // 5 - max H-bond donors
    signal input hba_threshold;         // 10 - max H-bond acceptors
    
    // Outputs públicos
    signal output is_compliant;         // 1 se compliant, 0 se não
    signal output molecule_id;          // Hash público da molécula
    
    // Componentes de verificação
    component logp_check = LessEqThan(32);
    component mw_check = LessEqThan(32);
    component hbd_check = LessEqThan(32);
    component hba_check = LessEqThan(32);
    
    // Verificação LogP <= 5.0
    logp_check.in[0] <== logp_value;
    logp_check.in[1] <== logp_threshold;
    
    // Verificação Molecular Weight <= 500 Da
    mw_check.in[0] <== molecular_weight;
    mw_check.in[1] <== mw_threshold;
    
    // Verificação H-bond donors <= 5
    hbd_check.in[0] <== hbd_count;
    hbd_check.in[1] <== hbd_threshold;
    
    // Verificação H-bond acceptors <= 10
    hba_check.in[0] <== hba_count;
    hba_check.in[1] <== hba_threshold;
    
    // Compliance = TODAS as verificações devem passar
    // Se qualquer uma falhar, is_compliant = 0
    is_compliant <== logp_check.out * mw_check.out * hbd_check.out * hba_check.out;
    
    // Output do hash da molécula para tracking
    molecule_id <== molecule_hash;
}

component main = PharmacomplaceCheck();
