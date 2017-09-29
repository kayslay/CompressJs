/**
 * Created by kayslay on 6/28/17.
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: ['./src/index.js'],
    },
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false }
		})
	],
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
        filename: 'compressjs.js'
    },
    devtool: "source-map"
};