const { src, dest, series, watch, parallel } = require('gulp');

const removeComments    = require('gulp-strip-css-comments');
const autoprefixer      = require('gulp-autoprefixer');
const cleanCSS          = require('gulp-clean-css');
const sass              = require('gulp-sass')(require('sass'));
const include           = require('gulp-file-include');
const terser            = require("gulp-terser");
const babel             = require('gulp-babel');
const del               = require('del');
const concat            = require('gulp-concat');
const htmlmin           = require("gulp-htmlmin");
const imagemin          = require("gulp-imagemin");
const changed           = require('gulp-changed');
const ttf2woff2         = require('gulp-ttftowoff2');
const ttf2woff          = require('gulp-ttf2woff');
const sync              = require('browser-sync').create();


const SRC = "./src";
const DIST = "./dist"

const PATHS = {
	src: {
		js: `${SRC}/js`,
		html: `${src}`,
		templates: `${SRC}/templates`,
		scss: `${SRC}/scss`,
		img: `${SRC}/img`,
		fonts: `${SRC}/fonts`
	},
	dist: {
		js: `${DIST}/js`,
		img: `${DIST}/img`,
		css: `${DIST}/css`,
		html: `${DIST}`,
		fonts: `${DIST}/fonts`,
	}
};

const OPTIONS_TERSER = {
    compress: {
        booleans_as_integers: true,
        arguments: true,
        drop_console: true,
        toplevel: true
    }
}


const htmlDev = () => {
    return src(`./src/*.html`)
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(dest("dist"));
};

const htmlBuild = () => {
    return src(`./src/*.html`)
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


const imagesBuild = () => {
    return src(`${PATHS.src.img}/**/*`)
        .pipe(imagemin([
                imagemin.gifsicle({
                    interlaced: true
                }),
                imagemin.mozjpeg({
                    quality: 75,
                    progressive: true
                }),
                imagemin.optipng({
                    optimizationLevel: 5
                }),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ]
        ))
        .pipe(dest(PATHS.dist.img));
}

const imagesDev = () => {
    return src(`${PATHS.src.img}/**/*`)
        .pipe(dest(PATHS.dist.img));
};


const ttf = () => {
  return src(`${PATHS.src.fonts}/**/*.ttf`)
    .pipe(changed(PATHS.dist.fonts, {
        extension: '.woff2',
        hasChanged: changed.compareLastModifiedTime
    }))
    .pipe(ttf2woff2())
    .pipe(dest(PATHS.dist.fonts))
};

const ttf2 = () => {
  return src(`${PATHS.src.fonts}/**/*.ttf`)
    .pipe(changed(PATHS.dist.fonts, {
        extension: 'woff',
        hasChanged: changed.compareLastModifiedTime
    }))
    .pipe(ttf2woff())
    .pipe(dest(PATHS.dist.fonts))
};


const scriptsDev = () => {
    return src([
            "src/js/common.js",
            "src/js/sliders.js",
            "src/js/**.js"
        ])
        .pipe(concat("script.js"))
        .pipe(dest(PATHS.dist.js))
};

const scriptsBuild = () => {
    return src([
            "src/js/common.js",
            "src/js/sliders.js",
            "src/js/**.js"
        ])
        .pipe(concat('script.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(terser(OPTIONS_TERSER))
        .pipe(dest(PATHS.dist.js))
}


const scssDev = () => {
     return src(`${PATHS.src.scss}/style.scss`)
        .pipe(sass({
            outputStyle:'expanded'
        }))
        .pipe(concat('style.css'))
        .pipe(removeComments())
        .pipe(dest(PATHS.dist.css))
}

const scssBuild = () => {
     return src(`${PATHS.src.scss}/style.scss`)
        .pipe(sass({
            outputStyle:'compressed'
        }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(concat('style.css'))
        .pipe(removeComments())
        .pipe(dest(PATHS.dist.css))
};


const clear = () => {
    return del(DIST);
};

const serve = () => {
    sync.init({
        server: DIST
    });

    watch(`${PATHS.src.templates}/**/*.html`,    series(htmlDev)).on('change', sync.reload);
    watch(`${PATHS.src.js}/**/*.js`,      series(scriptsDev)).on('change', sync.reload);
    watch([`${PATHS.src.scss}/blocks/*.scss`,
           `${PATHS.src.scss}/common/*.scss`,
           `${PATHS.src.scss}/*.scss`], { usePolling: true }, series(scssDev)).on('change', sync.reload);
};


exports.build = series(clear, parallel(scssBuild, htmlBuild, scriptsBuild, ttf, ttf2, imagesBuild));
exports.serve = series(clear, parallel(scssDev, htmlDev, scriptsDev, ttf, ttf2, imagesDev), serve);
