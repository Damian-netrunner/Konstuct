var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    browserSync = require('browser-sync').create(),
    rename = require('gulp-rename'),
    pug = require('gulp-pug'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    wait = require('gulp-wait');
    clean = require('gulp-clean');

gulp.task('scss', function(){
  return gulp.src('scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(wait(1500))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 8 versions']
      }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: 'css'}))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('pug', function(){
  return gulp.src('pug/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.reload({stream: true}))
});



gulp.task('cp_js', function () {
  return gulp.src('js/script.js')
    .pipe(gulp.dest('./public/js'));
});

gulp.task('cp_fonts', function () {
  return gulp.src('fonts/**/*')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('cp_pics', function () {
  return gulp.src('pics/**/*')
    .pipe(gulp.dest('./public/pics'));

});

gulp.task('cp_favicon', function () {
  return gulp.src('favicon/**/*')
    .pipe(gulp.dest('./public/favicon'));
});

gulp.task('cp_seo', function () {
  return gulp.src('seo/*')
    .pipe(gulp.dest('./public/'));
});

// gulp.task('clean-build', function () {
//   return gulp.src('./public/', {allowEmpty: true, read: false})
//     .pipe(clean());
// });

//gulp.task('move-files', function () {
  //return gulp.src('./') 
//    .pipe(gulp.dest('./public/'));
//})

//gulp.task('update-build', gulp.series( 'move-files'));


if (process.env.NODE_ENV === 'production') {
  gulp.task('default', gulp.parallel('scss', 'pug',  'cp_js', 'cp_fonts', 'cp_pics', 'cp_favicon', 'cp_seo'));
} else {
  gulp.task('default', gulp.parallel('scss', 'pug',  'cp_js', 'cp_fonts', 'cp_pics', 'cp_favicon', 'cp_seo', 'browser-sync', 'watch'));
}

