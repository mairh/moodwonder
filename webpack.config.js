var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

var assetsPath = path.join(__dirname, "public", "assets");
var publicPath = "assets/";

var commonLoaders = [
    {
        test: /\.jsx$/, loader: "babel-loader?stage=0"
    },
    {
        test: /\.js$/,
        loader: "babel-loader?stage=0",
        include: path.join(__dirname, "app")
    },
    { test: /\.png$/, loader: "url-loader" },
    { test: /\.jpg$/, loader: "file-loader" },
    { test: /\.html$/, loader: "html-loader" }
];

module.exports = [
    {
        // The configuration for the client
        name: "browser",
        context: path.join(__dirname, "app"),
        entry: {
            app: "./app"
        },
        output: {
            // The output directory as absolute path
            path: assetsPath,
            filename: "[name].js",
            // The output path from the view of the Javascript
            publicPath: publicPath

        },
        node: {
            // To fix webpack error from `react-validation-mixin` module
            dns: "empty",
            net: "empty"
        },
        module: {
            preLoaders: [{
                test: /\.js$|.jsx$/,
                exclude: /node_modules/,
                loaders: ["eslint"]
            }],
            loaders: commonLoaders.concat([
                { test: /\.css$/, loader: "style!css" },
                { test: /\.scss$/,
                    loader: ExtractTextPlugin.extract("css?sourceMap!sass?sourceMap&outputStyle=expanded" +
                    "&includePaths[]=" + (path.resolve(__dirname, "./bower_components")) +
                    "&includePaths[]=" + (path.resolve(__dirname, "./node_modules")))
                }
            ])
        },
        resolve: {
            modulesDirectories: [
                "app", "node_modules"
            ]
        },
        plugins: [
            // extract inline css from modules into separate files
            new ExtractTextPlugin("styles/main.css")
        ]
    }, {
        // The configuration for the server-side rendering
        name: "server-side rendering",
        context: path.join(__dirname, "app"),
        entry: {
            app: "./app",
            header: "./elements/Header.react"
        },
        target: "node",
        output: {
            // The output directory as absolute path
            path: assetsPath,
            filename: "[name].server.js",
            // The output path from the view of the Javascript
            publicPath: publicPath,
            libraryTarget: "commonjs2"
        },
        externals: /^[a-z\-0-9]+$/,
        module: {
            loaders: commonLoaders
        },
        resolve: {
            modulesDirectories: [
                "app", "node_modules"
            ]
        },
        plugins: [
            new webpack.NormalModuleReplacementPlugin(/\.(css|scss)$/, "node-noop")
        ]
    }
];
