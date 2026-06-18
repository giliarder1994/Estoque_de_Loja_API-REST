# 💰 Estoque de Loja - API REST

API REST para gerenciamento de estoque de produtos, desenvolvida com **Node.js**, **Express**, **TypeScript** e **MySQL**. O sistema permite autenticação de usuários, controle completo de produtos e proteção de rotas utilizando JWT, seguindo uma arquitetura organizada, escalável e fortemente tipada.

---

## 🚀 Tecnologias

| Tecnologia | Descrição |
|---|---|
| **Node.js** | Ambiente de execução JavaScript |
| **TypeScript** | Superset tipado do JavaScript |
| **Express** | Framework web para APIs REST |
| **MySQL** | Banco de dados relacional |
| **mysql2** | Driver MySQL com suporte a Async/Await |
| **JWT (JSON Web Token)** | Autenticação segura |
| **bcryptjs** | Criptografia de senhas |
| **dotenv** | Gerenciamento de variáveis de ambiente |
| **tsx** | Execução TypeScript em desenvolvimento |

---

## 📁 Estrutura do Projeto

```
src/
 ├── config/              # Configuração de conexão com MySQL
 ├── controllers/         # Controle das requisições HTTP
 ├── middlewares/         # Autenticação e tratamento de erros
 ├── routes/              # Endpoints da aplicação
 ├── services/            # Regras de negócio e queries SQL
 ├── types/               # Tipagens globais da aplicação
 ├── app.ts               # Configuração do Express
 ├── criarTabelas.ts      # Script de criação das tabelas
 └── server.ts            # Inicialização do servidor

package.json
tsconfig.json
```

---

## ⚙️ Funcionalidades

### 🔐 Autenticação

- Cadastro de usuários
- Login com geração de token JWT
- Rotas protegidas por middleware
- Senhas criptografadas com bcryptjs

### 📦 Produtos

- Criar produtos
- Listar produtos com **paginação**
- Filtrar produtos por **categoria**
- Buscar produto por ID
- Atualizar produtos
- Remover produtos

---

## 🧠 Recursos Técnicos Implementados

### ✅ Segurança

- Autenticação JWT
- Middleware de proteção de rotas
- Senhas criptografadas com bcryptjs
- Validação de payloads
- Tratamento centralizado de erros

### 🏗️ Arquitetura em Camadas

O projeto segue o padrão **Controller → Service → Repository**, com separação clara de responsabilidades:

- **Controllers** → Controle das requisições HTTP
- **Services** → Regras de negócio e queries SQL
- **Middlewares** → Autenticação e tratamento de erros
- **Routes** → Definição das rotas
- **Types** → Centralização das tipagens TypeScript
- **Config** → Configuração do banco de dados

---

## 🗄️ Estrutura do Banco de Dados

O sistema possui **2 tabelas** principais:

### 👤 `usuarios`

Responsável pelo armazenamento dos usuários da aplicação.

| Campo | Tipo |
|---|---|
| `id` | INT (PK, AUTO_INCREMENT) |
| `nome` | VARCHAR |
| `email` | VARCHAR (único) |
| `senha` | VARCHAR (hash bcrypt) |
| `criado_em` | TIMESTAMP |

### 📦 `produtos`

Responsável pelo controle de estoque dos produtos.

| Campo | Tipo |
|---|---|
| `id` | INT (PK, AUTO_INCREMENT) |
| `nome` | VARCHAR |
| `categoria` | VARCHAR (opcional) |
| `preco` | DECIMAL |
| `quantidade` | INT |
| `criado_em` | TIMESTAMP |

---

## ⚙️ Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/estoque-loja-typescript.git
cd estoque-loja-typescript
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

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

### 4. Criar as tabelas

As tabelas são criadas automaticamente pelo script `src/criarTabelas.ts`. Para executá-lo manualmente:

```bash
npm run db:setup
```

### 5. Rodar em desenvolvimento

```bash
npm run dev
```

O servidor iniciará automaticamente em:

```
http://localhost:3000
```

> O script `dev` já executa o `db:setup` antes de iniciar o servidor.

### 6. Gerar build TypeScript

```bash
npm run build
```

Os arquivos compilados serão gerados em `dist/`.

### 7. Executar versão compilada

```bash
npm start
```

---

## 📋 Principais Rotas

### 🔐 Autenticação

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/auth/registrar` | Cadastro de usuário |
| `POST` | `/auth/login` | Login e geração de token |

### 📦 Produtos (🔒 requer token JWT)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/produtos` | Listar produtos (com paginação e filtro por categoria) |
| `GET` | `/produtos/:id` | Buscar produto por ID |
| `POST` | `/produtos` | Criar produto |
| `PUT` | `/produtos/:id` | Atualizar produto |
| `DELETE` | `/produtos/:id` | Remover produto |

> **Parâmetros de query disponíveis no GET `/produtos`:**
> - `categoria` — filtra por categoria
> - `limite` — quantidade de itens por página (padrão: 10)
> - `pagina` — número da página (padrão: 1)

---

## 🎯 Objetivos do Projeto

Este projeto foi desenvolvido com foco em:

- Prática de **arquitetura backend em camadas**
- Boas práticas com **TypeScript** e tipagem forte
- Organização de **APIs REST**
- **Autenticação segura** com JWT e bcrypt
- Estrutura profissional para **portfólio**

---

## 👨‍💻 Autor

Desenvolvido por **Giliarde Rodrigues** 💻
