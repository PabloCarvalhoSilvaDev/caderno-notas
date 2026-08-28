import { Routes } from '@angular/router';

import { Principal } from './layout/principal/principal';

export const routes: Routes = [
  {
    path: '',
    component: Principal,
    children: [
      {
        path: '',
        title: 'Início',
        loadComponent: () => import('./features/inicio/inicio').then((m) => m.Inicio),
      },

    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
