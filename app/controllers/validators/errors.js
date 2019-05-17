let required = "Заполните поле.";
let incorrectlyValue = "Некорректно заполнено поле.";
let dontMatchPassword = "Пароли не совпадают";
let min = (value) => `Минимальная длина поля ${value}`;
let max = (value) => `Максимальная длина поля ${value}`;


module.exports = {required, incorrectlyValue, dontMatchPassword, min, max};