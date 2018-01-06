const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const tailwind = require('tailwindcss');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const del = require('del');

const server = browserSync.create();

const paths = {
    scss: {
        src: 'public/build/stylesheets/**/*.scss',
        dest: 'public/dist/stylesheets/',
        serve: 'public/dist/stylesheets/'
    },
    pug: {
        src: 'views/**/*.pug',
        dest: 'build/html/',
        serve: 'build/html/*html'
    }
};

// gulp.task('clean', () => del(['build']));


gulp.task('tailwind', () => {
    gulp.src('./config.css')
        .pipe(postcss([
            tailwind('./tailwind.js'),
            require('autoprefixer')
        ]))
        .pipe(gulp.dest('public/dist/stylesheets/styles.scss'));
});

gulp.task('build-css', ['tailwind', 'scss']);

// gulp.task('pug', () =>
//     gulp.src(paths.pug.src)
//     .pipe(pug())
//     .pipe(gulp.dest(paths.pug.dest))
// );


gulp.task('scss', () =>
    gulp.src(paths.scss.src)
    .pipe(sass())
    .pipe(gulp.dest(paths.scss.dest))
);

gulp.task('css-reload', ['scss'], () =>
    server.reload()
);


gulp.task('pug-reload', () =>
    server.reload()
);

gulp.task('default', ['scss'], () => {
    server.init({
        proxy: 'localhost:8080',
        files: ['public/dist/*.css', 'build/html/*html']
    });
    gulp.watch(paths.scss.src, ['css-reload']);
    gulp.watch(paths.pug.src, ['pug-reload']);
});