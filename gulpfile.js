var gulp          = require('gulp');
var livereload    = require('gulp-livereload');
var runSequence   = require('run-sequence');
var watch         = require('gulp-watch');


// === General stuff ===

gulp.task('livereload', function() {
  livereload.listen();

  return gulp.watch([
      'hello-world/**/*',
      'presentations/**/*',
    ]).on('change', livereload.changed);
});


// === Main tasks definitions ===
//

gulp.task('default', function() {
  return runSequence(
    'livereload'
  );
});
