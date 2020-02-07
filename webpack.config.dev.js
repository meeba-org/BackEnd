const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
let WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json'],
        modules: ['node_modules', 'public'],
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    devtool: "cheap-module-eval-source-map", // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
    entry: [
        // must be first entry to properly set public path
        './public/webpack-public-path',
        'webpack-hot-middleware/client?reload=true',
        path.resolve(__dirname, 'public/index.js') // Defining path seems necessary for this to work consistently on Windows machines.
    ],
    mode: "development",
    target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
    output: {
        path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js',
        pathinfo: false
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.EnvironmentPlugin({
            "NODE_ENV": 'development'
        }),
        new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
            template: 'public/index.ejs',
            favicon: 'public/styles/images/favicon.png',
            inject: true
        }),
        new WebpackPwaManifest({
            name: "מיבא - שעון נוכחות ומחשבון שכר",
            short_name: "מיבא",
            display: "minimal-ui",
            theme_color: "#AF6F74",
            background_color: "#AF6F74",
            start_url: ".",
            description: 'My awesome Progressive Web App!',
            icons: [
                {
                    src: 'public/styles/images/meeba-512.png',
                    sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
                },
            ]
        })
    ],
    module: {
        rules: [
            {test: /\.jsx?$/, exclude: /node_modules/, use: ['babel-loader']},
            {test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: ['file-loader']},
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/font-woff'
                        }
                    }
                ]
            },
            {
                test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/octet-stream'
                        }
                    }
                ]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'image/svg+xml'
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /(\.css|\.scss|\.sass)$/,
                exclude: /node_modules/,
                use: [
                    'style-loader?sourceMap',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: "[path]___[name]__[local]___[hash:base64:5]",
                            },
                            importLoaders: 1,
                            sourceMap: true,
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    }
};
