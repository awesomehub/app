import { createSelector } from '@ngrx/store';
import { AppState } from '@app';

export const selectListCollections = (state: AppState) => 
  Object.keys(state.collections).map(key => state.collections[key]);

export const selectListCollection = (id: string) => createSelector(selectListCollections, collections =>
  collections.find(collection => collection.id === id)
);

export const selectLists = (state: AppState) => 
  Object.keys(state.lists).map(key => state.lists[key]);

export const selectList = (id: string) => createSelector(selectLists, lists =>
  lists.find(list => list.id === id)
);
