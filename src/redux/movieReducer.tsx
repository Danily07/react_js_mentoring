import { handleActions, ReducerMapValue } from 'redux-actions';
import { Movie } from '../components/main-component/main-component';
import { generateUUID } from '../utils/Uuid-helper';
import {
    actions,
    AnyActionPayloadType,
    AnyActionType,
    OrderBy,
} from './movieActions';
import { moviesData } from './movieDummyData';
import { MovieApplicationState } from './movieStore';

export const NEW_MOVIE_ID = 'new_movie_id';

const newMovie: Movie = {
    id: NEW_MOVIE_ID,
    image: '',
    name: '',
    genre: '',
    releaseDate: null,
    rating: NaN,
    runtime: NaN,
    comment: '',
};

const reducerDictionary: Partial<
    Record<
        AnyActionType,
        ReducerMapValue<MovieApplicationState, AnyActionPayloadType>
    >
> = {
    ADD: state => ({
        ...state,
        editableMovie: newMovie,
    }),
    EDIT: (state, { payload }: ReturnType<typeof actions.editMovieAction>) => ({
        ...state,
        editableMovie: [...state.movieList, newMovie].find(
            item => item.id === payload.movieId,
        ),
    }),
    SORT: (state, { payload }: ReturnType<typeof actions.orderAction>) => ({
        ...state,
        movieList: OrderCatalog(state.movieList, payload.orderType),
    }),
    SUBMIT: (state, { payload }: ReturnType<typeof actions.endEditAction>) => ({
        movieList: SaveEditedMovie(state.movieList, payload.changedMovie),
        editableMovie: null,
    }),
    DELETE: (
        state,
        { payload }: ReturnType<typeof actions.deleteMovieAction>,
    ) => ({
        ...state,
        movieList: state.movieList
            .slice(0)
            .filter(mv => mv.id !== payload.movieId),
    }),
};

const getInitialState = (): MovieApplicationState => {
    return {
        movieList: moviesData,
        editableMovie: null,
    };
};

export const movieReducer = handleActions<
    MovieApplicationState,
    AnyActionPayloadType
>(
    //Question: types for store and action payload?
    reducerDictionary,
    //Question: duplicate preloaded state?
    getInitialState(),
);

function OrderCatalog(moviesList: Movie[], orderType: OrderBy) {
    const toDate = (strDate: string) =>
        strDate == null ? null : new Date(strDate);

    switch (orderType) {
        case OrderBy.Release:
            const newArrRelease = moviesList
                .slice(0)
                .sort((a, b) =>
                    toDate(a.releaseDate) > toDate(b.releaseDate) ? 1 : -1,
                );

            return newArrRelease;
        case OrderBy.Score:
            const newArr = moviesList
                .slice(0)
                .sort((a, b) => (a.rating > b.rating ? 1 : -1));

            return newArr;
        case OrderBy.Popularity:
            //[DI]: undefined
            return moviesList;
    }
}

function SaveEditedMovie(moviesList: Movie[], editedMovie: Movie) {
    if (editedMovie === null) {
        return moviesList;
    }

    if (editedMovie.id === NEW_MOVIE_ID) {
        return [...moviesList, { ...editedMovie, id: generateUUID() }];
    }

    return moviesList
        .slice(0)
        .map(m => (m.id === editedMovie.id ? editedMovie : m));
}
