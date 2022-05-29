import { useState } from 'react';
import './item-count-component.css';

function ItemsCount(props) {
    return (
        <>
            <label className="item-counter-label item-counter-label_number">
                {props.ItemsCount}{' '}
            </label>
            <label className="item-counter-label">movies found</label>
        </>
    );
}

export default ItemsCount;
