# nestjs-catalog-api

API REST para gerenciamento de **usuários**, **categorias** e **produtos**, desenvolvida com **NestJS**, **TypeScript**, **Prisma ORM** e **PostgreSQL**, com autenticação baseada em **JWT** e validação de dados via `class-validator`.

## Autores

- Carlos Henrique
- Mateus Henrique
- Rithiellen Kariny
- Gustavo Rodrigues

## Requisitos

- Node.js (v20+)
- PostgreSQL
- Cliente HTTP (Postman, Insomnia, Thunder Client ou `curl`)

## Configuração do Ambiente e Banco de Dados

1. Instale e inicie o **PostgreSQL** localmente (ou configure uma instância remota) e crie o banco de dados do projeto.
2. Crie/atualize o arquivo `.env` na raiz do projeto com as variáveis:

   ```env
   DATABASE_URL="postgresql://postgres:1234@localhost:5432/postgres"
   JWT_SECRET="sua-chave-secreta-aqui"
   ```

3. Gere o Prisma Client e execute as migrations:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

## Como Executar

1. Clone o repositório:

   ```bash
   gh repo clone Carlos-bub/nestjs-catalog-api
   cd nestjs-catalog-api
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Rode as migrations (caso ainda não tenha rodado):

   ```bash
   npx prisma migrate dev
   ```

4. Inicie o servidor em modo de desenvolvimento:

   ```bash
   npm run start:dev
   ```

   A API ficará disponível em `http://localhost:3000`.

## Autenticação e Rotas

A API utiliza autenticação via **Bearer Token (JWT)**.

1. Crie um usuário em `POST /users`.
2. Faça login em `POST /users/login` para receber `{ "token": "..." }`.
3. Envie o header `Authorization: Bearer <token>` nas requisições para as rotas protegidas.

### Usuários (`/users`)

| Método | Rota           | Auth | Descrição                          |
| ------ | -------------- | ---- | ---------------------------------- |
| POST   | `/users`       | Não  | Cadastra um novo usuário           |
| POST   | `/users/login` | Não  | Autentica e retorna o token JWT    |
| GET    | `/users`       | Sim  | Lista usuários (sem exibir senha)  |
| GET    | `/users/:id`   | Sim  | Busca um usuário por ID            |
| PUT    | `/users/:id`   | Sim  | Atualiza um usuário por ID         |
| DELETE | `/users/:id`   | Sim  | Remove um usuário por ID           |

Exemplo de cadastro (`POST /users`):

```json
{
  "username": "carlos",
  "email": "carlos@email.com",
  "password": "123456",
  "ins_user": 1,
  "upd_user": 1
}
```

### Categorias (`/categories`)

| Método | Rota              | Auth | Descrição                    |
| ------ | ----------------- | ---- | ---------------------------- |
| POST   | `/categories`     | Sim  | Cria uma nova categoria      |
| GET    | `/categories`     | Sim  | Lista todas as categorias    |
| GET    | `/categories/:id` | Sim  | Busca uma categoria por ID   |
| PATCH  | `/categories/:id` | Sim  | Atualiza uma categoria       |
| DELETE | `/categories/:id` | Sim  | Remove uma categoria         |

Exemplo de criação (`POST /categories`):

```json
{
  "name": "Bebidas"
}
```

### Produtos (`/products`)

| Método | Rota            | Auth | Descrição                  |
| ------ | --------------- | ---- | -------------------------- |
| POST   | `/products`     | Sim  | Cria um novo produto       |
| GET    | `/products`     | Sim  | Lista todos os produtos    |
| GET    | `/products/:id` | Sim  | Busca um produto por ID    |
| PUT    | `/products/:id` | Sim  | Atualiza um produto por ID |
| DELETE | `/products/:id` | Sim  | Remove um produto por ID   |

Exemplo de criação (`POST /products`):

```json
{
  "ean": "7891234567890",
  "name": "Refrigerante",
  "id_category": 1,
  "ins_user": 1,
  "upd_user": 1
}
```

## Comandos Úteis

- Visualizar o banco no Prisma Studio:

  ```bash
  npx prisma studio
  ```

- Compilar o projeto:

  ```bash
  npm run build
  ```

- Rodar os testes unitários:

  ```bash
  npm test
  ```

## Considerações Finais

Projeto desenvolvido inicialmente na disciplina de Backend com NestJS, utilizando **TypeScript**, **Prisma ORM** e **PostgreSQL**.
