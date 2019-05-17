import React from "react";
import {NavLink} from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import {GuidePages} from './../config/guide.js';
import {Socials} from "../config/socials";

const Header = () => (
    <header className="header-image center">
        <div className="blur-bg">
            <div className="header-info">
                <h1>EXPIT</h1>
                <p>Прозрачные выборы в 5 шагов</p>
                <NavLink className="btn button-primary btn-lg" to="/guide/get-started">Начать</NavLink>
            </div>
        </div>
    </header>
);

const Info = () => (
    <div className="container mt-5">
        <div className="row center">
            <div className="col">
                <i className="fas fa-balance-scale fa-5x"/>
                <p className="mt-3 info-title">Концепция прозрачных выборов</p>
                <p className="info-content">Каждый посетитель может проверить корректность проведения
                    выборов, с соблюдением всех требований</p>
            </div>
            <div className="col">
                <i className="fas fa-shield-alt fa-5x"/>
                <p className="mt-3 info-title">Безопасность данных</p>
                <p className="info-content">За счёт распределенного и децентрализованного хранения голосов -
                    отсутствует возможность «подделки» данных</p>
            </div>
            <div className="col">
                <i className="fas fa-user-secret fa-5x"/>
                <p className="mt-3 info-title">Анонимность</p>
                <p className="info-content">В процессе голосования, для любого посетителя отображаются лишь
                    голоса, но соблюдается полная анонимность избирателей</p>
            </div>
            <div className="col">
                <i className="fas fa-laptop fa-5x"/>
                <p className="mt-3 info-title">Дружественный интерфейс</p>
                <p className="info-content">Интерфейс сделан понятным, чтобы каждый посетитель мог найти
                    необходимый ему функционал, не затрачивая времени</p>
            </div>
            <div className="col">
                <i className="fab fa-searchengin fa-5x"/>
                <p className="mt-3 info-title">Поисковая система</p>
                <p className="info-content">Если в процессе поиска возникли проблемы с поиском необходимого
                    функционала - всегда можно обратиться к поисковой системе сайта</p>
            </div>
        </div>
    </div>
);

const Footer = () => (
    <div className="mt-5 footer">
        <div className="container">
            <div className="row">
                <div className="col footer-column">
                    Copyright © 2018 Expit.Online Inc.
                </div>
                <div className="col footer-column">
                    <h2>Гайд</h2>
                    <ul>
                        {GuidePages.all().map(p => (
                            <li key={p.id}>
                                <NavLink to={p.url}>{p.name}</NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col footer-column">
                    <h2>Новости</h2>
                    {Socials.all().map(p => (
                        <a className="p-right-3" href={p.url} key={p.id}>
                            <i className={'custom-shadow fab fa-3x social-icon '.concat(p.name)}></i>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const MainComponent = () => (
    <DocumentTitle title="Главная страница | Expit.Online">
        <div className="full-width">
            <Header/>
            <Info/>
            <Footer/>
        </div>
    </DocumentTitle>
);

export {MainComponent};