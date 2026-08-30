import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ListaNotas } from './lista-notas';

describe('ListaNotas', () => {
  let fixture: ComponentFixture<ListaNotas>;

  beforeEach(async () => {
    localStorage.removeItem('caderno-notas.notas');

    await TestBed.configureTestingModule({
      imports: [ListaNotas],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaNotas);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve renderizar um card por nota', () => {
    const cards = (fixture.nativeElement as HTMLElement).querySelectorAll('.nota-card');
    expect(cards.length).toBe(2);
    expect(cards[0].textContent).toContain('Ideias para o caderno');
  });

  it('deve filtrar a lista pelo termo da busca', () => {
    fixture.componentInstance.busca.set('compras');
    fixture.detectChanges();

    const cards = (fixture.nativeElement as HTMLElement).querySelectorAll('.nota-card');
    expect(cards.length).toBe(1);
    expect(cards[0].textContent).toContain('Compras da semana');
  });
});
