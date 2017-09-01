/**
 * Created by ilanrackover on 12/06/2017.
 */
var gulp = require('gulp')
    , nodemon = require('gulp-nodemon')
    , jshint = require('gulp-jshint')

gulp.task('lint', function () {
    gulp.src('./**/*.js')
        .pipe(jshint())
})

gulp.task('develop', function () {
    var stream = nodemon({ script: 'server.js'
        , ext: 'html js'
        , quiet: 'true'
        , ignore: ['public']
        , tasks: ['lint'] });

    stream
        .on('restart', function () {
            console.log('restarted!')
        })
        .on('crash', function() {
            console.error('Application has crashed!\n')
            stream.emit('restart', 10)  // restart the server in 10 seconds
        })
})
