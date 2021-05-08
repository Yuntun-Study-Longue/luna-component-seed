const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const extractLess = new MiniCssExtractPlugin({
  filename: 'static/css/[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development', // disabled during development 
})

const antdTheme = {
    'primary-color': 'red',
} || require('./antdTheme') // Include variables to override antd theme

module.exports = (config, webpack) => {
    return {
        ...config,
        module: {
            ...config.module,
            rules: [
                ...config.module.rules,
                {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    plugins: [['import', { libraryName: 'antd', style: true }]],
                },
                },
                {
                test: /\.less$/,
                // use the MiniCssExtractPlugin instance
                sideEffects: true,
                use: [
                    process.env.NODE_ENV == 'development' ? { loader: 'style-loader' } : {loader: MiniCssExtractPlugin.loader}, 'css-loader', {
                    loader: 'less-loader',
                    options: {
                    modifyVars: antdTheme,
                    },
                }],
                },
                {
                    test: /\.(scss|sass)$/,
                    sideEffects: true,
                    use: [
                        process.env.NODE_ENV == 'development' ? { loader: 'style-loader' } : {loader: MiniCssExtractPlugin.loader},
                        'css-loader',
                        'postcss-loader',
                        'resolve-url-loader',
                        'sass-loader',],
                }
        ],
        },
        plugins: [
        ...config.plugins,
        extractLess, // <- Add the ExtractTextPlugin instance here
        ],
    }
}