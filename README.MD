# Documentação da API

## Base URL
```
http://localhost:8080
```

## Autenticação
### Login
**Endpoint:** `POST /auth/login`

**Payload esperado:**
```json
{
    "username": "admin",
    "password": "admin"
}
```

**Response:**
```json
Status: 201 Created
{
    "token": "eyJhbGci0....."
}
```

### Validação do Token
**Endpoint:** `GET /validation`

**Response:**
```json
Status: 200 OK
{
    "message": "Autorizado",
    "role": "ADMIN"
}
```

---

## Gerenciamento de Usuários

### Atualizar Usuário
**Endpoint:** `PATCH /user`

**Payload esperado:**
```json
{
    "username": "admin",
    "password": "SenhaAtualizada"
}
```

**Response:**
```json
Status: 200 OK
{
    "message": "Usuário atualizado com sucesso."
}
```

### Listar Usuários
**Endpoint:** `GET /users`

**Response:**
```json
Status: 200 OK
[
    {
        "id": "30e21fdb-788b-494f-bfa3-b8836a9f6a06",
        "name": "Admin",
        "username": "admin",
        "role": "ADMIN",
        "createdAt": "20/02/2025"
    }
]
```

---

## Gerenciamento de Variáveis de Ambiente (Windows)

### Criar Variável
**Endpoint:** `POST /env-windows`

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

### Listar Variáveis
**Endpoint:** `GET /env-windows`

**Response:**
```json
Status: 200 OK
[
    { "name": "JAVA_HOME" },
    { "name": "M2_HOME" }
]
```

### Remover Variável
**Endpoint:** `DELETE /env-windows/ENV_VAULT_USER`

**Response:**
```json
Status: 200 OK
{
    "message": "Variável de ambiente: ENV_VAULT_PASS Removida"
}
```

### Atualizar Variável
**Endpoint:** `PUT /env-windows`

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

---

## Gerenciamento de Variáveis de Ambiente (Linux)

### Criar Variável
**Endpoint:** `POST /env-linux`

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

### Listar Variáveis
**Endpoint:** `GET /env-linux`

**Response:**
```json
Status: 200 OK
[
    { "name": "JAVA_HOME" },
    { "name": "M2_HOME" }
]
```

### Remover Variável
**Endpoint:** `DELETE /env-linux/ENV_VAULT_USER`

**Response:**
```json
Status: 200 OK
{
    "message": "Variável de ambiente: ENV_VAULT_PASS Removida"
}
```

### Atualizar Variável
**Endpoint:** `PUT /env-linux`

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


