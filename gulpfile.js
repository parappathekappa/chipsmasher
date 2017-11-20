var gulp = require('gulp');
var livereload = require('gulp-livereload');

// html files
var allwebfiles = 'postcards/message_generator/*.{html,css,js}';

// Default gulp task
// Runs with command 'gulp'
gulp.task('default', ['watch']);

// Listens for changes to html files, reloads page
// Runs with command 'templates'
gulp.task('templates', function() {
  
  gulp.src(allwebfiles)
    .pipe(livereload());
  
});

// Watch task
gulp.task('watch', function() {
	
  var server = livereload.listen();

  gulp.watch(allwebfiles, ['templates']);

});