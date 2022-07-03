import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { generateUUID } from '../../utils/Uuid-helper';
import { Catalog } from '../catalog-component/catalog-component';
import Header from '../header-component/header-component';
import './main-component.css';

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
    Popularity
}

const moviesData: Movie[] = [
    {
        id: '00000000-0000-0000-0000-000000000001',
        image: './movie1.png',
        name: 'Pulp Fiction',
        genre: 'Criminal',
        releaseDate: new Date(1994, 1, 1),
        rating: 76,
        runtime: 120,
        comment: 'asdasd asd asmldkamsd',
    },
    {
        id: '00000000-0000-0000-0000-000000000002',
        image: './movie2.png',
        name: 'Bohemian Rhaspody',
        genre: 'Music & Drama',
        releaseDate: new Date(2018, 1, 1),
        rating: 81,
        runtime: 130,
        comment: 'asddsa asmldkamsd',
    },
    {
        id: '00000000-0000-0000-0000-000000000003',
        image: './movie3.png',
        name: 'Kill Bill: Vol. 1',
        genre: 'Action',
        releaseDate: new Date(2003, 1, 1),
        rating: 71,
        runtime: 145,
        comment: 'asdasd asd asmldkamsd',
    },
    {
        id: '00000000-0000-0000-0000-000000000004',
        image: './movie4.png',
        name: 'Inception',
        genre: 'Action & Thriller',
        releaseDate: new Date(2010, 1, 1),
        rating: 75,
        runtime: 144,
        comment: 'asdaddamsd',
    },
    {
        id: '00000000-0000-0000-0000-000000000005',
        image: './movie5.png',
        name: 'Avengers: War of infinity',
        genre: 'Action',
        releaseDate: new Date(2018, 1, 1),
        rating: 55,
        runtime: 130,
        comment: 'asdasmldka3sd',
    },
    {
        id: '00000000-0000-0000-0000-000000000006',
        image: './movie6.png',
        name: 'Reservoir dogs',
        genre: 'Criminal',
        releaseDate: new Date(1991, 1, 1),
        rating: 79,
        runtime: 124,
        comment: 'as21313kamsd',
    },
];

export const MovieContext = React.createContext(moviesData[0]);

function Main() {
    const [movies, setMoviesState] = useState(moviesData);
    const [curEditMovie, setCurEditMovie] = useState(null);

    const deleteHandler = (id: string) =>
        setMoviesState(movies.filter(mv => mv.id !== id));
    const updateHandler = (item: Movie) => {
        setMoviesState(movies.map(m => (m.id === item.id ? item : m)));
    };
    const createHandler = (item: Movie) => {
        //[DI]: for some reason, adding a item after Submit is invoked two times without condition
        if (!movies.includes(item))
        {
            item.id = generateUUID();
            movies.push(item);
            setMoviesState(movies);    
        }
    };
    const createClickHandler = () => {
        let newMovie: Movie = {
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
        switch(orderType){
            case OrderBy.Release:
                let newArrRelease = movies.sort((a, b) => a.releaseDate > b.releaseDate ? 1 : 0);
                //Without slice direct state changing doesn't work :c
                setMoviesState(newArrRelease.slice(0));
                break;
            case OrderBy.Score:
                let newArr = movies.sort((a, b) => a.rating > b.rating ? 1 : 0);
                setMoviesState(newArr.slice(0));
                break;
            case OrderBy.Popularity:
                //[DI]: undefined
                break;
        }
    }

    return (
        <div className="main-block">
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
        </div>
    );
}

export default Main;
