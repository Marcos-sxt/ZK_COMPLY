# Plano de Pipeline ZK para Testes P&D Farmacêutico/Químico

## 1. Definição da bateria de módulos P&D

Vamos adotar um conjunto padrão de testes usados em P&D farmacêutico/químico, cada um com seus inputs e outputs:

| Módulo                    | Ferramenta/Algoritmo             | Input                    | Objetivo Técnico                                                                 | Output (witness)                     | Parâmetro de sucesso típico                  |
|---------------------------|----------------------------------|--------------------------|----------------------------------------------------------------------------------|---------------------------------------|----------------------------------------------|
| 1. Docking Molecular      | AutoDock Vina                    | SMILES → receptor pdb    | Avaliar a afinidade e a pose de ligação entre ligante e receptor                 | Energia de ligação (kcal/mol)         | ≤ –7.0 kcal/mol                             |
| 2. Log P / Solubilidade   | RDKit (Crippen) / ESOL           | SMILES                   | Estimar lipofilicidade (log P) e solubilidade aquosa para prever ADME básico      | log P (–) / solubilidade (mg/L)       | –1 ≤ log P ≤ +5;<br>solubilidade ≥ 1 mg/L    |
| 3. pKa Prediction         | RDKit pKa plugin / Open Babel    | SMILES                   | Determinar pontos de ionização para entender especiação química em diferentes pH  | Valor de pKa                          | 2 ≤ pKa ≤ 12                                |
| 4. QSAR Reatividade/Tox   | Scikit-learn / ProTox-II API     | SMILES                   | Prever toxicidade e reatividade usando modelos estatísticos de relação estrutura  | Score de toxicidade (0–1)             | ≤ 0.5                                       |
| 5. Dinâmica Molecular     | GROMACS (curto)                  | topologia gerada         | Avaliar estabilidade conformacional e flutuações estruturais em simulação breve   | RMSD médio / energia potencial (kJ/mol)| RMSD ≤ 2 Å;<br>energia ≤ threshold           |
| 6. Metabolização CYP450   | ADMETlab / pkCSM                 | SMILES                   | Prever probabilidade de metabolização por enzimas CYP450 para estimar clearance   | Probabilidade de metabolização (0–1)  | ≥ 0.2                                       |


Você pode afinar esses thresholds depois, mas já nos dá o *witness shape* que cada módulo vai gerar.

---

## 2. Arquitetura de circuito ZK

### Circuito por módulo

- **Inputs públicos:**
    - Commitment ao SMILES (hash SHA-256)
    - Parâmetros de threshold (p.ex. –7.0 para docking)

- **Witness privado:**
    - Resultado bruto do teste (binding score, log P, pKa, etc.)

- **Constraint:**
    - `witness ≤ threshold` ou `threshold_min ≤ witness ≤ threshold_max`

- **Output público:** booleano `pass_module_i`

### Circuito agregador

- Recebe todos os `pass_module_i`
- Verifica que todos são verdadeiros
- Emite um único booleano `pass_all`

### Toolchain

- Noir para escrever cada sub-circuito (ex.: `docking.nr`, `logp.nr`, …)
- Compilar em WASM + proving key (Groth16 ou PlonK)
- Script de build:
    ```sh
    noir compile docking.nr --backend groth16
    noir setup docking
    noir prove docking private_witness.json proof.dock
    noir verify docking public_inputs.json proof.dock
    ```
- Repetir para cada módulo e no final chamar o agregador.

---

## 3. Orquestração end-to-end

```mermaid
flowchart LR
  A[1. Submissão SMILES] --> B[2. Pré-processamento]
  B --> C{3. Rodar testes}
  C --> C1[Docking (Vina)]
  C --> C2[LogP / Solubility]
  C --> C3[pKa Prediction]
  C --> C4[QSAR Toxicity]
  C --> C5[Molecular Dynamics]
  C --> C6[CYP450]
  C1 --> D
  C2 --> D
  C3 --> D
  C4 --> D
  C5 --> D
  C6 --> D
  D[4. Witness Aggregation] --> E[5. Prova ZK (Noir)]
  E --> F[6. Verificação da Prova]
  F --> G[7. Resultado “pass_all” → Dashboard / Relatório]
```

### Tech stack sugerido

- **Orquestração:** Python + Celery (ou FastAPI sync em prova de conceito)
- **Testes pesados:** containers Docker com GPU (para docking/dynamics)
- **Circuits build & prove:** via CLI Noir, invocado por Python (`subprocess`)
- **Dashboard:** React para submissão visual e exibição de `pass_all`

---

## 4. Cronograma de 1 semana

| Dia | Tarefa                                                                                     |
|-----|-------------------------------------------------------------------------------------------|
| 1   | Escolher 2 módulos essenciais (ex.: docking + logP); esboçar witness schema JSON           |
| 2   | Implementar e testar scripts Python para extrair resultados desses 2 módulos               |
| 3   | Escrever e compilar circuitos Noir para esses módulos; configurar proving keys             |
| 4   | Integrar orbit (Python → Noir) e gerar prova de exemplo end-to-end                         |
| 5   | Adicionar os demais módulos (QSAR, pKa, etc.) e circuitos correspondentes                  |
| 6   | Construir agregador de provas e workflow completo; testes de ponta a ponta                 |
| 7   | Ajustes finais, simulação de demo no pitch, preparar slides e demo live                    |

---

## Com esse plano você terá:

- Pipeline claro de submissão → testes → prova
- Módulos ZK isolados e componíveis
- Demonstração prática já com dois módulos no primeiro MVP
- Roadmap para expansão até o pitch em 7 dias