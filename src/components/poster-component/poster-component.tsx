import { useState } from 'react';
import './poster-component.css';

type PosterProps = {
    imgPath: string;
};

function Poster({imgPath}: PosterProps) {
    return (
        <div className="item-poster">
            <img src={imgPath} alt="" className="item-poster__img" />
            <button className="item-poster__btn">
                .<br />.<br />.
            </button>
        </div>
    );
}

export default Poster;
