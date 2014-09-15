// Gulp Objects
var gulp = require("gulp"),
	gutil = require("gulp-util"),
	coffee = require("gulp-coffee"),
	browserify = require("gulp-browserify"),
	concat = require("gulp-concat"),
	webserver = require("gulp-webserver"),
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
		//.pipe(webserver.reload())
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
		//.pipe(webserver.reload())
});


gulp.task("watch",function(){
	gulp.watch(coffeeSources, ["coffee"])
	gulp.watch(jsSources, ["js"])
	gulp.watch("components/sass/*.scss", ["compass"])
});

gulp.task('webserver', function() {
  gulp.src(__dirname + "builds/develolpment")
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task("default",["coffee","js","compass","webserver","watch"]);