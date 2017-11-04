/**
 * 将 site A 的 theme 复制到 site B
 */

const parseArgs = require('./utils/parse-args')
const Site = require('./site')
const sync = require('./site/sync')
const config = require('./config')

module.exports = function () {
  const argv = parseArgs(process.argv.slice(3), {
    boolean: ['all'],
  }, showHelp)

  if (argv._.length < 2) {
    console.log('Two arguments required')
    console.log()
    showHelp()
    return
  }

  run(argv._[0], argv._[1], argv).catch(console.error)
}

function showHelp() {
  const cmd = 'nm sync'
  console.log(`Usage: ${cmd} <source_site> <target_site> [options]

Options:
  --all    Copy also *.yaml
`)
}

async function run(src, target, argv) {
  const srcSite = new Site(src)
  if (target === 'all') {
    for (const item of config.sites) {
      if (item.name === srcSite.name) continue
      const targetSite = new Site(item.name)
      await sync(srcSite, targetSite, argv)
    }
    return
  }

  const targetSite = new Site(target)
  await sync(srcSite, targetSite, argv)
  return
}
