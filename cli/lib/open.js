const parseArgs = require('./utils/parse-args')
const guess = require('./utils/guess')
const which = require('./site/which-md')
const opn = require('opn')
const debug = require('debug')('nm:open')

module.exports = function () {
  const argv = parseArgs(process.argv.slice(3), showHelp)

  const [siteName, fileName] = guess(argv._)
  debug(siteName, fileName)
  run(siteName, fileName).catch(console.error)
}

function showHelp() {
  const cmd = 'nm open'
  console.log(`Usage: ${cmd} [site] [file]
`)
}

async function run(siteName, fileName) {
  const file = await which(siteName, fileName)
  const url = toUrl(file.path, file.site)
  debug(url)
  return opn(url)
}

function toUrl(filePath, site) {
  let part = filePath.slice(site.root.length, -3) // file 相对于 site 的路径，去掉 `.md`
    .replace(/\\/g, '/')
    .replace(/\/(index|readme)$/, '') // index.html
  if (!part.endsWith('/')) part += '/'
  return site.url + part
}
