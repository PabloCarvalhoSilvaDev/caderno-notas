import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { TituloAplicacaoStrategy } from './core/titulo/titulo-aplicacao.strategy';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { TEMA_CADERNO } from './core/tema/tema';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    { provide: TitleStrategy, useClass: TituloAplicacaoStrategy },
    provideAnimationsAsync(),
    MessageService,
    providePrimeNG({
      theme: {
        preset: TEMA_CADERNO,
        options: { darkModeSelector: false },
      },
    }),
  ],
};
