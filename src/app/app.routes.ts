import { Routes } from '@angular/router';

import { Principal } from './layout/principal/principal';

export const routes: Routes = [
  {
    path: '',
    component: Principal,
    children: [
      {
        path: '',
        redirectTo: 'notas',
        pathMatch: 'full',
      },
      {
        path: 'notas',
        loadChildren: () => import('./features/notas/notas.routes').then((m) => m.NOTAS_ROUTES),
      }
    ],
  },
  {
    path: '**',
    redirectTo: '/notas',
  },
];
