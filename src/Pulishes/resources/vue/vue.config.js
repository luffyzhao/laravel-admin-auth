module.exports = {
	outputDir: '../../public',
    assetsDir: 'assets',
    productionSourceMap: false,
    pages: {
        manage: {
            entry: 'src/manage.js',
            filename: '../resources/views/manage.blade.php',
            template: 'src/template/manage.html',
            chunks: ['chunk-vendors', 'chunk-common', 'manage']
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
