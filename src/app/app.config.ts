import { DOCUMENT } from '@angular/common';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, TitleStrategy, withComponentInputBinding } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';
import { aplicarTokens, TEMA_CADERNO } from './core/tema/tema';
import { TituloAplicacaoStrategy } from './core/titulo/titulo-aplicacao.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay()),
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
    provideAppInitializer(() => {
      aplicarTokens(inject(DOCUMENT).documentElement.style);
    }),
  ],
};
