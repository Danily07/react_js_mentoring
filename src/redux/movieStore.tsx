import { configureStore, StateFromReducersMapObject} from '@reduxjs/toolkit';
import React from 'react';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { Movie } from '../components/main-component/main-component';
import { movieReducer } from './movieReducer';

const moviesData: Movie[] = [
    {
        id: '00000000-0000-0000-0000-000000000001',
        image: './movie1.png',
        name: 'Pulp Fiction',
        genre: 'Criminal',
        releaseDate: new Date(1994, 1, 1).toISOString(),
        rating: 76,
        runtime: 120,
        comment: 'asdasd asd asmldkamsd',
    },
    {
        id: '00000000-0000-0000-0000-000000000002',
        image: './movie2.png',
        name: 'Bohemian Rhaspody',
        genre: 'Music & Drama',
        releaseDate: new Date(2018, 1, 1).toISOString(),
        rating: 81,
        runtime: 130,
        comment: 'asddsa asmldkamsd',
    },
    {
        id: '00000000-0000-0000-0000-000000000003',
        image: './movie3.png',
        name: 'Kill Bill: Vol. 1',
        genre: 'Action',
        releaseDate: new Date(2003, 1, 1).toISOString(),
        rating: 71,
        runtime: 145,
        comment: 'asdasd asd asmldkamsd',
    },
    {
        id: '00000000-0000-0000-0000-000000000004',
        image: './movie4.png',
        name: 'Inception',
        genre: 'Action & Thriller',
        releaseDate: new Date(2010, 1, 1).toISOString(),
        rating: 75,
        runtime: 144,
        comment: 'asdaddamsd',
    },
    {
        id: '00000000-0000-0000-0000-000000000005',
        image: './movie5.png',
        name: 'Avengers: War of infinity',
        genre: 'Action',
        releaseDate: new Date(2018, 1, 1).toISOString(),
        rating: 55,
        runtime: 130,
        comment: 'asdasmldka3sd',
    },
    {
        id: '00000000-0000-0000-0000-000000000006',
        image: './movie6.png',
        name: 'Reservoir dogs',
        genre: 'Criminal',
        releaseDate: new Date(1991, 1, 1).toISOString(),
        rating: 79,
        runtime: 124,
        comment: 'as21313kamsd',
    },
];

export interface MovieContextType {
    movieList: Movie[];
    editableMovie: Movie;
}

export const getInitialState = (): MovieContextType => {
    return {
        movieList: moviesData,
        editableMovie: null    
    }
}

export const store = configureStore({reducer: movieReducer, preloadedState: getInitialState()})
export type RootState = ReturnType<typeof store.getState>
export const useMovieSelector: TypedUseSelectorHook<RootState> = useSelector