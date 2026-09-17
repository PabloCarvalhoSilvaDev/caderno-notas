import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NotasService } from '../notas';
import { ListaNotas } from './lista-notas';

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

  it('deve exibir o estado vazio quando não há notas', () => {
    const elemento = fixture.nativeElement as HTMLElement;
    expect(elemento.querySelectorAll('.nota-card').length).toBe(0);
    expect(elemento.querySelector('.lista-notas__vazia')?.textContent).toContain(
      'Nenhuma nota ainda. Crie a primeira.',
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
