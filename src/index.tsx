import React from 'react';
import ReactDOM from 'react-dom/client';
import { Catalog } from './components/catalog-component/catalog-component';
import Header from './components/header-component/header-component';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <div className="main-block">
            <Header />
            <Catalog />
        </div>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
