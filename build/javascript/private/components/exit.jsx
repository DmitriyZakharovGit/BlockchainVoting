import React from "react";
import {Cookies} from 'react-cookie';

const cookies = new Cookies();

class ExitComponent extends React.Component {
    componentDidMount() {
        cookies.remove('accessToken', {path: '/', secure: true});
        window.location.replace("/");
    }
    render() {
        return null
    }
}

export {ExitComponent};