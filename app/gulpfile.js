'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var minifyJS = require('gulp-minify');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');

gulp.task('css', function () {
  return gulp.src('./src/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function() {
  return gulp.src('./src/**/*.js')
    .pipe(minifyJS())
    .pipe(gulp.dest('./dist'));
});

gulp.task('html', function() {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('clear', function () {
  return gulp.src('./dist/*', {read: false})
    .pipe(clean());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./src/**/*.sass', ['css']);
  gulp.watch('./src/**/*.js', ['js']);
  gulp.watch('./src/**/*.html', ['html']);
});

gulp.task('default', [ 'clear', 'html', 'css', 'js' ]);
