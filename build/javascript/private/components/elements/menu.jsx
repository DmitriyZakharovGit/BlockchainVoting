import React from 'react';
import {NavLink} from 'react-router-dom';
import {Pages} from "../../config/pages";
import {withRouter} from 'react-router';
import {Cookies} from 'react-cookie';
import avatar from "../../../../images/default_avatar.png";

const cookies = new Cookies();

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: []}
    }

    componentDidMount() {
        fetch('/get/user/info', {
                method: 'POST',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: cookies.get('accessToken')
                })
            }
        )
            .then(res => res.json())
            .then(user => this.setState({user}));
    }

    render() {
        return (
            <div className="col-md-2 bg-grey h-100 custom-shadow">
                <div className="avatar-block">
                    <img src={avatar} className="custom-shadow" alt="Avatar"/>
                    <p className="mb-0"><label className="mb-0">{this.state.user.surname} {this.state.user.name}</label></p>
                    <p className="mt-0"><label>{this.state.user.patronymic}</label></p>
                </div>
                <ul className="left-menu-items">
                    {Pages.all().map(p => (
                        <li key={p.name} className="nav-item">
                            <NavLink exact to={`${p.url}`}>{p.title}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const MenuWithRouter = withRouter(Menu);
export {MenuWithRouter};