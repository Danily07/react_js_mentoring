import { fetchResult } from '../utils/fetchResult';
import {
    loadFailureAction,
    loadStarted,
    loadSuccessAction,
} from './movieActions';

import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { MovieApplicationState } from './movieStore';

export type AppDispatch = ThunkDispatch<MovieApplicationState, any, AnyAction>;

/**
 * A kind of wrapper under thunk, which can pass some arguments into the underling thunk
 * @param someUsefulArguments  - some arguments which are required for API call, i.e. movie identifier
 * @returns
 */
export const loadMoviesListThunk = (someUsefulArguments: object) => {
    return async function (dispatch, getState) {
        console.log(loadMoviesListThunk.name, 'START');
        dispatch(loadStarted());

        try {
            const result = await fetchResult<MovieResponeItem[]>(
                'http://localhost:4000/movies',
            );
            dispatch(loadSuccessAction(result));
        } catch (e) {
            dispatch(loadFailureAction(e));
        }
    };
};

export interface MovieResponeItem {
    budget: number;
    id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    revenue: number;
    runtime: number;
    tagline: string;
    vote_average: number;
    vote_count: number;
    genres: string[];
    title: string;
}
