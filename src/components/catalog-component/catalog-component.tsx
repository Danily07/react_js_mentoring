import React from 'react';
import EditMovie from '../edit-movie-component/edit-movie-component';
import { GenresSelector } from '../genres-selector-component/genres-selector-component';
import { ItemsCount } from '../items-count-component/items-count-component';
import { Movie, OrderBy } from '../main-component/main-component';
import { MovieContext } from '../main-component/movie-context';
import { MovieItem } from '../movie-item-component/movie-item-component';
import Sort from '../sort-component/sort-component';
import './catalog-component.css';

const Catalog: React.FC = () => {
    const context = React.useContext(MovieContext);

    const submitDialogHandler = React.useCallback(
        (movie: Movie) => {
            console.log('submitDialogHandler: ', movie);
            const handler = movie.id
                ? context.updateMovie
                : context.createMovie;
            handler(movie);
            context.emptyEditableMovie();
        },
        [context],
    );

    const closeDialogHandler = React.useCallback(() => {
        context.emptyEditableMovie();
    }, [context]);

    return (
        <div className="catalog-body">
            <div className="nav-sort">
                <GenresSelector></GenresSelector>
                <Sort onOrderBy={context.orderByHandler} />
            </div>
            <div className="items-counter">
                <ItemsCount itemsCount={context.movieList.length} />
            </div>
            <div className="items-list">
                {context.movieList.map(dataItem => (
                    <MovieItem
                        movieGenre={dataItem.genre}
                        movieName={dataItem.name}
                        movieYear={dataItem.releaseDate?.getFullYear()}
                        imgPath={dataItem.image}
                        key={dataItem.id}
                        id={dataItem.id}
                        onItemDelete={context.deleteMovie}
                        onItemEdit={context.setEditableMovieId}
                    ></MovieItem>
                ))}
            </div>
            {context.editableMovie && (
                <EditMovie
                    movie={context.editableMovie}
                    onSubmit={submitDialogHandler}
                    onClose={closeDialogHandler}
                />
            )}
        </div>
    );
};

export { Catalog };
