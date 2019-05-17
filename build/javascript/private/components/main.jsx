import React from "react";
import DocumentTitle from 'react-document-title';
import {Cookies} from 'react-cookie';

const cookies = new Cookies();

class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentWillMount() {
        fetch('/get/user/info', {
                method: 'POST',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: cookies.get('accessToken')
                })
            }
        ).then(res => res.json())
            .then(user => {
                this.setState({
                    user: user
                });
            });
    }

    render() {
        return (
            <DocumentTitle title="Личный кабинет | Expit.Online">
                {
                    this.state.user !== null ? (
                        <div className="container mt-5">
                            <div className="h-100">
                                <div className="page">
                                    <div className="row center">
                                        <div className="col">
                                            <div className="personal-info custom-shadow access">
                                                <h3>Общая информация</h3>
                                                <p>Фамилия: <label>{this.state.user.surname}</label></p>
                                                <p>Имя: <label>{this.state.user.name}</label></p>
                                                <p>Отчевство: <label>{this.state.user.patronymic ? this.state.user.patronymic : "Не задано"}</label>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div
                                                className={"personal-info custom-shadow " + (this.state.user.isChecked ? "access" : "warning")}>
                                                <h3>Контактная информация</h3>
                                                <p>Ваш логин: <label>{this.state.user.login}</label></p>
                                                <p>Ваш электронный адрес: <label>{this.state.user.email}</label></p>
                                                {!this.state.user.isChecked ? (
                                                    <button className="mt-1 float-right btn btn-danger">Подтвердить эл.
                                                        адрес</button>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </DocumentTitle>
        );
    }
}

export {MainComponent};