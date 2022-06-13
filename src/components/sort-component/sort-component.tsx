import { useState } from 'react';
import './sort-component.scss'
import makeBEM from 'easy-bem';

const bem = makeBEM("sort-block");

function Sort() {
    return (
        <div className={bem()}>
            <label className={bem("sort-label")}>SORT BY</label>
            <select className={bem("type")}>
                <option value='releaseDate'>RELEASE DATE</option>
                <option value='score'>SCORE</option>
                <option value='popularity'>POPULARITY</option>
            </select>
        </div>
    );
}

export default Sort;
