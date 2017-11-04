const parseArgs = require('./utils/parse-args')
const Site = require('./site')

module.exports = function () {
  const argv = parseArgs(process.argv.slice(3), {
    boolean: ['clean'],
  }, showHelp)

  run(argv._[0], argv.clean).catch(console.error)
}

function showHelp() {
  const cmd = 'nm cache'
  console.log(`Usage: ${cmd} [site] [options]

Options:
  --clean    clean cache
`)
}

async function run(siteName, clean) {
  const site = new Site(siteName)
  if (clean) {
    site.cache.clean()
  } else {
    site.cache.set()
  }
}
