module.exports = {
    entry: './index.ts',
    output: {
	filename: './index.js'
    },
    module: {
	loaders: [{
	    test: /\.ts$/,
	    loader:'ts-loader'
	}]
    },
    resolve: {
	extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    }
}  
