const debug = require('debug')('nm:frontmatter')

/**
 * Parse frontmatter
 *
 * 只处理最简单的情况
 *
 * ---
 * key: value
 * ---
 *
 * value 不应有引号
 */

exports.parse = function (str) {
  const delimiter = '---'
  const eol = '\n'

  if (!str.startsWith(delimiter)) {
    debug(str.slice(0, 10))
    return { body: str }
  }

  let attributes = {}
  let body
  const lines = str.split(eol)
  for (let i = 1, len = lines.length; i < len; i++) {
    let line = lines[i]
    if (line.startsWith(delimiter)) {
      body = lines.slice(i + 1).join(eol).trimLeft()
      return { attributes, body }
    }

    line = line.trim()
    if (line) {
      const [key, value] = line.split(': ')
      attributes[key] = value
    }
  }
}

exports.pack = function (attributes, body = '') {
  const str = Object.entries(attributes)
    .map(([key, value]) => key + ': ' + value)
    .join('\n')

  if (!str) {
    return body
  }

  return `---
${str}
---

${body}`
}
