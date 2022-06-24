const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "app"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
});

gulp.task('html', function() {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("app/"));
});

// gulp.task('scripts', () =>
//     gulp.src('src/js/*.js')
//         .pipe(babel({
//             presets: ['@babel/env']
//         }))
//         .pipe(gulp.dest('app/js/'))
// );

gulp.task('fonts', function() {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("app/fonts"));
});

gulp.task('icons', function() {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("app/icons"));
});

gulp.task('images', function() {
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("app/img"));
});


gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'fonts', 'icons', 'images'));