/**
* Created by ilanrackover on 12/06/2017.
*/
const gulp = require('gulp')
    , nodemon = require('gulp-nodemon')
    , jshint = require('gulp-jshint');

gulp.task('lint', function () {
    return gulp.src('./**/*.js').pipe(jshint());
});

gulp.task('develop', function () {
    const stream = nodemon({
        script: 'server.js'
        , ext: 'html js'
        , quiet: 'true'
        , ignore: ['public']
        , tasks: ['lint']
    });

    stream.on('crash', function () {
        console.error('Application has crashed!\n');
        stream.emit('restart');  // restart the server in 10 seconds
    });
});
