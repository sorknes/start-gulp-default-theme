// TODO: Setup dist/build


/* -----------------------------------------------------------------------
 * Dependencies
 ----------------------------------------------------------------------- */

var gulp          = require('gulp'),

    browserSync   = require('browser-sync').create(),
    sass          = require('gulp-sass'),
    cssnano       = require('gulp-cssnano'),
    autoprefixer  = require('gulp-autoprefixer');


/* -----------------------------------------------------------------------
 * File destinations (relative to assets folder)
 ----------------------------------------------------------------------- */

var target = {
  src:  'src/',
  dest: 'build/'
}

var location = {
  src:  target.src,
  dest: target.dest,

  sass_src:   target.src + 'css/scss/',

  css_dest:   target.dest + 'css/',
}


/* -----------------------------------------------------------------------
 * Static Server + watching scss/html files
 ----------------------------------------------------------------------- */

gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: target.src
  });

  gulp.watch(location.sass_src + '**/*.scss', ['sass']);
  gulp.watch(target.src + '*.html').on('change', browserSync.reload);
});


/* -----------------------------------------------------------------------
 * Compile sass into CSS & auto-inject into browsers
 ----------------------------------------------------------------------- */

gulp.task('sass', function() {
  return gulp.src(location.scss_src + '/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer(
      'last 2 version'
    ))
    .pipe(gulp.dest(location.css_dest))
    .pipe(browserSync.stream());
});


/* -----------------------------------------------------------------------
 * Minify CSS with cssnano
 ----------------------------------------------------------------------- */




/* -----------------------------------------------------------------------
 * Run tasks: watch, browserSync
 ----------------------------------------------------------------------- */

gulp.task('default', ['serve']);
