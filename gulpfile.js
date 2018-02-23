const gulp = require('gulp');
const ts = require('gulp-typescript');
const webpack = require('webpack');
const sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');
const gutil = require('gulp-util');
const path = require('path');
const del = require('del');

gulp.task('server-compile', () => {
    const tsProject = ts.createProject('./tsconfig.json');
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write('.', {
            mapSources: (sourcePath, file) => {
                // correct the path
                return path.relative(path.dirname(file.path), path.join(file.base, sourcePath));
            }
        }))
        .pipe(gulp.dest('out'));
});

gulp.task('client-compile', (done) => {
    const config = require('./src/client/webpack.config.js');
    config.context = `${__dirname}/src/client`;
    return webpack(config, (err, stats) => {
        const statsJson = stats.toJson();
        if (err || (statsJson.errors && statsJson.errors.length)) {
            statsJson.errors.forEach(webpackErr => {
                gutil.log(gutil.colors.red(`Error (webpack): ${webpackErr}`));
            });

            throw new gutil.PluginError('webpack', JSON.stringify(err || statsJson.errors));
        }
        // gutil.log('[webpack]', stats.toString());
        done();
    })
});

gulp.task('clean', (done) => {
    return del('out', done);
});

gulp.task('build', (done) => {
    return runSequence('clean', 'server-compile', 'client-compile', done);
});

gulp.task('watch', ["build"], () => {
    gulp.watch(['./src/**/*', './test/**/*', '!./src/client/**/*'], ['server-compile']);
    gulp.watch(['./src/client/**/*', './src/common/**/*'], ['client-compile']);
});