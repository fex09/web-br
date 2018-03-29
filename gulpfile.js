const config = require('./gulpconfig');
const gulp = require('gulp');
const connect = require('gulp-connect');
const del = require('del');
const runSequence = require('run-sequence');
//const open = require('gulp-open'); para que abra el explorardor al correr el server
const sass = require('gulp-sass');
const htmlPartial = require('gulp-html-partial');

//development serve task
const serve = () => {
    connect.server(config.server);
};


//HTML partial taks
const htmlTask = () => {
    const htmlConfig = config.html;

    return gulp.src(htmlConfig.src)
        .pipe(htmlPartial({
            basePath: htmlConfig.basePath
        }))
        .pipe(gulp.dest(htmlConfig.dest))
        .pipe(connect.reload());
};

//SASS task
const sassTask = () => {
    const sassConfig = config.sass;

    return gulp.src(sassConfig.src)
        .pipe(sass({
            outputStyle: sassConfig.style
        }).on('error', sass.logError))
        .pipe(gulp.dest(sassConfig.dest))
        .pipe(connect.reload());
};


//copu the files to distribution folder
const copy = () => {
    const copyConfig = config.copy;
    /*gulp.src(copyConfig.index.src)
    .pipe(gulp.dest(copyConfig.index.dest));*/

    return gulp.src(copyConfig.img.src)
        .pipe(gulp.dest(copyConfig.img.dest))
        .pipe(connect.reload()); // recarga el servidor después de que copia.
};


const watch = () => {
    const watchConfig = config.watch;
    gulp.watch(watchConfig.index, ['copy']);
    gulp.watch(watchConfig.sass,['sass']);
}


//build the project
const build = () => del([config.distRoot]).then(()=>{
    runSequence('copy','sass','htmlTask');
});

const defaultTask = () => runSequence(
    'build',
    'serve',
    'watch'
)

gulp.task('serve',serve);
gulp.task('copy',copy);
gulp.task('build',build);
gulp.task('watch',watch);
gulp.task('sass',sassTask);
gulp.task('html',htmlTask);
gulp.task('default',defaultTask);
//gulp.task('default',() => console.log('Funciona!', config));