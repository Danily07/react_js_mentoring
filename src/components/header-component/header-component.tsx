import { useState } from 'react';
import AddMovieButton from '../add-movie-component/add-movie-component';
import SearchButton from '../search-button-component/search-button-component';
import Search from '../search-component/search-component';
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
                    <div className="search-line">
                        <Search className="search-block__input" />
                        <SearchButton />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
