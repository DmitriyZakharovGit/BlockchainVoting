import React from 'react';
import {NavLink} from 'react-router-dom';
import {Pages} from "./../../config/pages";
import {withRouter} from 'react-router';

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-menu custom-shadow sticky-top">
                <div className="container-fluid">
                    <a className="m-left-20 navbar-brand link" href="/">EXP <sup>IT</sup></a>
                    <ul className="c-navbar-nav ml-auto menu-items">
                        {Pages.all().map(p => (
                            <li key={p.name} className="nav-item">
                                <NavLink exact className="nav-link" to={`${p.url}`}>{p.title}</NavLink>
                            </li>
                        ))}
                        <li key="enter" className="nav-item">
                            <button type="button" className="btn btn-primary h-100" data-toggle="modal"
                                    data-target="#authModal">
                               <span className="text-m">Войти</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

const MenuWithRouter = withRouter(Menu);
export {MenuWithRouter};