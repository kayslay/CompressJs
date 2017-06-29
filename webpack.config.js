/**
 * Created by kayslay on 6/28/17.
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: ['./src/index.js'],
        worker: ['./src/worker.js'],
        compress: ['./src/compress.js']
    },
    // plugins: [
    //     new webpack.optimize.CommonsChunkPlugin({
    //         name: ['commons','compress','bootstrap']
    //     })
    // ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: '/node_modules/'
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dists/',
        filename: '[name].js'
    },
    devtool: "source-map"
};