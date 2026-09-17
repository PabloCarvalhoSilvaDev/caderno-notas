import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

import { Nota } from './nota';

const CHAVE_ARMAZENAMENTO = 'caderno-notas.notas';

@Injectable({
  providedIn: 'root',
})
export class NotasService {
  private readonly plataforma = inject(PLATFORM_ID);
  private readonly notasInternas = signal<Nota[]>([]);
  private readonly armazenamentoSincronizado = signal(false);

  readonly notas = this.notasInternas.asReadonly();
  readonly armazenamentoPronto = this.armazenamentoSincronizado.asReadonly();

  constructor() {
    afterNextRender(() => {
      this.sincronizarDoArmazenamento();
      this.armazenamentoSincronizado.set(true);
    });
  }

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

  private sincronizarDoArmazenamento(): void {
    this.gravar(this.carregarDoArmazenamento());
  }

  private carregarDoArmazenamento(): Nota[] {
    const bruto = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    if (!bruto) {
      return [];
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
      return this.ordenarPorId(this.normalizarIds(hidratadas));
    } catch {
      return [];
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
