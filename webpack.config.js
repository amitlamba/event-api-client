var path = require('path');
var webpack = require('webpack');
module.exports={
    devtool: 'source-map',
    entry: {
        'main': ['./ts-src/main.ts'],
        'main.min': ['./ts-src/main.ts']
    },
    output:{
        // path: '/home/amit/repositories/gitRepos/event-api-client/build',
        filename: './build/[name].js'
    },
    module:{
        loaders:[{
            test:/\.ts$/,
            include: path.resolve(__dirname, 'ts-src'),
            loader: 'ts-loader'
        }]
    },
    resolve:{
        extensions: ['.webpack.js','.web.js','.ts','.js']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ],
    watch: true
}