import { TestBed } from '@angular/core/testing';

import { CabecalhoPagina } from './cabecalho-pagina';

describe('CabecalhoPagina', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CabecalhoPagina],
    }).compileComponents();
  });

  it('deve criar o componente', () => {
    const fixture = TestBed.createComponent(CabecalhoPagina);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve renderizar título e subtítulo', () => {
    const fixture = TestBed.createComponent(CabecalhoPagina);
    fixture.componentRef.setInput('titulo', 'Produtos');
    fixture.componentRef.setInput('subtitulo', 'Lista de produtos');
    fixture.detectChanges();

    const elemento = fixture.nativeElement as HTMLElement;
    expect(elemento.querySelector('h1')?.textContent).toBe('Produtos');
    expect(elemento.querySelector('p')?.textContent).toBe('Lista de produtos');
  });
});
