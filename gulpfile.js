var gulp      = require('gulp'),
    jshint    = require('gulp-jshint'),
    stylish   = require('jshint-stylish'),

    browserify = require('gulp-browserify'),
    stringify = require('stringify');

gulp.task('compile', function() {
  gulp.src('src/**/*.js')
  .pipe(browserify({
    standalone: "OuibounceTag",
    transform: ['stringify']
  }))
  .pipe(gulp.dest('dist'))
});

// Because it's always best to have your code checked
// If this task fails, build will fail too
gulp.task('jshint', function() {
  gulp.src('src/**/*.js')
    .pipe( jshint( '.jshintrc' ) )
    .pipe( jshint.reporter( stylish ) )
    .pipe( jshint.reporter( 'fail' ) );
});

gulp.task('build', ['jshint', 'compile']);
/*
, function() {
    gulp.src('src/tag.js')
        .pipe(umd_wrap({ namespace: 'gtm-bounce' }))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename('gtm-bounce.min.js'))
        .pipe(gulp.dest('dist'));
});
*/
// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('src/**/*', ['build']);
});
