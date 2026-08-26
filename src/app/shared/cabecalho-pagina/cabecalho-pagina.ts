import { Component, input } from '@angular/core';

/**
 * Componente reutilizável de UI.
 * Fica em `shared` porque não contém regra de negócio de nenhuma feature.
 */
@Component({
  selector: 'app-cabecalho-pagina',
  templateUrl: './cabecalho-pagina.html',
  styleUrl: './cabecalho-pagina.css',
})
export class CabecalhoPagina {
  readonly titulo = input.required<string>();
  readonly subtitulo = input<string>('');
}
