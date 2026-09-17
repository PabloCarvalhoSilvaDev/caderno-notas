import { formatDate } from '@angular/common';
import { Component, computed, inject, input, LOCALE_ID } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

import { Notificacao } from '../../../core/notificacao/notificacao';
import { NotasService } from '../notas';

const TITULO_MAXIMO = 60;
const TEXTO_MAXIMO = 600;

@Component({
  selector: 'app-editor-nota',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    ConfirmDialog,
    InputTextModule,
    TextareaModule,
    RouterLink,
  ],
  providers: [ConfirmationService],
  templateUrl: './editor-nota.html',
  styleUrl: './editor-nota.css',
})
export class EditorNota {
  readonly id = input<string>();
  readonly tituloMaximo = TITULO_MAXIMO;
  readonly textoMaximo = TEXTO_MAXIMO;

  private readonly fb = inject(FormBuilder);
  private readonly notasService = inject(NotasService);
  private readonly notificacao = inject(Notificacao);
  private readonly confirmacao = inject(ConfirmationService);
  private readonly router = inject(Router);
  private readonly locale = inject(LOCALE_ID);

  readonly formulario = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.maxLength(TITULO_MAXIMO)]],
    texto: ['', [Validators.required, Validators.maxLength(TEXTO_MAXIMO)]],
  });

  readonly nota = computed(() => {
    const id = this.id();
    return id ? this.notasService.buscarPorId(id) : undefined;
  });

  readonly dataCriacao = computed(() => {
    const nota = this.nota();
    return nota ? this.formatarData(nota.dataCriacao) : '';
  });

  readonly dataAtualizacao = computed(() => {
    const nota = this.nota();
    return nota ? this.formatarData(nota.dataAtualizacao) : '';
  });

  constructor() {
    toObservable(this.id)
      .pipe(takeUntilDestroyed())
      .subscribe((id) => this.preencherFormulario(id));

    toObservable(this.notasService.armazenamentoPronto)
      .pipe(takeUntilDestroyed())
      .subscribe((pronto) => {
        if (pronto) {
          this.preencherFormulario(this.id());
        }
      });
  }

  salvarNota() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.notificacao.aviso('Preencha título e texto para salvar.');
      return;
    }

    const { titulo, texto } = this.formulario.getRawValue();
    const id = this.id();

    if (id) {
      this.notasService.atualizar(id, titulo, texto);
      this.notificacao.sucesso('Nota atualizada.');
    } else {
      this.notasService.adicionar(titulo, texto);
      this.notificacao.sucesso('Nota criada.');
    }

    void this.router.navigate(['/notas']);
  }

  pedirExclusao(): void {
    const id = this.id();
    if (!id) {
      return;
    }

    this.confirmacao.confirm({
      header: 'Excluir nota',
      message: 'A nota será removida de forma permanente.',
      acceptLabel: 'Excluir',
      rejectLabel: 'Voltar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.excluirNota(),
    });
  }

  excluirNota(): void {
    const id = this.id();
    if (!id || !this.notasService.excluir(id)) {
      this.notificacao.aviso('Não foi possível excluir a nota.');
      return;
    }

    this.notificacao.sucesso('Nota excluída.');
    void this.router.navigate(['/notas']);
  }

  private preencherFormulario(id: string | undefined): void {
    if (!id) {
      this.formulario.reset({ titulo: '', texto: '' });
      return;
    }

    const nota = this.notasService.buscarPorId(id);
    if (nota) {
      this.formulario.reset({
        titulo: nota.titulo,
        texto: nota.texto,
      });
      return;
    }

    if (!this.notasService.armazenamentoPronto()) {
      return;
    }

    void this.router.navigate(['/notas']);
  }

  private formatarData(data: Date): string {
    return formatDate(data, 'dd/MM/yyyy HH:mm', this.locale);
  }
}
