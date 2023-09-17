const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

gulp.task('sass-compile', function() {
    return gulp.src('./src/**/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());
})
gulp.task('js-concat-minify', function() {
    return gulp.src('./src/**/js/*.js')
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.stream());
});
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: './',
        },
    });

    gulp.watch('./src/**/scss/*.scss', gulp.series('sass-compile'));
    gulp.watch('./*.html').on('change', browserSync.reload);
});