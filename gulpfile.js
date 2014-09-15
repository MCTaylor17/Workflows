// Gulp Objects
var gulp = require("gulp"),
	gutil = require("gulp-util"),
	coffee = require("gulp-coffee"),
	browserify = require("gulp-browserify"),
	concat = require("gulp-concat"),
	webserver = require("gulp-webserver"),
	connect = require("gulp-connect"),
	compass = require("gulp-compass");

gulp.task("log",function(){
	gutil.log("what the holy fuck?");
	
});

var coffeeSources = ["components/coffee/tagline.coffee"];

gulp.task("coffee", function(){
	gulp.src(coffeeSources)
		.pipe(coffee( {bare: true} )
			.on( "error", gutil.log )
		)
	.pipe(gulp.dest("components/scripts"));
});

// Then 
var jsSources = [
	"components/scripts/rclick.js",
	"components/scripts/pixgrid.js",
	"components/scripts/tagline.js",
	"components/scripts/template.js"
];

gulp.task("js", function(){
	gulp.src(jsSources)
		.pipe(concat("script.js"))
		.pipe(browserify())
		.pipe(gulp.dest("builds/development/js"))
		.pipe(connect.reload())
});

var sassSources = ["components/sass/style.scss"];

gulp.task("compass",function() {
	gulp.src(sassSources)
		.pipe(compass({
			sass: "components/sass",
			image: "_builds/development/images",
			style: "expanded"
		}))
		.pipe(gulp.dest("builds/development/css"))
		.pipe(connect.reload())
});


gulp.task("watch",function(){
	gulp.watch(coffeeSources, ["coffee"]),
	gulp.watch(jsSources, ["js"]),
	gulp.watch("components/sass/*.scss", ["compass"]),
	gulp.watch(htmlSources,["html"])
});

// ----------------------------------------
//[BUG]: Livereload seems to crash the app.
gulp.task("connect",function(){
	connect.server({
		livereload: true,
		root: "builds/development/",
	})
});
/*
gulp.task('webserver', function() {
  gulp.src("./builds/develolpment/")
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});
*/
var htmlSources = ["build/development/*.html"];

gulp.task("html",function(){
	gulp.src(htmlSources)
	.pipe(connect.reload())
	
	// add this to default after connect/webserver bug solved
	// add jsonSources = builds/development/json whatever
});
	

gulp.task("default",["coffee","js","compass","watch","connect"]);