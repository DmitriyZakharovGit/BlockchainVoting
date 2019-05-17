const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const modules = {
    rules: [
        {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                plugins: ['recharts'],
                cacheDirectory: true,
                presets: ['env', 'react']
            }
        },
        {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            }]
        },
        {
            test: /\.css$/,
            loader: ['style-loader', 'css-loader']
        },
        {
            test: /\.(png|jpg|gif|webp)$/,
            use: {
                loader: "url-loader",
            },
        }
    ]
};

const optimization = {
    minimizer: [
        new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                compress: {
                    inline: true,
                },
                output: {
                    comments: false,
                    beautify: false,
                },
            }
        })
    ]
};

module.exports = {modules, optimization};