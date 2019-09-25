const path = require('path');
const webpack = require('webpack');

const config = {
    mode: 'production',
    entry: './src/index.js',
    // devtool: 'inline-source-map',
    devServer: {
        contentBase: '../../force-app/main/default/staticresources/lcc_datagrid_react'
    },
    output: {
        path: path.resolve(__dirname, '../../force-app/main/default/staticresources/lcc_datagrid_react'),
        filename: 'bundle.js'
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['transform-class-properties', "transform-object-rest-spread"]
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
};
module.exports = config;