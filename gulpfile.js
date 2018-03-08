var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    runSequence = require('run-sequence'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    argv = require('yargs').argv,
    del = require('del');

gulp.task('server', function() {
    connect.server({
        port: 8000,
        root: './dist/',
        livereload: true
    });
});

gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(babel(
            {
                presets: ['env'],
                plugins: ["transform-object-rest-spread"]
            }
        ))
        .pipe(gulp.dest('./dist/javascript'))
        .pipe(connect.reload());
});

gulp.task('sass', function() {
    var outputStyle = argv.prod ? 'compressed' : '';

    return gulp.src('./src/scss/main.scss')
        .pipe(sass({
            outputStyle: outputStyle
        }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/style/'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/js/**/*.js', ['js']);
});

gulp.task('copy', function() {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist/'));

    gulp.src('./src/assets/img/**/*')
        .pipe(gulp.dest('./dist/assets/img'));
});

gulp.task('build', function() {
    runSequence(
        'copy',
        'sass',
        'js'
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
