import bem from 'easy-bem';
import AddMovieButton from '../add-movie-component/add-movie-component';
import SearchButton from '../search-button-component/search-button-component';
import { Search } from '../search-component/search-component';
import './header-component.scss';

const headerBem = bem("header-block");
const searchBem = bem("search-block");

interface HeaderProps {
    onAdd(): void;
}

const Header: React.FC<HeaderProps> = props =>  {
    return (
        <>
            <div className={headerBem()}>
                <div className={headerBem("add-movie")}>
                    <AddMovieButton onAdd={props.onAdd}/>
                </div>
                <div className={searchBem()}>
                    <h1 className={searchBem("tagline")}>FIND YOUR MOVIE</h1>
                    <div className={searchBem("search-line")}>
                        <Search className={searchBem("input")} />
                        <SearchButton />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
