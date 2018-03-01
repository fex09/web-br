var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    runSequence = require('run-sequence'),
    argv = require('yargs').argv,
    del = require('del');

gulp.task('server', function() {
    connect.server({
        port: 8000,
        root: './dist/',
        livereload: true
    });
});

gulp.task('sass', function() {
    var outputStyle = argv.prod ? 'compressed' : '';

    return gulp.src('./scss/main.scss')
        .pipe(sass({
            outputStyle: outputStyle
        }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/style/'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('copy', function() {
    gulp.src('./index.html')
        .pipe(gulp.dest('./dist/'));

    gulp.src('./assets/img/**/*')
        .pipe(gulp.dest('./dist/assets/img'));
});

gulp.task('build', function() {
    runSequence(
        'copy',
        'sass'
    );
});

gulp.task('default', function() {
    del(['./dist']).then(function() {
        runSequence(
            'build',
            'server',
            'watch'
        );
    });
});

gulp.task('args', function() {
    console.log(argv.prod);
});
