# Caderno de Notas

Aplicação web para criar, editar, buscar e excluir notas no navegador. Os dados ficam salvos no `localStorage`, sem backend.

## Funcionalidades

- Listagem de notas com data da última atualização
- Busca por título ou texto, com sugestões de autocomplete
- Criação e edição de notas no mesmo editor
- Exclusão com confirmação
- Validação de título (obrigatório, até 60 caracteres) e texto (obrigatório, até 600 caracteres)
- Datas de criação e atualização
- Notificações de sucesso e aviso
- Persistência local no navegador

## Tecnologias

- [Angular](https://angular.dev/) 20 (componentes standalone, signals e roteamento sob demanda)
- [TypeScript](https://www.typescriptlang.org/) 5.9
- [PrimeNG](https://primeng.org/) 20 e [PrimeIcons](https://primefaces.org/primeicons/)
- [RxJS](https://rxjs.dev/)
- [Karma](https://karma-runner.github.io/) e [Jasmine](https://jasmine.github.io/) para testes

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
