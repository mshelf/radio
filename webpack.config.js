// var webpack = require("webpack");
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

// module.exports = function (options) {
//     var plugins = [
//         new ExtractTextPlugin({
//             filename: "dist/app.css",
//             allChunks: true,
//         }),
//         new webpack.optimize.CommonsChunkPlugin({
//             name:"vendor",
//             filename: "dist/vendor.js",
//         }),

//     ];
//     if (!options.dev) {
//         plugins.push(
//             new webpack.DefinePlugin({
//                 "process.env": {
//                     "NODE_ENV": JSON.stringify("production")
//                 }
//             })
//         );
//         plugins.push(new webpack.optimize.UglifyJsPlugin({
//             compress: { warnings: false }
//         }));
//     }

//     return {
//         entry: {
//             app: "./js/app.js",
//             vendor: ["react", "react-dom", "react-router-dom", "axios", "react-youtube", "slug", "promise-polyfill"],
//         },
//         output: { path: __dirname, filename: "dist/app.js" },
//         plugins: plugins,
//         module: {
//             rules: [
//                 {
//                     test: /.js/,
//                     exclude: /node_modules/,
//                     loader: "babel-loader",
//                     options: {
//                         presets: [
//                             ["es2015", { modules: false }],
//                             "react"
//                         ]
//                     },
//                 },
//                 {
//                     test: /\.scss$/,
//                     use: ExtractTextPlugin.extract([
//                         {
//                             loader: "css-loader",
//                             options: {
//                                 minimize: !options.dev,
//                                 sourceMap: true,
//                             }
//                         },
//                         {
//                             loader: "sass-loader",
//                             options: {
//                                 sourceMap: true,
//                             }
//                         },
//                     ])
//                 },
//                 {
//                     test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
//                     loader: "file-loader",
//                     options: {
//                         name: "[name].[ext]",
//                         outputPath: "dist/",
//                         useRelativePath: true,
//                     }
//                 }
//             ]

//         },
//     };
// };


const webpack = require("webpack");
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");

module.exports = function (env, options) {
    const isDev = options.mode === "development";

    var plugins = [
        new MiniCssExtractPlugin({
           filename: "dist/[name].css",
        }),

        // new CopyWebpackPlugin([
        //    { from: "./src/favicon.png", to: "favicon.png" },
        // ]),
    ];
    if (!isDev) {
        plugins.push(
            new webpack.DefinePlugin({
                "process.env": {
                    "NODE_ENV": JSON.stringify("production")
                }
            })
        );

        plugins.push(
           new OptimizeCSSAssetsPlugin({
               cssProcessor: cssnano,
               canPrint: false,
           })
        );
    }

    return {
        entry: {
            "app": ["./js/app.js", "./style/app.scss"],
        },
        output: { path: __dirname, filename: "dist/[name].js" },
        resolve: {
            extensions: [".js"]
        },
        plugins: plugins,
        module: {
            rules: [
                {
                    test: /.js/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/react", "@babel/env"]
                    },
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                },

                {
                    test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
                    loader: "file-loader",
                    options: {
                        name: "dist/[name].[ext]",
                        publicPath: "/"
                        //outputPath: "dist/",
                        //useRelativePath: false,
                    }
                },
            ],
        },

        devServer: {
            port: 4200,
            open: true,
            overlay: true,
        },
    };
};