const crypto = require('crypto');
let users = require('../../../models/users');

function getError(location, param, msg, value) {
    return {
        location: location,
        param: param,
        msg: msg,
        value: value
    }
}

async function validateExistEmail(email) {
    let errors = [];
    if (await users.isEmailExist(email) === true) {
        errors.push(getError('body', 'email', 'Данный электронный адрес уже используется в системе.', email))
    }
    return errors;
}

async function validateExistLogin(login) {
    let errors = [];
    if (await users.isLoginExist(login) === true) {
        errors.push(getError('body', 'login', 'Данный логин уже используется в системе.', login))
    }
    return errors;
}

async function validateRegAccessData(req) {
    let errorsEmail = await validateExistEmail(req.body.email);
    let errorsLogin = await validateExistLogin(req.body.login);
    return errorsEmail.concat(errorsLogin);
}

async function validateAuthAccessData(req) {
    const hashPassword = crypto.createHmac('sha256', req.body.auth_password).update(req.body.auth_login).digest('hex');

    if (await users.isLoginExist(req.body.auth_login) === false) {
        return [getError('body', 'auth_login', 'Данный логин не зарегистрирован в системе.', req.body.auth_login)];
    }

    let user = await users.getUserByLogin(req.body.auth_login);

    return user[0].password !== hashPassword ? [getError('body', 'auth_password', 'Некорректно введён пароль.')] : [];
}

module.exports = { validateExistLogin, validateExistEmail, validateRegAccessData, validateAuthAccessData };