const fs = require('fs-extra')
const frontmatter = require('./frontmatter')
const debug = require('debug')('nm:normalize')

/**
 * Modify markdown file
 *
 * @param {string} mdPath absolute path of markdown file
 * @param {string} siteRoot absoulte path of site root
 */
module.exports = async function (mdPath, siteRoot) {
  const pathInfo = parsePath(mdPath, siteRoot)
  const content = await fs.readFile(mdPath, 'utf8')
  const { attributes = {}, body } = frontmatter.parse(content)
  debug(attributes)
  const data = permalink(pathInfo, attributes)
  debug(data)
  if (data.modified) {
    return fs.writeFile(mdPath, frontmatter.pack(data.attributes, body))
  }
}

function parsePath(mdPath, siteRoot) {
  // from siteRoot to file
  const relativePath = mdPath.slice(siteRoot.length).replace(/\\/g, '/')

  // foo/bar.md => { dir: 'foo/', name: 'bar' }
  const i = relativePath.lastIndexOf('/')
  return {
    dir: relativePath.slice(0, i + 1),
    name: relativePath.slice(i + 1, -3),
  }
}

/**
 * Modify permalink
 *
 * permalink 为小写，通常和 filename 一致
 * 一致的删除 permalink
 * 不一致的根据 alias 创建 permalink
 */

function permalink(pathInfo, attributes) {
  let modified = false
  const { dir, name } = pathInfo
  const lname = name.toLowerCase()
  if (name == lname) {
    if (attributes.permalink) {
      delete attributes.permalink
      modified = true
    }
  } else {
    const permalink = '/' + dir + (attributes.alias || lname) + '/'
    if (permalink !== attributes.permalink) {
      attributes.permalink = permalink
      modified = true
    }
  }

  return { modified, attributes }
}
