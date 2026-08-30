import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class Notificacao {
  private readonly mensagens = inject(MessageService);

  sucesso(detalhe: string, resumo = 'Sucesso'): void {
    this.mensagens.add({ severity: 'success', summary: resumo, detail: detalhe, life: 3000 });
  }

  aviso(detalhe: string, resumo = 'Atenção'): void {
    this.mensagens.add({ severity: 'warn', summary: resumo, detail: detalhe, life: 4000 });
  }
}
