import React from 'react';
import {Switch, Route} from 'react-router-dom';
// Components
import {MainComponent} from "./main.jsx";
import {ExitComponent} from "./exit.jsx";
import {ElectionsComponent} from "./elections.jsx";
import {CreateComponent} from "./create.jsx";
import {CardComponent} from "./card.jsx";

class ComponentRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main className="col-md-10 fill d-flex justify-content-start h-100">
                <Switch>
                    <Route exact path="/private/" component={MainComponent}/>
                    <Route exact path="/private/elections/" component={ElectionsComponent}/>
                    <Route exact path="/private/elections/create/" component={CreateComponent}/>
                    <Route exact path="/private/elections/:id/" component={CardComponent}/>
                    <Route exact path="/private/exit/" component={ExitComponent}/>
                </Switch>
            </main>
        );
    }
}

export {ComponentRouter};