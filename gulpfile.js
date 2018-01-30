const gulp = require('gulp');
const postcss = require('gulp-postcss');
const tailwind = require('tailwindcss');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

var server;

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
    },
    js: {
        src: './public/build/javascripts/components/**/*.js',
        dest: './public/dist/javascripts/',
        serve: './public/dist/javascripts/'
    }
};

gulp.task('tailwind', () => {
    gulp.src('./config.css')
        .pipe(postcss([
            tailwind('./tailwind.js'),
            require('autoprefixer')
        ]))
        .pipe(gulp.dest('public/dist/stylesheets/styles.scss'));
});

gulp.task('build-css', ['tailwind', 'scss']);


gulp.task('js', () =>
    gulp.src(paths.js.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: [
            "env"
        ],
    })).on('error', (err) => console.log(err))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.js.dest))
);

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

gulp.task('js-reload', ['js'], () =>
    server.reload()
);

gulp.task('default', ['scss'], () => {
    const browserSync = require('browser-sync');
    server = browserSync.create();

    server.init({
        proxy: 'localhost:8080',
        files: ['public/dist/*.css', 'build/html/*html']
    });
    gulp.watch(paths.scss.src, ['css-reload']);
    gulp.watch(paths.pug.src, ['pug-reload']);
    gulp.watch(paths.js.src, ['js-reload']);
});