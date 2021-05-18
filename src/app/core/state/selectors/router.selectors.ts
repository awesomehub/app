import { createSelector, createFeatureSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { AppState } from '@app';
import { RouterState } from '../models';

export const selectRouterReducerState = createFeatureSelector<AppState, RouterReducerState<RouterState>>('router');

export const selectRouterState = createSelector(selectRouterReducerState, router =>
  router ? router.state : null
);
