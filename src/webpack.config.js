const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const envFile = require('node-env-file');
const chalk = require('chalk');

const VENDOR_LIBS = [
    'react', 'react-dom', 'react-router-dom'
];

const clientBundleOutputDir = './dist/assets';


const webpackConfigs = (env) => {
    const isDevBuild = !(env && env.prod);
    if (isDevBuild) console.log(chalk.green('Running Webpack ' + chalk.underline('Development') + ' build..'));
    else console.log(chalk.green('Running Webpack ' + chalk.underline('Production') + ' build..'));

    const modeSourceMap = isDevBuild ? 'cheap-module-eval-source-map' : 'source-map';
    const cssLoader = isDevBuild ? 'css-loader': 'css-loader?minimize';
    const sassLoader = isDevBuild ? 'sass-loader' : 'sass-loader?minimize';
    const appSettingsFile = '/settings/settings.env';
    //const appSettingsFile = isDevBuild ? '/settings/settings.dev.env' : '/settings/settings.production.env';

    try {
        envFile(path.join(__dirname + appSettingsFile));
    } catch (error) {
        console.log(chalk.red("Failed to read env file!: " + __dirname + appSettingsFile));
    }

    /* <--- :: Client Side SPA :: ---> */
    const configClient = {
        name: 'client-spa',
        entry: {
            site: './app/boot-client.js',
            vendor: VENDOR_LIBS
        },
        output: {
            path: path.join(__dirname, clientBundleOutputDir),
            filename: '[name].[chunkhash].js',
            publicPath: 'assets/'
        },
        module: {
            rules: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    cacheDirectory: '.babel-cache'
                }
            }, {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: cssLoader},
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('precss'),
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        },
                        {
                            loader: sassLoader,
                            options: {
                                includePaths: [
                                    path.resolve(__dirname, './node_modules/font-awesome/scss'),
                                ]
                            }
                        }
                    ]
                })
            }, {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {limit: 40000}
                    },
                    'image-webpack-loader'
                ]
            }, {
                test: /\.(woff|woff2|eot|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=100000'
            }]
        },
        plugins: [
            new ExtractTextPlugin({
                filename: `[name].css`
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor"
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "manifest",
                minChunks: Infinity
            }),
            new HtmlWebpackPlugin({
                template: 'app/index.template.html',
                filename: '../index.html' // relative to output directory
            })/*,
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: ['popper.js', 'default']
            }),
            new webpack.DefinePlugin({
                ENV: JSON.stringify("client-spa"),
                "process.env": {
                    NODE_ENV: JSON.stringify(isDevBuild ? "development" : "production"),
                    API_SERVER_URL: JSON.stringify(process.env.API_SERVER_URL)
                }
            })*/
        ],
        devtool: modeSourceMap

    };

    /* <--- :: WebPack Dev Server with HMR :: ---> */
    /*const configHMR = {
        name: 'client-hmr'
    };

    return [configClient, configHMR];*/

    return [configClient];
};

module.exports = webpackConfigs;


