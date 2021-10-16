let projectFolder = "dist";
let srcFolder = "#src";

let path = {
    build: {
        html: projectFolder + "/",
        css: projectFolder + "/css/",
        js: projectFolder + "/js/",
        img: projectFolder + "/img/",
        fonts: projectFolder + "/fonts/",
    },
    src: {
        html: [srcFolder + "/*.html", "!" + srcFolder + "/_*.html"],
        css: srcFolder + "/scss/style.scss",
        js: srcFolder + "/js/script.js",
        img: srcFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: srcFolder + "/fonts/*.{ttf,woff,woff2}",
    },
    watch: {
        html: srcFolder + "/**/*.html",
        css: srcFolder + "/scss/**/*.scss",
        js: srcFolder + "/js/**/*.js",
        img: srcFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: srcFolder + "/fonts/*.{ttf,woff,woff2}",
    },
    clean: "./" + projectFolder + "/"
}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass');
    scss = require('gulp-sass')(require ('sass'));
    autoprefixer = require('gulp-autoprefixer');
    groupMedia = require('gulp-group-css-media-queries');
    cleanCss = require('gulp-clean-css');
    rename = require('gulp-rename');
    uglify = require('gulp-uglify-es').default;
    
function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + projectFolder + "/"
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude({
            indent: true
        }))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function fonts() {
    return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
    .pipe(browsersync.stream())
}

// gulp.task('fonts', function() {
//     return gulp.src('fonts/**/*')
//       .pipe(gulp.dest('dist/fonts'))
//   })

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            groupMedia()
        )
        .pipe(
            autoprefixer({
                overrideBrowserlist: ["last 5 version"],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(cleanCss())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname:".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function images() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.fonts],fonts);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img],images);
}

function clean() {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, fonts, images));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build; 
exports.watch = watch;
exports.default = watch;
