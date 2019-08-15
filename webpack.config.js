const path = require('path');

module.exports = {
    entry: './test/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'www')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};
