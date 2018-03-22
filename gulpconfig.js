var config ={
    distRoot: 'dist',
    server: {
        port:8000,
        root:'./dist',
        livereload: true
    },
    copy: {
        index:{
            src:'./src/index.html',
            dest: './dist'
        },
        img:{
            src: './src/assets/img/**/*',
            dest: './dist/assets/img'
        }
    }
};

module.exports = config;
