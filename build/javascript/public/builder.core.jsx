// Libraries
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import DocumentTitle from 'react-document-title';
import {BrowserRouter} from 'react-router-dom';
// Elements
import {MenuWithRouter} from "./components/elements/menu.jsx";
// Component-Router
import {ComponentRouter} from "./components/router.jsx";
// Stylesheets
import stylesheets from './../../stylesheets/public.css';

let App = () => {
    return (
        <DocumentTitle title="Загрузка страницы.. | Expit.Online">
            <BrowserRouter>
                <div className="d-flex h-100 flex-column">
                    <MenuWithRouter/>
                    <ComponentRouter/>
                </div>
            </BrowserRouter>
        </DocumentTitle>
    )
};

ReactDOM.render(<App/>, document.getElementById('root'));