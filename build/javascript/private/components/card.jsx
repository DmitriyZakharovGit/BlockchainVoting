import React from "react";
import {Cookies} from 'react-cookie';
import {Link} from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import {DateTimeFormat} from "../../controller/date";
import BarChart from "../../controller/charts/bar.jsx";
import {ErrorModal} from "../../controller/modals/error.jsx";
import "babel-polyfill";
import $ from 'jquery';

const cookies = new Cookies();

class CardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            candidates: [], // todo in Election
            title: "Ошибка удаления выборов!",
            election: {candidates: [], voters: []}
        };
        this.getElection = this.getElection.bind(this);
        this.removeElection = this.removeElection.bind(this);
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

    getCandidates(candidates) {
        return Promise.all(candidates.map(async candidate => {
            let candidateInfo = candidate;
            candidateInfo.balance = await CardComponent.getBalance(candidate.address);
            return candidateInfo;
        }));
    }

    getElection() {
        fetch('/get/election/info', {
                method: 'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: this.props.match.params.id,
                    organizer: cookies.get('accessToken')
                })
            }
        ).then(res => res.json())
            .then(async array => {
                if (array.election.length !== 0) {
                    this.setState({
                        election: array.election[0],
                        // TODO Candidates in election
                        candidates: await this.getCandidates(array.election[0].candidates)
                    })
                } else {
                    window.location.replace("/private/elections/");
                }
            });
    }

    componentWillMount() {
        this.getElection();
    }

    removeElection(e) {
        fetch('/remove/election/', {
                method: 'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: e.target.dataset.id,
                    organizer: cookies.get('accessToken')
                })
            }
        ).then(res => res.json())
            .then(array => {
                    if (array.length === 0) {
                        window.location.replace("/private/elections/");
                    } else {
                        this.setState({error: array[0].errors});
                        $("#errorModal").modal();
                    }
                }
            );
    }

    render() {
        return (
            <DocumentTitle title="Карточка электронных выборов | Expit.Online">
                <div className="container-fluid">
                    <ErrorModal title={this.state.title} error={this.state.error}/>
                    <div className="row fill d-flex justify-content-start h-100">
                        <div className="col-md-5 scrollbar scrollbar-primary h-100 pr-2 pl-2">
                            <div className="mt-5">
                                <div className="personal-info custom-shadow">
                                    <h3>Общая информация</h3>
                                    <p>Наименование: <label>{this.state.election.title}</label></p>
                                    <p>Описание: <label>{this.state.election.info}</label></p>
                                    <p>Дата начала: <label>{DateTimeFormat.getDateTimeMSK(this.state.election.dtStart)}
                                        <i className="pl-1 pr-1 far fa-clock"></i><span className="c-orange">МСК</span>
                                    </label></p>
                                    <p>Дата завершения:<label>{DateTimeFormat.getDateTimeMSK(this.state.election.dtEnd)}
                                        <i className="pl-1 pr-1 far fa-clock"></i><span className="c-orange">МСК</span>
                                    </label></p>
                                </div>
                                <div className="mt-3 personal-info custom-shadow">
                                    <BarChart candidates={this.state.candidates}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 scrollbar scrollbar-primary h-100 pr-2">
                            <div className="mt-5">
                                <div className="personal-info custom-shadow">
                                    <div className="row">
                                        <h3 className="c-h3 col-8">Зарегистрированные варианты</h3>
                                        <h3 className="c-h3 col-4 right">Голосов</h3>
                                    </div>
                                    {this.state.candidates.map((candidateInfo, key) => (
                                        <div key={key} className="row mt-0 mb-0">
                                            <p key={key + candidateInfo.candidate} className="col-8 pr-0 mb-1">
                                                {key + 1}. {candidateInfo.candidate}
                                            </p>
                                            <p key={key + candidateInfo.balance} className="col-4 right pl-0 mb-1">
                                                {candidateInfo.balance}
                                            </p>
                                        </div>
                                    ))}
                                    <h3 className="mt-4">Зарегистрированные избиратели</h3>
                                    {this.state.election.voters.map((voterInfo, key) =>
                                        <p key={key + voterInfo.email}>{key + 1}. {voterInfo.email}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 scrollbar scrollbar-primary h-100 pl-2">
                            <div className="mt-3 float-right">
                                <button className="btn btn-danger mr-2" data-id={this.state.election._id}
                                        onClick={(e) => this.removeElection(e)}>Удалить
                                </button>
                                <Link className="btn btn-outline-primary" to="/private/elections/">Назад</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

export {CardComponent};