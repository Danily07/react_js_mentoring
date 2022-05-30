import { useState } from 'react';
import MovieInfo from '../movie-info-component/movie-info-component';
import Poster from '../poster-component/poster-component';
import './movie-item-component.css';

type ItemProps = {
    movieName: string;
    movieGenre: string;
    movieYear: number;
    imgPath: string;
};

function MovieItem({ movieName, movieGenre, movieYear, imgPath }: ItemProps) {
    return (
        <div className="item-list__movie">
            <div className="item-list__movie_aligned">
                <Poster imgPath={imgPath}></Poster>
                <MovieInfo
                    year={movieYear}
                    name={movieName}
                    genre={movieGenre}
                ></MovieInfo>
            </div>
        </div>
    );
}

export default MovieItem;
