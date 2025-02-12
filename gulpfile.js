var gulp = require('gulp'),
  sass = require('gulp-sass')(require('sass')),
  browserSync = require('browser-sync').create(),
  rename = require('gulp-rename'),
  pug = require('gulp-pug'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  wait = require('gulp-wait');

gulp.task('scss', function () {
  return gulp.src('scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(wait(1500))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions']
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: 'css' }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('pug', function () {
  return gulp.src('pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    //.pipe(gulp.dest('html'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({ stream: true }))
});




gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('pug/**/*.pug', gulp.parallel('pug'));
});

if (process.env.NODE_ENV === 'production') {
  gulp.task('default', gulp.parallel('scss', 'pug'));
} else {
  gulp.task('default', gulp.parallel('scss', 'pug', 'browser-sync', 'watch'));
}

