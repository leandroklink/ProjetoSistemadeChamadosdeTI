# HelpDesk

Sistema simples de gerenciamento de chamados de TI, desenvolvido como projeto acadêmico.

---

## Sobre o projeto

O HelpDesk será utilizado para registrar e acompanhar chamados de suporte de TI.

O usuário poderá abrir um chamado informando título, descrição, categoria e prioridade. Os chamados poderão ser acompanhados e ter seu status atualizado durante o atendimento.

### Fluxo do chamado:

```
ABERTO
   ↓
EM ATENDIMENTO
   ↓
RESOLVIDO
```

---

## Objetivos

O projeto tem como objetivo aplicar conceitos de:

* Desenvolvimento Front-end e Back-end
* API REST
* Banco de dados
* TypeScript
* Git e GitHub
* Branches e Pull Requests
* Scrum
* Kanban
* Trabalho em equipe
* Deploy

---

## Tecnologias

### Front-end
* HTML
* CSS
* TypeScript

### Back-end
* Node.js
* Express
* TypeScript

### Banco de dados
* PostgreSQL
* Prisma

### Versionamento
* Git
* GitHub

---

## Arquitetura

```
Front-end
HTML / CSS / TypeScript
        |
        | HTTP / JSON
        v
API
Node.js / Express / TypeScript
        |
        v
Prisma
        |
        v
PostgreSQL
```

---

## Como rodar localmente

### Pré-requisitos

* [Node.js](https://nodejs.org/) 20.6 ou superior
* [PostgreSQL](https://www.postgresql.org/download/) instalado e em execução
  * No Windows, o instalador oferece abrir o **Stack Builder** no final. Ele não é necessário e pode ser cancelado.
  * Guarde a **senha** e a **porta** (padrão `5432`) definidas na instalação.

### 1. Clonar o repositório

```bash
git clone https://github.com/leandroklink/ProjetoSistemadeChamadosdeTI.git
cd ProjetoSistemadeChamadosdeTI
```

### 2. Back-end (API)

```bash
cd backend
npm install
```

Crie o arquivo `backend/.env` a partir do modelo:

```bash
cp .env.example .env
```

Edite o `.env` com os seus dados do PostgreSQL:

```
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/helpdesk?schema=public"
```

| Parte        | Significado                                             |
|--------------|---------------------------------------------------------|
| `postgres`   | Usuário do banco (padrão da instalação)                 |
| `SUA_SENHA`  | Senha definida na instalação do PostgreSQL              |
| `5432`       | Porta do PostgreSQL (confira se a sua não é outra, ex.: `5433`) |
| `helpdesk`   | Nome do banco. É criado automaticamente no próximo passo |

> Se a senha tiver caracteres especiais (`@`, `#`, `/`, `:`), eles precisam ser codificados (ex.: `@` → `%40`).
>
> O `.env` não é enviado ao GitHub (está no `.gitignore`).

Crie as tabelas no banco e inicie a API:

```bash
npx prisma migrate dev
npm run dev
```

A API ficará disponível em `http://localhost:3000`.

| Método  | Rota                    | Descrição                  |
|---------|-------------------------|----------------------------|
| `GET`   | `/chamados`             | Lista todos os chamados    |
| `GET`   | `/chamados/:id`         | Busca um chamado pelo id   |
| `POST`  | `/chamados`             | Cria um chamado            |
| `PATCH` | `/chamados/:id/status`  | Atualiza o status          |

### 3. Front-end

Em outro terminal, a partir da raiz do projeto:

```bash
cd frontend
npm install
npm run build
npm run serve
```

Abra o endereço exibido no terminal (normalmente `http://localhost:3000` ou, se essa porta estiver ocupada pela API, outra porta como `http://localhost:XXXXX`).

* `npm run build` compila os arquivos de `frontend/src` (TypeScript) para `frontend/js`.
* Durante o desenvolvimento, use `npm run watch` para recompilar automaticamente.
* O endereço da API usado pelo front-end fica em `frontend/src/config.ts`.

### Problemas comuns

| Erro | Causa provável |
|------|----------------|
| `P1000: Authentication failed` | Usuário ou senha incorretos no `DATABASE_URL` |
| `P1001: Can't reach database server` | PostgreSQL parado ou porta incorreta no `DATABASE_URL` |
| `Environment variable not found: DATABASE_URL` | Arquivo `backend/.env` não existe |
| Front-end não carrega os chamados | API não está rodando ou `API_URL` em `config.ts` está incorreta |

---

## Equipe

### Aluno 1 — API / Back-end
Responsável por:
* API REST
* Rotas
* Controllers
* CRUD
* Integração com Prisma
* Comunicação entre Front-end e Banco

### Aluno 2 — Front-end
Responsável por:
* Interface
* Páginas
* Formulários
* Dashboard
* Integração com a API

### Aluno 3 — Banco / Deploy
Responsável por:
* Modelagem do banco
* PostgreSQL
* Prisma
* Integração
* Deploy
* Documentação

---

## Funcionalidades planejadas

- [ ] Cadastro de usuários
- [ ] Login
- [ ] Criar chamados
- [ ] Listar chamados
- [ ] Visualizar chamado
- [ ] Editar chamado
- [ ] Alterar status
- [ ] Alterar prioridade
- [ ] Atribuir responsável
- [ ] Histórico de chamados
- [ ] Dashboard
- [ ] Deploy

---

## Git e Branches

O desenvolvimento será realizado utilizando Git e GitHub.

* A branch `main` será utilizada para versões estáveis do projeto.
* A branch `develop` será utilizada para integração das funcionalidades.
* As funcionalidades serão desenvolvidas em branches específicas.

### Exemplo:

```
main
└── develop
    ├── feature/api
    ├── feature/frontend
    └── feature/database
```

### Fluxo de desenvolvimento:

```
Branch
   ↓
Desenvolvimento
   ↓
Commit
   ↓
Push
   ↓
Pull Request
   ↓
Code Review
   ↓
Merge
```

---

## Scrum

O projeto será dividido em três Sprints.

### Sprint 1 — Estrutura
* Configuração do projeto
* Git e GitHub
* Front-end
* API
* Banco de dados
* Primeira integração

### Sprint 2 — Chamados
* CRUD de chamados
* Status
* Prioridade
* Responsável
* Histórico

### Sprint 3 — Finalização
* Dashboard
* Testes
* Correção de erros
* Documentação
* Deploy

---

## Kanban

As tarefas serão organizadas nas seguintes etapas:

```
BACKLOG
   ↓
A FAZER
   ↓
EM DESENVOLVIMENTO
   ↓
CODE REVIEW
   ↓
CONCLUÍDO
```

---

## Status do projeto

Em desenvolvimento.

O primeiro objetivo é validar a comunicação entre:

```
Front-end
    ↓
API
    ↓
Banco de dados
    ↓
API
    ↓
Front-end
```

Após essa etapa, serão desenvolvidas as funcionalidades do sistema de chamados.

---

## Licença

Projeto desenvolvido para fins acadêmicos.
