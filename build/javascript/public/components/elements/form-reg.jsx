import React from "react";
import {Cookies} from 'react-cookie';

const cookies = new Cookies();

class FormReg extends React.Component {
    constructor() {
        super();
        this.inputFields = [];
        this.classError = "error-input";
        this.fieldsNames = ["surname", "name", "patronymic", "email", "login", "password", "checkPassword"];
        this.fieldsNames.forEach(name => this.inputFields[name] = React.createRef());
        this.validateForm = this.validateForm.bind(this);
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

    removeAllErrorsClass() {
        this.fieldsNames.forEach(param => {
            this.removeErrorClass(param);
        });
    }

    removeErrorClass(param) {
        this.inputFields[param].current.className = this.inputFields[param].current.className.replace(` ${this.classError}`, "");
    }

    validateField(field, value) {
        fetch(`/check/${field}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            },
            body: field === "checkPassword" ? JSON.stringify({
                [field]: value,
                password: this.inputFields["password"].current.value
            }) : JSON.stringify({[field]: value})
        }).then(res => res.json())
            .then(result => {
                result.length > 0 ? this.addErrorClass(field) : this.removeErrorClass(field)
            })
    }

    validateForm() {
        fetch("/reg", {
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                surname: this.inputFields["surname"].current.value,
                name: this.inputFields["name"].current.value,
                patronymic: this.inputFields["patronymic"].current.value,
                email: this.inputFields["email"].current.value,
                login: this.inputFields["login"].current.value,
                password: this.inputFields["password"].current.value,
                checkPassword: this.inputFields["checkPassword"].current.value
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
            <div className="modal fade" id="regModal" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <form className="c-modal-content blue-border-top" method="post">
                        <div className="c-modal-header m-left-20 m-right-20">
                            <p className="info-title">Регистрация на площадке</p>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body m-left-20 m-right-20">
                            <div className="row">
                                <div className="col-6 block">
                                    <p>Персональные данные</p>
                                    <div className="input-group p-bottom-4">
                                        <input type="text" name="login" className="custom-input"
                                               placeholder="Логин" ref={this.inputFields["login"]}
                                               onBlur={(e) => this.validateField("login", e.target.value)}/>
                                    </div>
                                    <div className="input-group p-bottom-4">
                                        <input type="password" name="password" className="custom-input"
                                               placeholder="Пароль" ref={this.inputFields["password"]}
                                               onBlur={(e) => this.validateField("password", e.target.value)}/>
                                    </div>
                                    <div className="input-group p-bottom-4">
                                        <input type="password" name="checkPassword" className="custom-input"
                                               placeholder="Повторите пароль" ref={this.inputFields["checkPassword"]}
                                               onBlur={(e) => this.validateField("checkPassword", e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-6 block">
                                    <p>Информация о вас</p>
                                    <div className="input-group p-bottom-4">
                                        <input type="text" name="surname" className="custom-input"
                                               placeholder="Фамилия" ref={this.inputFields["surname"]}
                                               onBlur={(e) => this.validateField("surname", e.target.value)}/>
                                    </div>
                                    <div className="input-group p-bottom-4">
                                        <input type="text" name="name" className="custom-input" placeholder="Имя"
                                               ref={this.inputFields["name"]}
                                               onBlur={(e) => this.validateField("name", e.target.value)}/>
                                    </div>
                                    <div className="input-group p-bottom-4">
                                        <input type="text" name="patr" className="custom-input"
                                               placeholder="Отчество (Необязательно)"
                                               ref={this.inputFields["patronymic"]}/>
                                    </div>
                                    <div className="input-group p-bottom-4">
                                        <input type="text" name="email" className="custom-input"
                                               placeholder="Эл. адрес" ref={this.inputFields["email"]}
                                               onBlur={(e) => this.validateField("email", e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="c-modal-footer">
                            <p className="info-content small-text center"><label
                                className="required">*</label>Регистрируясь на площадке, Вы соглашаетесь с правилами
                                площадки, а так же даёте своё согласие на обработку персональных данных.</p>
                            <div className="right">
                                <input type="reset" className="btn btn-link m-right-10" value="Стереть данные"/>
                                <button type="button" className="btn btn-agree" onClick={this.validateForm}>Отправить
                                    заявку
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export {FormReg};