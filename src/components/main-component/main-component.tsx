import React from 'react';
import { generateUUID } from '../../utils/Uuid-helper';
import { Catalog } from '../catalog-component/catalog-component';
import Header from '../header-component/header-component';
import './main-component.css';
import { MovieContextProvider } from './movie-context';

export interface Movie {
    id: string;
    image: string;
    name: string;
    genre: string;
    releaseDate: Date;
    rating: number;
    runtime: number;
    comment: string;
}

export enum OrderBy {
    Release,
    Score,
    Popularity,
}

function Main() {
    const [movies, setMoviesState] = React.useState(moviesData);
    const [curEditMovie, setCurEditMovie] = React.useState(null);

    const deleteHandler = (id: string) =>
        setMoviesState(movies.filter(mv => mv.id !== id));
    const updateHandler = (item: Movie) => {
        setMoviesState(movies.map(m => (m.id === item.id ? item : m)));
    };
    const createHandler = (item: Movie) => {
        //[DI]: for some reason, adding a item after Submit is invoked two times without condition
        if (!movies.includes(item)) {
            item.id = generateUUID();
            movies.push(item);
            setMoviesState(movies);
        }
    };
    const createClickHandler = () => {
        const newMovie: Movie = {
            id: null,
            image: '',
            name: '',
            genre: '',
            releaseDate: null,
            rating: NaN,
            runtime: NaN,
            comment: '',
        };

        setCurEditMovie(newMovie);
    };
    const resetCurEditMovieHandler = () => {
        setCurEditMovie(null);
    };
    const orderByHandler = (orderType: OrderBy) => {
        switch (orderType) {
            case OrderBy.Release:
                const newArrRelease = movies.sort((a, b) =>
                    a.releaseDate > b.releaseDate ? 1 : 0,
                );
                //Without slice direct state changing doesn't work :c
                setMoviesState(newArrRelease.slice(0));
                break;
            case OrderBy.Score:
                const newArr = movies.sort((a, b) =>
                    a.rating > b.rating ? 1 : 0,
                );
                setMoviesState(newArr.slice(0));
                break;
            case OrderBy.Popularity:
                //[DI]: undefined
                break;
        }
    };

    return (
        <div className="main-block">
            <MovieContextProvider>
                <Header onAdd={createClickHandler} />
                <Catalog
                    data={movies}
                    onCreateMove={createHandler}
                    onDeleteMovie={deleteHandler}
                    onUpdateMovie={updateHandler}
                    currentEdit={curEditMovie}
                    onResetCurrentEdit={resetCurEditMovieHandler}
                    onOrderBy={orderByHandler}
                />
            </MovieContextProvider>
        </div>
    );
}

export default Main;
