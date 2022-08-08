import React from 'react';
import {  handleActions } from 'redux-actions';
import { Movie } from '../components/main-component/main-component';
import { generateUUID } from '../utils/Uuid-helper';
import { OrderBy } from './movieActions';


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

export const movieReducer = handleActions(
    {
        //Question: types for store and action payload?
        EDIT: (state, action) => ({
            ...state,
            editableMovie: [...state.movieList, newMovie].find(
                item => item.id === action.payload.movieId)
        }),

        SORT: (state, action) => ({
            ...state,
            movieList: OrderCatalog(state.movieList, action.payload.orderType)
        }),

        ADD: (state, action) => ({
            ...state,
            editableMovie: newMovie
        }),

        SUBMIT: (state, action) => ({
            movieList: SaveEditedMovie(state.movieList, action.payload.changedMovie),
            editableMovie: null
        }),

        DELETE: (state, action) => ({
            ...state,
            movieList: state.movieList.slice(0).filter(mv => mv.id !== action.payload.movieId),
        })
    },
    //Question: duplicate preloaded state?
    {
        movieList: null,
        editableMovie: null    
    }
)

function OrderCatalog(moviesList: Movie[], orderType: OrderBy) {
    const toDate = (strDate: string) => strDate == null ? null : new Date(strDate);

     switch (orderType) {
         case OrderBy.Release:
             const newArrRelease = moviesList.slice(0).sort((a, b) =>
                 toDate(a.releaseDate) > toDate(b.releaseDate) ? 1 : -1,
             );
             
             return newArrRelease;
         case OrderBy.Score:
             const newArr = moviesList.slice(0).sort((a, b) =>
                 a.rating > b.rating ? 1 : -1,
             );

             return newArr;
         case OrderBy.Popularity:
             //[DI]: undefined
             return moviesList;
     }
}

function SaveEditedMovie(moviesList: Movie[], editedMovie: Movie) {
    if (editedMovie === null)
    {
        return moviesList;
    }

    if (editedMovie.id === NEW_MOVIE_ID)
    {
        return [
            ...moviesList,
            { ...editedMovie, id: generateUUID() },
        ];
    }

    return moviesList.slice(0).map(m => (m.id === editedMovie.id ? editedMovie : m));
}