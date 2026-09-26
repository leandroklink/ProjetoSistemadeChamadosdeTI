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
