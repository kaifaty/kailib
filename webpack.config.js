const path = require('path');

module.exports = {
    mode: 'production',
    target: 'web',
    entry: './src/main.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        mainFields: ['browser', 'module'],
    },
    output: {
        filename: 'kailib.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
