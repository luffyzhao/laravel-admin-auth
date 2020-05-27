const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/vue/app.js', 'public/vendor/js');
mix.copyDirectory('resources/vue/assets/css', 'public/vendor/css');
mix.copyDirectory('node_modules/iview/dist/styles/', 'public/vendor/css');
mix.copyDirectory('resources/vue/assets/images', 'public/vendor/images');
mix.copyDirectory('resources/vue/libs/ueditor', 'public/vendor/ueditor');

mix.extract(['vue', 'axios']);

let date = new Date();
let version = date.getFullYear() + '000' + date.getTime();
mix.webpackConfig({
    output: {
        filename: '[name].js',
        chunkFilename: 'vendor/js/[name].chunk.js?id=' + version
    }
});
mix.options({
    postCss: [
        require('autoprefixer'),
    ],
});
if (mix.inProduction()) {
    mix.version();
}

