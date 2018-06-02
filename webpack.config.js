module.exports = {
	entry: './public/app.js',
	output: {
		path: __dirname + '/public/dist',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	mode: 'production',
	devtool: 'inline-source-map',
	devServer: {
		inline: true,
		hot: true,
		contentBase: 'public/',
		port: 3355
	}
}
