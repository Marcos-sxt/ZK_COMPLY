# ZK_COMPLY - Documentação

Esta pasta contém toda a documentação técnica e histórica do projeto ZK_COMPLY.

## Estrutura

### `technical_overview.md`
**Documentação principal v2.0** - Guia completo da arquitetura atual, módulos científicos, uso e configuração.

### `technical/`
Documentação técnica específica:
- `estrategia_definitiva_zkverify.md` - Estratégia de migração para zkVerify
- `analise_compatibilidade_sistemas_prova.md` - Análise de sistemas de prova
- `checklist_progresso.md` - Checklist de desenvolvimento
- `plano_de_1_semana.md` - Planejamento de sprint

### `legacy/`
Documentação histórica (pré v2.0):
- `barretenberg_workflow.md` - Workflow antigo Barretenberg
- `plano_de_acao_barretenberg.md` - Planos antigos Barretenberg
- `plano_integracao_barretenberg.md` - Integração Barretenberg
- `situacao_atual.txt` - Status antigo do projeto

### `examples/`
Exemplos e scripts de demonstração:
- `teste_pipeline.py` - Script de teste do pipeline

## Migração de Arquitetura

### v1.0 (Legacy)
- **Sistema:** Noir + Barretenberg Ultra Honk
- **Status:** ❌ Incompatível com zkVerify
- **Documentação:** `legacy/`

### v2.0 (Atual)
- **Sistema:** Circom + Groth16 + snarkjs + zkVerify
- **Status:** ✅ Totalmente funcional
- **Documentação:** `technical_overview.md`

## Módulos Científicos ADMET

O projeto implementa 7 módulos científicos cobrindo todas as áreas ADMET:

| Módulo | Área ADMET | Implementação | Status |
|--------|------------|---------------|--------|
| LogP | Absorption | RDKit | ✅ |
| Multi | Absorption | RDKit (Lipinski) | ✅ |
| pKa | Distribution | MolGpKa + fallback | ✅ |
| Docking | Distribution | AutoDock Vina + fallback | ✅ |
| CYP450 | Metabolism | ML models + heurísticas | ✅ |
| Dynamics | Excretion | GROMACS + fallback | ✅ |
| QSAR | Toxicity | ML + substructure analysis | ✅ |

## Como Usar

1. **Leia primeiro:** `technical_overview.md`
2. **Setup:** Siga as instruções em `technical_overview.md`
3. **Exemplos:** Veja `examples/` e `../proofs/examples/`
4. **Troubleshooting:** Consulte seção correspondente na documentação técnica

## Contribuição

Para contribuir com a documentação:

1. **Atualizações técnicas:** Edite `technical_overview.md`
2. **Documentação específica:** Adicione em `technical/`
3. **Exemplos:** Adicione em `examples/`
4. **Histórico:** Mantenha em `legacy/` sem alterações
