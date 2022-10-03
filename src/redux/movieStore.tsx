import { createStore, applyMiddleware, combineReducers } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { logger } from 'redux-logger';
import { Movie } from '../components/main-component/main-component';
import { movieReducer } from './movieReducer';
import { movieApi } from './movieApi';
import thunkMiddleware from 'redux-thunk'

export interface MovieContextType {
    movieList: Movie[];
    editableMovie: Movie;
}

// [AB]: currently context type is equals to the stor type, but in common case they are different
export interface MovieApplicationState {
    movieList: Movie[];
    editableMovie: Movie;
}

// const sagaMiddleware = createSagaMiddleware();

export const store = createStore(combineReducers({
    movieReducer,
    [movieApi.reducerPath]: movieApi.reducer
}), applyMiddleware(logger, thunkMiddleware, movieApi.middleware));

export type RootState = ReturnType<typeof store.getState>;
export const useMovieSelector: TypedUseSelectorHook<RootState> = useSelector;
