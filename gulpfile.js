var gulp = require('gulp');

var jshint  = require('gulp-jshint');
var sass    = require('gulp-sass');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var rename  = require('gulp-rename');
var prefix  = require('gulp-autoprefixer');
var csslint = require('gulp-csslint');
var cssmin  = require('gulp-minify-css');

gulp.task('scss', function() {
  gulp.src('scss/bleuprint.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(cssmin())
    .pipe(rename('c.css'))
    .pipe(gulp.dest('css'));
});

gulp.task('csslint', function() {
  gulp.src('css/c.css')
    .pipe(csslint({
      'compatible-vendor-prefixes': false,
      'box-sizing': false,
      'important': false,
      'known-properties': false
    }))
    .pipe(csslint.reporter());
});

gulp.task('js', function() {
  gulp.src('js/src/*.js')
    .pipe(uglify())
    .pipe(concat('j.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('jslint', function() {
  gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['scss', 'csslint', 'js', 'jslint']);
