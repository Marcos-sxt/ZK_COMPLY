# ZK_COMPLY v2.0 - Documentação Técnica

## Visão Geral

ZK_COMPLY é um sistema de provas zero-knowledge para compliance farmacêutica baseado em Circom/Groth16/snarkjs/zkVerify. O sistema permite validar propriedades ADMET (Absorption, Distribution, Metabolism, Excretion, Toxicity) de moléculas de forma privada e verificável.

## Arquitetura

### Stack Tecnológico
- **Circuitos ZK:** Circom
- **Sistema de Provas:** Groth16 (via snarkjs)
- **Blockchain:** zkVerify (Polkadot)
- **Computação Científica:** Python + RDKit + APIs especializadas
- **Witness Generation:** Python custom

### Módulos Científicos (ADMET)

#### 1. Absorption
- **LogP:** Coeficiente de partição (RDKit)
- **Multi:** Regra de Lipinski completa (MW, LogP, HBA, HBD)

#### 2. Distribution  
- **pKa:** Constante de acidez (MolGpKa API + RDKit fallback)
- **Docking:** Afinidade molecular (AutoDock Vina + fallback)

#### 3. Metabolism
- **CYP450:** Interação enzimática (ML models + heurísticas)

#### 4. Excretion
- **Dynamics:** Simulação molecular (GROMACS + fallback)

#### 5. Toxicity
- **QSAR:** Predição de toxicidade (ML models + substructure analysis)

## Componentes Principais

### 1. Witness Generator (`src/witness_generator.py`)
Converte cálculos científicos Python em witness JSON para circuitos Circom.

**Características:**
- 7 módulos científicos implementados
- Fallbacks robustos para todas as dependências externas
- Escalamento automático para inteiros (circuitos)
- Validação de compliance integrada

### 2. ZK Pipeline (`src/zk_pipeline.py`)
Pipeline completo de geração de provas ZK.

**Fluxo:**
1. Geração de witness
2. Compilação do circuito Circom
3. Geração de prova Groth16
4. Verificação local
5. Submissão para zkVerify

### 3. API Principal (`main.py`)
API REST para acesso aos módulos científicos.

**Endpoints:**
- `/compute/{module}` - Computação individual de módulos
- `/pipeline` - Pipeline completo com prova ZK
- `/verify` - Verificação de provas

### 4. Circuitos Circom (`circuits/`)
- `simple_compliance.circom` - Circuito principal de compliance
- `compliance_circuit.circom` - Versão extendida
- Trusted setup e chaves de verificação

## Configuração e Uso

### Pré-requisitos
```bash
# Dependências Python
pip install -r requirements.txt

# Node.js dependencies (snarkjs, zkverifyjs)
npm install

# Ferramentas externas (opcionais)
# - AutoDock Vina (docking)
# - GROMACS (dynamics)
```

### Execução

#### Geração de Witness Individual
```bash
python src/witness_generator.py "CC(=O)OC" logp
python src/witness_generator.py "CC(=O)OC" multi
python src/witness_generator.py "CC(=O)OC" pka
```

#### Pipeline Completo
```bash
python src/zk_pipeline.py --smiles "CC(=O)OC" --module logp
```

#### API REST
```bash
python main.py
curl -X POST "http://localhost:8000/compute/logp" \
     -H "Content-Type: application/json" \
     -d '{"smiles": "CC(=O)OC"}'
```

## Estrutura de Arquivos

```
ZK_COMPLY/
├── src/
│   ├── witness_generator.py    # Gerador de witness científico
│   ├── zk_pipeline.py         # Pipeline ZK completo
│   └── ...
├── circuits/                  # Circuitos Circom
├── proofs/                   # Exemplos e resultados
│   ├── examples/             # Exemplos por módulo
│   └── archive/             # Histórico de testes
├── pipeline_results/        # Resultados de pipeline
├── docs/                   # Documentação
├── MolGpKa/               # API pKa externa
├── powers_of_tau/         # Trusted setup
└── node_modules/          # Dependencies JS
```

## Integração zkVerify

### Configuração
- Rede: zkVerify Testnet/Mainnet
- Algoritmo: Groth16
- Submissão: zkverifyjs SDK

### Fluxo de Submissão
1. Geração de prova local
2. Formatação para zkVerify
3. Submissão on-chain
4. Verificação de transação
5. Tracking de status

## Testes

### Testes Unitários
```bash
# Teste de todos os módulos
python src/witness_generator.py "CCO" logp
python src/witness_generator.py "CCO" multi
python src/witness_generator.py "CCO" pka
python src/witness_generator.py "CCO" docking
python src/witness_generator.py "CCO" qsar
python src/witness_generator.py "CCO" dynamics
python src/witness_generator.py "CCO" cyp450
```

### Testes de Integração
```bash
# Pipeline completo
python src/zk_pipeline.py --smiles "CCO" --module logp --submit
```

## Robustez e Fallbacks

Todos os módulos implementam fallbacks para garantir funcionamento mesmo sem dependências externas:

- **MolGpKa API** → RDKit heurísticas
- **AutoDock Vina** → Descritores moleculares
- **GROMACS** → Estimativas baseadas em propriedades
- **ML Models** → Análise de subestruturas

## Troubleshooting

### Problemas Comuns
1. **Erro de SMILES inválido:** Verificar estrutura química
2. **Timeout em APIs:** Fallbacks automáticos ativados
3. **Erro no circuito:** Verificar witness data scaling
4. **Falha zkVerify:** Verificar conectividade e formato

### Logs e Debug
- Witness metadata salvo automaticamente
- Logs detalhados em cada etapa
- Validação de compliance integrada

## Roadmap v2.1

- [ ] Módulos ADMET adicionais
- [ ] Interface web
- [ ] Otimização de circuitos
- [ ] Integração mainnet
- [ ] Certificação de compliance
