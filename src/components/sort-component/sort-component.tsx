import { useState } from 'react';
import './sort-component.css'

function Sort() {
    return (
        <div className='sort-block'>
            <label>SORT BY</label>
            <select className='sort-block__type'>
                <option value='releaseDate'>RELEASE DATE</option>
                <option value='score'>SCORE</option>
                <option value='popularity'>POPULARITY</option>
            </select>
        </div>
    );
}

export default Sort;
