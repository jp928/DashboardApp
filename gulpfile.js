'use strict';
var gulp = require('gulp'),
    path = require('path'),
    gulpWebpack = require('gulp-webpack'),
    webpack = require('webpack'),
    serveStatic = require('serve-static'),
    serveIndex = require('serve-index'),
    plugins = require('gulp-load-plugins')();

gulp.task('connect', function() {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({
            port: 35729
        }))
        .use(require('connect-modrewrite')([
            '!(\\..+)$ / [L]',
        ]))
        .use(serveStatic('dist'))
        .use(serveIndex('dist'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function() {
            console.log('Started connect web server on http://localhost:9000');
        });
});

// start the server
gulp.task('serve', ['connect', 'vendor', 'watch'], function() {
    require('opn')('http://localhost:9000');
});

gulp.task('watch', function() {
    plugins.livereload.listen();

    // watch for changes
    gulp.watch([
        'dist/bundle.js',
        'dist/index.html'
    ]).on('change', function(file) {
        console.log(file.path + ' changed');
    });

    // run webpack whenever the source files changes
    gulp.watch('app/**/*', ['repack']);
    gulp.watch('app/index.html', ['html']);
    gulp.watch('app/images/*', ['images']);
});


// Watcher functions
gulp.task('webpack', function() {
    return gulp.src('app/index.app.js')
        .pipe(gulpWebpack(require('./webpack.config.js'), webpack))
        .pipe(gulp.dest('dist/'))
});

gulp.task('repack', ['webpack'], function() {
    return gulp.src('dist/bundle.js')
        .pipe(plugins.size())
        .pipe(plugins.livereload());
});

gulp.task('html', function() {
    return gulp.src('app/index.html')
        .pipe(gulp.dest('dist/'))
        .pipe(plugins.livereload());
});

gulp.task('images', function() {
    return gulp.src('app/images/*')
        .pipe(plugins.imagemin({
            optimizationLevel: 7
        }))
        .pipe(gulp.dest('dist/images'))
        .pipe(plugins.livereload());
});

gulp.task('vendor', function() {
    return gulp.src([
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/angular/angular.min.js',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/angular-aria/angular-aria.min.js',
            'bower_components/angular-material/angular-material.min.js',
            'bower_components/d3/d3.min.js',
            'bower_components/c3/c3.min.js'
        ])
        .pipe(plugins.order([
            'angular/angular.min.js',
            'angular-ui-router/release/angular-ui-router.min.js',
            'angular-animate/angular-animate.min.js',
            'angular-aria/angular-aria.min.js',
            'angular-material/angular-material.min.js',
            'd3/d3.min.js',
            'c3/c3.min.js'
        ], {
            base: './bower_components'
        }))
        .pipe(plugins.concat('vendor.js'))
        .pipe(plugins.size())
        .pipe(gulp.dest('dist/'))
});
