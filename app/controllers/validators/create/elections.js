let { required } = require('./../errors');

function getError(location, param, msg, value) {
    return {
        location: location,
        param: param,
        msg: msg,
        value: value
    }
}

function validateAddElection(req) {
    req.checkBody('title', required).notEmpty();
    req.checkBody('info', required).notEmpty();
    req.checkBody('voters', required).notEmpty();
    req.checkBody('dtStart', required).notEmpty();
    req.checkBody('dtEnd', required).notEmpty();
    req.checkBody('candidates', required).notEmpty();
    let errors = req.validationErrors() ? req.validationErrors() : [];

    if (new Date(req.body.dtStart) <= new Date()) {
        errors.push(getError('body', 'dtStart', 'Дата начала проведения выборов не может быть в прошлом.', req.body.dtStart))
    }
    if (req.body.dtStart >= req.body.dtEnd) {
        errors.push(getError('body', 'dtEnd', 'Дата заверщения выборов не может быть раньше или равной дате начала выборов.', req.body.dtEnd))
    }
    return errors;
}

module.exports = { validateAddElection };