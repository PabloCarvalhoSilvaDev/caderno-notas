# Objetivos básicos do Caderno de Notas

Lista de critérios que o projeto deve cumprir. Use como norte de qualidade ao implementar, revisar e evoluir a aplicação.

Contexto: aplicação Angular no navegador, com persistência em `localStorage` e sem backend.

Conferido no código em 10 de outubro de 2026. O que está marcado o projeto já faz. O restante é backlog.

---

## 1. Responsividade

- [X] Layout utilizável em celular, tablet e desktop (larguras típicas: ~360px, ~768px, ~1024px+).
- [X] Lista e editor não exigem rolagem horizontal desnecessária.
- [X] Áreas de toque (botões, itens da lista, confirmações) têm tamanho adequado em tela pequena.
- [X] Formulários e campos de texto ocupam a largura disponível sem quebrar o layout.
- [X] Menu, cabeçalho e diálogos se adaptam ao espaço (sem sobrepor conteúdo essencial).
- [X] Tipografia e espaçamento permanecem legíveis em zoom e em telas densas.

## 2. Segurança

Mesmo sem servidor, o conteúdo das notas é dado do usuário e deve ser tratado com cuidado.

- [X] Texto das notas é renderizado de forma segura (sem interpretar HTML/script digitado pelo usuário).
- [X] IDs e rotas não permitem ações inesperadas por valores malformados.
- [X] Dados lidos do `localStorage` são validados antes de entrar no estado da aplicação (JSON inválido, campos ausentes, tipos errados).
- [X] Confirmação obrigatória antes de excluir nota.
- [X] Não expor dados sensíveis em logs, títulos de página ou mensagens de erro detalhadas.
- [X] Dependências atualizadas; builds de produção sem source maps públicos desnecessários.
- [ ] Headers e CSP adequados quando houver hospedagem (evitar `unsafe-inline` sem necessidade).

Limite consciente: `localStorage` é visível no próprio navegador. Não armazenar senhas, tokens ou dados que precisem de confidencialidade real.

## 3. Desempenho

- [X] Primeira tela útil rápida (lista de notas sem espera perceptível em máquina comum).
- [X] Rotas carregadas sob demanda (`loadChildren` / lazy loading) para o que não for essencial no boot.
- [X] Listas grandes não travam a UI (busca, renderização e atualização de signals eficientes).
- [X] Evitar recálculos e re-renders desnecessários (signals, `computed`, `track` em `@for`).
- [X] Assets leves; ícones e temas sem inflar o bundle além dos orçamentos do `angular.json`.
- [X] Build de produção com hashing de arquivos e orçamentos de tamanho respeitados.
- [X] Operações de `localStorage` pontuais (não serializar a cada tecla sem necessidade).

## 4. Acessibilidade

- [ ] Navegação completa por teclado (Tab, Enter, Escape em diálogos).
- [ ] Foco visível e ordem de foco lógica (lista → busca → editor → ações).
- [X] Labels associados a campos; botões com nome acessível (não só ícone).
- [ ] Contraste suficiente em tema claro (e escuro, se existir).
- [X] Mensagens de erro e sucesso anunciáveis (não só cor).
- [X] Títulos de página coerentes com a tela atual.
- [X] Componentes PrimeNG usados com ARIA padrão, sem quebrar leitores de tela.

## 5. Usabilidade e produto

- [X] Criar, editar, buscar e excluir notas de ponta a ponta, sem estados quebrados.
- [X] Busca por título e texto com feedback claro (incluindo “nenhum resultado”).
- [X] Validação de título e texto com limites claros (obrigatório; título ≤ 60; texto ≤ 600).
- [X] Datas de criação e última atualização visíveis e compreensíveis.
- [X] Notificações de sucesso e aviso no momento certo, sem spam.
- [X] Persistência imediata e previsível: recarregar a página mantém as notas.
- [X] Estado vazio inicial compreensível (o que fazer na primeira visita).
- [X] Confirmações destrutivas; ações reversíveis quando fizer sentido.

## 6. Integridade dos dados

- [X] IDs estáveis e únicos; não colidir ao criar notas.
- [X] Recuperação de armazenamento corrompido sem derrubar a aplicação.
- [X] Datas serializadas e relidas corretamente (`Date` ↔ ISO/string).
- [ ] Limites de tamanho das notas respeitados também na persistência, não só no formulário.
- [X] Comportamento definido quando o `localStorage` está cheio ou indisponível (modo privado, cota).

## 7. Qualidade de código e testes

- [X] Componentes standalone, signals e rotas no padrão Angular 20 do repositório.
- [X] Responsabilidades separadas (serviço de notas, UI, notificações, tema).
- [X] Testes de hidratação e integridade do storage no `NotasService` (JSON, datas, ids, cota).
- [ ] Testes unitários de adicionar, atualizar, busca no serviço e validação.
- [X] Testes de UI na lista (vazio, filtro) e no editor (preencher, excluir).
- [ ] Testes de UI de criar nota e de validação do formulário.
- [X] Tipagem estrita; evitar `any` e dados “mágicos” espalhados.
- [X] Nomes e textos da interface em português, consistentes com o restante do app.

## 8. Compatibilidade e robustez

- [ ] Funciona nos navegadores atuais (Chrome, Edge, Firefox, Safari recente).
- [X] Sem depender de APIs sem fallback quando o ambiente não for browser (SSR/plataforma).
- [X] Rotas inválidas redirecionam para um fluxo válido (`/notas`).
- [ ] Erros de usuário (validação) distintos de falhas inesperadas.
- [X] Tema e `color-scheme` coerentes (claro/escuro, se ambos existirem).

## 9. Manutenção e entrega

- [X] README atualizado (como rodar, stack, o que o app faz).
- [X] `npm start`, `npm test` e `npm run build` funcionando.
- [X] Sem segredos no repositório.
- [ ] Commits e PRs pequenos, com propósito claro.
- [X] Dependências justificadas; PrimeNG/PrimeIcons usados de forma consistente.
- [X] `SECURITY.md` na raiz (limites do app local e reporte).

---

## Prioridade sugerida

1. Fluxo de notas correto e persistência confiável.
2. Responsividade e usabilidade no celular.
3. Segurança de renderização e validação do storage.
4. Acessibilidade e desempenho.
5. Cobertura de testes e higiene de entrega.

Este arquivo descreve o *dever ser*. Itens já implementados podem ser marcados; o restante vira backlog consciente, não escopo implícito de cada tarefa.
