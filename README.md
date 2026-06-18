# 💰 Estoque de Loja - API REST

API REST para gerenciamento de estoque de produtos, desenvolvida com **Node.js**, **Express**, **TypeScript** e **MySQL**.
O sistema permite autenticação de usuários, controle completo de produtos e proteção de rotas utilizando JWT, seguindo uma arquitetura organizada, escalável e fortemente tipada.

---

# 🚀 Tecnologias

* **Node.js** — Ambiente de execução JavaScript
* **TypeScript** — Superset tipado do JavaScript
* **Express** — Framework web para APIs REST
* **MySQL** — Banco de dados relacional
* **mysql2** — Driver MySQL com suporte a Async/Await
* **JWT (JSON Web Token)** — Autenticação segura
* **bcryptjs** — Criptografia de senhas
* **dotenv** — Gerenciamento de variáveis de ambiente
* **cors** — Liberação de acesso entre aplicações
* **tsx** — Execução TypeScript em desenvolvimento
* **Jest** — Framework de testes
* **Supertest** — Testes de integração para APIs

---

# 📁 Estrutura do Projeto

```bash
src/
 ├── config/              # Configuração de conexão com MySQL
 │
 ├── controllers/         # Regras das requisições HTTP
 │
 ├── middlewares/         # Autenticação e tratamento de erros
 │
 ├── routes/              # Endpoints da aplicação
 │
 ├── services/            # Regras de negócio e queries SQL
 │
 ├── types/               # Tipagens globais da aplicação
 │
 ├── app.ts               # Configuração do Express
 └── server.ts            # Inicialização do servidor

sql/
 └── setup.sql            # Script de criação do banco e tabelas

tests/                    # Testes unitários e integração

package.json
tsconfig.json
jest.config.cjs
```

---

# ⚙️ Funcionalidades

## 🔐 Autenticação

* Cadastro de usuários
* Login com JWT
* Rotas protegidas
* Criptografia de senha com bcryptjs

---

## 📦 Produtos

* Criar produtos
* Listar produtos
* Buscar produto por ID
* Atualizar produtos
* Remover produtos
* Paginação de resultados
* Filtro por categoria

---

# 🧠 Recursos Técnicos Implementados

## ✅ Segurança

* Autenticação JWT
* Middleware de proteção de rotas
* Senhas criptografadas
* Validação de payloads
* Tratamento centralizado de erros

---

## 🧪 Testes Automatizados

O projeto possui testes cobrindo:

* Fluxos de autenticação
* Rotas protegidas
* Cadastro de produtos
* Validações de erros
* Usuários duplicados
* Tokens inválidos
* Regras de negócio

---

# 🗄️ Estrutura do Banco de Dados

O sistema possui 2 tabelas principais:

## 👤 usuarios

Responsável pelo armazenamento dos usuários da aplicação.

Campos principais:

* id
* nome
* email
* senha

---

## 📦 produtos

Responsável pelo controle de estoque dos produtos.

Campos principais:

* id
* nome
* categoria
* preco
* quantidade

---

# ⚙️ Como rodar localmente

## 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/estoque-loja-typescript.git

cd estoque-loja-typescript
```

---

## 2. Instale as dependências

```bash
npm install
```

---

## 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=estoque_loja
DB_PORT=3306

JWT_SECRET=sua_chave_secreta
```

---

## 4. Criar banco e tabelas

Execute o script SQL:

```bash
npm run db:setup
```

Exemplo do script no `package.json`:

```json
"db:setup": "mysql -u root -p < sql/setup.sql"
```

---

## 5. Rodar em desenvolvimento

```bash
npm run dev
```

Servidor disponível em:

```bash
http://localhost:3000
```

---

## 6. Gerar build TypeScript

```bash
npm run build
```

Os arquivos compilados serão gerados em:

```bash
dist/
```

---

## 7. Executar versão compilada

```bash
npm start
```

---

# 📋 Principais Rotas

# 🔐 Autenticação

| Método | Rota            | Descrição                |
| ------ | --------------- | ------------------------ |
| POST   | /auth/registrar | Cadastro de usuário      |
| POST   | /auth/login     | Login e geração de token |

---

# 📦 Produtos

| Método | Rota          | Descrição             |
| ------ | ------------- | --------------------- |
| GET    | /produtos     | Listar produtos       |
| GET    | /produtos/:id | Buscar produto por ID |
| POST   | /produtos     | Criar produto         |
| PUT    | /produtos/:id | Atualizar produto     |
| DELETE | /produtos/:id | Remover produto       |

---

# 🧱 Arquitetura do Projeto

O sistema foi organizado em camadas para facilitar manutenção, escalabilidade e testes:

* **Controllers** → Controle das requisições HTTP
* **Services** → Regras de negócio
* **Middlewares** → Autenticação e tratamento de erros
* **Routes** → Definição das rotas
* **Types** → Centralização das tipagens
* **Config** → Configuração do banco de dados

---

# 🎯 Objetivos do Projeto

Este projeto foi desenvolvido com foco em:

* Prática de arquitetura backend
* Boas práticas com TypeScript
* Organização de APIs REST
* Autenticação segura
* Testes automatizados
* Estrutura profissional para portfólio

---

# 👨‍💻 Autor

Desenvolvido por **Giliarde Rodrigues** 💻
