pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/comparators.circom";

/**
 * Circuito Simples de Compliance - LogP Check
 * Verifica se LogP de uma molécula está dentro do limite (Lipinski's Rule)
 * 
 * Autor: Marcos Antonio Morais Braga
 * Data: 25/07/2025
 */

template SimpleLogPCompliance() {
    // Inputs (witness) - valores da molécula
    signal input logp_value;        // LogP * 1000 (ex: 2.34 -> 2340)
    signal input molecule_hash;     // Hash da molécula para tracking
    
    // Inputs públicos (limites regulatórios)
    signal input logp_threshold;    // 5000 (5.0 * 1000) - Lipinski limit
    
    // Outputs públicos
    signal output is_compliant;     // 1 se LogP <= threshold, 0 se não
    signal output molecule_id;      // Hash público da molécula
    
    // Componente de verificação LogP
    component logp_check = LessEqThan(32);
    
    // Verificação: LogP <= 5.0 (Lipinski's Rule)
    logp_check.in[0] <== logp_value;
    logp_check.in[1] <== logp_threshold;
    
    // Output compliance result
    is_compliant <== logp_check.out;
    
    // Output molecule tracking hash
    molecule_id <== molecule_hash;
}

component main = SimpleLogPCompliance();
