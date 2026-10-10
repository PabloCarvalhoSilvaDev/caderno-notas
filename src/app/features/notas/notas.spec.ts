import { TestBed } from '@angular/core/testing';

import { NotasService } from './notas';

const CHAVE_ARMAZENAMENTO = 'caderno-notas.notas';

describe('NotasService', () => {
  beforeEach(() => {
    localStorage.removeItem(CHAVE_ARMAZENAMENTO);
    TestBed.configureTestingModule({});
  });

  it('deve carregar uma nota válida do navegador', () => {
    gravarNoNavegador([
      notaArmazenada({ id: '4', titulo: 'Guardada', texto: 'Conteúdo' }),
    ]);

    const [nota] = criarServico().listar();

    expect(nota.id).toBe('4');
    expect(nota.titulo).toBe('Guardada');
    expect(nota.texto).toBe('Conteúdo');
    expect(nota.dataCriacao).toEqual(new Date('2026-01-01T12:00:00.000Z'));
    expect(nota.dataAtualizacao).toEqual(new Date('2026-01-02T12:00:00.000Z'));
  });

  it('deve abrir a lista vazia quando o JSON está corrompido', () => {
    localStorage.setItem(CHAVE_ARMAZENAMENTO, '{');

    const servico = criarServico();

    expect(servico.armazenamentoPronto()).toBe(true);
    expect(servico.listar()).toEqual([]);
  });

  it('deve abrir a lista vazia quando o JSON não é uma lista', () => {
    localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify({ titulo: 'Não é lista' }));

    const servico = criarServico();

    expect(servico.armazenamentoPronto()).toBe(true);
    expect(servico.listar()).toEqual([]);
  });

  it('deve ignorar nota com data inválida e manter as demais', () => {
    gravarNoNavegador([
      notaArmazenada({ id: '1', titulo: 'Válida' }),
      notaArmazenada({ id: '2', titulo: 'Inválida', dataCriacao: 'ontem' }),
    ]);

    const notas = criarServico().listar();

    expect(notas.map((nota) => nota.titulo)).toEqual(['Válida']);
    expect(() => notas[0].dataAtualizacao.toISOString()).not.toThrow();
  });

  it('deve trocar id não numérico por um número livre', () => {
    gravarNoNavegador([
      notaArmazenada({ id: '2', titulo: 'Numerada' }),
      notaArmazenada({ id: 'rascunho', titulo: 'Sem número' }),
    ]);

    const notas = criarServico().listar();

    expect(notas.map((nota) => ({ id: nota.id, titulo: nota.titulo }))).toEqual([
      { id: '2', titulo: 'Numerada' },
      { id: '3', titulo: 'Sem número' },
    ]);
  });

  it('deve manter a nota na lista quando a gravação no navegador falha', () => {
    const servico = criarServico();
    spyOn(localStorage, 'setItem').and.throwError('QuotaExceededError');

    expect(() => servico.adicionar('Ideia', 'Texto da nota.')).not.toThrow();

    const notas = servico.listar();
    expect(notas.length).toBe(1);
    expect(notas[0].titulo).toBe('Ideia');
    expect(notas[0].texto).toBe('Texto da nota.');
  });
});

function criarServico(): NotasService {
  const servico = TestBed.inject(NotasService);
  TestBed.tick();
  return servico;
}

function gravarNoNavegador(notas: unknown[]): void {
  localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(notas));
}

function notaArmazenada(
  parcial: Partial<{
    id: string;
    titulo: string;
    texto: string;
    dataCriacao: string;
    dataAtualizacao: string;
  }>,
) {
  return {
    id: '1',
    titulo: 'Título',
    texto: 'Texto',
    dataCriacao: '2026-01-01T12:00:00.000Z',
    dataAtualizacao: '2026-01-02T12:00:00.000Z',
    ...parcial,
  };
}
