import { createSelector } from '@ngrx/store';
import { AppState } from '@app';
import { ListCollection, List } from '@app/lists';

export const selectListCollections = (state: AppState) => 
  Object.keys(state.collections).map(key => state.collections[key]);

export const selectListCollection = createSelector(
  selectListCollections,
  (collections, props) => 
    collections.find((collection: ListCollection) => 
      collection.id === props.id
    )
);

export const selectLists = (state: AppState) => 
  Object.keys(state.lists).map(key => state.lists[key]);

export const selectList = createSelector(
  selectLists,
  (lists, props) => 
    lists.find((list: List) => 
      list.id === props.id
    )
);
