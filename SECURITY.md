# Segurança

O Caderno de Notas é uma aplicação **somente no navegador**. Não há backend, conta nem sincronização: as notas ficam na chave `caderno-notas.notas` do `localStorage` deste dispositivo.

## O que o app não garante

- **Confidencialidade.** Qualquer pessoa com acesso ao mesmo navegador ou perfil pode abrir as ferramentas de desenvolvedor e ler ou alterar as notas.
- **Durabilidade.** Limpar dados do site, modo privado restrito ou cota cheia pode apagar ou impedir gravar notas.
- **Isolamento entre sites.** Outros sites não leem o `localStorage` deste app (mesma origem), mas extensões maliciosas ou malware no computador podem.

**Não use o caderno para senhas, tokens, dados bancários, informações médicas ou qualquer conteúdo que exija confidencialidade real.**

## Medidas no código e na hospedagem

- Texto das notas é exibido como conteúdo escapado (sem interpretar HTML digitado pelo usuário).
- Dados lidos do `localStorage` passam por validação antes de entrar no estado (JSON inválido, tipos errados, datas inválidas).
- O build de produção no Netlify envia headers como `X-Content-Type-Options: nosniff`, `Referrer-Policy` e `Permissions-Policy` restritivas.
- A Content Security Policy está em modo **report-only** (`Content-Security-Policy-Report-Only` no `netlify.toml`), para observar violações antes de aplicar bloqueio.

## Reportar um problema

Se encontrar uma vulnerabilidade **no código deste repositório** (por exemplo, XSS persistente, bypass de CSP aplicável ou execução indevida de script):

1. **Não** abra issue pública com detalhes exploráveis.
2. Envie um e-mail para **pablocarvalhosilva2@gmail.com** com descrição, passos para reproduzir e impacto.

Problemas de dependências (`npm audit`) e melhorias genéricas podem ir em [Issues](https://github.com/PabloCarvalhoSilvaDev/caderno-notas/issues) públicas.

## Escopo fora deste projeto

Falhas no Netlify, no navegador ou em extensões instaladas pelo usuário não são corrigidas neste repositório, mas podem ser mencionadas no reporte para contexto.
