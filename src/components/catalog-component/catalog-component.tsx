import { useState } from 'react';
import GenresSelector from '../genres-selector-component/genres-selector-component';
import { ItemsCount } from '../items-count-component/items-count-component';
import { MovieItem } from '../movie-item-component/movie-item-component';
import Sort from '../sort-component/sort-component';
import './catalog-component.css';

export interface Movie {
    /** GUID movie identifier */
    id: string;
    /** Image URL */
    image: string;
    name: string;
    /** @todo: change type to Date? */
    year: number;
    genre: string;
}

const moviesData: ReadonlyArray<Readonly<Movie>> = [
    {
        id: '00000000-0000-0000-0000-000000000001',
        image: './movie1.png',
        name: 'Pulp Fiction',
        year: 1994,
        genre: 'Criminal',
    },
    {
        id: '00000000-0000-0000-0000-000000000002',
        image: './movie2.png',
        name: 'Bohemian Rhaspody',
        year: 2018,
        genre: 'Music & Drama',
    },
    {
        id: '00000000-0000-0000-0000-000000000003',
        image: './movie3.png',
        name: 'Kill Bill: Vol. 1',
        year: 2003,
        genre: 'Action',
    },
    {
        id: '00000000-0000-0000-0000-000000000004',
        image: './movie4.png',
        name: 'Inception',
        year: 2010,
        genre: 'Action & Thriller',
    },
    {
        id: '00000000-0000-0000-0000-000000000005',
        image: './movie5.png',
        name: 'Avengers: War of infinity',
        year: 2018,
        genre: 'Action',
    },
    {
        id: '00000000-0000-0000-0000-000000000006',
        image: './movie6.png',
        name: 'Reservoir dogs',
        year: 1991,
        genre: 'Criminal',
    },
];

/**
After typing following code should lead to type errors:
moviesData[0] = null;
moviesData[0].genre = null;
*/

function Catalog(props) {
    return (
        <div className="catalog-body">
            <div className="nav-sort">
                <GenresSelector></GenresSelector>
                <Sort></Sort>
            </div>
            <div className="items-counter">
                <ItemsCount itemsCount={moviesData.length}></ItemsCount>
            </div>
            <div className="items-list">
                {moviesData.map(dataItem => (
                    <MovieItem
                        movieGenre={dataItem.genre}
                        movieName={dataItem.name}
                        movieYear={dataItem.year}
                        imgPath={dataItem.image}
                        key={dataItem.id}
                    ></MovieItem>
                ))}
            </div>
        </div>
    );
}

export { Catalog };
