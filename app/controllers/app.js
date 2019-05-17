const { add: addUser, getUserByLogin, findUserById } = require('./../models/users');
const { add: addElection, remove: removeElection, getElection, getElections, getElectionByVoterUuid, isContinues } = require('./../models/elections');
const { validateAddElection } = require('./validators/create/elections');
const { validateRegistration, validateAuth, validateEmail, validateLogin, checkBody } = require('./validators/app');

const { validateBodyPassword, validateBodyCheckPassword, validateBodySurname, validateBodyName } = checkBody;
const { sendVoteToken, getAddressBalance } = require('./multichain');

const registration = async (req, res) => {
    let errors = await validateRegistration(req);
    if (errors.length === 0) {
        await addUser(req.body);
        let user = await getUserByLogin(req.body.login);
        res.json([{ accessToken: user[0]._id }]);
    } else {
        res.json(errors);
    }
};

const authority = async (req, res) => {
    let errors = await validateAuth(req);
    if (errors.length === 0) {
        let user = await getUserByLogin(req.body.auth_login);
        res.json([{ accessToken: user[0]._id }]);
    } else {
        res.json(errors);
    }
};

const creation = (req, res) => {
    let errors = {};
    switch (req.params.type) {
        case 'election': {
            errors = validateAddElection(req);
            errors.length === 0 ? addElection(req.body) : null;
            break;
        }
        default: {
            errors = 'Error type is undefined!';
        }
    }
    res.json(errors);
};

const deletion = async (req, res) => {
    let errors = {};
    switch (req.params.type) {
        case 'election': {
            let removeResult = await removeElection(req.body.id, req.body.organizer);
            errors = removeResult === 1 ? [] : removeResult;
            break;
        }
        default: {
            errors = ['Error type is undefined!'];
        }
    }
    res.json(errors);
};

const validation = async (req, res) => {
    let errors = {};

    switch (req.params.type) {
        case 'email': {
            errors = await validateEmail(req);
            break;
        }
        case 'login': {
            errors = await validateLogin(req);
            break;
        }
        case 'password': {
            errors = validateBodyPassword(req);
            break;
        }
        case 'checkPassword': {
            errors = validateBodyCheckPassword(req);
            break;
        }
        case 'surname': {
            errors = validateBodySurname(req);
            break;
        }
        case 'name': {
            errors = validateBodyName(req);
            break;
        }
        default: {
            errors = 'Error type is undefined!';
        }
    }
    res.json(errors);
};

const getInfo = async (req, res) => {
    switch (req.params.type) {
        case 'user': {
            let user = await findUserById(req.body.id);
            res.json({
                'name': user[0].name,
                'surname': user[0].surname,
                'patronymic': user[0].patronymic,
                'email': user[0].email,
                'login': user[0].login,
                'isChecked': user[0].isChecked
            });
            break;
        }
        case 'election': {
            let election = await getElection(req.body.id, req.body.organizer);
            res.status(200).json({ 'election': election ? election : [] });
            break;
        }
        case 'elections': {
            let elections = await getElections(req.body.id);
            res.status(200).json({ 'elections': elections.length === 0 ? [] : elections });
            break;
        }
        case 'electionByUUID': {
            let elections = await getElectionByVoterUuid(req.body.uuid);
            res.status(200).json({ 'election': elections.length === 0 ? [] : elections });
            break;
        }
        case 'balance': {
            let balance = await getAddressBalance(req.body.address);
            res.status(200).json({ 'balance': balance });
            break;
        }
    }
};

const semiAccessibleSection = (req, res) => {
    res.render('semi-accessible.html');
};

const vote = async (req, res) => {
    let election = await getElectionByVoterUuid(req.body.voterUuid);
    let errors = [];

    if (isContinues(election[0].dtStart, election[0].dtEnd)) {
        let voterInfo = election[0].voters.filter((element) => element.uuid === req.body.voterUuid);
        let candidateInfo = election[0].candidates.filter((element) => element.uuid === req.body.selectCandidateUuid);
        let error = await sendVoteToken(voterInfo[0].address, candidateInfo[0].address, req.body.id);

        if (error.length > 0) {
            errors.push({ 'errors': 'Ваш голос уже был зарегистрирован!' })
        } else {
            errors.push({ 'errors': false });
        }
    } else {
        errors.push({ 'errors': 'Срок голосования еще не наступил или уже истёк!' });
    }

    res.json(errors);
};

const publicSection = (req, res) => {
    res.render('public.html');
};

const privateSection = (req, res) => {
    res.render('private.html');
};

module.exports = {
    authority,
    creation,
    deletion,
    getInfo,
    publicSection,
    privateSection,
    registration,
    semiAccessibleSection,
    validation,
    vote
};