const path = require("path");
const Webpack = require("webpack");

module.exports = {
    devtool: "source-map",
    entry: [
        `${__dirname}/app/index.tsx`
    ],
    output: {
        path: `${__dirname}/../../out/client`,
        filename: "app.js"
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: "ts-loader"
        }]
    },
    plugins: [
        // new Webpack.optimize.UglifyJsPlugin({
        //     compressor: {
        //         warnings: false,
        //     },
        // }),
    ]
};