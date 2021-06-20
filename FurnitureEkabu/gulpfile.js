const { src, dest, series, watch, parallel } = require('gulp');

const removeComments    = require('gulp-strip-css-comments');
const autoprefixer      = require('gulp-autoprefixer');
const cleanCSS          = require('gulp-clean-css');
const sass              = require('gulp-sass');
const include           = require('gulp-file-include');
const uglify            = require("gulp-uglify-es").default;
const babel             = require('gulp-babel');
const del               = require('del');
const concat            = require('gulp-concat');
const htmlmin           = require("gulp-htmlmin");
const imagemin          = require("gulp-imagemin");
const changed           = require('gulp-changed');
const ttf2woff2         = require('gulp-ttftowoff2');
const ttf2woff          = require('gulp-ttf2woff');
const sync              = require('browser-sync').create();


function htmlDev() {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(dest('dist'));
};

function htmlBuild() {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            collapseBooleanAttributes: true,
            decodeEntities: true,
            removeComments: true,
            continueOnParseError: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }))
        .pipe(dest('dist'));
}


function imagesBuild() {
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
}

function imagesDev() {
    return src("src/img/**/*")
        .pipe(dest("dist/img"));
};


function ttf() {
  return src('src/fonts/**/*.ttf')
    .pipe(changed('dist/fonts', {
        extension: '.woff2',
        hasChanged: changed.compareLastModifiedTime
    }))
    .pipe(ttf2woff2())
    .pipe(dest('dist/fonts'))
};

function ttf2() {
  return src('src/fonts/**/*.ttf')
    .pipe(changed('dist/fonts', {
        extension: 'woff',
        hasChanged: changed.compareLastModifiedTime
    }))
    .pipe(ttf2woff())
    .pipe(dest('dist/fonts'))
};


function scriptsDev() {
    return src([
            "src/js/common.js",
            "src/js/sliders.js",
            "src/js/**.js"
        ])
        .pipe(concat("js/script.js"))
        .pipe(dest("dist"))
};

function scriptsBuild() {
    return src([
            "src/js/common.js",
            "src/js/sliders.js",
            "src/js/**.js"
        ])
        .pipe(concat('script.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(dest('dist/js'))
}


function scssDev() {
     return src('src/scss/style.scss')
        .pipe(sass({
            outputStyle:'expanded'
        }))
        .pipe(concat('css/style.css'))
        .pipe(removeComments())
        .pipe(dest('dist'))
}

function scssBuild() {
     return src('src/scss/style.scss')
        .pipe(sass({
            outputStyle:'compressed'
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(concat('css/style.css'))
        .pipe(removeComments())
        .pipe(autoprefixer())
        .pipe(dest('dist'))
};


function clear() {
    return del('dist');
};

function serve() {
    sync.init({
        server: './dist/'
    });

    watch('src/**/**.html',         series(htmlDev)).on('change', sync.reload);
    watch("src/js/**.js",           series(scriptsDev)).on('change', sync.reload);
    watch('src/scss/**/**.scss',    series(scssDev)).on('change', sync.reload);
};


exports.build = series(clear, parallel(scssBuild, htmlBuild, scriptsBuild, ttf, ttf2, imagesBuild));
exports.serve = series(clear, parallel(scssDev, htmlDev, scriptsDev, ttf, ttf2, imagesDev), serve);
exports.clear = clear;
