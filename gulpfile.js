var gulp          = require('gulp');
var livereload    = require('gulp-livereload');
var ngAnotate     = require('gulp-ng-annotate');
var runSequence   = require('run-sequence');
var uglify        = require('gulp-uglify');
var watch         = require('gulp-watch');


// === General stuff ===

gulp.task('livereload', function() {
  livereload.listen();

  return gulp.watch([
      'hello-world/**/*',
      'presentations/**/*',
    ]).on('change', livereload.changed);
});

gulp.task('minify', function() {
  return gulp.src('hello-world/**/*.js')
    .pipe(ngAnotate())
    .pipe(uglify())
    .pipe(gulp.dest('hello-world/build'));
})

// === Main tasks definitions ===
//

gulp.task('default', function() {
  return runSequence(
    'livereload'
  );
});
