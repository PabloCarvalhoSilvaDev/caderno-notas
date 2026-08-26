import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { MenuLateral } from '../menu-lateral/menu-lateral';

/**
 * Shell visual da aplicação (header + área de conteúdo).
 * Layout não é feature de negócio — fica separado em `layout/`.
 */
@Component({
  selector: 'app-principal',
  imports: [RouterLink, RouterOutlet, MenuLateral],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {
  protected menuLateralAberto = false;
  protected readonly nomeUsuario = 'Pablo Carvalho Silva';

  protected alternarMenuLateral(): void {
    this.menuLateralAberto = !this.menuLateralAberto;
  }
}
