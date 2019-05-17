// Libraries
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import DocumentTitle from 'react-document-title';
import {BrowserRouter} from 'react-router-dom';
// Elements
import {ComponentRouter} from "./components/router.jsx";
import {MenuWithRouter} from "./components/elements/menu.jsx";
// Stylesheets
import stylesheets from './../../stylesheets/private.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <DocumentTitle title="Загрузка страницы.. | Expit.Online">
                <BrowserRouter>
                    <div className="container-fluid d-flex h-100 flex-column">
                        <div className="row h-100">
                            <MenuWithRouter/>
                            <ComponentRouter/>
                        </div>
                    </div>
                </BrowserRouter>
            </DocumentTitle>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));