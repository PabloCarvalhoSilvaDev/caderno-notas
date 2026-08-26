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
      {
        path: 'sobre',
        title: 'Sobre',
        loadComponent: () => import('./features/sobre/sobre').then((m) => m.Sobre),
      },
      {
        path: 'produtos',
        title: 'Produtos',
        loadComponent: () => import('./features/produtos/produtos').then((m) => m.Produtos),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
