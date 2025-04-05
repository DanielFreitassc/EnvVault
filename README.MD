## ✅ Atualização da Documentação da API

## Gerenciamento de Variáveis de Ambiente (Automático: Linux ou Windows)

> O backend identifica automaticamente o sistema operacional e redireciona internamente o processamento para o ambiente correto.

### Criar Variável  
**Endpoint:** `POST /env`  
**Payload esperado:**
```json
{
    "name": "ENV_VAULT_PASS",
    "value": "admin123"
}
```

**Response:**
```json
Status: 201 CREATED
{
    "message": "Variável de ambiente: ENV_VAULT_PASS adicionada."
}
```

---

### Listar Variáveis  
**Endpoint:** `GET /env`

**Response:**
```json
Status: 200 OK
[
    { "name": "JAVA_HOME" },
    { "name": "M2_HOME" }
]
```

---

### Remover Variável  
**Endpoint:** `DELETE /env/{ENV_NAME}`

**Response:**
```json
Status: 200 OK
{
    "message": "Variável de ambiente: ENV_VAULT_PASS Removida"
}
```

---

### Atualizar Variável  
**Endpoint:** `PUT /env`

**Payload esperado:**
```json
{
    "name": "ENV_VAULT_PASS",
    "value": "admin123"
}
```

**Response:**
```json
Status: 200 OK
{
    "message": "Variável atualizada com sucesso"
}
```
