import React from 'react';
import { useState } from 'react';
import EditMovie from '../edit-movie-component/edit-movie-component';
import { GenresSelector } from '../genres-selector-component/genres-selector-component';
import { ItemsCount } from '../items-count-component/items-count-component';
import { Movie, MovieContext, OrderBy } from '../main-component/main-component';
import { MovieItem } from '../movie-item-component/movie-item-component';
import Sort from '../sort-component/sort-component';
import './catalog-component.css';

interface CatalogProps {
    data: Movie[];
    currentEdit: Movie;
    onUpdateMovie(item: Movie): void;
    onDeleteMovie(id: string);
    onCreateMove(item: Movie): void;
    onOrderBy(orderType: OrderBy): void;
    onResetCurrentEdit(): void;
}

const Catalog: React.FC<CatalogProps> = props => {
    const [curMovie, setCurMovie] = useState(props.currentEdit);
    const isVisibleModal = curMovie != null || props.currentEdit != null;

    const editHandler = (id: string) => {
        //Set cur item
        setCurMovie(props.data.find(item => item.id === id));
    };

    const closeModalHandler = (save: boolean, changedItem: Movie) => {
        if (save) {
            if (changedItem.id === null)
            {
                props.onCreateMove(changedItem);
            }
            else
            {
                props.onUpdateMovie(changedItem);
            }
        }
        setCurMovie(null);
        props.onResetCurrentEdit();
    };
    return (
        <div className="catalog-body">
            <div className="nav-sort">
                <GenresSelector></GenresSelector>
                <Sort onOrderBy={props.onOrderBy}></Sort>
            </div>
            <div className="items-counter">
                <ItemsCount itemsCount={props.data.length}></ItemsCount>
            </div>
            <div className="items-list">
                {props.data.map(dataItem => (
                    <MovieItem
                        movieGenre={dataItem.genre}
                        movieName={dataItem.name}
                        movieYear={dataItem.releaseDate?.getFullYear()}
                        imgPath={dataItem.image}
                        key={dataItem.id}
                        id={dataItem.id}
                        onItemDelete={props.onDeleteMovie}
                        onItemEdit={editHandler}
                    ></MovieItem>
                ))}
            </div>
            <MovieContext.Provider value={curMovie ?? props.currentEdit}>
                <EditMovie
                    show={isVisibleModal}
                    onClose={closeModalHandler}
                ></EditMovie>
            </MovieContext.Provider>
        </div>
    );
}

export { Catalog };
