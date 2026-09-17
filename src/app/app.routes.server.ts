import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'notas',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'notas/nova',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'notas/editar/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
