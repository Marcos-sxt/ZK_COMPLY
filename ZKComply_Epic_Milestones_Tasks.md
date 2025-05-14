# 🚀 Epic: ZK-Comply MVP

Criar um sistema que permite provar, via Zero-Knowledge Proofs, que uma substância contém concentração segura de um ingrediente, **sem revelar a fórmula**.  
O MVP deve incluir circuito Noir, backend funcional, frontend interativo e identidade visual.

---

## 🎯 Milestones

### 📍 Milestone 1: Circuito ZK
Desenvolver o circuito principal em Noir que irá validar, via prova de conhecimento zero, se a concentração de um ingrediente específico dentro de uma fórmula está abaixo de um limite seguro.  
Inclui lógica de verificação, hash de compromisso e testes com `nargo`.

### 📍 Milestone 2: Backend Provas
Criar uma API capaz de registrar substâncias, salvar suas composições com hash de compromisso e executar automaticamente a prova ZK.  
Inclui geração do `Prover.toml`, execução de `nargo`, e persistência dos dados.

### 📍 Milestone 3: Frontend + Branding
Desenvolver o dashboard visual e intuitivo para registrar fórmulas, selecionar ingredientes e verificar a conformidade.  
Inclui identidade visual, narrativa da solução, pitch e landing page.

---

## ✅ Issues / Tasks

### 🟩 Must
- [ ] Criar circuito Noir com verificação dinâmica (`composition`, `threshold`, `hash`)
- [ ] Construir backend com rotas `/substance` e `/verify`
- [ ] Rodar provas com `nargo` via subprocess
- [ ] Exibir resultado da verificação no frontend

### 🟨 Should
- [ ] Criar dashboard com UI amigável (React ou Next.js)
- [ ] Criar identidade visual + pitch do projeto
- [ ] Implementar banco de dados persistente (Railway)

### 🟦 Could
- [ ] Criar contrato Solidity com evento `ProofSubmitted(...)`
- [ ] Publicar hash e resultado da prova na testnet

---

## 👥 Time

- **Marcos** – Circuito ZK / Backend / Integração
- **Raphael** – Backend / Infra / Front
- **Luccas** – Frontend / UI/UX
- **Matheus** – Branding / Storytelling
