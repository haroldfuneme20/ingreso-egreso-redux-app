import { ActionReducerMap } from '@ngrx/store';
import * as uiReducer from './shared/ui.reducer';
import * as authReducer from './auth/auth.reducer';
// import { uiReducer, State } from './shared/ui.reducer';

// estado global de la app


export interface AppState {
    // se pone el estado de este reducer
    uiReducers: uiReducer.State;
    authReducers: authReducer.State;
}


// carga reducers desde su  componente
export const appReducers: ActionReducerMap<AppState> = {
    // se pone el estado en la const del modulo para que trabaje en toda la app
    // uiReducers :  es el nombre del reducer y "uiReducer.uiReducer" el contenido
    uiReducers: uiReducer.uiReducer,
    authReducers: authReducer.authReducer,
}