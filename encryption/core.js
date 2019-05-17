const fs = require("fs");
const options = {
    key: fs.readFileSync("encryption/private.pem"),
    cert: fs.readFileSync("encryption/primary.pem"),
    ca: fs.readFileSync("encryption/intermediate.pem")
};

module.exports = {options};