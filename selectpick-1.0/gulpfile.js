
var gulp = require('gulp'),
    rjs = require('gulp-requirejs'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-minify-css'),
    watchF = require('gulp-watch');
var paths = {
    script: 'src/*.js',
    css: 'src/*.css',
    img:'src/*.png'
};
gulp.task('js', function() {
    return gulp.src(paths.script).pipe(uglify()).pipe(gulp.dest('dist'));
});
gulp.task('css', function() {
    return gulp.src(paths.css)
        .pipe(cssmin({
            compatibility: 'ie8'
        })) //兼容ie
        .pipe(gulp.dest('dist'));
});
gulp.task('img', function() {
    return gulp.src('./src/img/*')
        .pipe(gulp.dest('dist/img'));
});
gulp.task('requirejs', function() {
    return rjs({
            "name": "select",
            "baseUrl": "src",
            "out": "select.js",
            shim: {
                '$': {
                    exports: '_'
                }
            },
            "paths": {
                $:"jquery-1.11.2"
            },
            exclude:["$"],
            //这里不打包zepto
            // map: {
            //     "*": {
            //         "$": "jquery-private"
            //     },
            //     "jquery-private": {}
            // }
            // ... more require.js options
        }).pipe(uglify())
        .pipe(gulp.src(['src/jquery-1.11.2.js', 'src/require.js']).pipe(uglify()))
        .pipe(gulp.dest('dist')); // pipe it to the output DIR
});
gulp.task('watch',function(){
    watchF(['src/*.*','html/*.*'],function(){
        gulp.start('default')
    });
});
gulp.task('default', ['js', 'css','img']);