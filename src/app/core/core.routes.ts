import { Routes } from '@angular/router';

import { Error404Component } from './route-components';

export const routes: Routes = [
  // Routes for common error pages
  { path: '404', component: Error404Component }
];
