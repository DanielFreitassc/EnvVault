CERT_PATH=/cert/fullchain.pem
KEY_PATH=/cert/privkey.pem

if [ ! -f "$CERT_PATH" ] || [ ! -f "$KEY_PATH" ]; then
  echo "🔐 Gerando certificado autoassinado como fullchain.pem e privkey.pem..."
  openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout "$KEY_PATH" \
    -out "$CERT_PATH" \
    -subj "/C=BR/ST=SP/L=SaoPaulo/O=MyCompany/OU=Dev/CN=localhost"
else
  echo "✅ Certificado já existe. Pulando geração."
fi

# Inicia o Nginx
nginx -g 'daemon off;'
