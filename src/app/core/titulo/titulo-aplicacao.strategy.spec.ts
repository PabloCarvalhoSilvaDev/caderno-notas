import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot } from '@angular/router';

import { TITULO_APLICACAO } from './titulo-aplicacao.config';
import { TituloAplicacaoStrategy } from './titulo-aplicacao.strategy';

describe('TituloAplicacaoStrategy', () => {
  let strategy: TituloAplicacaoStrategy;
  let title: Title;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TituloAplicacaoStrategy],
    });

    strategy = TestBed.inject(TituloAplicacaoStrategy);
    title = TestBed.inject(Title);
  });

  it('deve usar o título padrão quando a rota não define título', () => {
    strategy.updateTitle({} as RouterStateSnapshot);

    expect(title.getTitle()).toBe(TITULO_APLICACAO);
  });

  it('deve compor o título da página com o sufixo da aplicação', () => {
    spyOn(strategy, 'buildTitle').and.returnValue('Início');

    strategy.updateTitle({} as RouterStateSnapshot);

    expect(title.getTitle()).toBe(`Início · ${TITULO_APLICACAO}`);
  });
});
