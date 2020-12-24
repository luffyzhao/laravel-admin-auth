module.exports = {
	outputDir: '../../public',
    productionSourceMap: false,
    pages: {
        backstage: {
            entry: 'src/backstage.js',
            filename: 'backstage.html',
            chunks: ['chunk-vendors', 'backstage']
        }
    },
    configureWebpack: {
        output: {
            filename: 'js/[name].js?hash=[hash]',
            chunkFilename: 'js/[name].js?hash=[chunkhash]',
        }
    },
    css: {
        extract: {
            filename: 'css/[name].css?hash=[contenthash]',
            chunkFilename: 'css/[name].css?hash=[contenthash]'
        },
    }
};
