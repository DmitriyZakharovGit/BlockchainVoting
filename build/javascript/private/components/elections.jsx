import React from "react";
import DocumentTitle from 'react-document-title';
import {Cookies} from 'react-cookie';
import {NavLink} from 'react-router-dom'
import {DateTimeFormat} from "../../controller/date";
import {ErrorModal} from "../../controller/modals/error.jsx";
import $ from 'jquery';

const cookies = new Cookies();

class ElectionsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            title: "Ошибка удаления выборов!",
            elections: []
        };
        this.getElections = this.getElections.bind(this);
        this.removeElection = this.removeElection.bind(this);
    }

    getElections() {
        fetch('/get/elections/info', {
                method: 'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({id: cookies.get('accessToken')})
            }
        )
            .then(res => res.json())
            .then(array => {
                this.setState({elections: array.elections});
            });
    }

    componentWillMount() {
        this.getElections();
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
                    if (array.length !== 0) {
                        this.setState({error: array[0].errors});
                        $("#errorModal").modal();
                    } else {
                        this.getElections();
                    }
                }
            );
    }

    render() {
        return (
            <DocumentTitle title="Мои выборы | Expit.Online">
                <div className="container-fluid">
                    <ErrorModal title={this.state.title} error={this.state.error}/>
                    <div className="row fill d-flex justify-content-start h-100">
                        <div className="col-md-9 scrollbar scrollbar-primary h-100">
                            <div className="mt-5 mb-5">
                                {this.state.elections.map((election) => (
                                        <div
                                            className="list-group-item flex-column align-items-start list-group-item-action c-list-items"
                                            key={election.title}>
                                            <a href={election._id} className="list-group-item-action c-list-items">
                                                <div className="d-flex w-100 justify-content-between">
                                                    <div className="row container-fluid">
                                                        <div className="col-md-8 pr-0">
                                                            <h3>{election.title}</h3>
                                                        </div>
                                                        <div className="col-md-4 pl-0">
                                                            <small>
                                                                <div className="text-right">
                                                                    {DateTimeFormat.getDateTimeMSK(election.dtStart)}
                                                                    <i className="pl-1 pr-1  far fa-clock"></i>
                                                                    <span className="c-orange">МСК</span>
                                                                </div>
                                                                <div className="text-right">
                                                                    {DateTimeFormat.getDateTimeMSK(election.dtEnd)}
                                                                    <i className="pl-1 pr-1  far fa-clock"></i>
                                                                    <span className="c-orange">МСК</span>
                                                                </div>
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="mb-2 mt-2 container-fluid">{election.info}</p>
                                                <small className="c-orange container-fluid">Участие по ссылке.</small>
                                            </a>
                                            <button type="button" className="close" aria-label="Close"
                                                    onClick={(e) => this.removeElection(e)}>
                                                <span aria-hidden="true" data-id={election._id}>&times;</span>
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="col-md-3 scrollbar scrollbar-primary h-100">
                            <NavLink className="mt-3 float-right btn btn-primary" to="/private/elections/create/">Создать
                                выборы</NavLink>
                        </div>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

export {ElectionsComponent};