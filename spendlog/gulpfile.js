var gulp          = require('gulp');
var autoprefixer  = require('gulp-autoprefixer');
var cache         = require('gulp-cache');
var compass       = require('gulp-compass');
var connect       = require('gulp-connect');
var del           = require('del');
var filter        = require('gulp-filter');
var fs            = require('fs');
var gulpif        = require('gulp-if');
var gzip          = require('gulp-gzip');
var gzipStatic    = require('connect-gzip-static');
var imagemin      = require('gulp-imagemin');
var includeSource = require('gulp-include-source');
var jshint        = require('gulp-jshint');
var karma         = require('gulp-karma');
var ngAnnotate    = require('gulp-ng-annotate');
var protractor    = require('gulp-protractor').protractor;
var proxy         = require('proxy-middleware');
var replace       = require('gulp-replace');
var rev           = require('gulp-rev');
var revReplace    = require('gulp-rev-replace');
var runSequence   = require('run-sequence');
var templatecache = require('gulp-angular-templatecache');
var uglify        = require('gulp-uglify');
var useref        = require('gulp-useref');
var watch         = require('gulp-watch');


// === Paths ===

var src           = { toString:(function() { return 'src'; }) };
src.app           = src + '/app';
src.appFiles      = src.app + '/**/*.js';
src.appTemplates  = src.app + '/**/*.html';
src.images        = src + '/images';
src.imagesFiles   = src.images + '/**/*.{gif,jpg,jpeg,png,webp}';
src.index         = src + '/index.html';
src.styles        = src + '/styles';
src.stylesFiles   = src.styles + '/**/*.{sass,scss}';
src.vendor        = src + '/vendor';

var specs         = { toString:(function() { return 'specs'; }) };
specs.e2e         = specs + '/e2e/**/*.js';
specs.unit        = specs + '/unit/**/*.js';

var dist          = { toString:(function() { return 'dist'; }) };
dist.app          = dist + '/app';
dist.appTemplates = dist.app + '/templates.js';
dist.images       = dist + '/images';
dist.index        = dist + '/index.html';
dist.styles       = dist + '/styles';
dist.stylesFiles  = dist.styles + '/**/*.css';


// === General stuff ===

var expiresMiddleware = function(days) {
  return function(req, res, next) {
    if (req.method === 'GET' && req.url.match(/\.(css|gif|ico|jpg|jpeg|js|png)$/)) {
      var d = new Date();
      d.setDate(d.getDate() + days);
      res.setHeader('Expires', d.toUTCString());
    }
    next();
  };
};

var fakeApiProxyMiddleware = proxy({
  hostname: 'localhost',
  port: 8001,
  pathname: '/fakeapi',
  route: '/fakeapi',
});

var isBuild = false;


// === Develpement ===

gulp.task('clean', function(cb) {
  return del([
      '.sass-cache',
      dist + '/*',
    ], cb);
});

gulp.task('fonts', function() {
  return gulp.src(src.vendor + '/bootstrap-sass-twbs/assets/fonts/**')
    .pipe(gulp.dest(dist.styles))
});

gulp.task('index', function() {
  return gulp.src(src.index)
    .pipe(includeSource())
    .pipe(gulp.dest('' + dist));
});

gulp.task('jshint', function() {
  return gulp.src(src.appFiles)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulpif(isBuild, jshint.reporter('fail')));
});

gulp.task('templates', function() {
  return gulp.src(src.appTemplates)
    .pipe(templatecache({
      module: 'sl.templates',
      standalone: true,
      root: 'app',
    }))
    .pipe(gulp.dest(dist.app));
});

gulp.task('styles', function() {
  return gulp.src(src.stylesFiles)
    .pipe(compass({
      css: dist.styles,
      sass: src.styles,
      style: 'nested',
      comments: false,
    })).on('error', function(err) { /* do nothing */ })
    .pipe(autoprefixer())
    .pipe(gulp.dest(dist.styles));
});

gulp.task('watch', function() {
  gulp.watch(src.appFiles, ['index', 'jshint']);
  gulp.watch(src.appTemplates, ['templates']);
  gulp.watch(src.index, ['index']);
  // gulp.watch(src.stylesFiles, ['styles']);
});

