"use strict";

const gulp = require("gulp");

// --- HTML-утилиты ---
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");

// --- CSS-утилиты ---
const csso = require("gulp-csso");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

// --- Препроцессорные утилиты ---
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");

// --- JS-утилиты ---
const pipeline = require('readable-stream').pipeline;

// --- Оптимизация изображений ---
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");

// --- Вспомогательные утилиты ---
const rename = require("gulp-rename");
const del = require("del");

// --- Серверные утилиты ---
const server = require("browser-sync").create();


/*
=====================================================
----------------------- ТАСКИ -----------------------
=====================================================
*/

// *** Обработка всех SCSS-файлов и преобразование их в CSS-файлы ***
gulp.task("css", () => {
  return pipeline(
    gulp.src("source/sass/styles.scss"),
    plumber(),
    sourcemap.init(),
    sass(),
    postcss([
      autoprefixer()
    ]),
    csso(),
    rename("styles.min.css"),
    sourcemap.write("."),
    gulp.dest("build/css"),
    server.stream()
  );
});


// *** Работа с Сервером ***
gulp.task("server", () => {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", (done) => {
  server.reload();
  done();
});


// *** Оптимизация изображений ***
gulp.task("images", () => {
  return pipeline(
    gulp.src("source/img/**/*.{png,jpg,svg}"),
    imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]),
    gulp.dest("source/img")
  );
});


// *** Переформатирование изображений в WebP ***
gulp.task("webp", () => {
  return pipeline(
    gulp.src("source/img/**/*.{png,jpg}"),
    webp({quality: 90}),
    gulp.dest("source/img")
  );
});


// *** Сборка SVG-спрайта ***
gulp.task("sprite", () => {
  return pipeline(
    gulp.src("source/img/**/{icon-*,htmlacademy*}.svg"),
    svgstore({inlineSvg: true}),
    rename("sprite_auto.svg"),
    gulp.dest("build/img")
  );
});


// *** Обработка HTML-файлов ***
gulp.task("html", () => {
  return pipeline(
    gulp.src("source/*.html"),
    posthtml([
      include()
    ]),
    gulp.dest("build")
  );
});


// *** Копирование файлов ***
gulp.task("copy", () => {
  return pipeline(
    gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source//*.ico"
    ], {
      base: "source"
    }),
    gulp.dest("build")
  );
});


// *** Очистка директории build/ ***
gulp.task("clean", () => {
  return del("build");
});


// === Основные задачи для Сборки проекта в "продакшн" и поднятие Сервера ===
gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "html"));
gulp.task("start", gulp.series("build", "server"));
