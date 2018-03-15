// For info about this file refer to webpack and webpack-hot-middleware documentation
// For info on how we're generating bundles with hashed filenames for cache busting: https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.w99i89nsz
const webpack = require('webpack');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');
process.env.NODE_ENV = 'production';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.BABEL_ENV': JSON.stringify('production'),
    __DEV__: false
};

module.exports = {
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
    },
    devtool: 'source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
    entry: path.resolve(__dirname, 'public/index'),
    target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    plugins: [
        // Hash the files using MD5 so that their names change when the content changes.
        new WebpackMd5Hash(),

        // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
        new webpack.DefinePlugin(GLOBALS),

        // Generate an external css file with a hash in the filename
        new ExtractTextPlugin('[name].[contenthash].css'),

        // Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
        new HtmlWebpackPlugin({
            template: 'public/index.ejs',
            favicon: 'public/styles/images/icon.png',
            minify: {
                removeComments: true,
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
        // https://github.com/numical/script-ext-html-webpack-plugin
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'async'
        }),
        new webpack.DefinePlugin({
            'process.env.PORT': 3000,
        }),

        // Minify JS
        new webpack.optimize.UglifyJsPlugin({sourceMap: true}),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            noInfo: true, // set to false to see a list of every file being bundled.
            options: {
                context: '/',
                postcss: () => [autoprefixer],
            }
        })
    ],
    module: {
        rules: [
            {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader']},
            {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader'},
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
            {test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
            {test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?name=[name].[ext]'},
            {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
            {test: /\.scss$/, use: [
                {loader: "style-loader"},
                {loader: "css-loader"},
                {loader: "sass-loader",options: {
                    includePaths: [
                        path.resolve(__dirname, 'node_modules/sass-material-colors/sass/sass-material-colors'),
                        path.resolve(__dirname, 'public/styles')
                    ]
                }}
            ]}
        ]
    }
};
