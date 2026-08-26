import { Component } from '@angular/core';

import { CabecalhoPagina } from '../../shared/cabecalho-pagina/cabecalho-pagina';

@Component({
  selector: 'app-sobre',
  imports: [CabecalhoPagina],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css',
})
export class Sobre {}
