import React from 'react';
import { Catalog } from '../catalog-component/catalog-component';
import Header from '../header-component/header-component';
import './main-component.css';
import { MovieContext, NEW_MOVIE_ID } from './movie-context';

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

const Main: React.FC = () => {
    const context = React.useContext(MovieContext);

    const onAddHandler = React.useCallback(
        () => context.setEditableMovieId(NEW_MOVIE_ID),
        [context],
    );

    return (
        <div className="main-block">
            <Header onAdd={onAddHandler} />
            <Catalog />
        </div>
    );
};

export default Main;
