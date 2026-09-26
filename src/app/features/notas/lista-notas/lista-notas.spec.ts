import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NotasService } from '../notas';
import { ListaNotas, paginacaoPorLargura } from './lista-notas';

describe('ListaNotas', () => {
  let fixture: ComponentFixture<ListaNotas>;
  let notasService: NotasService;

  beforeEach(async () => {
    localStorage.removeItem('caderno-notas.notas');

    await TestBed.configureTestingModule({
      imports: [ListaNotas],
      providers: [provideRouter([])],
    }).compileComponents();

    notasService = TestBed.inject(NotasService);
    fixture = TestBed.createComponent(ListaNotas);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve exibir o estado vazio quando não há notas', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const elemento = fixture.nativeElement as HTMLElement;
    expect(elemento.querySelectorAll('.nota-card').length).toBe(0);
    expect(elemento.querySelector('.lista-notas__vazia')?.textContent).toContain(
      'Bem-vindo ao Caderno de Notas',
    );
  });

  it('deve renderizar um card por nota', () => {
    notasService.adicionar('Ideias para o caderno', 'Texto da primeira nota.');
    notasService.adicionar('Compras da semana', 'Café, pão, leite e frutas.');
    fixture.detectChanges();

    const cards = (fixture.nativeElement as HTMLElement).querySelectorAll('.nota-card');
    expect(cards.length).toBe(2);
    expect(cards[0].textContent).toContain('Ideias para o caderno');
  });

  it('deve paginar 12 itens no tablet 768–1024', () => {
    expect(paginacaoPorLargura(true, false)).toEqual({ itens: 4, opcoes: [4, 8, 12] });
    expect(paginacaoPorLargura(false, true)).toEqual({ itens: 12, opcoes: [12, 24, 36] });
    expect(paginacaoPorLargura(false, false)).toEqual({ itens: 9, opcoes: [9, 18, 27] });
  });

  it('deve filtrar a lista pelo termo da busca', () => {
    notasService.adicionar('Ideias para o caderno', 'Texto da primeira nota.');
    notasService.adicionar('Compras da semana', 'Café, pão, leite e frutas.');
    fixture.detectChanges();

    fixture.componentInstance.alterarBusca('compras');
    fixture.detectChanges();

    const cards = (fixture.nativeElement as HTMLElement).querySelectorAll('.nota-card');
    expect(cards.length).toBe(1);
    expect(cards[0].textContent).toContain('Compras da semana');
  });
});
