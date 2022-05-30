import { useState } from 'react';
import GenresSelector from '../genres-selector-component/genres-selector-component';
import { ItemsCount } from '../items-count-component/items-count-component';
import { MovieItem } from '../movie-item-component/movie-item-component';
import Sort from '../sort-component/sort-component';
import './catalog-component.css';

let moviesData = [
    {
        id: 1,
        image: './movie1.png',
        name: 'Pulp Fiction',
        year: 1994,
        genre: 'Criminal',
    },
    {
        id: 2,
        image: './movie2.png',
        name: 'Bohemian Rhaspody',
        year: 2018,
        genre: 'Music & Drama',
    },
    {
        id: 3,
        image: './movie3.png',
        name: 'Kill Bill: Vol. 1',
        year: 2003,
        genre: 'Action',
    },
    {
        id: 4,
        image: './movie4.png',
        name: 'Inception',
        year: 2010,
        genre: 'Action & Thriller',
    },
    {
        id: 5,
        image: './movie5.png',
        name: 'Avengers: War of infinity',
        year: 2018,
        genre: 'Action',
    },
    {
        id: 6,
        image: './movie6.png',
        name: 'Reservoir dogs',
        year: 1991,
        genre: 'Criminal',
    },
];

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
