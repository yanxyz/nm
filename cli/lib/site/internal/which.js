/**
 * 确定 site
 */

const path = require('path')
const config = require('../../config')

module.exports = function (input) {
  return input ? fromInput(input) : fromCwd()
}

function fromInput(input) {
  let site
  config.sites.some(item => {
    if (item.alias === input || item.name === input) {
      site = item
      return true
    }
  })

  if (!site) {
    throw new Error(`"${input}" is not found in config.sites`)
  }

  return site
}

function fromCwd() {
  const cwd = process.cwd()
  const notSiteError = new Error('Current working directory is not in a site')

  if (!cwd.startsWith(config.root)) {
    throw notSiteError
  }

  let site
  config.sites.some(item => {
    const siteRoot = path.join(config.root, item.name)
    // cwd 可能在 site 子目录里，故用 startsWith 判断
    if (cwd.startsWith(siteRoot)) {
      item.root = siteRoot
      site = item
      return true
    }
  })

  if (!site) {
    throw notSiteError
  }

  return site
}
