import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';

/**
 * Shell visual da aplicação (header + área de conteúdo + footer).
 * Layout não é feature de negócio — fica separado em `layout/`.
 */
@Component({
  selector: 'app-principal',
  imports: [RouterLink, RouterOutlet, Toast],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {

}
