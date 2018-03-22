const config = require('./gulpconfig');
const gulp = require('gulp');
const connect = require('gulp-connect');
const del = require('del');
const runSequence = require('run-sequence');

//development serve task
const serve = () => connect.server(config.server);

//copu the files to distribution folder
const copy = () => {
    const copyConfig = config.copy;
    gulp.src(copyConfig.index.src)
    .pipe(gulp.dest(copyConfig.index.dest));

    return gulp.src(copyConfig.img.src)
        .pipe(gulp.dest(copyConfig.img.dest))
};

//build the project
const build = () => del([config.distRoot]).then(()=>{
    runSequence('copy');
});

const defaultTask = () => runSequence(
    'build',
    'serve'
)

gulp.task('serve',serve);
gulp.task('copy',copy);
gulp.task('build',build);
gulp.task('default',defaultTask);
//gulp.task('default',() => console.log('Funciona!', config));