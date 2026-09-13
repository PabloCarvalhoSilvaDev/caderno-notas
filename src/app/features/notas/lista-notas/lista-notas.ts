import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Paginator, PaginatorState } from 'primeng/paginator';

import { Nota } from '../nota';
import { NotasService } from '../notas';

@Component({
  selector: 'app-lista-notas',
  imports: [DatePipe, FormsModule, RouterLink, AutoComplete, Paginator],
  templateUrl: './lista-notas.html',
  styleUrl: './lista-notas.css',
})
export class ListaNotas {
  private readonly notasService = inject(NotasService);
  protected readonly notas = this.notasService.notas;
  readonly busca = signal('');
  protected readonly sugestoes = signal<string[]>([]);
  protected readonly primeiroItem = signal(0);
  protected readonly itensPorPagina = signal(9);
  protected readonly opcoesItensPorPagina = [9, 18, 27];

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
