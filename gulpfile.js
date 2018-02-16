//Include gulp
var gulp = require('gulp');

//Include plugins
var clean = require('gulp-clean');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var cssbeautify = require('gulp-cssbeautify');

gulp.task('clean', function () {
	return gulp.src('dist/*')
		.pipe(clean({
			allowEmpty: true
		}));
});

gulp.task('less-build', gulp.series('clean', function () {
	return gulp.src('less/main.less')
		.pipe(less())
		.pipe(cssbeautify({
			indent: '	',
			openbrace: 'separate-line',
			autosemicolon: true
		}))
		.pipe(gulp.dest('dist/'));
}));

gulp.task('default', gulp.series('less-build', function () {
	return gulp.src('dist/main.css')
		.pipe(cssmin())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist/'));
}));

