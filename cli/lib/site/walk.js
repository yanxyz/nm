/**
 * 获取指定目录下全部 markdown
 */

const fs = require('fs-extra')
const path = require('path')
const debug = require('debug')('nm:walk')

// 忽略目录
const excludes = [
  'assets',
  'uploads'
]

module.exports = function (root) {
  debug(root)
  const arr = []
  return walk(root).then(() => arr)

  async function walk(dir) {
    const files = await fs.readdir(dir)
    const list = files.filter(name => {
      if (/^[_.]/.test(name) || excludes.includes(name)) {
        return false
      } else {
        return true
      }
    })
    return Promise.all(list.map(file => handle(path.join(dir, file))))
  }

  async function handle(entry) {
    const stats = await fs.stat(entry)
    if (stats.isDirectory()) {
      return walk(entry)
    }

    if (stats.isFile() && entry.endsWith('.md')) {
      arr.push(entry)
    }
  }
}
