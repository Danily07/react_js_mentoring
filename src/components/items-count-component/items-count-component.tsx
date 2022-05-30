import React from 'react';

import './item-count-component.scss';

interface ItemsCountProps {
    itemsCount?: number;
}

const ItemsCount: React.FC<ItemsCountProps> = props => {
    return (
        <>
            <label className="item-counter-label item-counter-label_number">
                {props.itemsCount}{' '}
            </label>
            <label className="item-counter-label">movies found</label>
        </>
    );
};

ItemsCount.defaultProps = {
    itemsCount: 0,
};

export { ItemsCount };
