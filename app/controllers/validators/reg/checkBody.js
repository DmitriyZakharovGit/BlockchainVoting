let {required, incorrectlyValue, dontMatchPassword, min, max} = require('./../errors');

function validateBodyEmail(req) {
    req.checkBody('email', required).notEmpty();
    req.checkBody('email', incorrectlyValue).isEmail();
    req.checkBody('email', min(5)).len({min: 5});
    req.checkBody('email', max(25)).len({max: 25});

    return req.validationErrors() ? req.validationErrors() : [];
}

function validateBodyLogin(req) {
    req.checkBody('login', required).notEmpty();
    req.checkBody('login', min(5)).len({min: 5});
    req.checkBody('login', max(15)).len({max: 15});

    return req.validationErrors() ? req.validationErrors() : [];
}

function validateBodyPassword(req) {
    req.checkBody('password', required).notEmpty();
    req.checkBody('password', min(5)).len({min: 5});
    req.checkBody('password', max(20)).len({max: 20});

    return req.validationErrors() ? req.validationErrors() : [];
}

function validateBodyCheckPassword(req) {
    req.checkBody('checkPassword', required).notEmpty();
    req.checkBody('checkPassword', dontMatchPassword).equals(req.body.password);
    req.checkBody('checkPassword', min(5)).len({min: 5});
    req.checkBody('checkPassword', max(20)).len({max: 20});
    return req.validationErrors() ? req.validationErrors() : [];
}

function validateBodySurname(req) {
    req.checkBody('surname', required).notEmpty();
    req.checkBody('surname', max(20)).len({max: 20});

    return req.validationErrors() ? req.validationErrors() : [];
}


function validateBodyName(req) {
    req.checkBody('name', required).notEmpty();
    req.checkBody('name', max(20)).len({max: 20});

    return req.validationErrors() ? req.validationErrors() : [];
}

function validateAuthBody(req) {
    req.checkBody('auth_login', required).notEmpty();
    req.checkBody('auth_login', min(5)).len({min: 5});
    req.checkBody('auth_login', max(15)).len({max: 15});

    req.checkBody('auth_password', required).notEmpty();
    req.checkBody('auth_password', min(5)).len({min: 5});
    req.checkBody('auth_password', max(20)).len({max: 20});

    let errors = req.validationErrors();
    return errors ? errors : [];
}

function validateRegBody(req) {
    req.checkBody('email', required).notEmpty();
    req.checkBody('email', incorrectlyValue).isEmail();
    req.checkBody('email', min(5)).len({min: 5});
    req.checkBody('email', max(25)).len({max: 25});

    req.checkBody('login', required).notEmpty();
    req.checkBody('login', min(5)).len({min: 5});
    req.checkBody('login', max(15)).len({max: 15});

    req.checkBody('password', required).notEmpty();
    req.checkBody('password', min(5)).len({min: 5});
    req.checkBody('password', max(20)).len({max: 20});

    req.checkBody('checkPassword', required).notEmpty();
    req.checkBody('checkPassword', dontMatchPassword).equals(req.body.password);
    req.checkBody('checkPassword', min(5)).len({min: 5});
    req.checkBody('checkPassword', max(20)).len({max: 20});

    req.checkBody('surname', required).notEmpty();
    req.checkBody('surname', max(20)).len({max: 20});

    req.checkBody('name', required).notEmpty();
    req.checkBody('name', max(20)).len({max: 20});

    let errors = req.validationErrors();
    return errors ? errors : [];
}

module.exports = {
    validateBodySurname,
    validateBodyName,
    validateBodyEmail,
    validateBodyLogin,
    validateBodyPassword,
    validateBodyCheckPassword,
    validateRegBody,
    validateAuthBody
};