import React from 'react';
import classNames from 'classnames';
import makeBEM from 'easy-bem';

import './search-component.css';

const bem = makeBEM('search-input');

interface SearchProps {
    /** proxy class name */
    className: string;
}

const Search: React.FC<SearchProps> = props => {
    return (
        <input
            placeholder="What do you want to watch?"
            className={classNames(bem(), props.className)}
        />
    );
};

export { Search };
