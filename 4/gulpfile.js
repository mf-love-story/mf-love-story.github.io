// Load gulp
const { task, src, dest, watch, series, parallel } = require('gulp');

// CSS related plugins
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));

// JS related plugins
const babelify = require('babelify');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

// Browser related plugins
const browserSync = require('browser-sync').create();

// Utility plugins
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

// Project related variables
const cssSrc = './src/css/*.css';
const cssDist = './html/css/';
const cssWatch = cssSrc;

const jsDist = './html/js/';
const jsWatch = './src/js/**/*.js';
const jsSrcDir = 'src/js/';
const jsFiles = ['script.js'];

const styleDist = './html/css/';
const styleWatch = './src/scss/**/*.scss';
const styleDir = 'src/scss/';
const styleFiles = ['style.scss'];

const htmlWatch = './html/*.html';

const serverBaseDir = './html/';

function js(done) {
    jsFiles.map(function (entry) {
        return browserify({
            entries: [jsSrcDir + entry]
        })
            .transform(babelify, { presets: ['@babel/preset-env'] })
            .bundle()
            .pipe(source(entry))
            .pipe(rename({ extname: '.min.js' }))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(dest(jsDist))
            .pipe(browserSync.stream());
    });

    done();
}

function scss(done) {
    styleFiles.map(function (entry) {
        return src(styleDir + entry)
            .pipe(sourcemaps.init())
            .pipe(
                sass({
                    errorLogToConsole: true,
                    outputStyle: 'compressed'
                })
            )
            .on('error', console.error.bind(console))
            .pipe(autoprefixer({ cascade: false }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(sourcemaps.write('./'))
            .pipe(dest(styleDist))
            .pipe(browserSync.stream());
    });

    done();
}

function css(done) {
    src(cssSrc)
        .pipe(dest(cssDist))
        .pipe(browserSync.stream());
    done();
}

function browserSyncInit() {
    return browserSync.init({
        server: {
            baseDir: serverBaseDir
        }
    });
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}

function watch_files() {
    watch(cssWatch, series(css, browserSyncReload));
    watch(jsWatch, series(js, browserSyncReload));
    watch(styleWatch, series(scss, browserSyncReload));
    watch(htmlWatch, browserSyncReload);
}

exports.css = css;
exports.js = js;
exports.scss = scss;

exports.default = parallel(css, js, scss);
exports.watch = parallel(browserSyncInit, watch_files);