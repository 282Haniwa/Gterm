const { src, dest } = require('gulp')
const webpack = require('webpack-stream')
const inject = require('gulp-inject-string')

const webpackConfig = require('../webpack.config.js')

function build() {
  src('src/main/index.js').pipe(dest('build/main'))
  return src('src/renderer/index.jsx')
    .pipe(webpack(webpackConfig))
    .pipe(inject.replace('process.env.NODE_ENV', '"production"'))
    .pipe(dest('build/renderer'))
}

function developBuild() {
  src('src/main/index.js').pipe(dest('build/main'))
  return src('src/renderer/index.jsx')
    .pipe(webpack(webpackConfig))
    .pipe(dest('build/renderer'))
}

build.displayName = 'build-scripts'
developBuild.displayName = 'dev-build-scripts'

exports.build = build
exports.developBuild = developBuild
