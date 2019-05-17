import React from "react";
import DocumentTitle from 'react-document-title';
import {Route, NavLink} from 'react-router-dom'
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {GuidePages} from './../config/guide.js';

const ProgressBar = ({progress}) => (
    <div className="progressbar">
        <div className="progress" style={{width: `${progress}%`}}>
        </div>
    </div>
);

class GuideComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0
        };
    }

    setProgress(value) {
        this.setState({
            progress: value
        });
    }

    render() {
        return (
            <DocumentTitle title="Помощь | Expit.Online">
                <div className="container-fluid">
                    <div className="row fill d-flex justify-content-start h-100">
                        <div id="guide-menu" className="col-md-3 scrollbar scrollbar-primary guide-menu h-100">
                            {GuidePages.all().map(p => (
                                <div key={p.url} className="guide-menu-item">
                                    <NavLink to={p.url}>{p.name}</NavLink>
                                </div>
                            ))}
                        </div>
                        <div id="guide-answer" className="col-md-9 scrollbar scrollbar-primary guide-answer flex-column flex-grow h-100">
                            <ProgressBar progress={this.state.progress}/>
                            <div className="content flex-grow">
                                <TransitionGroup>
                                    <CSSTransition
                                        key={this.props.match.params.id}
                                        classNames='fade'
                                        onEnter={() => {
                                            this.setProgress(100)
                                        }}
                                        onExited={() => {
                                            this.setProgress(0)
                                        }} timeout={500}>
                                        <div/>
                                    </CSSTransition>
                                </TransitionGroup>
                                <Route path={`/guide/:id`}
                                       component={() => (GuidePages.getComponent(this.props.match.params.id))}/>
                            </div>
                        </div>
                    </div>
                </div>
            </DocumentTitle>
        )
    }
}

export {GuideComponent};