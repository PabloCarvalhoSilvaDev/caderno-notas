import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { provideRouter } from '@angular/router';

import { Principal } from './principal';

describe('Principal', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Principal],
      providers: [provideRouter([]), MessageService],
    }).compileComponents();
  });

  it('deve criar o componente', () => {
    const fixture = TestBed.createComponent(Principal);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve exibir a marca da aplicação', () => {
    const fixture = TestBed.createComponent(Principal);
    fixture.detectChanges();

    const elemento = fixture.nativeElement as HTMLElement;
    expect(elemento.querySelector('.principal__marca')?.textContent).toContain('Caderno de Notas');
  });

  it('deve exibir o rodapé com o crédito do desenvolvedor', () => {
    const fixture = TestBed.createComponent(Principal);
    fixture.detectChanges();

    const elemento = fixture.nativeElement as HTMLElement;
    expect(elemento.querySelector('.principal__rodape')?.textContent).toContain(
      'Desenvolvido por Pablo Carvalho Silva',
    );
  });
});
