import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { TITULO_APLICACAO } from './app/core/titulo/titulo-aplicacao.config';

document.title = TITULO_APLICACAO;

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
