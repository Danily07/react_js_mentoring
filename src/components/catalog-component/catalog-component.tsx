import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import {
    deleteMovieAction,
    deletePayloadType,
    editMovieAction,
    editPayloadType,
    endEditAction,
    orderAction,
    OrderBy,
    orderPayloadType,
    saveEditPayloadType,
} from '../../redux/movieActions';
import {
    selectEditableMovie,
    selectMovies,
    selectIsLoading,
    selectIsError,
} from '../../redux/movieSelectors';
import { useMovieSelector } from '../../redux/movieStore';
import { AppDispatch, loadMoviesListThunk } from '../../redux/movieThunks';
import EditMovie from '../edit-movie-component/edit-movie-component';
import { GenresSelector } from '../genres-selector-component/genres-selector-component';
import { ItemsCount } from '../items-count-component/items-count-component';
import { Movie } from '../main-component/main-component';
import { MovieItem } from '../movie-item-component/movie-item-component';
import Sort from '../sort-component/sort-component';
import './catalog-component.css';

const Catalog: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    useSelector(selectIsLoading);

    const moviesList: ReadonlyArray<Movie> = useMovieSelector(selectMovies);
    const editableMovie: Movie = useMovieSelector(selectEditableMovie);
    const isLoading = useMovieSelector(selectIsLoading);
    const isError = useMovieSelector(selectIsError);

    useEffect(() => {
        // if movie list isn't being loaded yet AND we don't have request's result (error OR list),
        // then dispatch thunk function
        if (!isLoading && !(isError || moviesList)) {
            dispatch(loadMoviesListThunk({}));
        }
        // important: do not forget necessory dependencies to avoid function's  erroneous context capture
    }, [dispatch, isLoading, isError, moviesList]);

    const submitDialogHandler = (movie: Movie) => {
        const payload: saveEditPayloadType = { changedMovie: movie };

        dispatch(endEditAction(payload));
    };

    const closeDialogHandler = () => {
        const payload: saveEditPayloadType = { changedMovie: null };

        dispatch(endEditAction(payload));
    };

    const orderByHandler = (orderType: OrderBy) => {
        const payload: orderPayloadType = { orderType: orderType };

        dispatch(orderAction(payload));
    };

    const deleteMovieHandler = (movieId: string) => {
        const payload: deletePayloadType = { movieId: movieId };

        dispatch(deleteMovieAction(payload));
    };

    const setEditableMovieIdHandler = (movieId: string) => {
        const payload: editPayloadType = { movieId: movieId };

        dispatch(editMovieAction(payload));
    };

    const getFullYear = (strDate: string) =>
        strDate == null ? NaN : new Date(strDate).getFullYear();

    return (
        <div className="catalog-body">
            <div className="nav-sort">
                <GenresSelector></GenresSelector>
                <Sort onOrderBy={orderByHandler} />
            </div>
            <div className="items-counter">
                <ItemsCount itemsCount={moviesList.length} />
            </div>
            <div className="items-list">
                {moviesList.map(dataItem => (
                    <MovieItem
                        movieGenre={dataItem.genre}
                        movieName={dataItem.name}
                        movieYear={getFullYear(dataItem.releaseDate)}
                        imgPath={dataItem.image}
                        key={dataItem.id}
                        id={dataItem.id}
                        onItemDelete={deleteMovieHandler}
                        onItemEdit={setEditableMovieIdHandler}
                    ></MovieItem>
                ))}
            </div>
            {editableMovie && (
                <EditMovie
                    movie={editableMovie}
                    onSubmit={submitDialogHandler}
                    onClose={closeDialogHandler}
                />
            )}
        </div>
    );
};

export { Catalog };
