import { createSelector, createFeatureSelector } from '@ngrx/store'
import { RouterReducerState } from '@ngrx/router-store'
import { RouterState } from '../models'

export const selectRouterReducerState = createFeatureSelector<RouterReducerState<RouterState>>('router')

export const selectRouterState = createSelector(selectRouterReducerState, (router) => (router ? router.state : null))
