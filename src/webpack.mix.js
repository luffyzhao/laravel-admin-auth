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

mix.js('resources/js/app.js', 'public/vendor/js');
mix.copyDirectory('resources/sass/app.css', 'public/vendor/css');
mix.copyDirectory('node_modules/iview/dist/styles/', 'public/vendor/css');
mix.copyDirectory('resources/images', 'public/vendor/images');
mix.copyDirectory('resources/js/libs/ueditor', 'public/vendor/ueditor');

mix.extract(['vue', 'axios']);
mix.webpackConfig({
    output: {
        filename: '[name].js',
        chunkFilename: mix.inProduction() ? 'vendor/js/[name].chunk.js' : 'vendor/js/[name].chunk.js'
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
