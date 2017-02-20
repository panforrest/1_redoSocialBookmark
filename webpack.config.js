var webpack = require('webpack')
var path = require('path')

module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		filename: 'public/dist/bundle.js',
		sourceMapFilename: 'public/dist/bundle.app.js'
	},
	devtool: '#source-map',
	module: {
		loaders: [
		    {
                loader: 'babel-loader',
                test: /\.js?$/,
                exclude: /(node_moudule)/,
                query: {
                	presets:['react', 'es2015']
                }
		    }
		]
	}
}