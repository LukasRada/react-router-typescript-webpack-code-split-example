const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const isDevBuild = argv.mode === 'development';

    const commonPlugins = [
        new HtmlWebpackPlugin({
            template: './wwwroot/index.html'
        })
    ];

    return {
        entry: {
            index: "./src/index.tsx"
        },
        output: {
            path: path.join(__dirname, "./wwwroot")
        },
        resolve: {
            extensions: [".js", ".json", ".jsx", ".ts", ".tsx"]
        },
        stats: {
            modules: false,
            children: false
        },
        optimization: {
            splitChunks: {
                automaticNameDelimiter: "-",
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    default: false,
                    vendors: false,
                    // vendor chunk
                    vendor: {
                        name: 'vendor',
                        // sync + async chunks
                        chunks: 'all',
                        // import file path containing node_modules
                        test: /node_modules/
                    },
                    common: {
                        name: 'common',
                        minChunks: 2,
                        chunks: 'async',
                        priority: 10,
                        reuseExistingChunk: true,
                        enforce: true
                    }
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    include: /src/,
                    loaders: ["ts-loader"]
                }
            ]
        },
        plugins: commonPlugins,
        devServer: {
            contentBase: false,
            port: 4988,
            historyApiFallback: true,
            hot: false,
            inline: true,
            stats: {
                modules: false,
                children: false
            },
            open: true
        }
    }
}