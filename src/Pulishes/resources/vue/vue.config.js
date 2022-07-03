const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    outputDir: '../../public',
    lintOnSave: false,
    assetsDir: 'assets',
    productionSourceMap: false,
    pages: {
        manage: {
            entry: 'src/main.js',
            filename: '../resources/views/manage.blade.php',
            template: 'template/manage.html',
            title: 'Index Page',
            chunks: ['chunk-vendors', 'chunk-common', 'manage']
        }
    },
    configureWebpack: {
        output: {
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].js',
        },
        experiments: {
            topLevelAwait: true, // 此处为新增配置
        }
    },
    css: {
        extract: {
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css'
        },
    }
})
