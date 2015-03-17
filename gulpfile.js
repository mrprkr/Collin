/*
	GULP AUTOMATION RECIPE FOR FRONT END DEV
	PARKER | 2015
*/

//dependancies and variables
var gulp = require('gulp');
var sass = require('gulp-sass');
var bower = require('gulp-bower');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var templateCache = require ('gulp-angular-templatecache');
var streamqueue = require('streamqueue');
var browserSync = require('browser-sync');
var modRewrite  = require('connect-modrewrite');
var middleware = require('middleware');
var reload = browserSync.reload;

gulp.task('index', function(){
	return gulp.src('./build/index.html')
	.pipe(gulp.dest('./app/'))
})

//move images
gulp.task('img', ['index'], function(){
	return gulp.src('./build/img/**/*')
	.pipe(gulp.dest('./app/assets/img/'));
});

//compile views
gulp.task('views', ['img'], function(){
	return streamqueue({objectMode: true},
		gulp.src('./build/views/*.html')
		)
		.pipe(templateCache('templateCache.js', {module: 'templatescache', standalone: true}))
		.pipe(gulp.dest('./build/js/'));
});

//move the scripts
gulp.task('scripts', ['views'], function(){
	return gulp.src('./build/js/*.js')
	.pipe(gulp.dest('./app/assets/js'));
});

//compile, prefix, and move sass
gulp.task('build', ['scripts'], function(){
	return gulp.src('build/scss/*.scss')
	.pipe(sass({
		errLogToConsole: false,
		onError: function(err){
			return notify().write(err);
		}
	}))
	.pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
	.pipe(gulp.dest('app/assets/css/'));
});

//move bower components to the library folder
gulp.task('bower', function(){
	return bower()
	.pipe(gulp.dest('./app/assets/js/lib'));
});

//compile/refresh on any changes to build folder
gulp.task('watch', function(){
	gulp.watch([
		"./build/*.html",
		"./build/scss/*.scss",
		"./build/js/*.js",
		"./build/views/*.html"
		], ['build', reload]);
	//run bower if new components are installed
	gulp.watch("./bower_components/**/*", ['bower']);
});

//serve to the browser on localhost:3000
gulp.task('serve', function(){
	browserSync({
	        server: {
	            baseDir: "app/"
	        },
	        //html5 mode for anuglar
	        middleware: [
                modRewrite([
                    '!\\.\\w+$ /index.html [L]'
                ])
            ],
	        //don't open a new tab each time gulp runs
	        open: false 
	    });
});

//default task, use `gulper default` to run continuously
gulp.task('default', ['build', 'bower', 'watch', 'serve'])



