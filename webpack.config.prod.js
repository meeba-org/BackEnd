// For info about this file refer to webpack and webpack-hot-middleware documentation
// For info on how we're generating bundles with hashed filenames for cache busting: https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.w99i89nsz
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
process.env.NODE_ENV = 'production';

module.exports = {
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
    },
    devtool: false, // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
    entry: path.resolve(__dirname, 'public/index'),
    mode: "production",
    target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        minimizer: [
            new UglifyJsPlugin()
        ]
    },
    stats: {
        children: false,
    },
    plugins: [
        // Hash the files using MD5 so that their names change when the content changes.
        new WebpackChunkHash({algorithm: 'md5'}), // 'md5' is default value

        // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
        new webpack.EnvironmentPlugin([
            "NODE_ENV", "BABEL_ENV", "PORT"
        ]),

        // Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
        new HtmlWebpackPlugin({
            template: 'public/index.ejs',
            favicon: 'public/styles/images/favicon.png',
            minify: {
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            // Note that you can add custom options here if you need to handle other custom logic in index.html
            // To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
            trackJSToken: ''
        }),

        // Generate an external css file with a hash in the filename
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        // https://github.com/numical/script-ext-html-webpack-plugin
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),
        new CopyPlugin([
            './public/serviceWorker/sw.js',
            './public/serviceWorker/site.js',
            {
                from: './public/styles/videos', to: 'styles/videos'
            }
        ]),
        new WebpackPwaManifest({
            name: "מיבא - שעון נוכחות ומחשבון שכר",
            short_name: "מיבא למנהל",
            display: "minimal-ui",
            theme_color: "#AF6F74",
            background_color: "#AF6F74",
            description: 'My awesome Progressive Web App!',
            start_url: "/",
            icons: [
                {
                    src: 'public/styles/images/meeba-512.png',
                    sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
                },
            ]
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // we dont need all the locale in moment
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                use: ['url-loader']
            },
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
                test: /\.(jpe?g|png|gif|ico|mp4)$/i,
                use: ['file-loader']
            },
            {
                test: /(\.css|\.scss|\.sass)$/,
                exclude: /node_modules/,
                use: [
                        MiniCssExtractPlugin.loader,
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
            },
        ]
    }
};
