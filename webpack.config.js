const HtmlWebpackPlugin = require('html-webpack-plugin');
const {modules, optimization} = require('./webpack/config.js');

let getConfigPart = (part) => {
    return {
        mode: 'development',
        entry: {
            'core': __dirname + `/build/javascript/${part}/builder.core.jsx`
        },
        output: {
            path: __dirname + `/public/javascript/${part}/`,
            publicPath: `/javascript/${part}/`,
            filename: '[name].js',
        },
        module: modules,
        optimization: optimization,
        plugins: [
            new HtmlWebpackPlugin({
                template: "./build/templates/index.html",
                filename: `./../../../app/views/${part}.html`,
            })
        ]
    }
};

let publicConfig = getConfigPart("public");
let privateConfig = getConfigPart("private");
let semiAccessibleConfig = getConfigPart("semi-accessible");

module.exports = [publicConfig, privateConfig, semiAccessibleConfig];