const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
<<<<<<< HEAD
	mode: `development`,
	entry: `./src/main.js`,
	devtool: `source-map`,
	output: {
		filename: `bundle.js`,
		path: path.join(__dirname, `public`)
	},
	devServer: {
		contentBase: path.join(__dirname, `public`),
		publicPath: `http://localhost:8080/`,
		compress: true,
		watchContentBase: true
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	},
	plugins: [
		new MomentLocalesPlugin({
			localesToKeep: [ `es-us` ]
		})
	]
=======
  mode: `development`,
  entry: `./src/main.js`,
  devtool: `source-map`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`),
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    publicPath: `http://localhost:8080/`,
    compress: true,
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`],
    }),
  ],
>>>>>>> 79df030ecb41f99a2512d472b74f42da02e7a29e
};
