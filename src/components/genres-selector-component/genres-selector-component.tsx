import { useState } from 'react';
import makeBEM from 'easy-bem';
//import 'bulma/css/bulma.css';

import './genres-selector-component.scss';

const bem = makeBEM('genres-navigation');

let genresData = [
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
                    <li className={bem('tab')}>
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

export default GenresSelector;
