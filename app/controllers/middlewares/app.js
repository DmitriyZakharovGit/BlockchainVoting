const { findUserById } = require('./../../models/users');

const isAuthMiddleware = async (req, res, next) => {
    let user = await findUserById(req.universalCookies.get('accessToken'));
    user.length !== 0 ? next() : res.redirect('/');
};

const isNotAuthMiddleware = async (req, res, next) => {
    let user = await findUserById(req.universalCookies.get('accessToken'));
    user.length !== 0 ? res.redirect('/private/') : next();
};

module.exports = { isAuthMiddleware, isNotAuthMiddleware };