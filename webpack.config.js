const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");

const cssLoaders = isDev => {
	const loaders = [
		// "style-loader",
		// "vue-style-loader",
		// {
		// 	loader: MiniCssExtractPlugin.loader,
		// },
		isDev ? "vue-style-loader" : MiniCssExtractPlugin.loader,
		{
			loader: "css-loader",
			options: {
				sourceMap: isDev,
				importLoaders: 1
			}
		},
		{
			loader: "postcss-loader",
			options: {
				ident: "postcss",
				sourceMap: isDev,
				plugins: postCssPlugins(!isDev)
			}
		}
	];

	return loaders;
};

const postCssPlugins = isProd => {
	const plugins = [
		require("postcss-import")(),
		require("postcss-preset-env")({
			stage: 3,
			features: {
				"custom-media-queries": true,
				"custom-properties": true,
				"custom-selectors": true,
				"nesting-rules": true,
				"system-ui-font-family": true
			}
		}),
		require("autoprefixer")(),
		require('postcss-media-minmax')(),
		require("postcss-sort-media-queries")({
			sort: "desktop-first"
		}),
	];

	if (isProd) {
		plugins.push(require("cssnano")({
			preset: [
				"default",
				{
					discardComments: {
						removeAll: true
					}
				}
			]
		}));
	}

	return plugins;
};

// eslint-disable-next-line no-unused-vars
module.exports = (_, opt) => {
	const isProd = opt.mode === "production";
	const isDev = !isProd;

	return {
		entry: {
			main: path.resolve(__dirname, "src/index.js")
		},
		output: {
			filename: "[name].js",
			path: path.resolve(__dirname, "dist")
		},
		devtool: isDev ? "eval" : false,
		mode: isDev ? 'development' : 'production',
		devServer: {
			port: 8081,
			contentBase: path.join(__dirname, 'dist'),
			compress: true,
			writeToDisk: true,
			overlay: true,
			// stats: {
			// 	chunks: false,
			// 	modules: false,
			// 	children: false
			// }
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env']
					}
				},
				{
					test: /\.css$/,
					use: cssLoaders(isDev)
				},
				{
					test: /\.vue$/,
					loader: 'vue-loader',
				},
				{
					test: /\.(png|jpe?g|gif|svg)$/i,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 1048,
								fallback: {
									loader: 'file-loader',
									options: {
										name: "img/[name].[ext]"
									}
								}
							},
						},
					],
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				filename: "index.html",
				title: "Main page | Audit Company",
				template: path.resolve(__dirname, "src/index.html"),

			}),
			new HtmlWebpackPlugin({
				filename: "posts.html",
				title: "Posts page | Audit Company",
				template: path.resolve(__dirname, "src/posts.html"),

			}),
			new HtmlWebpackPlugin({
				filename: "about.html",
				title: "About page | Audit Company",
				template: path.resolve(__dirname, "src/about.html"),

			}),
			new HtmlWebpackPlugin({
				filename: "contacts.html",
				title: "Contacts page | Audit Company",
				template: path.resolve(__dirname, "src/contacts.html"),

			}),
			new HtmlWebpackPlugin({
				filename: "materials.html",
				title: "Materials page | Audit Company",
				template: path.resolve(__dirname, "src/materials.html"),

			}),
			new HtmlWebpackPlugin({
				filename: "singlepost.html",
				title: "Single Post Page | Audit Company",
				template: path.resolve(__dirname, "src/singlepost.html"),

			}), new HtmlWebpackPlugin({
				filename: "services.html",
				title: "Services page | Audit Company",
				template: path.resolve(__dirname, "src/services.html"),

			}),
			new MiniCssExtractPlugin({
				filename: "[name].css"
			}),
			new VueLoaderPlugin(),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: path.resolve(__dirname, "src/img"),
						to: "img",
						noErrorOnMissing: true
					},
					{
						from: path.resolve(__dirname, "src/favicon.ico"),
						noErrorOnMissing: true
					}
				],
				options: {
					concurrency: 100
				}
			}),
			new webpack.DefinePlugin({
				IS_DEV: isDev
			})
		],
		resolve: {
			extensions: [".js", ".vue", ".css"],
			alias: {
				'@': path.resolve(__dirname, 'src/js'),
				"vue$": isDev ? "vue/dist/vue.runtime.js" : "vue/dist/vue.runtime.min.js"
			}
		}
	};
};