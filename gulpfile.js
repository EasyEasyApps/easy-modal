var gulp      = require('gulp'),
    jshint    = require('gulp-jshint'),
    cleanCSS = require('gulp-clean-css'),
    browserify = require('gulp-browserify');

gulp.task('minify-css', function() {
  gulp.src('src/styles/**/*.css')
  .pipe(cleanCSS({debug: true, compatibility: 'ie8'}, function(details) {
    console.log(details.name + ': ' + details.stats.originalSize);
    console.log(details.name + ': ' + details.stats.minifiedSize);
  }))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('compile', function() {
  gulp.src('src/mautic-modal.js')
  .pipe(browserify({
    standalone: "MauticModal",
    transform: ['stringify', 'uglifyify']
  }))
  .pipe(gulp.dest('dist'))
});

// Because it's always best to have your code checked
// If this task fails, build will fail too
gulp.task('jshint', function() {
  gulp.src('src/**/*.js')
    .pipe( jshint( '.jshintrc' ) )
    .pipe( jshint.reporter( 'default' ) );
});

gulp.task('build', ['jshint', 'compile', 'minify-css']);
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
