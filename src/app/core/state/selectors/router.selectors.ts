import { createSelector, createFeatureSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterState } from '../models';
import { AppState } from '../../../app.state';

export const selectRouterReducerState = createFeatureSelector<AppState, RouterReducerState<RouterState>>(
	'router'
);

export const selectRouterState = createSelector(
  selectRouterReducerState,
  router => router ? router.state : null
);
