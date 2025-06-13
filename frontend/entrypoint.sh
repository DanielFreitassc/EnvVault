#!/bin/sh

set -e

CERT_DIR="./cert"
KEY_FILE="${CERT_DIR}/privkey.pem"
CERT_FILE="${CERT_DIR}/fullchain.pem"
DAYS_VALID=365

mkdir -p "$CERT_DIR"

if [ -f "$KEY_FILE" ] && [ -f "$CERT_FILE" ]; then
    echo "[✔] Certificado já existe em '$CERT_DIR'. Pulando geração."
    exit 0
fi

echo "[*] Gerando certificado SSL autoassinado..."

# Detecta se está rodando no Git Bash
IS_GIT_BASH=$(uname -s | grep -i "mingw" || true)

# Corrige path para evitar erro com o campo -subj no Git Bash
if [ -n "$IS_GIT_BASH" ]; then
  OPENSSL_BIN="/usr/bin/openssl"
  SUBJ="//C=BR/ST=SP/L=Localhost/O=Dev/OU=Dev/CN=localhost"
else
  OPENSSL_BIN="openssl"
  SUBJ="/C=BR/ST=SP/L=Localhost/O=Dev/OU=Dev/CN=localhost"
fi

if "$OPENSSL_BIN" req -x509 -nodes -days "$DAYS_VALID" \
    -newkey rsa:2048 \
    -keyout "$KEY_FILE" \
    -out "$CERT_FILE" \
    -subj "$SUBJ"; then

    echo "[✔] Certificado criado com sucesso:"
    echo "    - Chave privada: $KEY_FILE"
    echo "    - Certificado (fullchain): $CERT_FILE"
    exit 0
else
    echo "[✗] Falha ao gerar o certificado." >&2
    exit 1
fi
