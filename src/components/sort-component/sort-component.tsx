import { useState } from 'react';
import './sort-component.scss'
import makeBEM from 'easy-bem';
import React from 'react'
import { OrderBy } from '../../redux/movieActions';


interface SortProps {
    onOrderBy(orderType: OrderBy): void;
}

const bem = makeBEM("sort-block");

const Sort: React.FC<SortProps> = props => {
    const onChangeHandler = (value: string) => {
        switch(value){
            case "releaseDate":
                props.onOrderBy(OrderBy.Release);
                break;
            case "score":
                props.onOrderBy(OrderBy.Score);
                break;
            case "popularity":
                props.onOrderBy(OrderBy.Popularity);
                break; 
        }
    }

    return (
        <div className={bem()}>
            <label className={bem("sort-label")}>SORT BY</label>
            <select className={bem("type")} onChange={e => onChangeHandler(e.target.value)}>
                <option value='releaseDate'>RELEASE DATE</option>
                <option value='score'>SCORE</option>
                <option value='popularity' selected={true} >POPULARITY</option>
            </select>
        </div>
    );
}

export default Sort;
