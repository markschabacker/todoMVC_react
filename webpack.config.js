var webpack = require("webpack")
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: "./src/app.ts",
    },
    output: {
        filename: "[name].bundle.js",
        publicPath: "dist",
        path: __dirname + "/dist"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: function (module) {
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
        }),
        new ExtractTextPlugin("[name].css"),
    ],

    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            // TSLint
            { test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader', options: { emitErrors: true, failOnHint: true, }, },

            // CSS
            { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader" }) },
        ]
    },
};
