# Sistema de Gerenciamento de Tarefas - Documentação

## Sumário
1. [Introdução](#introducao)
2. [Instalação](#instalacao)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Funcionalidades](#funcionalidades)
   - [Criação de Listas](#criacao-de-listas)
   - [Gerenciamento de Itens](#gerenciamento-de-itens)
   - [Visualização e Filtragem](#visualizacao-e-filtragem)
   - [Prioridade de Itens](#prioridade-de-itens)
5. [Regras de Negócio](#regras-de-negocio)
   - [Validação de Dados](#validacao-de-dados)
   - [Estado dos Itens](#estado-dos-itens)
   - [Ordenação e Destaque](#ordenacao-e-destaque)
6. [Persistência de Dados](#persistencia-de-dados)
7. [API](#api)
8. [Testes](#testes)
9. [Considerações Finais](#consideracoes-finais)

---

<a name="introducao"></a>
## 1. Introdução

O **Sistema de Gerenciamento de Tarefas** é uma aplicação web que permite aos usuários criar e gerenciar listas de tarefas com itens associados. Esta aplicação oferece funcionalidades como a criação de listas, adição, edição e remoção de itens dentro das listas, além de permitir o destaque de itens prioritários.

Este projeto foi desenvolvido utilizando **React** no frontend e **Spring Boot** no backend, com persistência de dados em um banco de dados relacional.

---

<a name="instalacao"></a>
## 2. Instalação

### Pré-requisitos:
- **Node.js** (versão 14.x ou superior)
- **Java 11** ou superior
- **Maven** (para gerenciar dependências do projeto Java)

### Passos para configurar o projeto:

1. **Clone o repositório:**
   
2. **Configuração do Backend**
   
- Execute o backend: mvn spring-boot:run
  
- Ou start no DemoApplication.Java

3. **Configuração do Frontend**

- Acesse a pasta do frontend e instale as dependências: npm install

- Inicie o frontend: npm start


**O frontend estará disponível em http://localhost:3000 e o backend em http://localhost:8080.**


<a name="estrutura-do-projeto"></a>

## 3. Estrutura do Projeto
   
**Frontend:**

- App.js: Componente principal que gerencia a renderização do layout e componentes.

- components/TaskList.js: Componente responsável por listar as listas de tarefas.

- components/TaskForm.js: Componente de formulário para criar novas listas.

- services/api.js: Serviço de comunicação com a API para operações CRUD.

**Backend (Spring Boot):**

- Controller: Gerencia as requisições HTTP e a comunicação com os serviços.

- Service: Contém a lógica de negócios e manipulação de dados.

- Repository: Interface para interação com o banco de dados.

- Model: Representa as entidades do sistema (Lista, Item).


<a name="funcionalidades"></a>


## 4. Funcionalidades
<a name="criacao-de-listas"></a>

**4.1 Criação de Listas**

O usuário pode criar várias listas de tarefas. Cada lista terá um nome único e pode conter múltiplos itens.

<a name="gerenciamento-de-itens"></a>

**4.2 Gerenciamento de Itens**

Dentro de cada lista, o usuário pode adicionar, editar, remover e marcar itens como concluídos ou pendentes. Cada item terá um título e um estado (completo ou pendente).

<a name="visualizacao-e-filtragem"></a>

**4.3 Visualização e Filtragem**

As listas podem ser visualizadas e organizadas em diferentes modos de filtragem, como exibir apenas itens completos, pendentes ou todos os itens de uma lista.

<a name="prioridade-de-itens"></a>

**4.4 Prioridade de Itens**

O usuário pode marcar itens dentro das listas como prioritários. Itens prioritários serão exibidos em destaque e terão prioridade na ordenação.

<a name="regras-de-negocio"></a>

## 5. Regras de Negócio
<a name="validacao-de-dados"></a>

**5.1 Validação de Dados**
Os itens dentro de uma lista precisam ter um título com um comprimento mínimo de 3 caracteres. Caso o usuário tente adicionar um item com título menor, uma mensagem de erro será exibida.

<a name="estado-dos-itens"></a>

**5.2 Estado dos Itens**
Cada item pode ser marcado como concluído ou pendente. O estado pode ser alterado manualmente pelo usuário a qualquer momento.

<a name="ordenacao-e-destaque"></a>

**5.3 Ordenação e Destaque**
Itens que são marcados como prioritários aparecem no topo da lista e são destacados visualmente.

<a name="persistencia-de-dados"></a>

## 6. Persistência de Dados
Todas as listas e itens são armazenados no backend quando está rodando na porta 8080. As operações de criação, atualização, remoção e recuperação de dados são realizadas e funcionais com o backend rodando na sua maquina

<a name="api"></a>

## 7. API
A API expõe os seguintes endpoints principais:

**GET /api/lists - Retorna todas as listas.**

**POST /api/lists - Cria uma nova lista.**

**PUT /api/lists/{id} - Atualiza uma lista.**

**DELETE /api/lists/{id} - Remove uma lista.**

**GET /api/lists/{id}/items - Retorna os itens de uma lista.**

**POST /api/lists/{id}/items - Adiciona um novo item à lista.**

**PUT /api/lists/{listId}/items/{itemId} - Atualiza um item da lista.**

**DELETE /api/lists/{listId}/items/{itemId} - Remove um item da lista.**

<a name="testes"></a>

## 8. Testes
Testes Automatizados:
A aplicação possui testes automatizados para validar as principais funcionalidades. Eles podem ser executados da seguinte forma:

**Frontend:**

Execute os testes com o comando: npm test

Os testes cobrem funcionalidades como a criação de listas, a adição de itens, a validação de dados e a verificação de estados.

<a name="consideracoes-finais"></a>

## 9. Considerações Finais
Este projeto foi desenvolvido para fornecer uma solução eficiente de gerenciamento de tarefas, com foco em usabilidade e organização. A estrutura do código foi planejada para ser modular e fácil de manter, utilizando práticas recomendadas como a separação entre frontend e backend, persistência de dados e a implementação de testes automatizados.






