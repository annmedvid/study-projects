"use strict"

const gulp = require("gulp")
const connect = require("gulp-connect")
const root = "public"

const plugins =
[
    require("postcss-media-minmax"),
    require("postcss-nested-props"),
    require("postcss-nested"),
    require("postcss-custom-properties"),
    require("postcss-short-spacing"),
    require("autoprefixer"),
]

gulp.task("connect", () =>
{
    connect.server({ root, livereload: true })
})

const postcss = require("gulp-postcss")
const concat = require("gulp-concat")
const styles = "styles/**/*.css"

gulp.task("css", () =>
{
    return gulp.src(styles)
        .pipe(concat("style.css"))
        .pipe(postcss(plugins))
        .pipe(gulp.dest(root))
        .pipe(connect.reload())
})

gulp.task("watch", () =>
{
    gulp.watch(styles, [ "css" ])
})

gulp.task("build", [ "css" ])
    .task("default", [ "build" ])
    .task("dev", [ "connect", "build", "watch" ])
