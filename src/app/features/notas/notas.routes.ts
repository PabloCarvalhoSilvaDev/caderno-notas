import { Routes } from '@angular/router';

export const NOTAS_ROUTES: Routes = [
  {
    path: '',
    title: 'Notas',
    loadComponent: () => import('./lista-notas/lista-notas').then((m) => m.ListaNotas),
  },
  {
    path: 'nova',
    title: 'Criar nota',
    loadComponent: () => import('./editor-nota/editor-nota').then((m) => m.EditorNota),
  },
  {
    path: 'editar/:id',
    title: 'Editar nota',
    loadComponent: () => import('./editor-nota/editor-nota').then((m) => m.EditorNota),
  },
];

