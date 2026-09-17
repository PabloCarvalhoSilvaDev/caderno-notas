import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { provideRouter, Router } from '@angular/router';

import { NotasService } from '../notas';
import { EditorNota } from './editor-nota';

describe('EditorNota', () => {
  beforeEach(() => {
    localStorage.removeItem('caderno-notas.notas');
  });

  it('deve criar o componente', async () => {
    await TestBed.configureTestingModule({
      imports: [EditorNota],
      providers: [provideRouter([]), MessageService],
    }).compileComponents();

    const fixture = TestBed.createComponent(EditorNota);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve preencher o formulário ao abrir uma nota existente', async () => {
    await TestBed.configureTestingModule({
      imports: [EditorNota],
      providers: [provideRouter([]), MessageService],
    }).compileComponents();

    const nota = TestBed.inject(NotasService).adicionar(
      'Ideias para o caderno',
      'Lista clicável, editor único para criar e editar, exclusão no próprio editor.',
    );

    const fixture: ComponentFixture<EditorNota> = TestBed.createComponent(EditorNota);
    fixture.componentRef.setInput('id', nota.id);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.formulario.getRawValue()).toEqual(
      jasmine.objectContaining({
        titulo: 'Ideias para o caderno',
        texto: 'Lista clicável, editor único para criar e editar, exclusão no próprio editor.',
      }),
    );
    expect(fixture.componentInstance.dataCriacao()).toBeTruthy();
    expect(fixture.componentInstance.dataAtualizacao()).toBeTruthy();
  });

  it('deve excluir a nota e tirá-la do armazenamento', async () => {
    await TestBed.configureTestingModule({
      imports: [EditorNota],
      providers: [provideRouter([]), MessageService],
    }).compileComponents();

    const nota = TestBed.inject(NotasService).adicionar(
      'Ideias para o caderno',
      'Lista clicável, editor único para criar e editar, exclusão no próprio editor.',
    );

    const fixture: ComponentFixture<EditorNota> = TestBed.createComponent(EditorNota);
    fixture.componentRef.setInput('id', nota.id);
    fixture.detectChanges();
    await fixture.whenStable();

    const router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.resolveTo(true);

    fixture.componentInstance.excluirNota();

    expect(TestBed.inject(NotasService).buscarPorId(nota.id)).toBeUndefined();
    expect(router.navigate).toHaveBeenCalledWith(['/notas']);
  });
});
