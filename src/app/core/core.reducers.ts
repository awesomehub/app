import { MetaReducer } from '@ngrx/store'
import { AppState } from '@app'
import { environment } from '@constants'
import { debugReducer } from './state'

export const coreMetaReducers: MetaReducer<AppState>[] = !environment.production ? [debugReducer] : []
