import { Component } from '@angular/core';

import { CabecalhoPagina } from '../../shared/cabecalho-pagina/cabecalho-pagina';

@Component({
  selector: 'app-produtos',
  imports: [CabecalhoPagina],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css',
})
export class Produtos {}
