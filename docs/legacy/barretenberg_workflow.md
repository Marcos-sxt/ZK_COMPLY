# 📚 Barretenberg Workflow - ZK_COMPLY

**Autor:** Marcos Antonio Morais Braga  
**Data:** 25/07/2025  
**Versão:** 1.0  

---

## 🎯 Resumo

Este documento descreve o workflow completo para geração e verificação de provas zero-knowledge usando Barretenberg no projeto ZK_COMPLY.

---

## 📋 Pré-requisitos

### Dependências Instaladas:
- **Nargo v1.0.0-beta.8** (compilador Noir)
- **Barretenberg v0.87.0** (proving backend)
- **Node.js** (para instalação via npm)

### Instalação:
```bash
# Instalar bbup (gerenciador do Barretenberg)
npm install -g bbup

# Instalar Barretenberg
bbup

# Adicionar ao PATH (temporário)
export PATH="$PATH:/home/user/.bb"

# Para tornar permanente, adicionar ao ~/.bashrc:
echo 'export PATH="$PATH:/home/user/.bb"' >> ~/.bashrc
```

---

## 🔄 Workflow End-to-End

### 1. Estrutura do Módulo
Cada módulo ZK segue a estrutura:
```
zk-comply-{module}/
├── Nargo.toml          # Configuração do projeto Noir
├── Prover.toml         # Inputs para teste/desenvolvimento
├── src/
│   └── main.nr         # Circuito Noir
└── target/             # Arquivos compilados (gerados)
```

### 2. Compilação do Circuito
```bash
cd zk-comply-{module}
nargo compile
```

**Output esperado:**
```
warning: unused variable smiles_hash
   ┌─ src/main.nr:16:5
   │
16 │     smiles_hash: Field,
   │     ----------- unused variable
```

**Arquivos gerados:**
- `target/{module}.json` - Circuito compilado
- `target/{module}.gz` - Witness data

### 3. Geração de Prova
```bash
bb prove -b ./target/{module}.json -w ./target/{module}.gz -o ./proof
```

**Output esperado:**
```
Scheme is: ultra_honk, num threads: 8
Public inputs saved to "./proof/public_inputs"
Proof saved to "./proof/proof"
```

**Arquivos gerados:**
- `proof/proof` - Prova ZK (~16KB)
- `proof/public_inputs` - Inputs públicos

### 4. Geração da Verification Key
```bash
bb write_vk -b ./target/{module}.json -o ./vk
```

**Output esperado:**
```
Scheme is: ultra_honk, num threads: 8
VK saved to "./vk/vk"
```

**Arquivos gerados:**
- `vk/vk` - Verification key (~4KB)

### 5. Verificação da Prova
```bash
bb verify -k ./vk/vk -p ./proof/proof -i ./proof/public_inputs
```

**Output esperado:**
```
Scheme is: ultra_honk, num threads: 8
Proof verified successfully
```

---

## 📊 Exemplo Prático - Módulo logP

### Circuito (src/main.nr):
```noir
fn main(
    smiles_hash: Field,
    min_logP: i32,
    max_logP: i32,
    min_sol: i32,
    logP: i32,
    sol: i32
) {
    // Verificações de compliance
    assert(logP >= min_logP);
    assert(logP <= max_logP);
    assert(sol  >= min_sol);
}
```

### Inputs de Teste (Prover.toml):
```toml
smiles_hash = "12345678901234567890123456789012"
min_logP = -1000    # Público: threshold mínimo
max_logP = 5000     # Público: threshold máximo  
min_sol = 1000      # Público: solubilidade mínima
logP = -1          # Privado: valor real
sol = 3087         # Privado: solubilidade real
```

### Comando Completo:
```bash
cd /home/user/Documents/ZK_COMPLY/zk-comply-logp

# 1. Compilar
nargo compile

# 2. Gerar prova
bb prove -b ./target/zk_comply_logp.json -w ./target/zk_comply_logp.gz -o ./proof

# 3. Gerar VK
bb write_vk -b ./target/zk_comply_logp.json -o ./vk

# 4. Verificar
bb verify -k ./vk/vk -p ./proof/proof -i ./proof/public_inputs
```

---

## 🛠️ Script Automatizado

Criamos `test_barretenberg.sh` que executa todo o workflow:
```bash
./test_barretenberg.sh
```

**Saída:**
```
🚀 ZK_COMPLY - Teste de Geração de Provas Barretenberg
=====================================================
📋 Verificando dependências...
- Nargo: nargo version = 1.0.0-beta.8
- Barretenberg: 0.87.0

🧪 Testando módulo zk-comply-logp...
1. Compilando circuito Noir...
2. Gerando prova ZK...
3. Gerando verification key...
4. Verificando prova...

✅ Teste do módulo logP: SUCESSO!
📊 Arquivos gerados:
   - Prova: ./proof/proof (16K)
   - VK: ./vk/vk (4.0K)
   - Public inputs: ./proof/public_inputs

🎉 Workflow Barretenberg validado com sucesso!
```

---

## 🔧 Parâmetros Técnicos

