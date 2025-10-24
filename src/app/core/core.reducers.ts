import { isDevMode } from '@angular/core'
import { MetaReducer } from '@ngrx/store'
import type { AppState } from '@app/app.state'
import { debugReducer } from './state'

export const coreMetaReducers: MetaReducer<AppState>[] = isDevMode() ? [debugReducer] : []
