'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const argv = require('yargs').argv;
const replace = require('gulp-replace');

let paths = {
    src: 'src/assets/scss/color-*.scss',
    dest: 'src/assets/css'
};

let projectNameSrcs = ['package.json', 'angular.json']


function styles() {
    return gulp.src(paths.src)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(paths.dest));
}

function rename() {
    let newName = argv.name || undefined;
    if (!newName) {
        console.error("Parâmetro --name [project-name] faltando");
        return gulp.src('.')
    }
    if (typeof newName !== 'string') {
        console.error("Parâmetro --name deve conter um argumento do tipo string");
        return gulp.src('.')
    }
    console.log('Alterando starterkit para', newName)
    return gulp.src(projectNameSrcs, { base: "./" })
        .pipe(replace('starterkit', newName))
        .pipe(gulp.dest('./'))
}

exports.rename = rename;

exports.default = styles;