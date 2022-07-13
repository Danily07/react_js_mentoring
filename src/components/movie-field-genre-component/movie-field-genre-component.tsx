import React from 'react';
import './movie-field-genre-component.scss';
import makeBEM from 'easy-bem';

interface MovieGenreFieldProps {
    label: string;
    baseKey: string;
    value: string;
    onChange(value: string, isValid: boolean, name: string): void;
    small?: boolean;
}

const allGenres: ReadonlyArray<string> = [
    'Criminal',
    'Music & Drama',
    'Action & Thriller',
    'Action',
    'Comedy',
];

const defaultGenre = allGenres[4];

const bem = makeBEM('movie-field-genre');

const MovieGenreField: React.FC<MovieGenreFieldProps> = props => {
    // initialization effect: send initial validation status to parent component
    React.useEffect(
        () => {
            // pass actual value or default
            props.onChange(props.value || defaultGenre, true, props.label);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    return (
        <div className={bem()}>
            <label className={bem('label')}>{props.label}</label>
            <select
                // defaultValue={props.label || defaultGenre}
                className={bem('selector', { small: props.small ?? false })}
                key={props.baseKey + '_' + props.label}
                onChange={e =>
                    props.onChange(e.target.value, true, props.label)
                }
            >
                {allGenres.map(g => (
                    <option key={g} value={g} selected={props.value === g}>
                        {g}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default MovieGenreField;
