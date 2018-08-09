var gulp = require('gulp'),
  sass = require('gulp-sass'),
  notify = require('gulp-notify'),
  concat = require('gulp-concat-util'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  minify = require('gulp-minify');

var config = {
  assetPath: "./source/",
  distPath: "./source/"
};

//config = Object.assign(config, require("./gulpfile.local.json"));

gulp.task('css', function () {
  return gulp.src(config.assetPath + "/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.distPath + "/css"))
});

// gulp.task('js', function () {
//   gulp.src(config.assetPath + "/js/**/*.js")
//     .pipe(concat('site.js'))
//     .pipe(concat.header('(function(window, document, $) {\n\'use strict\';\n'))
//     .pipe(concat.footer('\n})(window, document, jQuery);\n'))
//     .pipe(gulp.dest(config.distPath + "/js"));
//   //.pipe(rename('site.js'))
//   // .pipe(minify({
//   //     ext:{
//   //         min:".min.js"
//   //     }
//   // }))
//   //.pipe(gulp.dest(config.distPath + "/js"));
// });

gulp.task('watch', function () {
  gulp.watch(config.assetPath + "/scss/**/*.scss", ['css']);
  //gulp.watch(config.assetPath + "/js/**/*.js", ['js']);
});

gulp.task('default', ['watch']);