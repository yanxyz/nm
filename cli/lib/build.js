/**
 * Run `jekyll build`
 */

const parseArgs = require('./utils/parse-args')
const Site = require('./site')
const ps = require('./ps')

module.exports = function () {
  const argv = parseArgs(process.argv.slice(3), {
    alias: {
      'force': 'f',
      'watch': 'w',
    },
    boolean: ['force', 'watch', 'debug']
  }, showHelp)

  run(argv._[0], argv).catch(console.error)
}

function showHelp() {
  const cmd = 'nm build'
  console.log( `Usage: ${cmd} [options]

Options:
  -f, --force
      Clean before building
  -w, --watch
      Watch file changes
  -h, --help
      Print this usage
`)
}

async function run(name, options) {
  const site = new Site(name)
  await site.cache.set()
  return ps.build(site, options)
}
