import { useState } from 'react';
import './genres-selector-component.css';
import 'bulma/css/bulma.css';

let genresData = [
    { name: 'ALL', isActive: true },
    { name: 'DOCUMENTARY', isActive: false },
    { name: 'COMEDY', isActive: false },
    { name: 'HORROR', isActive: false },
    { name: 'CRIME', isActive: false },
];

function GenresSelector() {
    return (
        <nav className="genres-navigation">
            <ul>
                {genresData.map(genre => (
                    <li className=".genres-navigation__tab">
                        <a
                            href="#"
                            className={genre.isActive ? 'genres-navigation_active' : ''}
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
