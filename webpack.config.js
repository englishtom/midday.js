const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = () => {
    return {
        mode: 'development',
        entry: ['./example/main.js'],
        //output: {
            //path: path.resolve(__dirname, 'dist'),
            //filename: './js/bundle.js',
        //},
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                    ],
                    exclude: /(node_modules|bower_components)/,
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        //'postcss-loader',
                        {
                            loader: 'sass-loader',
                            query: {
                                includePaths: [path.resolve(__dirname, 'node_modules')]
                            }
                        },
                    ],
                }
            ],
        },
        stats: {
            colors: true,
        },
        devtool: 'source-map',
        //devServer: {
            //contentBase: path.join(__dirname, 'dist'),
        //},
        plugins: [
            new HtmlWebpackPlugin({
                template: './example/index.html',
                //filename: './index.html',
            }),
        ],
    };
};
