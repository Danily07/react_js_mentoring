import { useState } from 'react';
import './movie-field-genre-component.scss';
import makeBEM from 'easy-bem';

interface MovieGenreFieldProps {
    name: string;
    baseKey: string;
    value: string;
    onChange(value: string): void;
    small?: boolean;
}

const allGenres: ReadonlyArray<string> = ["Criminal", "Music & Drama", "Action & Thriller", "Action", "Comedy"];

const bem = makeBEM("movie-field-genre");

const MovieGenreField: React.FC<MovieGenreFieldProps> = props => {
    return (
        <div className={bem()}>
            <label className={bem("label")}>{props.name}</label>
            <select className={bem("selector", {small: props.small ?? false})} key={props.baseKey + "_" + props.name} onChange={e => props.onChange(e.target.value)}>
                {allGenres.map(g => (<option value={g} selected={props.value === g}>{g}</option>))}
            </select>
        </div>
    );
};

export default MovieGenreField;
