

# Desafio técnico Veggi

## Como rodar o projeto:

 - Baixar o projeto

- Rodar o backend
```bash
cd backend
docker-compose up -d --build
```
- Rodar o frontend
```bash
cd frontend
yarn
yarn dev
```
  

## Proposta

Na Veggi estamos criando um novo serviço para controlar as tarefas dos usuários. Para isso precisamos que você desenvolva uma aplicação web com serviços **REST** e uma UI para exibir os dados.

Não há qualquer restrição de linguagem ou framework, mas utilizar **ReactJS** e **Angular** seria um diferencial.

  

Os modelos para essa aplicação serão:

| Usuário |
|-------------------------------|
| - Id |
| - Nome |

  
  

| Tarefa |
|-------------------------------|
| - Id |
| - Descrição |
| - Estado(feito, pendente) |
| - user_id |

  
  

## Requisitos

- Deve haver uma tela para listar os usuários.

- Deve haver uma opção para criar um usuário.

- Deve haver uma opção para excluir um usuário.

- Ao clicar em um usuário deve haver uma tela para listar suas tarefas. - Deve haver uma opção para criar uma nova tarefa.

- Deve haver uma opção para excluir uma tarefa.

- Deve haver uma opção para alterar o estado da tarefa.

## Para avaliar seu teste precisamos:

- Do código em um repositório público (como o GitHub).

- Um Readme no projeto explicando como rodar os servidores.

O foco da avaliação será em como você organiza seu código e estrutura a arquitetura.

