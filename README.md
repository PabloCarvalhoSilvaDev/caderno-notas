# Caderno de Notas

## Solução de Problema

Guardar uma ideia rápida não deveria exigir conta, servidor nem sincronização. O Caderno de Notas é uma aplicação de navegador para criar, editar, buscar e excluir notas neste dispositivo. Os dados ficam no `localStorage` e somem se o armazenamento do navegador for limpo.

**Demo:** [caderno-notas.netlify.app/notas](https://caderno-notas.netlify.app/notas)

## Stack

- [Angular](https://angular.dev/) 20 — componentes standalone, signals e rotas sob demanda
- [TypeScript](https://www.typescriptlang.org/) 5.9
- [PrimeNG](https://primeng.org/) 20 e [PrimeIcons](https://primefaces.org/primeicons/)
- [RxJS](https://rxjs.dev/)
- [Karma](https://karma-runner.github.io/) e [Jasmine](https://jasmine.github.io/) para testes

## Decisão técnica

A lista e a tela de criação são prerender. A edição (`/notas/editar/:id`) renderiza no cliente, porque o id só existe depois que o usuário cria a nota.

O servidor nunca lê o `localStorage`. O `NotasService` hidrata as notas em `afterNextRender` e só grava quando `isPlatformBrowser` é verdadeiro. Até essa hidratação, a lista mostra o estado de carregamento em vez de uma lista vazia falsa.

<!--
Capturas — cole as imagens aqui, por exemplo:

![Lista de notas](docs/capturas/lista.png)
![Estado vazio](docs/capturas/vazio.png)
![Editor](docs/capturas/editor.png)
-->

## Funcionalidades

- Listagem de notas com data da última atualização
- Busca por título ou texto, com sugestões de autocomplete
- Criação e edição de notas no mesmo editor
- Exclusão com confirmação
- Validação de título (obrigatório, até 60 caracteres) e texto (obrigatório, até 600 caracteres)
- Datas de criação e atualização
- Notificações de sucesso e aviso
- Persistência local no navegador

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20.19+ ou 22.12+
- npm (incluído na instalação do Node.js)

## Instalação

```bash
git clone https://github.com/PabloCarvalhoSilvaDev/caderno-notas.git
cd caderno-notas
npm install
npm start
```

A aplicação fica disponível em `http://localhost:4200/`.

```bash
npm test
npm run build
```
