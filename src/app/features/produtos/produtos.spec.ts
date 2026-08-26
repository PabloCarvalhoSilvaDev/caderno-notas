import { TestBed } from '@angular/core/testing';

import { Produtos } from './produtos';

describe('Produtos', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Produtos],
    }).compileComponents();
  });

  it('deve criar o componente', () => {
    const fixture = TestBed.createComponent(Produtos);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve renderizar o cabeçalho da página', () => {
    const fixture = TestBed.createComponent(Produtos);
    fixture.detectChanges();

    const elemento = fixture.nativeElement as HTMLElement;
    expect(elemento.querySelector('h1')?.textContent).toBe('Produtos');
  });
});
