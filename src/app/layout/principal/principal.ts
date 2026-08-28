import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

/**
 * Shell visual da aplicação (header + área de conteúdo).
 * Layout não é feature de negócio — fica separado em `layout/`.
 */
@Component({
  selector: 'app-principal',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {

}
