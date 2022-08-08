import React from 'react';
import { useDispatch } from 'react-redux';
import { addMovieAction } from '../../redux/movieActions';
import { Catalog } from '../catalog-component/catalog-component';
import Header from '../header-component/header-component';
import './main-component.css';

export interface Movie {
    id: string;
    image: string;
    name: string;
    genre: string;
    //Question: I had to change from Date type, because of "field is non-serializable" error 
    releaseDate: string;
    rating: number;
    runtime: number;
    comment: string;
}

const Main: React.FC = () => {
    const dispatch = useDispatch()
    const onAddHandler = () => dispatch(addMovieAction());

    return (
        <div className="main-block">
            <Header onAdd={onAddHandler} />
            <Catalog />
        </div>
    );
};

export default Main;
