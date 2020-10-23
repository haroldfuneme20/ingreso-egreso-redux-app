import { createReducer, on } from '@ngrx/store';
import { isLoadings, stopLoading, nombre } from './ui.actions';

// estado global de la app
// modelo del estado
export interface State {
    isLoadings: boolean;
    nombre: string;

}

// SET del estado inicial de la app
export const initialState: State = {

    // variables de la app puntos verdes
   isLoadings: false,
   nombre: 'harold'
}

// si es X accion entonces ...state(carge todo el estado y ponga isloading en true)
const _uiReducer = createReducer(
    // estado inicial que entra en el reducer
    initialState,
    // seleccion de acciones segun se disparen
    on(isLoadings, state => ({ ...state, isLoadings: true})),
    on(stopLoading, state => ({ ...state, isLoadings: false})),
    on(nombre, state => ({ ...state, nombre: 'prueba de accion'})),

);

// Reducer del ui
export function uiReducer(state, action) {
    return _uiReducer(state, action);
}