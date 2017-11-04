/**
 * 将 site A 的 theme 复制到 site B
 */

const fs = require('fs-extra')
const path = require('path')

const files = [
  '_includes/icons.html',
  '_includes/toc.html',
  '_layouts/default.html',
  'assets/css/custom.scss',
  'assets/js/script.js',
  'Gemfile',
  'Gemfile.lock',
]

module.exports = async function (src, target, opts) {
  if (opts.all) {
    await copyYaml(src, target)
  }

  await Promise.all(files.map(copy)).catch(console.error)
  await copy('_includes/nav.html', { overwrite: false })

  function copy(name, opts) {
    return fs.copy(path.join(src.root, name), path.join(target.root, name), opts)
      .catch(console.error)
  }
}

async function copyYaml(src, target) {
  let name = '_config.yml'
  let content = await fs.readFile(path.join(src.root, name), 'utf8')
  await fs.writeFile(path.join(target.root, name), content
    .replace(src.title, target.title))

  name = '_config-preview.yml'
  content = await fs.readFile(path.join(src.root, name), 'utf8')
  await fs.writeFile(path.join(target.root, name), content
    .replace(src.name, target.name))
}
