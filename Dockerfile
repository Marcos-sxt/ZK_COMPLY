# 1. Imagem base Python
FROM python:3.11-slim

# 2. Instala dependências do sistema
RUN apt-get update && apt-get install -y curl git build-essential

# 3. # Baixa e extrai o Nargo para Linux x86_64
RUN curl -L -o /tmp/nargo.tar.gz https://github.com/noir-lang/noir/releases/download/v1.0.0-beta.6/nargo-x86_64-unknown-linux-gnu.tar.gz && \
tar -xzf /tmp/nargo.tar.gz -C /usr/local/bin && \
chmod +x /usr/local/bin/nargo && \
/usr/local/bin/nargo --version

# 4. Cria diretório de trabalho
WORKDIR /app

# 5. Copia requirements e instala dependências Python
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# 6. Copia o backend e circuits para dentro do container
COPY backend/ ./backend/
COPY circuits/ ./circuits/

# 7. Cria diretório data
RUN mkdir -p /app/backend/data

# 8. Define diretório de trabalho do backend
WORKDIR /app/backend

# 9. Comando para rodar o backend (Railway usa $PORT)
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000} 