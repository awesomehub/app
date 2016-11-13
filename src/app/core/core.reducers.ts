import { Reducers, MetaReducers } from '../common';

// Only import these module for typing
// Will be removed during TypeScript compilation since not directly used
import * as StoreLogger from 'ngrx-store-logger';
import * as StoreFreeze from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';

/**
 * Import reducer symbols
 */
import { resetReducer } from './state';
import { recordsetsReducer } from '../recordsets';

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 * Also ensure that these metareducers are loaded in dev environment only
 */
export const coreMetaReducers: MetaReducers = [ combineReducers ];

// The following will be dropped during production build
// Any modules required in here won't be part of the bundle
if ('production' !== ENV.APP_ENV) {
    const { storeFreeze } = <typeof StoreFreeze>require('ngrx-store-freeze');
    const { storeLogger } = <typeof StoreLogger>require('ngrx-store-logger');

    coreMetaReducers.unshift(storeFreeze, storeLogger({ collapsed: true }), resetReducer);
}

export const coreReducers: Reducers = {
    recordsets: recordsetsReducer,
};
