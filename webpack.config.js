var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (options) {
    var plugins = [
        new ExtractTextPlugin({
            filename: "dist/app.css",
            allChunks: true,
        }),
    ];
    if (!options.dev) {
        plugins.push(
            new webpack.DefinePlugin({
                "process.env": {
                    "NODE_ENV": JSON.stringify("production")
                }
            })
        );
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }));
    }

    return {
        entry: "./js/app.js",
        output: { path: __dirname, filename: "dist/app.js" },
        plugins: plugins,
        module: {
            rules: [
                {
                    test: /.js/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["es2015", { modules: false }],
                            "react"
                        ]
                    },
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract([
                        {
                            loader: "css-loader",
                            options: {
                                minimize: !options.dev,
                                sourceMap: true,
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                            }
                        },
                    ])
                },
                {
                    test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "dist/",
                    }
                }
            ]

        },
    };
};