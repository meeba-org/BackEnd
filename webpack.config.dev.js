import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import autoprefixer from "autoprefixer";
import path from "path";
const ExtractTextPlugin  = require('extract-text-webpack-plugin');

export default {
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
    },
    devtool: '#eval-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
    entry: [
        // must be first entry to properly set public path
        './public/webpack-public-path',
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?reload=true',
        path.resolve(__dirname, 'public/index.js') // Defining path seems necessary for this to work consistently on Windows machines.
    ],
    target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
    output: {
        path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
            __DEV__: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
            template: 'public/index.ejs',
            favicon: 'public/styles/images/icon.png',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            inject: true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: true,
            noInfo: true, // set to false to see a list of every file being bundled.
            options: {
                context: '/',
                postcss: () => [autoprefixer],
            }
        }),
        new ExtractTextPlugin("styles.css")
    ],
    module: {
        rules: [
            {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader']},
            {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader'},
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
            {test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
            {test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?name=[name].[ext]'},
            {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                   fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: [
                                    path.resolve(__dirname, 'src/scss'),
                                    path.resolve(__dirname, "node_modules/foundation-sites/scss")
                                ]
                            }
                        }
                    ]
                }),
            }
        ]
    }
};
