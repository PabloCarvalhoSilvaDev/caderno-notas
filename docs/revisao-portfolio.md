# Revisão de portfólio — Caderno de Notas

Leitura de recrutador em 10 de outubro de 2026, a partir do código, do `README.md`, do `OBJETIVOS.md`, do `SECURITY.md`, do `netlify.toml` e do histórico git.

Este arquivo é um norte pessoal. Na raiz pública, o recrutador deve encontrar primeiro o README com demo e capturas.

## Conferência no GitHub

O repositório [PabloCarvalhoSilvaDev/caderno-notas](https://github.com/PabloCarvalhoSilvaDev/caderno-notas) está público na branch `master`.

Descrição e campo *website* apontam para [https://caderno-notas.netlify.app/notas](https://caderno-notas.netlify.app/notas). Topics: `angular` e `typescript`. Há `LICENSE` (MIT) e `SECURITY.md`. O README traz pitch, demo, stack, **Decisão técnica**, capturas em `docs/capturas/`, funcionalidades, link para segurança, e `npm test` / `npm run build`. O `package.json` declara `engines` (Node 20.19+ ou 22.12+). CI em `.github/workflows/ci.yml` roda teste e build a cada push.

## Veredito

Os requisitos de triagem estão atendidos: repositório público, demo no ar, README de portfólio com capturas, licença, CI e código Angular 20 coerente com o que o README promete.

## O que convence

Angular 20 com signals, `input()`, `inject()`, lazy loading e prerender da lista com edição no cliente. `NotasService` hidrata no browser, valida storage adversos e tem testes; lista e editor têm testes de fluxo visível. TypeScript estrito, interface em português, separação feature / layout / core.

## Documentos obrigatórios

| Documento | Estado | Pendência |
| --- | --- | --- |
| `README.md` | Pitch, demo, stack, decisão técnica, capturas, funcionalidades, teste e build | Nada |
| Repositório público | Descrição, site da demo, topics, README e capturas no remoto | Nada |
| URL da demo | *Website* do GitHub e link no README | Nada |
| Capturas | Quatro WebP no README (`listaVazia`, `listaPreenchida`, `notaVazia`, `notaPreenchida`) | Nada |
| `LICENSE` | MIT na raiz | Nada |

## Interessantes

Não entram na triagem inicial; reforçam a conversa técnica. Nenhum item abaixo é obrigatório para portfólio.

| Documento | Estado | Obrigatório | Pendência |
| --- | --- | --- | --- |
| `OBJETIVOS.md` calibrado | 49 de 59 itens, alinhado ao código | Não | Nada |
| Decisões de arquitetura | Seção **Decisão técnica** no README | Não | Nada |
| CI (`.github/workflows/ci.yml`) | `npm test` headless e `npm run build` no push | Não | Nada |
| `engines` no `package.json` | Node 20.19+ ou 22.12+ | Não | Nada |

## Complementares

Extras de repositório maduro. Nenhum é obrigatório para este portfólio.

| Documento | Estado | Obrigatório | Pendência |
| --- | --- | --- | --- |
| `CHANGELOG.md` | Ausente (`version` 0.0.0) | Não | Nada exigido |
| `SECURITY.md` | Na raiz; link no README | Não | Nada exigido |
| Badge de CI no README | Ainda não incluído | Não | Nada exigido |
| Nota de design | Tokens em `styles.css`, sem doc dedicado | Não | Nada exigido |

Código de conduta, templates de issue e guia longo de contribuição não são obrigatórios em portfólio solo.

## Entrevista

Pergunta provável: JSON corrompido no navegador e por que a lista é prerender e a edição é no cliente. A resposta está no README (**Decisão técnica**), no `NotasService` testado e nos limites do `SECURITY.md`.
