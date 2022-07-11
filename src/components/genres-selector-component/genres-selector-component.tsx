import React from 'react';
import makeBEM from 'easy-bem';
//import 'bulma/css/bulma.css';

import './genres-selector-component.scss';

const bem = makeBEM('genres-navigation');

type GenreType = 'ALL' | 'DOCUMENTARY' | 'COMEDY' | 'HORROR' | 'CRIME';

interface Genre {
    readonly name: GenreType;
    isActive: boolean;
}

const genresData: Array<Genre> = [
    { name: 'ALL', isActive: true },
    { name: 'DOCUMENTARY', isActive: false },
    { name: 'COMEDY', isActive: false },
    { name: 'HORROR', isActive: false },
    { name: 'CRIME', isActive: false },
];

function GenresSelector() {
    return (
        <nav className={bem()}>
            <ul>
                {genresData.map(genre => (
                    <li className={bem('tab')} key={genre.name}>
                        <a
                            href="#"
                            className={bem('genre', { active: genre.isActive })}
                        >
                            {genre.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export { GenresSelector };
