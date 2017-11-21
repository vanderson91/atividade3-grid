var gulp = require('gulp');
var mcss = require('gulp-mcss');
var scss = require('gulp-scss');
var htmlmin = require('gulp-html-minifier2');
var del = require('del');

gulp.task("clean-css", function(){
    del('./dist/css');
    del('./source/css');
});

gulp.task('compila-scss', ['clean-css'], function(){
	return gulp.src('./source/scss/*.scss')
	.pipe(scss(
            {"bundleExec": false}
        ))
	.pipe(gulp.dest('./source/css/'))
});

gulp.task('mimifica-scss', ['compila-scss'], function(){
    return gulp.src('./source/css/*.css')
    .pipe(mcss())
    .pipe(gulp.dest('./dist/css/'))
});

gulp.task("clean-html", function(){
    del('./dist/*.html');
});

gulp.task('mimifica-html', ["clean-html"], function(){
	return gulp.src('./source/index.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('./dist/'))
});
gulp.task('monitora', function(){
    gulp.watch('./source/scss/*', ['mimifica-scss']);
    gulp.watch('./source/index.html', ['mimifica-html']);
});


gulp.task('default', ['mimifica-scss', 'mimifica-html', 'monitora']);
