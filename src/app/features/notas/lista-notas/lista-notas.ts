import { DatePipe } from '@angular/common';
import { afterNextRender, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Paginator, PaginatorState } from 'primeng/paginator';

import { Nota } from '../nota';
import { NotasService } from '../notas';

/** Celular: 4. Tablet 768–1024: 12. Desktop: 9. */
export function paginacaoPorLargura(
  estreita: boolean,
  tablet: boolean,
): { itens: number; opcoes: number[] } {
  if (estreita) {
    return { itens: 4, opcoes: [4, 8, 12] };
  }
  if (tablet) {
    return { itens: 12, opcoes: [12, 24, 36] };
  }
  return { itens: 9, opcoes: [9, 18, 27] };
}

@Component({
  selector: 'app-lista-notas',
  imports: [DatePipe, FormsModule, RouterLink, AutoComplete, Paginator],
  templateUrl: './lista-notas.html',
  styleUrl: './lista-notas.css',
})
export class ListaNotas {
  private readonly notasService = inject(NotasService);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly notas = this.notasService.notas;
  protected readonly armazenamentoPronto = this.notasService.armazenamentoPronto;
  readonly busca = signal('');
  protected readonly sugestoes = signal<string[]>([]);
  protected readonly primeiroItem = signal(0);
  protected readonly telaEstreita = signal(false);
  protected readonly telaTablet = signal(false);
  protected readonly itensPorPagina = signal(9);

  protected readonly opcoesItensPorPagina = computed(
    () => paginacaoPorLargura(this.telaEstreita(), this.telaTablet()).opcoes,
  );

  protected readonly notasFiltradas = computed(() => {
    const termo = this.normalizar(this.busca());
    const notas = this.notas();
    if (!termo) {
      return notas;
    }
    return notas.filter((nota) => this.corresponde(nota, termo));
  });

  protected readonly notasPaginadas = computed(() =>
    this.notasFiltradas().slice(this.primeiroItem(), this.primeiroItem() + this.itensPorPagina()),
  );

  constructor() {
    afterNextRender(() => {
      const estreita = matchMedia('(max-width: 640px)');
      const tablet = matchMedia('(min-width: 768px) and (max-width: 1024px)');
      const aplicar = () => {
        this.telaEstreita.set(estreita.matches);
        this.telaTablet.set(tablet.matches);
        this.itensPorPagina.set(paginacaoPorLargura(estreita.matches, tablet.matches).itens);
        this.primeiroItem.set(0);
      };
      aplicar();
      estreita.addEventListener('change', aplicar);
      tablet.addEventListener('change', aplicar);
      this.destroyRef.onDestroy(() => {
        estreita.removeEventListener('change', aplicar);
        tablet.removeEventListener('change', aplicar);
      });
    });
  }

  alterarBusca(termo: string): void {
    this.busca.set(termo);
    this.primeiroItem.set(0);
  }

  mudarPagina(evento: PaginatorState): void {
    this.primeiroItem.set(evento.first ?? 0);
    this.itensPorPagina.set(evento.rows ?? this.itensPorPagina());
  }

  sugerir(evento: AutoCompleteCompleteEvent): void {
    const termo = this.normalizar(evento.query);
    this.sugestoes.set(
      this.notas()
        .filter((nota) => this.corresponde(nota, termo))
        .map((nota) => nota.titulo),
    );
  }

  private corresponde(nota: Nota, termo: string): boolean {
    if (!termo) {
      return true;
    }
    return (
      this.normalizar(nota.titulo).includes(termo) || this.normalizar(nota.texto).includes(termo)
    );
  }

  private normalizar(valor: string): string {
    return valor.trim().toLowerCase();
  }
}
