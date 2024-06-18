<img src="https://i.imgur.com/uqfDFIT.png" alt="logo" width="200" />

# Hotel Trancinvânia

Hotel Trancinvânia é um projeto de sistema de gerenciamento de reservas de hotel, desenvolvido para a disciplina de Engenharia de Software e Sistemas (IF682) do CIn-UFPE, no curso de Engenharia da Computação. Este repositório contém tanto o backend quanto o frontend da aplicação.

## Índice

- [Visão Geral](#visão-geral)
- [Equipe](#equipe)
- [Tecnologias Utiizadas](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração e Instalação](#configuração-e-instalação)
- [Comandos Úteis](#comandos-úteis)

## Visão Geral
Este projeto é um sistema completo de gerenciamento de hotel, permitindo as seguintes features:
- Cadastro e Login
  - Usuário Hoteleiro e Cliente
  - Login com autenticação local e JWT
- .
- .

## Equipe
As pessoas que compõem a equipe são:
- Amanda Cristina Fernandes Medeiros de Lima (acfml)
- Bianca Duarte Santos (bds)
- Maria Letícia do Nascimento Gaspar (mlng)
- Matheus Augusto Monte Silva (mams4)
- Matheus Galdino de Lima Guilherme (mglg)
- Thais Neves de Souza (tns2)
- Victoria Barbosa Cesar Figueiredo (vbcf)

## Tecnologias

Utiliza tecnologias como Node.js, Express, TypeScript, Prisma, Docker, e Cypress para testes end-to-end.

## Estrutura do Projeto

Abaixo está a estrutura principal dos diretórios e arquivos do projeto:
- **backend**: Contém o código fonte do backend da aplicação.
  - **docker**: Configurações e dados do Docker.
  - **docs**: Documentação do backend.
  - **prisma**: Configurações e migrações do Prisma.
  - **src**: Código fonte do backend, incluindo controladores, serviços, repositórios, etc.
  - **tests**: Testes do backend.
- **config**: Scripts e configurações adicionais.
- **frontend**: Contém o código fonte do frontend da aplicação.
  - **cypress**: Testes end-to-end com Cypress.
  - **src**: Código fonte do frontend.

## Configuração e Instalação

### Pré-requisitos

- Node.js
- Docker
- Docker Compose

### Passos de Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/hotel-trancinvania.git
   cd hotel-trancinvania
    ```
2. Configure e inicie o backend:
   ```bash
     cd backend
    npm install
    docker-compose up
    npx prisma migrate dev
    npm run start
    ```
### Configuração do Banco de Dados
O banco de dados é configurado e gerenciado pelo Prisma. Certifique-se de que o Docker está em execução e que o serviço de banco de dados está ativo.

## Comandos Úteis
### Backend
- npm run dev: Inicia o servidor de desenvolvimento.
- npm run test: Executa os testes.
- npx prisma migrate dev: Executa migrações de banco de dados.
### Frontend
- npm run dev: Inicia o servidor de desenvolvimento.
- npm run build: Cria a aplicação para produção.
- npm run test: Executa os testes.
