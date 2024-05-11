import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'page1',
    loadComponent: () => import('./page1/page1.component').then(m => m.Page1Component)
  },
  {
    path: 'page2',
    loadComponent: () => import('./page2/page2.component').then(m => m.Page2Component)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
