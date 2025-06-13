# Etapa de build
FROM node:18-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa de produção
FROM node:18-slim

WORKDIR /app

# Copia arquivos necessários da build
COPY --from=builder /app /app

# Exponha a porta padrão do Next.js
EXPOSE 3000

# Variável de ambiente para produção
ENV NODE_ENV=production

CMD ["npm", "run", "start"]

