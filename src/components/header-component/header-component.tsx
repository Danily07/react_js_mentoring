import { useState } from 'react';
import AddMovieButton from '../add-movie-component/add-movie-component.tsx';
import SearchButton from '../search-button-component/search-button-component.tsx';
import Search from '../search-component/search-component.tsx';
import './header-component.css';

function Header() {
    return (
        <>
            <div className="header-block">
                <div className="header-block__add-movie">
                    <AddMovieButton />
                </div>
                <div className="search-block">
                    <h1 className="search-block__tagline">FIND YOUR MOVIE</h1>
                    <div className='search-line'>
                        <Search className="search-block__input" />
                        <SearchButton />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
