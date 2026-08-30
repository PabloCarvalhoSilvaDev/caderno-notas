import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

import { Nota } from './nota';

const CHAVE_ARMAZENAMENTO = 'caderno-notas.notas';

const NOTAS_INICIAIS: Nota[] = [
  {
    id: '1',
    titulo: 'Ideias para o caderno',
    texto: 'Lista clicável, editor único para criar e editar, exclusão no próprio editor.',
    dataCriacao: new Date('2026-08-20'),
    dataAtualizacao: new Date('2026-08-28'),
  },
  {
    id: '2',
    titulo: 'Compras da semana',
    texto: 'Café, pão, leite e frutas.',
    dataCriacao: new Date('2026-08-25'),
    dataAtualizacao: new Date('2026-08-25'),
  },
];

@Injectable({
  providedIn: 'root',
})
export class NotasService {
  private readonly plataforma = inject(PLATFORM_ID);
  private readonly notasInternas = signal<Nota[]>(this.carregar());

  readonly notas = this.notasInternas.asReadonly();

  listar(): Nota[] {
    return [...this.notasInternas()];
  }

  buscarPorId(id: string): Nota | undefined {
    return this.notasInternas().find((nota) => nota.id === id);
  }

  adicionar(titulo: string, texto: string): Nota {
    const agora = new Date();
    const nota: Nota = {
      id: this.proximoId(this.notasInternas()),
      titulo,
      texto,
      dataCriacao: agora,
      dataAtualizacao: agora,
    };
    this.gravar([nota, ...this.notasInternas()]);
    return nota;
  }

  atualizar(id: string, titulo: string, texto: string): void {
    const atualizadas = this.notasInternas().map((nota) =>
      nota.id === id ? { ...nota, titulo, texto, dataAtualizacao: new Date() } : nota,
    );
    this.gravar(atualizadas);
  }

  excluir(id: string): boolean {
    const atuais = this.notasInternas();
    const restantes = atuais.filter((nota) => nota.id !== id);
    if (restantes.length === atuais.length) {
      return false;
    }
    this.gravar(restantes);
    return true;
  }

  private carregar(): Nota[] {
    if (!isPlatformBrowser(this.plataforma)) {
      return this.ordenarPorId(NOTAS_INICIAIS);
    }

    const bruto = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    if (!bruto) {
      const iniciais = this.ordenarPorId(NOTAS_INICIAIS);
      this.persistir(iniciais);
      return iniciais;
    }

    try {
      const lidas = JSON.parse(bruto) as Array<
        Omit<Nota, 'dataCriacao' | 'dataAtualizacao'> & {
          dataCriacao: string;
          dataAtualizacao: string;
        }
      >;
      const hidratadas = lidas.map((nota) => ({
        ...nota,
        dataCriacao: new Date(nota.dataCriacao),
        dataAtualizacao: new Date(nota.dataAtualizacao),
      }));
      const normalizadas = this.ordenarPorId(this.normalizarIds(hidratadas));
      this.persistir(normalizadas);
      return normalizadas;
    } catch {
      return this.ordenarPorId(NOTAS_INICIAIS);
    }
  }

  private gravar(notas: Nota[]): void {
    const ordenadas = this.ordenarPorId(notas);
    this.notasInternas.set(ordenadas);
    this.persistir(ordenadas);
  }

  private ordenarPorId(notas: Nota[]): Nota[] {
    return [...notas].sort((a, b) => Number(a.id) - Number(b.id));
  }

  private persistir(notas: Nota[]): void {
    if (!isPlatformBrowser(this.plataforma)) {
      return;
    }
    localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(notas));
  }

  private proximoId(notas: Nota[]): string {
    const maximo = notas.reduce((atual, nota) => {
      const numero = Number(nota.id);
      return Number.isInteger(numero) && numero > atual ? numero : atual;
    }, 0);
    return String(maximo + 1);
  }

  private normalizarIds(notas: Nota[]): Nota[] {
    let maximo = notas.reduce((atual, nota) => {
      const numero = Number(nota.id);
      return Number.isInteger(numero) && numero > atual ? numero : atual;
    }, 0);

    return notas.map((nota) => {
      if (/^\d+$/.test(nota.id)) {
        return nota;
      }
      maximo += 1;
      return { ...nota, id: String(maximo) };
    });
  }
}
