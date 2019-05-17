import React from "react";
import DocumentTitle from 'react-document-title'
import {DateTimeFormat} from "../../controller/date";
import {ErrorModal} from "./../../controller/modals/error.jsx";
import {SuccessModal} from "./../../controller/modals/success.jsx";
import BarChart from "../../controller/charts/bar.jsx";
import $ from "jquery";
import "babel-polyfill";

class VoteComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            id: "",
            info: "",
            title: "",
            dtEnd: "",
            dtStart: "",
            isVoted: null,
            candidates: [],
            modalTitle: "",
            modalContent: "",
            selectCandidate: "",
            voter: {
                email: "",
                address: "",
                uuid: ""
            }
        };

        this.vote = this.vote.bind(this);
        this.getElection = this.getElection.bind(this);
        this.changeCandidate = this.changeCandidate.bind(this);
    }

    changeCandidate(e) {
        this.setState({selectCandidate: e.target.value})
    }

    static async getBalance(address) {
        return await fetch('/get/balance/info', {
                method: 'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({address: address})
            }
        ).then(res => res.json())
            .then((balanceInfo, err) => {
                if (err) return err;
                return balanceInfo.balance;
            });
    }

    static openErrorModal() {
        $("#errorModal").modal();
    }

    static openSuccessModal() {
        $("#successModal").modal();
    }

    vote() {
        if (this.state.selectCandidate !== "") {
            fetch('/vote/add', {
                    method: 'POST',
                    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.id,
                        voterUuid: this.state.voter.uuid,
                        selectCandidateUuid: this.state.selectCandidate
                    })
                }
            ).then(res => res.json())
                .then(array => {
                        if (array[0].errors === false) {
                            this.setState({
                                modalTitle: "Регистрация голоса!",
                                modalContent: "Ваш голос был успешно зарегистрирован!",
                                isVoted: true
                            });
                            VoteComponent.openSuccessModal();
                        } else {
                            this.setState({
                                modalTitle: "Ошибка голосования!",
                                modalContent: array[0].errors,
                                isVoted: true
                            });
                            VoteComponent.openErrorModal();
                        }
                    }
                );
        } else {
            this.setState({modalContent: "Для того, чтобы Ваш выбор был учтен, выберите один из вариантов."});
            VoteComponent.openErrorModal();
        }
    }

    getCandidates(array) {
        return Promise.all(array.election[0].candidates.map(async candidate => {
            let candidateInfo = candidate;
            candidateInfo.balance = await VoteComponent.getBalance(candidate.address);
            return candidateInfo;
        }));
    }

    getElection() {
        fetch('/get/electionByUUID/info', {
            method: 'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({uuid: this.props.match.params.uuid})
        }).then(res => res.json())
            .then(async (array) => {
                if (array.election.length !== 0) {
                    let userInfo = array.election[0].voters.filter(user => user.uuid === this.props.match.params.uuid);

                    this.setState({
                        id: array.election[0]._id,
                        title: array.election[0].title,
                        info: array.election[0].info,
                        dtStart: array.election[0].dtStart,
                        dtEnd: array.election[0].dtEnd,
                        voter: userInfo[0],
                        isVoted: Array.isArray(await VoteComponent.getBalance(userInfo[0].address)),
                        candidates: await this.getCandidates(array)
                    });
                } else {
                    window.location.replace("/");
                }
            });
    }

    componentWillMount() {
        this.getElection();
    }

    formVote() {
        return (
            <div className="personal-info custom-shadow">
                <h3>Выберите один из вариантов:</h3>
                <div className="form-group">
                    <select multiple onChange={this.changeCandidate} className="form-control">
                        {this.state.candidates.map((candidateInfo, key) => (
                            <option value={candidateInfo.uuid} key={key}>{candidateInfo.candidate}</option>
                        ))}
                    </select>
                </div>
                <button className="btn btn-primary mr-2" onClick={this.vote}>Проголосовать</button>
            </div>
        );
    }

    formResultVote() {
        return (
            <div className="personal-info custom-shadow mb-5">
                <div className="form-group">
                    <div className="row">
                        <div className="personal-info col-md-1 pl-3 pr-0 ">
                            <h3>№</h3>
                            {this.state.candidates.map((candidateInfo, key) => (
                                <p key={key}>{key + 1}</p>
                            ))}
                        </div>
                        <div className="personal-info col-md-9 pl-0 pr-0">
                            <h3>Варианты</h3>
                            {this.state.candidates.map((candidateInfo, key) => (
                                <p key={key}>{candidateInfo.candidate}</p>
                            ))}
                        </div>
                        <div className="personal-info col-md-2 pr-3">
                            <h3>Голосов</h3>
                            {this.state.candidates.map((candidateInfo, key) => (
                                <p key={key}>{candidateInfo.balance}</p>
                            ))}
                        </div>
                        <BarChart candidates={this.state.candidates}/>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <DocumentTitle title="Карточка электронных выборов | Expit.Online">
                <div className="container-fluid">
                    <ErrorModal title={this.state.modalTitle} error={this.state.modalContent}/>
                    <SuccessModal title={this.state.modalTitle} success={this.state.modalContent}/>
                    <div className="row fill d-flex justify-content-start h-100">
                        <div className="col-md-6 scrollbar scrollbar-primary h-100">
                            <div className="mt-5">
                                <div className="personal-info mb-5 custom-shadow">
                                    <h3>Общая информация</h3>
                                    <p>Ваш электронный адрес: <label>{this.state.voter.email}</label></p>
                                    <p>Наименование: <label>{this.state.title}</label></p>
                                    <p>Описание: <label>{this.state.info}</label></p>
                                    <p>Дата начала: <label>{DateTimeFormat.getDateTimeMSK(this.state.dtStart)}<span
                                        className="pl-1 c-orange">(МСК)</span></label></p>
                                    <p>Дата завершения: <label>{DateTimeFormat.getDateTimeMSK(this.state.dtEnd)}<span
                                        className="pl-1 c-orange">(МСК)</span></label></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 scrollbar scrollbar-primary h-100">
                            <div className="mt-5">
                                {this.state.isVoted !== null ?
                                    (!this.state.isVoted ? this.formVote() : this.formResultVote()) : (null)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </DocumentTitle>
        )
    }
}

export {VoteComponent};