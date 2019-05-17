// Libraries
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import DocumentTitle from 'react-document-title';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
// Stylesheets
import stylesheets from './../../stylesheets/semi-accessible.css';
// Components
import {VoteComponent} from "./components/vote.jsx";

let App = () => {
    return (
        <DocumentTitle title="Загрузка страницы.. | Expit.Online">
            <main className="fill d-flex justify-content-start h-100">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/vote/:uuid" component={VoteComponent}/>
                    </Switch>
                </BrowserRouter>
            </main>
        </DocumentTitle>
    )
};

ReactDOM.render(<App/>, document.getElementById('root'));