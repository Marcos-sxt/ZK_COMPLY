# SECURITY.md

## Práticas de Segurança - ZK_COMPLY

### Dados Sensíveis

Este projeto foi configurado para **NÃO** incluir dados sensíveis no repositório:

#### ✅ Configuração Segura:
- **API Tokens**: Movidos para variáveis de ambiente (.env)
- **Seed Phrases**: Removidas do código, usar .env apenas para testes
- **Chaves Privadas**: Nunca incluídas no repositório
- **Dados Pessoais**: Não coletados ou armazenados

#### 🔒 Variáveis de Ambiente:
```bash
# Copie .env.example para .env e configure:
cp .env.example .env
```

**ATENÇÃO**: Nunca commite o arquivo `.env` real!

#### 📁 Arquivos Ignorados:
- `venv-zk-comply/` - Ambiente virtual Python
- `node_modules/` - Dependências Node.js  
- `MolGpKa/` - Biblioteca externa
- `.env` - Variáveis de ambiente sensíveis
- `__pycache__/` - Cache Python
- `*.log` - Arquivos de log
- `package-lock.json` - Lock file auto-gerado

### Uso Responsável

#### Para Desenvolvedores:
1. **Nunca** hardcode tokens, senhas ou chaves no código
2. Use variáveis de ambiente para dados sensíveis
3. Configure `.env` localmente (não commitado)
4. Revise commits antes de publicar

#### Para Pesquisadores:
1. Use seed phrases de **teste** apenas
2. Não use carteiras com fundos reais
3. Dados moleculares são científicos (não sensíveis)
4. Resultados ADMET são públicos

### Licenças e Compliance

- **Código**: Licença acadêmica/científica
- **Uso Comercial**: Proibido (ver COMMERCIAL_USE_PROHIBITED.md)
- **Dados Científicos**: Domínio público/literatura
- **APIs Externas**: Respeitar termos de cada serviço

### Reportar Problemas de Segurança

Para reportar vulnerabilidades:
1. **NÃO** abra issues públicas
2. Contate: marcossantos7955@gmail.com
3. Descreva o problema detalhadamente
4. Aguarde resposta antes de divulgar

### Auditoria de Segurança

Último check: 26/07/2025
- ✅ Sem hardcoded secrets
- ✅ .gitignore configurado
- ✅ Variáveis ambiente documentadas
- ✅ Dados científicos apenas
