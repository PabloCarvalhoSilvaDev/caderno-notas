import { TestBed } from '@angular/core/testing';

import { Sobre } from './sobre';

describe('Sobre', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sobre],
    }).compileComponents();
  });

  it('deve criar o componente', () => {
    const fixture = TestBed.createComponent(Sobre);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve renderizar o cabeçalho da página', () => {
    const fixture = TestBed.createComponent(Sobre);
    fixture.detectChanges();

    const elemento = fixture.nativeElement as HTMLElement;
    expect(elemento.querySelector('h1')?.textContent).toBe('Sobre');
  });
});
