
# User Management Back‑End

Este projeto é o **back‑end** de um sistema de gerenciamento de usuários, implementado em **Node.js** com **NestJS**, **TypeORM** e **PostgreSQL**.  
Ele expõe uma API RESTful completa para **CRUD** de usuários e relatórios, além de gerar documentação automática via **Swagger**.

---

## 📦 Tecnologias

- Node.js ≥ 16  
- NestJS  
- TypeORM  
- PostgreSQL  
- class‑validator / class‑transformer  
- Swagger (OpenAPI)  
- Jest (testes unitários)

---

## 🛠️ Pré‑requisitos

- PostgreSQL rodando localmente  
- Yarn **ou** npm

---

## 🚀 Instalação e Execução

Clone o repositório:

```bash
git clone <url-do-back>
cd user-management-back
```

Instale as dependências:

```bash
yarn install
# ou: npm install
```

Configure as variáveis de ambiente:

1. Duplique o arquivo **`.env.example`** para **`.env`**  
2. Ajuste conforme seu ambiente:

```ini
DB_HOST=localhost
DB_PORT=5432
DB_USER=<seu_usuario>
DB_PASS=<sua_senha>
DB_NAME=user_mgmt_db
PORT=3000
```

Inicie em modo desenvolvimento:

```bash
yarn start:dev
# ou: npm run start:dev
```

A API ficará disponível em **http://localhost:3000**.

---

## 📚 Documentação da API

| Recurso | URL |
|---------|-----|
| Swagger UI | `http://localhost:3000/api` |
| OpenAPI JSON | `http://localhost:3000/api-json` |

---

## 🔗 Endpoints

### Usuários

| Verbo | Rota | Descrição |
|-------|------|-----------|
| **POST** | `/users` | Criar novo usuário |
| **GET** | `/users` | Listar todos os usuários |
| **GET** | `/users/:id` | Buscar usuário por ID |
| **PUT** | `/users/:id` | Atualizar usuário |
| **DELETE** | `/users/:id` | Excluir usuário |

### Relatórios

| Verbo | Rota | Descrição |
|-------|------|-----------|
| **GET** | `/users/reports/count` | Total de usuários |
| **GET** | `/users/reports/by-month` | Usuários agrupados por mês |

---

## 🗂 Estrutura de Pastas

```bash
src/
├─ main.ts
├─ app.module.ts
└─ users/
   ├─ controllers/       # controllers e endpoints
   ├─ dtos/              # DTOs de entrada e saída
   ├─ entities/          # entidades TypeORM
   ├─ interfaces/        # contratos de repositório
   ├─ repositories/      # implementação de acesso a dados
   └─ services/          # lógica de negócio
```

---

## 🧪 Testes

- **Unitários**: controller e service

Para executar os testes:

```bash
yarn test
# ou: npm run test
```

Cobertura de testes:

```bash
yarn test:cov
# ou: npm run test:cov
```

---

## 📜 Licença

Este projeto é **UNLICENSED**. Use‑o livremente para fins de estudo ou teste.
