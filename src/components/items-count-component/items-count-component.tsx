import React from 'react';
import makeBEM from 'easy-bem';

import './item-count-component.scss';

const bem = makeBEM('item-counter');

interface ItemsCountProps {
    itemsCount?: number;
}

const ItemsCount: React.FC<ItemsCountProps> = props => {
    return (
        <div className={bem()}>
            <label className={bem('label_number')}>{props.itemsCount} </label>
            <label className={bem('label')}>movies found</label>
        </div>
    );
};

ItemsCount.defaultProps = {
    itemsCount: 0,
};

export { ItemsCount };
