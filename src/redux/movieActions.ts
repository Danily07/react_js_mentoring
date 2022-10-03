import { createAction } from 'redux-actions';
import { Movie } from '../components/main-component/main-component';

export enum OrderBy {
    Release,
    Score,
    Popularity,
}

export interface editPayloadType {
    movieToEdit: Movie;
}

export interface orderPayloadType {
    orderType: OrderBy;
}

export interface saveEditPayloadType {
    changedMovie: Movie;
}

export interface deletePayloadType {
    movieId: string;
}


const EDIT_MOVIE_ACTION = 'ADD';
const ADD_MOVIE_ACTION = 'EDIT';
const ORDER_ACTION = 'SORT';
const END_EDIT_ACTION = 'SUBMIT';
const DELETE_MOVIE_ACTION = 'DELETE';
const SIDE_EFFECT_ACTION = 'SIDE_EFFECT';

export type AnyActionType =
    | typeof EDIT_MOVIE_ACTION
    | typeof ADD_MOVIE_ACTION
    | typeof ORDER_ACTION
    | typeof END_EDIT_ACTION
    | typeof DELETE_MOVIE_ACTION
    | typeof SIDE_EFFECT_ACTION;

export const addMovieAction = createAction<void>(EDIT_MOVIE_ACTION);
export const editMovieAction = createAction<editPayloadType>(ADD_MOVIE_ACTION);
export const orderAction = createAction<orderPayloadType>(ORDER_ACTION);
export const endEditAction = createAction<saveEditPayloadType>(END_EDIT_ACTION);
export const deleteMovieAction =
    createAction<deletePayloadType>(DELETE_MOVIE_ACTION);
export const sideEffectAction =
    createAction<deletePayloadType>(SIDE_EFFECT_ACTION);

export type AnyActionCreatorType =
    | typeof addMovieAction
    | typeof editMovieAction
    | typeof orderAction
    | typeof endEditAction
    | typeof deleteMovieAction
    | typeof sideEffectAction;

export type AnyActionPayloadType = ReturnType<AnyActionCreatorType>['payload'];

const allActions = {
    addMovieAction,
    editMovieAction,
    orderAction,
    endEditAction,
    deleteMovieAction,
    sideEffectAction,
};

export const actions = allActions as Readonly<typeof allActions>;
