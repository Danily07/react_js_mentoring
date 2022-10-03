import { createStore, applyMiddleware, compose } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { logger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension'
import { Movie } from '../components/main-component/main-component';
import { movieReducer } from './movieReducer';
import thunk from 'redux-thunk';

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

export const store = createStore(movieReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>;
export const useMovieSelector: TypedUseSelectorHook<RootState> = useSelector;