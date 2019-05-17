import React from 'react';
import {Cookies} from 'react-cookie';

const cookies = new Cookies();

class FormSignIn extends React.Component {
    constructor() {
        super();
        this.inputFields = [];
        this.classError = "error-input";
        this.fieldsNames = ["auth_login", "auth_password"];
        this.fieldsNames.forEach(name => this.inputFields[name] = React.createRef());
        this.validateAuth = this.validateAuth.bind(this);
    }

    removeAllErrorsClass() {
        this.fieldsNames.forEach(param => {
            this.removeErrorClass(param);
        });
    }

    removeErrorClass(param) {
        this.inputFields[param].current.className = this.inputFields[param].current.className.replace(` ${this.classError}`, "");
    }

    addErrorClass(item) {
        let currentClass = this.inputFields[item].current.className;
        if (currentClass.includes(this.classError) === false) {
            this.inputFields[item].current.className = currentClass.concat(` ${this.classError}`);
        }
    }

    addErrorsClass(result) {
        result.map((item) => {
            this.addErrorClass(item.param);
        });
    }

    validateAuth() {
        fetch("/auth", {
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                auth_login: this.inputFields["auth_login"].current.value,
                auth_password: this.inputFields["auth_password"].current.value
            })
        }).then(res => res.json())
            .then(result => {
                    if (result[0].hasOwnProperty("accessToken")) {
                        cookies.set('accessToken', result[0].accessToken, {path: '/', secure: true});
                        window.location.replace("/private/");
                    } else {
                        this.removeAllErrorsClass();
                        this.addErrorsClass(result);
                    }
                }
            )
    }

    render() {
        return (
            <div className="modal fade" id="authModal" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-sm" role="document">
                    <form className="c-modal-content custom-shadow">
                        <div className="c-modal-header">
                            <p className="info-title">Вход на площадку</p>
                            <button type="button" className="close c-red" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <input required type="login" className="custom-input" id="auth_login" name="auth_login"
                                   placeholder="Логин" ref={this.inputFields["auth_login"]}/>

                            <input required type="password" className="custom-input mt-2" data-toggle="password"
                                   name="auth_password" id="auth_password" placeholder="Пароль"
                                   ref={this.inputFields["auth_password"]}/>

                            <div className="row info-content mt-2 custom-checkbox-form">
                                <div className="col-5">
                                    <input type="checkbox"/>
                                </div>
                                <div className="col-7 right">
                                    <label>Запомнить меня</label>
                                </div>
                            </div>

                            <p className="p-top-10 info-content center">
                                Вы впервые на площадке?
                                <a className="none-decoration" data-toggle="modal" data-target="#regModal"
                                   data-dismiss="modal"
                                   aria-label="Close" href="#">Зарегистироваться</a>
                            </p>
                        </div>

                        <div className="c-modal-footer">
                            <a className="left none-decoration" href="#">Забыли пароль?</a>
                            <button type="button" className="btn btn-primary ml-auto"
                                    onClick={this.validateAuth}>Войти
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export {FormSignIn};