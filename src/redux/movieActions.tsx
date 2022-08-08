import { createAction} from 'redux-actions';
import { Movie } from '../components/main-component/main-component';

export enum OrderBy {
    Release,
    Score,
    Popularity,
}

export interface editPayloadType {
    movieId: string
}

export interface orderPayloadType {
    orderType: OrderBy
}

export interface saveEditPayloadType {
    changedMovie: Movie
}

export interface deletePayloadType {
    movieId: string
}

export const addMovieAction = createAction('ADD');
export const editMovieAction = createAction<editPayloadType>('EDIT')
export const orderAction = createAction<orderPayloadType>('SORT')
export const endEditAction = createAction<saveEditPayloadType>('SUBMIT') 
export const deleteMovieAction = createAction<deletePayloadType>('DELETE')