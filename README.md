# Daily Diet API

API desenvolvida para o controle da dieta diária dos usuários, permitindo o registro, visualização e análise das refeições.

## Descrição do Projeto

A **Daily Diet API** foi projetada para ajudar os usuários a monitorarem sua alimentação diária, identificando se as refeições estão dentro ou fora da dieta e permitindo o acompanhamento das métricas relacionadas às refeições.

## Funcionalidades

- **Criação de Usuário**: Cada usuário pode se registrar para utilizar a API.
- **Autenticação de Usuário**: Identificação do usuário em cada requisição para segurança dos dados.
- **Registro de Refeições**: Cada refeição contém:
  - Nome
  - Descrição
  - Data e Hora
  - Status: dentro ou fora da dieta

### Operações nas Refeições

- **Criar Refeição**: Associada ao usuário logado, é possível registrar uma nova refeição.
- **Editar Refeição**: Permite atualizar qualquer dado de uma refeição previamente registrada.
- **Deletar Refeição**: Remove uma refeição associada ao usuário.
- **Listar Refeições**: Exibe todas as refeições de um usuário.
- **Visualizar Refeição**: Exibe os detalhes de uma única refeição.

### Métricas do Usuário

- **Quantidade Total de Refeições**: Total de refeições registradas pelo usuário.
- **Refeições na Dieta**: Total de refeições dentro da dieta.
- **Refeições Fora da Dieta**: Total de refeições fora da dieta.
- **Melhor Sequência na Dieta**: Contagem da melhor sequência de refeições dentro da dieta.

## Regras da Aplicação

1. Apenas o usuário que registrou a refeição pode visualizá-la, editá-la ou excluí-la.
2. Todas as operações de refeição e métricas são vinculadas ao usuário autenticado.

## Tecnologias Utilizadas

- **Node.js**: Plataforma utilizada para desenvolvimento da API.
- **Express/Fastify**: Framework para criação e gerenciamento das rotas.
- **JWT**: Para autenticação e controle de acesso dos usuários.
- **SQLite**: Banco de dados utilizado para persistência dos dados.
  
## Instruções de Uso

1. **Clone o Repositório**:
   ```bash
   git clone <URL-do-Repositório>

2. **Instale as dependências**:
   ```bash
   npm i

3. **Execute o projeto**:
   ```bash
   npm run dev
