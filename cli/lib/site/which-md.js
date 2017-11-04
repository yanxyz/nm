const path = require('path')
const Site = require('.')

/**
 * 确定 markdown
 *
 * @param {string} site site name
 * @param {string} file file name
 */
module.exports = async function (siteName, fileName) {
  const site = new Site(siteName)

  if (!fileName) {
    return {
      path: path.join(site.root, 'index.md'),
      site
    }
  }

  const files = await site.cache.get()

  // 从 mdPath 中去掉 siteRoot，减少干扰
  const results = files.filter(item => item.slice(site.root.length).includes(fileName))
  const len = results.length

  if (!len) {
    console.log('Cannot find file in cache')
    process.exit()
  }

  if (len > 1) {
    console.log('Which?')
    console.log(results.join('\n'))
    process.exit()
  }

  return {
    path: results[0],
    site
  }
}
