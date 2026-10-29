import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'docs',
    loadComponent: () =>
      import('./features/docs/docs.component').then(
        (module) => module.DocsComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
