import { useEffect, useRef, useState } from 'react';
import './poster-component.scss';
import makeBEM from 'easy-bem';
import ContextDropdown from '../context-dropdown-component/context-dropdown-component';
import React from 'react'

interface PosterProps {
    imgPath: string;
    onItemDelete(): void;
    onItemEdit(): void;
}

const bem = makeBEM('item-poster');

const Poster: React.FC<PosterProps> = props => {
    const [hidden, setHidden] = useState(true);
    const clickOutsideHandler = () => {
        setHidden(true);
    };
    const showContext = () => {
        setHidden(false);
    };

    return (
        <div className={bem()}>
            <img src={props.imgPath} alt="" className={bem('img')} />
            <button
                className={bem('btn', { hidden: !hidden })}
                onClick={e => showContext()}
            >
                .<br />.<br />.
            </button>
            <ContextDropdown
                items={[
                    { name: 'edit', action: props.onItemEdit },
                    { name: 'delete', action: props.onItemDelete },
                ]}
                onClickOutside={clickOutsideHandler}
                className={bem('context-menu')}
                hidden={hidden}
            ></ContextDropdown>
        </div>
    );
};

export default Poster;
