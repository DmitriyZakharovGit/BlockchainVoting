import React from 'react';
import {Switch, Route} from 'react-router-dom';
// Components
import {MainComponent} from "./main.jsx";
import {GuideComponent} from "./guide.jsx";
import {NewsComponent} from "./news.jsx";
import {FormSignIn} from "./elements/form-signin.jsx";
import {FormReg} from "./elements/form-reg.jsx";

const ComponentRouter = () => (
    <main className="fill d-flex justify-content-start h-100">
        <FormSignIn/>
        <FormReg/>
        <Switch>
            <Route exact path="/" component={MainComponent}/>
            <Route exact path="/guide/:id" component={GuideComponent}/>
            <Route exact path="/news" component={NewsComponent}/>
        </Switch>
    </main>
);

export {ComponentRouter};