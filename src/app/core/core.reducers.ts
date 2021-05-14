import { MetaReducer } from '@ngrx/store';
import { debugReducer } from './state';
import { AppState } from '../app.state';
import { environment } from '../../environments/environment';

export const coreMetaReducers: Array<MetaReducer<AppState>> = !environment.production
	? [debugReducer]
	: [];

export { routerReducer } from '@ngrx/router-store';
