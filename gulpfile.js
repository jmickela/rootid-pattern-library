/*jshint esversion: 6 */

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sassGlob = require('gulp-sass-glob'),
  notify = require('gulp-notify'),
  nnotify = require('node-notifier'),
  concat = require('gulp-concat-util'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync').create(),
  minify = require('gulp-minify');
  autoprefixer = require('gulp-autoprefixer'),
  cp = require("child_process"),
  fs = require("fs");

const { spawn } = require('child_process');

var config = {
  assetPath: "./assets",
  distPath: "./dist",
  patternsBasePath: "./patterns/_patterns",
  patternsDistPath: "./patterns/",
  plabPublicPath: "./.pattern-lab/public"
};

if (fs.existsSync("./gulpfile.local.json")) {
  config = Object.assign(config, require("./gulpfile.local.json"));
} else {
  config.localServerUrl = "rootid-pattern-library.localhost/public";
}


gulp.task("browserSyncReload", [], function(done) {
  browserSync.reload();
  done();
});

gulp.task("sync", [], function() {
  browserSync.init({
    proxy: config.localServerUrl
  });
  gulp.watch(config.patternsBasePath + "/**/*.scss", ["css"]);
  gulp.watch(config.patternsBasePath + "/admin-styles.scss", ["admin-css"]);
  gulp.watch(config.patternsBasePath + "/**/*.js", ["js"]);
  gulp.watch([config.patternsBasePath + "/**/*.twig"], ["browserSyncReload"]);
  gulp.watch("./lib/**/*.php", ["browserSyncReload"]);
  gulp.watch("./lib/**/*.scss", ["library-css"]);
  gulp.watch("./lib/**/*.js", ["browserSyncReload"]);
});

gulp.task('serve', ['css', 'js'],  function () {
  browserSync.init({
    //injectChanges: true,
    open: false,
    server: {
      baseDir: "./.pattern-lab/public",
    },
    startPath: "",
    //watch: true,
    browsers: false
    //notify: config.browserSync.notify,
    //ui: config.browserSync.ui,
    //open: config.browserSync.openBrowserAtStart,
    //reloadOnRestart: config.browserSync.reloadOnRestart,
    //port: openPort,
    //ghostMode: config.browserSync.ghostMode
  });

  gulp.watch(config.patternsBasePath + "/**/*.scss", ['pl:generate-css']);
  gulp.watch(config.patternsBasePath + "/**/*.js", ['pl:generate']);
  gulp.watch(config.patternsBasePath + "/**/*.twig", ['pl:generate']);
  gulp.watch(config.patternsBasePath + "/**/*.json", ['pl:generate']);
  gulp.watch(config.patternsBasePath + "/**/*.yml", ['pl:generate']);
});

// css specific task since css files can be hot reloaded but others can't.
gulp.task('pl:generate-css', function () {
  return gulp.src(config.patternsBasePath + "/hip-styles.scss")
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.distPath + "/css"))
    .pipe(gulp.dest(config.patternsDistPath + '/css'))
    .pipe(gulp.dest(config.plabPublicPath + '/css'))
    //.pipe(exec('php .pattern-lab/core/console --generate'))
    .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('pl:generate', ['css', 'js'], function () {
  const cmd = spawn('php', ['.pattern-lab/core/console', '--generate']);

  cmd.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  cmd.stderr.on('data', (data) => {
    nnotify.notify({
      title: 'Pattern Library Error',
      message: "Compiling Pattern Library Failed, check your terminal for error output."
    });
    console.log(data.toString());
  });
});

gulp.task('css', function () {
  return gulp.src(config.patternsBasePath + "/hip-styles.scss")
    .pipe(sassGlob())
    //.pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    //.pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.distPath + "/css"))
    .pipe(gulp.dest(config.patternsDistPath + '/css'));
});

gulp.task("library-css", function() {
  return (
    gulp
      .src("./lib/**/*.scss")
      // .pipe(sassGlob())
      .pipe(
        sass({
          outputStyle: "compressed",
          includePaths: ["./patterns/_patterns"]
        }).on("error", sass.logError)
      )
      .pipe(autoprefixer())
      // compile each css file to the same directory its scss file is in!
      .pipe(gulp.dest("./lib/"))
      .pipe(browserSync.stream({ match: "**/*.css" }))
  );
});

gulp.task("admin-css", function() {
  return gulp
    .src(config.patternsBasePath + "/admin-styles.scss")
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.distPath + "/css"));
});

gulp.task('js', function() {
  gulp.src(config.patternsBasePath + "/**/*.js")
    .pipe(concat('site.js'))
    .pipe(concat.header('(function(window, document, $) {\n\'use strict\';\n'))
    .pipe(concat.footer('\n})(window, document, jQuery);\n'))
    .pipe(gulp.dest(config.distPath + "/js"))
    .pipe(gulp.dest(config.patternsDistPath + '/js'))
    .pipe(gulp.dest(config.plabPublicPath + '/js'))
    //.pipe(rename('site.js'))
    .pipe(minify({
      ext:{
        min:".min.js"
      }
    }))
    .pipe(gulp.dest(config.distPath + "/js"))
    .pipe(browserSync.stream({ match: '**/*.js' }));
});

gulp.task('production', function () {
  // Minify everything, get rid of source maps, all that stuff.
});

gulp.task('watch', function() {
  gulp.watch(config.patternsBasePath + "/**/*.twig", ['pl:generate']);
  gulp.watch(config.patternsBasePath + "/**/*.scss", ['css']);
  gulp.watch(config.patternsBasePath + "/**/*.js", ['js']);
});

gulp.task('default', ['serve']);
