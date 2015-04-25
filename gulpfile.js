var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jshint_stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    del = require('del'),
    jade = require('gulp-jade');

gulp.task('lint', function() {
  return gulp.src('./src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('minify-js', ['build-js'], function () {
  gulp.src('./build/javascripts/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/javascripts/'));
});

gulp.task('build-js', ['lint'], function(){
	gulp.src('./src/js/*.js')
	.pipe(concat('main.js'))
    .pipe(gulp.dest('./build/javascripts/'));
});

gulp.task('build-html', function() {
  var locals = {};
  gulp.src('./src/html/**/*.jade')
    .pipe(jade({
      locals: locals
    }))
    .pipe(gulp.dest('./build/html/'));
});

gulp.task('clean', function(cb) {
  del(['./build'], cb)
});

gulp.task('watch', function () {
   gulp.watch('./src/html/**/*.jade', ['build-html']);
   gulp.watch('./src/js/**/*.js', ['build-js']);
});