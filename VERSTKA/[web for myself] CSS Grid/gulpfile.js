
global.$ = {
    gulp: require('gulp'),
    //Плагин gulp-load-plugins автоматический загружает все плагины начинаюшиеся с gulp- !
    gp: require('gulp-load-plugins')(),
    browserSync: require('browser-sync').create(),
    del: require('del'),
    gcmq: require('gulp-group-css-media-queries'),
    imageminJpegRecompress: require('imagemin-jpeg-recompress'),
    pngquant: require('imagemin-pngquant'),
    path: {
        config: require('./gulp/config'),
        jquery: './js/jquery.js',
        js: './js/**/*.js',
    }
};

$.path.config.forEach(function (path) {
    require(path)();
});