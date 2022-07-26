import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main-component/main-component';
import { MovieContextProvider } from './components/main-component/movie-context';
import reportWebVitals from './reportWebVitals';

import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <MovieContextProvider>
            <Main />
        </MovieContextProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
