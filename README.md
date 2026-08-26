# Arquitetura Angular Recomendada

Projeto Angular 20 alinhado ao [Style Guide oficial](https://angular.dev/style-guide), com componentes standalone e organização por feature. Pastas, arquivos e classes usam o mesmo nome em pt-BR.

## Estrutura

```
src/
├── app/
│   ├── core/                   # Infraestrutura global (quando necessária)
│   │   └── titulo/             # titulo-aplicacao.config.ts, titulo-aplicacao.strategy.ts
│   ├── shared/                 # UI reutilizável, sem regra de negócio
│   │   └── cabecalho-pagina/   # cabecalho-pagina.ts → CabecalhoPagina
│   ├── layout/                 # Shell da aplicação
│   │   ├── principal/          # principal.ts → Principal
│   │   └── menu-lateral/       # menu-lateral.ts → MenuLateral
│   ├── features/               # Áreas funcionais carregadas sob demanda
│   │   ├── inicio/             # inicio.ts → Inicio
│   │   ├── sobre/              # sobre.ts → Sobre
│   │   └── produtos/           # produtos.ts → Produtos
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── app.ts
├── main.ts
└── styles.css
```

## Camadas

| Pasta         | O que vai aqui                                      | O que não vai                          |
| ------------- | --------------------------------------------------- | --------------------------------------- |
| `core/`     | Auth, interceptors,`TitleStrategy`, config de app | Componentes de tela, lógica de feature |
| `shared/`   | Botões, cabeçalhos, pipes, directives genéricos  | Serviços com regra de negócio         |
| `layout/`   | Header, menu lateral, shell                         | Páginas de feature                     |
| `features/` | Tudo de um domínio (UI + serviços locais)         | Infraestrutura global                   |

Crie `core/` somente quando houver infraestrutura global real. Neste projeto, `core/titulo`
define o título em `titulo-aplicacao.config.ts` e compõe as abas no formato `Início · Arquitetura Angular`.

## Princípios do Style Guide

1. **Organize por feature**, não por tipo (`components/`, `services/`, `pipes/`).
2. **Agrupe arquivos relacionados** no mesmo diretório (`.ts`, `.html`, `.css`, `.spec.ts`).
3. **Um conceito por arquivo** (um componente/serviço por arquivo, em geral).
4. **Nome consistente**: pasta = arquivo = classe (`produtos/produtos.ts` → `Produtos`).
5. Use `loadComponent` para telas isoladas e `loadChildren` quando uma feature possuir várias rotas.

## Como adicionar uma feature

```bash
mkdir src/app/features/clientes
ng generate component features/clientes/clientes --standalone
```

Para uma única tela, registre diretamente em `app.routes.ts`:

```ts
{
  path: 'clientes',
  title: 'Clientes',
  loadComponent: () =>
    import('./features/clientes/clientes').then((m) => m.Clientes),
}
```

## Scripts

```bash
npm start      # ng serve
npm run build  # build de produção
npm test       # testes unitários
```
