# Objetivos básicos do Caderno de Notas

Lista de critérios que o projeto deve cumprir. Use como norte de qualidade ao implementar, revisar e evoluir a aplicação.

Contexto: aplicação Angular no navegador, com persistência em `localStorage` e sem backend.

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

- [ ] Texto das notas é renderizado de forma segura (sem interpretar HTML/script digitado pelo usuário).
- [ ] IDs e rotas não permitem ações inesperadas por valores malformados.
- [ ] Dados lidos do `localStorage` são validados antes de entrar no estado da aplicação (JSON inválido, campos ausentes, tipos errados).
- [ ] Confirmação obrigatória antes de excluir nota.
- [ ] Não expor dados sensíveis em logs, títulos de página ou mensagens de erro detalhadas.
- [ ] Dependências atualizadas; builds de produção sem source maps públicos desnecessários.
- [ ] Headers e CSP adequados quando houver hospedagem (evitar `unsafe-inline` sem necessidade).

Limite consciente: `localStorage` é visível no próprio navegador. Não armazenar senhas, tokens ou dados que precisem de confidencialidade real.

## 3. Desempenho

- [ ] Primeira tela útil rápida (lista de notas sem espera perceptível em máquina comum).
- [ ] Rotas carregadas sob demanda (`loadChildren` / lazy loading) para o que não for essencial no boot.
- [ ] Listas grandes não travam a UI (busca, renderização e atualização de signals eficientes).
- [ ] Evitar recálculos e re-renders desnecessários (signals, `computed`, `track` em `@for`).
- [ ] Assets leves; ícones e temas sem inflar o bundle além dos orçamentos do `angular.json`.
- [ ] Build de produção com hashing de arquivos e orçamentos de tamanho respeitados.
- [ ] Operações de `localStorage` pontuais (não serializar a cada tecla sem necessidade).

## 4. Acessibilidade

- [ ] Navegação completa por teclado (Tab, Enter, Escape em diálogos).
- [ ] Foco visível e ordem de foco lógica (lista → busca → editor → ações).
- [ ] Labels associados a campos; botões com nome acessível (não só ícone).
- [ ] Contraste suficiente em tema claro (e escuro, se existir).
- [ ] Mensagens de erro e sucesso anunciáveis (não só cor).
- [ ] Títulos de página coerentes com a tela atual.
- [ ] Componentes PrimeNG usados com ARIA padrão, sem quebrar leitores de tela.

## 5. Usabilidade e produto

- [ ] Criar, editar, buscar e excluir notas de ponta a ponta, sem estados quebrados.
- [ ] Busca por título e texto com feedback claro (incluindo “nenhum resultado”).
- [ ] Validação de título e texto com limites claros (obrigatório; título ≤ 60; texto ≤ 600).
- [ ] Datas de criação e última atualização visíveis e compreensíveis.
- [ ] Notificações de sucesso e aviso no momento certo, sem spam.
- [ ] Persistência imediata e previsível: recarregar a página mantém as notas.
- [ ] Estado vazio inicial compreensível (o que fazer na primeira visita).
- [ ] Confirmações destrutivas; ações reversíveis quando fizer sentido.

## 6. Integridade dos dados

- [ ] IDs estáveis e únicos; não colidir ao criar notas.
- [ ] Recuperação de armazenamento corrompido sem derrubar a aplicação.
- [ ] Datas serializadas e relidas corretamente (`Date` ↔ ISO/string).
- [ ] Limites de tamanho das notas respeitados também na persistência, não só no formulário.
- [ ] Comportamento definido quando o `localStorage` está cheio ou indisponível (modo privado, cota).

## 7. Qualidade de código e testes

- [ ] Componentes standalone, signals e rotas no padrão Angular 20 do repositório.
- [ ] Responsabilidades separadas (serviço de notas, UI, notificações, tema).
- [ ] Testes unitários das regras de negócio (CRUD, busca, validação, hidratação do storage).
- [ ] Testes dos fluxos principais da UI (criar, editar, excluir, buscar).
- [ ] Tipagem estrita; evitar `any` e dados “mágicos” espalhados.
- [ ] Nomes e textos da interface em português, consistentes com o restante do app.

## 8. Compatibilidade e robustez

- [ ] Funciona nos navegadores atuais (Chrome, Edge, Firefox, Safari recente).
- [ ] Sem depender de APIs sem fallback quando o ambiente não for browser (SSR/plataforma).
- [ ] Rotas inválidas redirecionam para um fluxo válido (`/notas`).
- [ ] Erros de usuário (validação) distintos de falhas inesperadas.
- [ ] Tema e `color-scheme` coerentes (claro/escuro, se ambos existirem).

## 9. Manutenção e entrega

- [ ] README atualizado (como rodar, stack, o que o app faz).
- [ ] `npm start`, `npm test` e `npm run build` funcionando.
- [ ] Sem segredos no repositório.
- [ ] Commits e PRs pequenos, com propósito claro.
- [ ] Dependências justificadas; PrimeNG/PrimeIcons usados de forma consistente.

---

## Prioridade sugerida

1. Fluxo de notas correto e persistência confiável.
2. Responsividade e usabilidade no celular.
3. Segurança de renderização e validação do storage.
4. Acessibilidade e desempenho.
5. Cobertura de testes e higiene de entrega.

Este arquivo descreve o *dever ser*. Itens já implementados podem ser marcados; o restante vira backlog consciente, não escopo implícito de cada tarefa.
