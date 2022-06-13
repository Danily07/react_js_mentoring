import { useState } from 'react';
import './movie-info-component.css';

type MovieProps = {
    name: string,
    genre: string,
    year: number
}

const MovieInfo = ({name, genre, year}: MovieProps) => {
    return (
        <>
            <span className="item-info_primary">
                <label id="movieName">{name}</label>
                <label id="movieYear">{year}</label>
            </span>
            <span className="item-info_secondary">
                <label id="Genre" className="item-info__text">
                    {genre}
                </label>
            </span>
        </>
    );
}

export default MovieInfo;
