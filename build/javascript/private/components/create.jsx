import React from "react";
import DocumentTitle from 'react-document-title';
import {Cookies} from 'react-cookie';
import {Link} from 'react-router-dom'
import {validateEmail} from "../../controller/email";
import {ErrorModal} from "../../controller/modals/error.jsx";
import $ from "jquery";

const cookies = new Cookies();

class CreateComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            voter: "",
            candidate: "",
            modalTitle: "",
            modalContent: "",
            user: [],
            mail: [],
            voters: [],
            candidates: []
        };

        this.inputFields = [];
        this.fieldsNames = ["id", "title", "info", "dtStart", "dtEnd"];
        this.fieldsNames.forEach(name => this.inputFields[name] = React.createRef());

        this.changeCandidate = this.changeCandidate.bind(this);
        this.setModalState = this.setModalState.bind(this);
        this.addCandidate = this.addCandidate.bind(this);
        this.changeVoter = this.changeVoter.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.addVoter = this.addVoter.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    setModalState(title, content) {
        this.setState({
            modalContent: content,
            modalTitle: title
        })
    }

    getUserInfo() {
        fetch('/get/user/info', {
                method: 'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({id: cookies.get('accessToken')})
            }
        ).then(res => res.json())
            .then(user => {
                user.fullName = `${user.surname} ${user.name} ${user.patronymic}`;
                let splitEmail = user.email.split('@');
                let mail = {
                    addressName: splitEmail[0],
                    mailName: splitEmail[1]
                };
                this.setState({user: user, mail: mail});
            });
    }

    componentWillMount() {
        this.getUserInfo();
    }

    addVoter() {
        if (validateEmail(this.state.voter)) {
            this.setState(prevState => ({voters: [...prevState.voters, this.state.voter]}))
        } else {
            let title = "Ошибка ввода электронного адреса!";
            let content = "Электронный адрес избирателя введён некорректно!";
            this.setModalState(title, content);
            $("#errorModal").modal();
        }
    }

    addCandidate() {
        let max = 8;
        if (this.state.candidate && this.state.candidate !== '') {
            if (this.state.candidates.length < max) {
                this.setState(prevState => ({candidates: [...prevState.candidates, this.state.candidate]}))
            } else {
                let title = "Достигнуто максимальное количество вариантов!";
                let content = `Максимальное количество вариантов - ${max}!`;
                this.setModalState(title, content);
                $("#errorModal").modal();
            }
        } else {
            let title = "Заполните поле!";
            let content = "Поле добавления варианта не заполнено!";
            this.setModalState(title, content);
            $("#errorModal").modal();
        }
    }

    changeCandidate(e) {
        this.setState({candidate: e.target.value})
    }

    changeVoter(e) {
        this.setState({voter: e.target.value})
    }

    sendData() {
        fetch("/create/election", {
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                organizer: cookies.get('accessToken'),
                title: this.inputFields["title"].current.value,
                info: this.inputFields["info"].current.value,
                dtStart: this.inputFields["dtStart"].current.value,
                dtEnd: this.inputFields["dtEnd"].current.value,
                voters: this.state.voters,
                candidates: this.state.candidates
            })
        }).then(res => res.json())
            .then(result => {
                    if (result.length === 0) {
                        window.location.replace("/private/elections/");
                    }
                }
            )
    }

    render() {
        let votersList = this.state.voters.map((voter, key) => {
            return (<li className="list-group-item" key={key + 1}>{key + 1}. {voter}</li>)
        });
        let candidatesList = this.state.candidates.map((voter, key) => {
            return (<li className="list-group-item" key={key + 1}>{key + 1}. {voter}</li>)
        });

        return (
            <DocumentTitle title="Создание выборов | Expit.Online">
                <div className="container-fluid">
                    <ErrorModal title={this.state.modalTitle} error={this.state.modalContent}/>
                    <div className="row fill d-flex justify-content-start h-100">
                        <div className="col-md-4 scrollbar scrollbar-primary h-100">
                            <div className="mt-5 mb-5">
                                <label htmlFor="fullName">Организатор</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">ФИО</span>
                                    </div>
                                    <input type="text" value={this.state.user.fullName} className="form-control"/>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" value={this.state.mail.addressName}/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">@{this.state.mail.mailName}</span>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Логин</span>
                                    </div>
                                    <input type="text" value={this.state.user.login} className="form-control"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 scrollbar scrollbar-primary h-100">
                            <div className="mt-5 mb-5">
                                <label htmlFor="fullName">Выборы</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Наименование</span>
                                    </div>
                                    <input type="text" className="form-control" ref={this.inputFields["title"]}/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Описание</span>
                                    </div>
                                    <textarea className="form-control" ref={this.inputFields["info"]}>
                                    </textarea>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Начало</span>
                                    </div>
                                    <input className="form-control" type="datetime-local"
                                           ref={this.inputFields["dtStart"]}/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Завершение</span>
                                    </div>
                                    <input className="form-control" type="datetime-local"
                                           ref={this.inputFields["dtEnd"]}/>
                                </div>
                            </div>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Избиратели</span>
                                </div>
                                <input type="text" className="form-control" onChange={this.changeVoter}/>
                                <button className="btn btn-primary" onClick={this.addVoter}>Добавить</button>
                            </div>
                            <ul className="list-group mt-3">
                                {votersList}
                            </ul>
                        </div>

                        <div className="col-md-4 scrollbar scrollbar-primary h-100">
                            <div className="mt-3 mb-3">
                                <div className="mb-4 float-right ">
                                    <button className="btn btn-primary mr-2" onClick={this.sendData}>Создать</button>
                                    <Link className="btn btn-outline-primary" to="/private/elections/">Назад</Link>
                                </div>
                                <div className="input-group mt-5">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Вариант</span>
                                    </div>
                                    <input type="text" className="form-control" onChange={this.changeCandidate}/>
                                    <button className="btn btn-primary" onClick={this.addCandidate}>Добавить</button>
                                </div>
                                <ul className="mt-3 list-group">
                                    {candidatesList}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

export {CreateComponent};