# 🔬 ZK-Comply

**Provas de conformidade química com zero conhecimento.**  
Privacidade para quem desenvolve. Transparência para quem regula.

---

## 🚀 Visão

ZK-Comply permite provar que uma substância está **dentro dos limites legais de um composto específico**, sem revelar sua composição completa — usando Zero-Knowledge Proofs (ZKPs).

É ideal para empresas em fase de P&D, indústria farmacêutica, cosmética, agronegócio e alimentos que precisam de **compliance regulatório**, mas **não podem expor sua fórmula**.

---

## ⚙️ Como funciona

1. O usuário registra uma fórmula com 30 compostos e suas concentrações
2. A composição é convertida em um hash de compromisso (Pedersen)
3. O usuário escolhe **qual ingrediente** deseja provar que está abaixo do limite
4. Gera uma prova ZK usando Noir
5. A prova é verificada localmente ou publicamente — sem expor o vetor

---

## 📦 Stack usada

- 🧠 **Noir** – Circuito ZK (`composition_index`, `threshold`, `hash_commitment`)
- 🛠️ **Python FastAPI** – Backend de registro, execução da prova e resposta
- 🎨 **Next.js** – Frontend intuitivo para criar, provar e visualizar composições
- 🧾 **GitHub** – Organização das entregas
- ⛓️ **Solidity + Testnet** – Logging público da verificação

---

## 📐 Arquitetura

```txt
[User] → [Frontend UI]
              ↓
         [Backend API]
          ↙         ↘
   [Substâncias DB]   [Circuito Noir]
                            ↓
                  [Prova gerada + verificada]
```

---

## 🧩 Funcionalidades

| Função                      | Status |
|----------------------------|--------|
| Registrar nova fórmula     | 🔜     |
| Gerar hash de compromisso  | 🔜     |
| Selecionar ingrediente     | 🔜     |
| Verificar limite com ZK    | 🔜     |
| Ver resultado visual       | 🔜     |
| Logging on-chain ()        | 🔜     |


---

## 📌 Time

- **Raphael** – Backend / Integração / Front
- **Luccas** – Frontend / UI/UX
- **Matheus** – Branding / UX / Storytelling
- **Marcos** – Circuito ZK / Backend / Infra

---

## 🧠 Inspiração

> *“O segredo industrial é seu. A prova de que está seguro, é nossa.”*

---

## 🧪 Exemplo

> Provar que a substância `PharmaX-101` contém menos de `0.95%` de benzeno, sem revelar a fórmula.

---

## 📃 Licença

MIT © 2025 – ZK-Comply Hackathon Team
