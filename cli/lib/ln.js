/**
 * 将每个 site 的 _site 链接到 www 下
 */

const fs = require('fs-extra')
const path = require('path')
const config = require('./config')
const ps = require('./ps')

module.exports = function () {
  const lines = []
  config.sites.map(site => {
    lines.push(path.join(config.www.root, site.name)) // link
    lines.push(path.join(config.root, site.name, '_site')) // target
  })

  const file = path.join(config.cacheDir, 'ln.txt')
  fs.outputFileSync(file, lines.join('\n'))
  ps.ln(file)
}
