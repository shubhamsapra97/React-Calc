const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: {
		app: path.join(__dirname, './src/index.jsx'),
	},
	output: {
		filename: 'bundle/[name].[hash].bundle.js',
		chunkFilename: 'bundle/[name].[chunkhash].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
		}),
		new MiniCssExtractPlugin({
			filename: "styles.css",
			chunkFilename: "styles.css"
		  })
	],
	devServer: {
		contentBase: './dist',
		inline: true,
		historyApiFallback: true,
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					// 'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					plugins: [
						"transform-class-properties",
						"syntax-dynamic-import"
					],
					presets: [
						"env",
						'react'
					]
				}
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
		]
	}
};