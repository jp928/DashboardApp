'use strict';

var webpack = require('webpack'),
    path = require('path');

module.exports = {
    debug: true,
    entry: './app/index.app.js',
    output: {
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.scss$/,
            loader: 'style!css!autoprefixer!sass'
        }, {
            test: /.png$/,
            loader: 'url?limit=100000&mimetype=image/png'
        }, {
            test: /\.jpg$/,
            loader: 'file'
        }, {
            test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream'
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file'
        }, {
            test: /\.svg$/,
            loader: 'url?limit=10000&mimetype=image/svg+xml'
        }, {
            test: /\.html$/,
            loader: 'html'
        }]
    },
    resolve: {
        alias: {
            lodash: path.resolve(__dirname, './bower_components/lodash/lodash.min.js'),
            d3: path.resolve(__dirname, './bower_components/d3/d3.min.js'),
            c3: path.resolve(__dirname, './bower_components/c3/c3.min.js'),
            models: path.resolve(__dirname, './app/modules/')
        }
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.ProvidePlugin({
            _: 'lodash',
            d3: 'd3',
            c3: 'c3'
        }),
        // comment out this for development because uglify is extremely slow
        new webpack.optimize.UglifyJsPlugin({
            mangle: false
        })
    ]
};