### Performance:
- **Esquema:** ultra_honk  
- **Threads:** 8 (padrão do sistema)
- **Tempo de compilação:** < 1 segundo
- **Tempo de prova:** < 2 segundos
- **Tempo de verificação:** < 1 segundo

### Tamanhos de Arquivo:
- **Circuito compilado:** ~1-2KB
- **Prova gerada:** ~16KB
- **Verification key:** ~4KB
- **Public inputs:** Variável (poucos bytes)

### Esquemas Suportados:
- **ultra_honk** (padrão, mais eficiente)
- **ultra_plonk** (alternativa)

---

## 🚨 Troubleshooting

### Erro: "Command 'bb' not found"
**Solução:**
```bash
export PATH="$PATH:/home/user/.bb"
```

### Erro: "Unable to open file"
**Causa:** Arquivo não encontrado ou path incorreto
**Solução:** Verificar se `nargo compile` foi executado

### Warning: "unused variable"
**Causa:** Variável declarada mas não usada no circuito
**Impacto:** Não afeta funcionamento, apenas warning

### Performance Lenta
**Soluções:**
- Verificar número de threads disponíveis
- Otimizar circuito Noir (menos operações)
- Usar SSD para I/O mais rápido

---

## 🔮 Próximos Passos

1. **ZKVerifyService** ✅ - Bridge Python → zkVerifyJS (em andamento)
2. **BarretenbergService** - Wrapper Python para automação  
3. **Integração API** - Endpoints para pipeline completo
4. **Dashboard** - Interface de monitoramento blockchain
5. **Produção** - Deploy e otimização para escala

### 🎯 **OBJETIVO IMEDIATO:**
**Primeira aplicação farmacêutica na zkVerify blockchain!**

---

## 📦 **Nova Arquitetura com zkVerify**

```
Módulo Científico (Python)
    ↓
Circuito Noir (compile)
    ↓  
Prova ZK (Barretenberg)
    ↓
Submissão Blockchain (zkVerifyJS)
    ↓
Certificado Permanente (zkVerify)
```

---

## 📞 Suporte

**Documentação oficial:**
- [Aztec Docs](https://docs.aztec.network/)
- [Noir Language](https://noir-lang.org/)
- [Barretenberg GitHub](https://github.com/AztecProtocol/barretenberg)

**Contato:**
- **Autor:** Marcos Antonio Morais Braga
- **Email:** marcos.sxt@gmail.com
- **GitHub:** https://github.com/Marcos-sxt

---

## 🌐 **NOVO: Integração zkVerify Blockchain**

### 6. Submissão para zkVerify (NOVO)
```bash
# Preparar dados da prova para blockchain
node scripts/submit_proof_to_zkverify.js \
  --proof ./proof/proof \
  --vk ./vk/vk \
  --module logp \
  --smiles "CCO"
```

**Output esperado:**
```
🚀 Submetendo prova para zkVerify...
Transaction hash: 0x1234567890abcdef...
Proof ID: proof_logp_1234567890
Status: CONFIRMED
Explorer: https://testnet.zkverify.io/tx/0x1234...
```

**Arquivos utilizados:**
- `proof/proof` - Prova ZK (16KB)
- `vk/vk` - Verification key (4KB)  
- `proof/public_inputs` - Inputs públicos

### 7. Certificado de Compliance (NOVO)
Uma vez na blockchain, o certificado é permanente e verificável:
```
🎯 CERTIFICADO BLOCKCHAIN GERADO!
- Molécula: CCO (etanol)
- Módulo: logP
- Prova ZK: ✅ Verificada
- Blockchain: ✅ Confirmada
- URL: https://testnet.zkverify.io/compliance/proof_logp_1234567890
```

---

## 🚀 **Pipeline Completo End-to-End (NOVO)**

### Workflow Automatizado:
```bash
# 1. Calcular propriedades científicas
python compute_logp.py --smiles "CCO"

# 2. Compilar circuito Noir  
nargo compile

# 3. Gerar prova ZK
bb prove -b ./target/zk_comply_logp.json -w ./target/zk_comply_logp.gz -o ./proof

# 4. Submeter para zkVerify blockchain
node scripts/submit_proof_to_zkverify.js --proof ./proof/proof --vk ./vk/vk

# 5. Certificado de compliance gerado! 🎯
```

### API Endpoint Completo:
```python
POST /api/v1/submit-full-compliance
{
  "smiles": "CCO",
  "thresholds": {
    "min_logP": -2.0,
    "max_logP": 5.0,
    "min_sol": 1.0
  }
}

# Response:
{
  "smiles": "CCO",
  "scientific_calculations": {...},
  "zk_proof": {
    "generated": true,
    "size": "16KB",
    "verification": "PASSED"
  },
  "blockchain_submission": {
    "tx_hash": "0x1234567890abcdef...",
    "proof_id": "proof_logp_1234567890",
    "status": "CONFIRMED",
    "explorer_url": "https://testnet.zkverify.io/tx/0x1234..."
  },
  "compliance_certified": true,
  "certificate_url": "https://testnet.zkverify.io/compliance/proof_logp_1234567890"
}
```

### Dependências Adicionais:
- **zkVerifyJS v0.16.1** ✅ (instalada)
- **Node.js bridge** (scripts/)
- **zkVerify testnet** acesso
