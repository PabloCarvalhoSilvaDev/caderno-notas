import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { TITULO_APLICACAO } from './titulo-aplicacao.config';

@Injectable()
export class TituloAplicacaoStrategy extends TitleStrategy {
  private readonly title = inject(Title);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const tituloPagina = this.buildTitle(snapshot);
    this.title.setTitle(
      tituloPagina ? `${tituloPagina} · ${TITULO_APLICACAO}` : TITULO_APLICACAO,
    );
  }
}
