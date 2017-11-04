const path = require('path')
const parseArgs = require('./utils/parse-args')
const normalize = require('./md/normalize')
const Site = require('./site')

module.exports = function () {
  const argv = parseArgs(process.argv.slice(3), showHelp)

  if (argv._.length < 1) {
    console.log('One argument required')
    console.log()
    showHelp()
    return
  }

  run(argv._[0]).catch(console.error)
}

// 为避免无意间运行此命令，至少输入一个参数
function showHelp() {
  const cmd = 'nm mornalize'
  console.log(`Usage: ${cmd} <file>|<site>
<file> should be *.md
`)
}

async function run(name) {
  if (name.endsWith('.md')) {
    const site = new Site()
    return normalize(path.resolve(name), site.root)
  }

  const site = new Site(name)
  const files = await site.walk()
  return Promise.all(files.map(file => normalize(file, site.root)))
}
