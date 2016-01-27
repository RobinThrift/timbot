// Gulpfile.js 

var gulp   = require('gulp'),
    config = {
        cwd: __dirname,
        paths: {
            dest: './dist',
            scripts: ['src/*.js', 'src/**/*.js'],
            tests: {
                unit: ['test/*.spec.js', 'test/**/*.spec.js', 'test/plugins/**/*.spec.js']
            }
        },
        tests: {
            reporter: (process.env.IS_CI || process.env.CI) ? 'mocha-junit-reporter' : 'spec',
            junitOutput: process.env.CIRCLE_TEST_REPORTS
        }
    };


var args  = require('yargs')(process.argv)
                .string('only')
                .default('only', undefined)
                .argv;


gulp.task('scripts:lint', function() {
    var eslint = require('gulp-eslint');
    var join = require('path').join;
    return gulp.src(config.paths.scripts)
        .pipe(eslint({
            configFile: join(config.cwd, '.eslintrc')
        }))
        .pipe(eslint.formatEach('stylish'));
});

gulp.task('scripts:transpile', function() {
    var babel = require('gulp-babel');

    return gulp.src(config.paths.scripts, {base: './src'})
        .pipe(babel({
            presets: ['es2015', 'stage-3'],
            plugins: ['transform-runtime']
        }))
        .on('error', function(err) {
            console.error(err);
        })
        .pipe(gulp.dest(config.paths.dest));
});

gulp.task('scripts:all', ['scripts:lint', 'scripts:transpile']);

gulp.task('tests:unit', ['scripts:transpile'], function() {
    var mocha = require('gulp-mocha');
    return gulp.src(config.paths.tests.unit)
        .pipe(mocha({
            ui: 'tdd',
            reporter: config.tests.reporter,
            reporterOptions: {
                mochaFile: config.tests.junitOutput
            },
            grep: args.only,
            js: require('babel-register')({
                presets: ['es2015', 'stage-3'],
                plugins: ['transform-runtime']
            })
        }));
});

gulp.task('tests:unit:watch', ['scripts:all'], function() {
    gulp.watch(config.paths.tests.unit, ['tests:unit']);
    gulp.watch(config.paths.scripts, ['tests:unit']);
});


gulp.task('test', ['tests:unit']);

gulp.task('watch', function() {
    gulp.watch(config.paths.scripts, ['scripts:all']);
});

gulp.task('clean', function(done) {
    var del = require('del');
    del([config.paths.dest], done);
});

gulp.task('install', ['scripts:transpile']);

