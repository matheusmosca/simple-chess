var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var sass = require('gulp-sass');
var paths = {
    pages: ['./public/*.html']
};

function copyHtml() {
    return gulp.src(paths.pages)
    .pipe(gulp.dest('dist/'));
}

function bundle() {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/'));
}

function style() {
    return gulp.src('./public/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist'));
}

function watch() {
    gulp.watch('./src/**/*.ts', gulp.series(copyHtml, bundle));
    gulp.watch('./public/**/*.html', gulp.series(copyHtml, bundle));
    gulp.watch('./public/**/*.scss', style);
}

exports.bundle = bundle;
exports.copyHtml = copyHtml;
exports.style = style;
exports.watch = gulp.series(copyHtml, style, bundle, watch);