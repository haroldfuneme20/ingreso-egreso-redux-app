import { createAction, props } from '@ngrx/store';

// acciones que se pueden disparar

export const isLoadings = createAction('[UI Component] isLoading');
export const stopLoading = createAction('[UI Component] stopLoading');
export const nombre = createAction('[UI Component] conPayload', props<{nombre}>());
