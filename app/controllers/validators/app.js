let checkBody = require('./reg/checkBody');
let checkAccess = require('./reg/checkAccess');

let { validateBodyEmail, validateBodyLogin, validateRegBody, validateAuthBody } = checkBody;
let { validateRegAccessData, validateAuthAccessData, validateExistEmail, validateExistLogin } = checkAccess;

async function validateEmail(req) {
    let checkBodyEmail = validateBodyEmail(req);
    let checkExistEmail = await validateExistEmail(req.body.email);
    return checkBodyEmail.concat(checkExistEmail);
}

async function validateLogin(req) {
    let checkBodyLogin = validateBodyLogin(req);
    let checkExistLogin = await validateExistLogin(req.body.login);
    return checkBodyLogin.concat(checkExistLogin);
}

async function validateRegistration(req) {
    let errorsValidBody = validateRegBody(req);
    let errorsAccessData = await validateRegAccessData(req);

    return errorsValidBody.concat(errorsAccessData);
}

async function validateAuth(req) {
    let errorsValidBody = validateAuthBody(req);
    let errorsAccessData = await validateAuthAccessData(req);

    return errorsValidBody.concat(errorsAccessData);
}

module.exports = {
    validateRegistration,
    validateAuth,
    validateEmail,
    validateLogin,
    checkAccess,
    checkBody
};