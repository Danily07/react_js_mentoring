import React from 'react';
import {  store } from '../../redux/movieStore';
import { Provider } from 'react-redux';

export interface MovieContextProviderProps {
    children: React.ReactNode;
}

export const MovieContextProvider: React.FC<
    MovieContextProviderProps
> = props => {
    
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    );
};
