import { Routes } from '@angular/router';

import { Error404Page } from './pages';

export const routes: Routes = [
  // Routes for common error pages
  { path: '404', component: Error404Page }
];
