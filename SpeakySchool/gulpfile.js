const {src, dest, series, watch} = require('gulp');

const removeComments    = require('gulp-strip-css-comments');
const autoprefixer      = require('gulp-autoprefixer');
const cleanCSS          = require('gulp-clean-css');
const sass              = require('gulp-sass');
const rename            = require("gulp-rename");
const include           = require('gulp-file-include');
const uglify            = require("gulp-uglify-es").default;
const del               = require('del');
const concat            = require('gulp-concat');
const htmlmin           = require("gulp-htmlmin");
const imagemin          = require("gulp-imagemin");
const sync              = require('browser-sync').create();


function html() {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin(
            {
                removeComments: true
            }
        ))
        .pipe(dest('dist'));
};


function images() {
    return src("src/img/**/*")
        .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.mozjpeg({quality: 75, progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ]
        ))
        .pipe(dest("dist/img"));
};


function fonts() {
    return src("src/fonts/**/*")
        .pipe(dest("dist/fonts"));
};


function scripts() {
    return src(["src/js/common.js",
                "src/js/header.js",
                "src/js/trialLesson.js",
                "src/js/slider.js",
                "src/js/trainingPackages.js",
                "src/js/sliderResult.js",
                "src/js/footer.js",
            ])
        .pipe(concat("js/script.js"))
        .pipe(dest("dist"))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(dest("dist"))
};


function scss() {
     return src('src/scss/**.scss')
        .pipe(sass({
            outputStyle:'expanded'
            }))
        .pipe(concat('css/style.css'))
        .pipe(autoprefixer())
        .pipe(removeComments())
        .pipe(dest('dist'))
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest('dist'));
};

function clear() {
    return del('dist');
};

function serve() {
    sync.init({
        server: './dist/'
    });

    watch('src/**/**.html',         series(html)).on('change', sync.reload);
    watch("src/js/**.js",           series(scripts)).on('change', sync.reload);
    watch('src/scss/**/**.scss',    series(scss)).on('change', sync.reload);
};

exports.build = series(clear, scss, html, scripts, fonts, images);
exports.serve = series(clear, scss, html, scripts, fonts, images, serve);
exports.clear = clear;
