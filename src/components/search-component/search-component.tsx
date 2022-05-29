import { useState } from 'react';
import './search-component.css';

function Search(props) {
    return (
        <input
            placeholder="What do you want to watch?"
            className={props.className}
            id="search-input"
        ></input>
    );
}

export default Search;
