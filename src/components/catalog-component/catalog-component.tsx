import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { movieApi, MovieInput, useAddMovieMutation, useEditMovieMutation, useMoviesQuery } from '../../redux/movieApi';
import { NEW_MOVIE_ID } from '../../redux/movieReducer';
import { selectEditableMovie, selectMovies } from '../../redux/movieSelectors';
import { useMovieSelector } from '../../redux/movieStore';
import EditMovie from '../edit-movie-component/edit-movie-component';
import { GenresSelector } from '../genres-selector-component/genres-selector-component';
import { ItemsCount } from '../items-count-component/items-count-component';
import { Movie } from '../main-component/main-component';
import { MovieItem } from '../movie-item-component/movie-item-component';
import Sort from '../sort-component/sort-component';
import './catalog-component.css';

const Catalog: React.FC = () => {
    const dispatch = useDispatch();

    const { data, isSuccess } = useMoviesQuery();
    const [ addMovie, addMovieStatus ] = useAddMovieMutation();
    const [ editMovie, editMovieStatus ] = useEditMovieMutation();

    const submitDialogHandler = async (movie: Movie) =>  {
        const input: Omit<MovieInput, "budget" | "revenue" | "tagline" | "vote_count"> = {
            overview: movie.comment,
            poster_path:movie.image,
            release_date: movie.releaseDate,
            runtime: Number(movie.runtime),
            vote_average: Number(movie.rating),
            genres: [movie.genre],
            title: movie.name,
            id: movie.id == NEW_MOVIE_ID ? null : Number(movie.id)
        }
        
        if (movie.id == NEW_MOVIE_ID)
        {
                        
            await addMovie(input);
        }
        else
        {
            await editMovie(input);
        }
        
        dispatch(movieApi.util.invalidateTags(['MoviesData']));
        closeDialogHandler();
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
        const payload: deletePayloadType = {movieId: movieId};

        dispatch(deleteMovieAction(payload));
    };

    const setEditableMovieIdHandler = (movieId: string) => {
        const toEditItem = data.data.find(m => m.id === Number(movieId));
        const payload: editPayloadType = { movieToEdit: {
            id: movieId,
            image: toEditItem.poster_path,
            name: toEditItem.title,
            genre: toEditItem.genres[0],
            releaseDate: toEditItem.release_date,
            rating: toEditItem.vote_average,
            runtime: toEditItem.runtime,
            comment: toEditItem.overview
        } };

        dispatch(editMovieAction(payload));
    };

    const moviesList: ReadonlyArray<Movie> = useMovieSelector(selectMovies);
    const editableMovie: Movie = useMovieSelector(selectEditableMovie);

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
                {isSuccess && (data.data.map(dataItem => (
                <MovieItem
                        movieGenre={dataItem.genres.join(' & ')}
                        movieName={dataItem.title}
                        movieYear={getFullYear(dataItem.release_date)}
                        imgPath={dataItem.poster_path}
                        key={dataItem.id}
                        id={dataItem.id.toString()}
                        onItemDelete={deleteMovieHandler}
                        onItemEdit={setEditableMovieIdHandler}
                    ></MovieItem>)))}
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
