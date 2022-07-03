import { useEffect, useRef, useState } from 'react';
import './context-dropdown-component.scss';
import makeBEM from 'easy-bem';

interface DropdownItem {
    name: string;
    action(): void;
}

interface ContextDropdownProps {
    items: DropdownItem[];
    onClickOutside(): void;
    hidden: boolean;
    className: string;
}

const bem = makeBEM('item-poster');

const ContextDropdown: React.FC<ContextDropdownProps> = props => {
    const myRef = useRef<HTMLDivElement>();
    const handleClickOutside = e => {
        if (!Array.from(myRef.current.children).includes(e.target)) {
            props.onClickOutside();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    });

    return (
        <div
            ref={myRef}
            className={
                props.className +
                ' ' +
                (props.hidden ? 'context-menu--hidden' : 'context-menu')
            }
        >
            {props.items.map(item => (
                <a
                    href="#"
                    onClick={e => {
                        item.action();
                        props.onClickOutside();
                    }}
                >
                    {item.name}
                </a>
            ))}
        </div>
    );
};

export default ContextDropdown;
