const Datastore = require('nedb');
const crypto = require('crypto');

let db = new Datastore({
    filename: 'db/users',
    autoload: true
});

async function add(query) {
    const hashPassword = crypto.createHmac('sha256', query.password).update(query.login).digest('hex');
    db.insert({
        login: query.login,
        password: hashPassword,
        surname: query.surname,
        name: query.name,
        patronymic: query.patronymic,
        email: query.email,
        isChecked: false,
        isAdmin: false
    });
}

async function getUserByEmail(email) {
    return await new Promise((resolve, reject) => {
        db.find({email: email}, (err, user) => {
            if (err) reject(err);
            resolve(user)
        });
    });
}

async function getUserByLogin(login) {
    return await new Promise((resolve, reject) => {
        db.find({login: login}, (err, user) => {
            if (err) reject(err);
            resolve(user)
        });
    });
}

async function isEmailExist(email) {
    let count = await new Promise((resolve, reject) => {
        db.count({email: email}, (err, count) => {
            if (err) reject(err);
            resolve(count);
        });
    });
    return count > 0;
}

async function isLoginExist(login) {
    let count = await new Promise((resolve, reject) => {
        db.count({login: login}, (err, count) => {
            if (err) reject(err);
            resolve(count);
        });
    });
    return count > 0;
}

async function findUserById(id) {
    return await new Promise((resolve, reject) => {
        db.find({_id: id}, (err, user) => {
            if (err) reject(err);
            resolve(user)
        });
    });
}

module.exports = {isEmailExist, isLoginExist, getUserByLogin, findUserById, add};