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
**Endpoint:** `PATCH /users`

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

### Ver usuário cadastrado
**Endpoint:** `GET /users`

**Response:**
```json
Status: 200 OK

{
    "id": "30e21fdb-788b-494f-bfa3-b8836a9f6a06",
    "name": "Admin",
    "username": "admin",
    "role": "ADMIN",
    "createdAt": "20/02/2025"
}

```

### Ativar conta do usuário para indicar que ele viu a recomendação de troca de senha
**Endpoint:** `GET /users/activate`

**Response:**
```json
Status: 200 OK
```



---

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
    "name": "ENV_VAULT_PASS",
    "message": "Variável de ambiente: ENV_VAULT_PASS adicionada."
}
```

---

### Listar Variáveis  
**Endpoint:** `GET /env`

OU  para uma pesquisa por nome

**Endpoint:** `GET /env?search={NOME_VAR}`

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
