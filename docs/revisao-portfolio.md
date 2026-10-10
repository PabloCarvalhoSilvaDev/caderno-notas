# Revisão de portfólio — Caderno de Notas

Leitura de recrutador registrada em 10 de outubro de 2026, a partir do código, do `README.md`, do `OBJETIVOS.md`, do `netlify.toml` e do histórico git local (38 commits, de 26 de agosto a 10 de outubro de 2026).

Este arquivo é um norte pessoal. Na raiz pública do repositório, o que um recrutador deve encontrar primeiro é o README com demo e capturas.

## Conferência no GitHub

Verificado de novo em 10 de outubro de 2026, direto na API e na página do repositório. A leitura anterior, que tratava o projeto como ausente do perfil, ficou desatualizada.

O repositório [PabloCarvalhoSilvaDev/caderno-notas](https://github.com/PabloCarvalhoSilvaDev/caderno-notas) está público, na branch `master`, no mesmo commit do git local (`da28747`). Ele aparece entre os repositórios do perfil, que agora tem 5 repositórios públicos. A descrição está boa. O campo de site aponta para [https://caderno-notas.netlify.app/notas](https://caderno-notas.netlify.app/notas), e essa página abre no estado vazio, com o título `Notas · Caderno de Notas`. Os topics agora são `angular` e `typescript`. Não há licença. O README publicado continua só com instalação: o link da demo está no `README.md` local, ainda sem commit nem push. `OBJETIVOS.md` está na raiz pública. A pasta `docs/` desta revisão ainda não foi enviada.

O repositório foi criado a partir do template `arquitetura-angular-recomendada`.

## Veredito

O código sustenta uma vaga júnior de Angular. O repositório já está público, com descrição, demo e topics `angular` e `typescript`. A triagem ainda esbarra nas capturas e no README publicado, que ainda não inclui o link da demo, e no checklist público de `OBJETIVOS.md`, que marca 10 de 56 itens.

## O que convence

Quem abre `src` vê Angular 20 de verdade: signals, `input()`, `inject()`, rotas com `loadChildren` e telas com `loadComponent`, formulário reativo e `TitleStrategy`. A pasta separa feature (`features/notas`), layout (`layout/principal`) e núcleo (`core` de tema, título e notificação).

O `localStorage` só é lido depois do render no browser (`afterNextRender` e `isPlatformBrowser`). A lista é prerender e `editar/:id` fica no cliente. TypeScript está em modo estrito, com `strictTemplates`. Os textos da interface estão em português.

Os testes da lista e do editor verificam comportamento visível: estado vazio, filtro, paginação por largura, preenchimento do formulário e exclusão. O `netlify.toml` já declara headers (`nosniff`, referrer, permissions) e uma CSP em modo report-only. O `README.md` ensina a clonar, instalar e subir o app.

## O que pesa

O produto é um caderno local. Sem uma frase sobre o problema e o limite escolhido, ele se mistura a dezenas de projetos de aula.

`OBJETIVOS.md` marca 10 de 56 critérios, quase só responsividade e parte da segurança. Lazy loading, hashing de build, README, redirecionamento de rota inválida e o fluxo de criar, buscar e excluir já estão no código. Quem lê o checklist antes do `src` conclui que o projeto parou no meio.

O `NotasService` — geração de id, JSON corrompido, data inválida, cota do storage — não tem teste. O `catch` da leitura devolve lista vazia em silêncio, e o `JSON.parse` confia no formato com um cast. A busca só aplica `trim` e `toLowerCase` (acentos ficam de fora). Depois de gravar, a lista ordena pelo id, do mais antigo ao mais novo.

O histórico mistura commits `feat` com mensagens como `verificando publish` e `correção de css parte 2`. O `server.ts` ainda conserva o comentário de exemplo da CLI, o que faz o SSR parecer scaffold. O `package.json` está em `0.0.0` e não declara `engines`, embora o README peça Node.js 20.19+ ou 22.12+.

## Ordem de melhoria

1. **README de portfólio.** Problema, URL da demo, stack e a decisão de prerender versus client já estão no `README.md`. Faltam as capturas.
2. **Ajustar a vitrine que já existe.** Descrição, site da demo e topics `angular` e `typescript` já estão no GitHub. O link da demo está no `README.md` local, ainda sem commit nem push. Faltam as capturas.
3. **Polir a lista e os botões.** O card mostra título e um trecho do texto, sem o id. Nova usa `--cor-sucesso`. Excluir está em `danger` e Cancelar em `secondary`.
4. **Testes do `NotasService`.** JSON corrompido, data inválida, id não numérico e gravação que não derruba a UI.
5. **Calibrar `OBJETIVOS.md`.** Marcar o que já existe ou tirar o arquivo da raiz pública. Do jeito atual, ele reduz a nota do projeto.
6. **GitHub Actions** com `npm test` e `npm run build` em cada push.
7. **`LICENSE`.** MIT é o padrão de portfólio. Sem licença, o uso do código fica indefinido.
8. **Nota curta de arquitetura.** Por que a lista é prerender e `editar/:id` é client. Por que `localStorage` e qual o limite consciente.

## Documentos

### Necessários

Entram na triagem.

| Documento | Estado | O que falta |
| --- | --- | --- |
| `README.md` | Pitch, demo, stack, decisão técnica (prerender, client, `localStorage`), funcionalidades e `npm test` / `npm run build` | No GitHub remoto ainda sem a seção **Capturas de tela** publicada (2 commits locais à frente) |
| Repositório público | Público, com descrição, site da demo e topics `angular` e `typescript` | `git push` para publicar `docs/capturas/` e o README com imagens |
| URL da demo | No campo *website* do GitHub e no README (local e remoto) | Nada |
| Capturas | Quatro WebP em `docs/capturas/` (lista vazia, lista preenchida, criação, edição), ligadas no README local | Enviar ao remoto; opcional: versões em largura de celular, se quiser bater com “desktop e celular” |
| `LICENSE` | MIT na raiz (`LICENSE`) | Nada |

### Interessantes

Mudam a conversa da entrevista.

| Documento | Estado | Valor |
| --- | --- | --- |
| `OBJETIVOS.md` calibrado | Existe e está atrás do código | Mostra critério quando os itens batem com o que está implementado |
| Decisões de arquitetura | Ausente | Meia página: signals, prerender versus client, `localStorage`, PrimeNG |
| CI em `.github/workflows` | Ausente | Prova que teste e build rodam fora da máquina local |
| `engines` no `package.json` | Ausente | Alinha o manifesto ao Node pedido no README |

### Complementares

Só depois que os grupos anteriores existirem.

| Documento | Quando vale |
| --- | --- |
| `CHANGELOG.md` | Depois da primeira versão apresentada como 1.0 |
| `SECURITY.md` | Três linhas: dados só no navegador, CSP ainda em report-only, o que não guardar no app |
| Badge de build no README | Depois do workflow existir. Badge quebrado piora a primeira impressão |
| Nota de design | Os tokens de cor e tipo já estão em `styles.css`. Uma frase liga isso a uma decisão visual |

Código de conduta, templates de issue e um guia longo de contribuição servem a projeto aberto com outras pessoas. Neste portfólio solo eles aumentam arquivo sem aumentar sinal técnico.

## Como isto entraria numa entrevista

A pergunta natural é o que acontece quando o JSON do navegador vem corrompido, e por que a lista é prerender enquanto a edição de uma nota é no cliente. Essa resposta, bem dada, vale mais do que mais uma tela.

Eu chamaria para uma vaga júnior de Angular com o repositório público, a demo no ar e o serviço de notas testado.