gulp.task('serve', function() {
  return connect.server({
    host: 'localhost',
    port: '8000',
    root: ['' + dist, '' + src],
    livereload: true,
    middleware: function(connect, options) {
      return [
        fakeApiProxyMiddleware,
      ];
    }
  });
});

gulp.task('livereload', function() {
  return gulp.src([
      src.appFiles,
      dist.appTemplates,
      dist.index,
      dist.stylesFiles,
    ], {read: false})
    .pipe(watch())
    .pipe(connect.reload());
});


// === Test ===

gulp.task('unit', function() {
  return gulp.src('foobar')   // intentional nonsense, files are configured in configFile
    .pipe(karma({
      action: 'watch',
      browsers: ['Chrome'],
      configFile: 'karma.conf.js',
    })).on('error', function(err) {
      throw err;
    });
});


gulp.task('protractor', function() {
  return gulp.src('foobar')   // intentional nonsense, files are configured in configFile
    .pipe(protractor({
      configFile: 'protractor.conf.js'
    })).on('error', function(err) { /* do nothing */ });
});

gulp.task('watchE2E', function() {
  gulp.watch(specs.e2e, ['protractor']);
});

gulp.task('e2e', ['protractor', 'watchE2E']);


// === Build ===

gulp.task('buildImages', function() {
  return gulp.src(src.imagesFiles)
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
    })))
    .pipe(gulp.dest(dist.images));
});

gulp.task('buildIndex', function() {
  var appBuild = filter('app/app.js');

  return gulp.src(src.index)
    .pipe(includeSource())
    .pipe(replace(/vendor\/([\w\-\/]+).((js|css))/g, 'vendor/$1.min.$2'))
    .pipe(useref.assets({   // concatenate assets defined in HTML build blocks
      searchPath: ['' + src, '' + dist]
    }))

    .pipe(appBuild)         // uglify() only app's scripts
    .pipe(ngAnnotate())     //  since we are referencing minified vendors in index.html
    .pipe(uglify())
    .pipe(appBuild.restore())

    .pipe(rev())
    .pipe(useref.restore())
    .pipe(useref())
    .pipe(revReplace())
    .pipe(gulp.dest('' + dist))
    .pipe(gzip({
      gzipOptions: {level: 9},
      threshold: 512,
    }))
    .pipe(gulp.dest('' + dist));
});

gulp.task('buildStyles', function() {
  return gulp.src(src.stylesFiles)
    .pipe(compass({
      css: dist.styles,
      sass: src.styles,
      style: 'compressed',
      comments: false,
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(dist.styles));
});

gulp.task('favicon', function() {
  return gulp.src(src + '/favicon.ico')
    .pipe(gulp.dest('' + dist))
});

gulp.task('jsMaps', function() {
  return gulp.src([
      src.vendor + '/angular/angular.min.js.map',
      src.vendor + '/angular-resource/angular-resource.min.js.map',
      src.vendor + '/angular-route/angular-route.min.js.map',
    ])
    .pipe(gulp.dest(dist.app));
})

gulp.task('cleanBuild', function(cb) {
  return del([
      dist.app + '/templates.js',
      dist.styles + '/bootstrap.css',
      dist.styles + '/main.css',
    ], cb);
});

gulp.task('buildServer', function() {
  return connect.server({
    port: 8000,
    root: '' + dist,
    livereload: false,
    middleware: function(connect, options) {
      return [
        fakeApiProxyMiddleware,
        expiresMiddleware(7),
        gzipStatic('' + dist),
      ];
    }
  });
});


// === Main tasks definitions ===
//

gulp.task('build', function() {
  isBuild = true;
  return runSequence(
    'clean',
    'jshint',
    ['buildImages', 'buildStyles', 'favicon', 'fonts', 'jsMaps', 'templates'],
    'buildIndex',
    'cleanBuild'
  );
});

gulp.task('default', function() {
  return runSequence(
    'clean',
    ['index', 'jshint', 'templates', 'serve', 'watch'],
    'livereload'
  );
});
