const { task, series } = require('gulp')
const rimraf = require('rimraf')

const scripts = require('./tasks/scripts')
const assets = require('./tasks/assets')
const watch = require('./tasks/watch')
const dist = require('./tasks/distribution')

task('clean', done => {
  rimraf('./dist', done)
})
task('dist', series('clean', assets.copyHtml, scripts.build))
task('develop', series('clean', watch.start))
task('pack-win', series('dist', dist.packWin))
task('pack-linux', series('dist', dist.packLinux))
task('pack-mac', series('dist', dist.packMac))
