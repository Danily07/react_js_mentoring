import React from 'react';
import MovieInfo from '../movie-info-component/movie-info-component';
import Poster from '../poster-component/poster-component';

import './movie-item-component.css';

interface MovieItemProps {
    movieName: string;
    movieGenre: string;
    movieYear: number;
    imgPath: string;
    id: string;
    onItemDelete(id: string):void;
    onItemEdit(id: string):void;
}

const MovieItem: React.FC<MovieItemProps> = props => {
    return (
        <div className="item-list__movie">
            <div className="item-list__movie_aligned">
                <Poster imgPath={props.imgPath} onItemDelete={() => props.onItemDelete(props.id)} onItemEdit={() => props.onItemEdit(props.id)}></Poster>
                <MovieInfo
                    year={props.movieYear}
                    name={props.movieName}
                    genre={props.movieGenre}
                />
            </div>
        </div>
    );
};

export { MovieItem };
