const parseArgs = require('./utils/parse-args')
const guess = require('./utils/guess')
const openTc = require('./utils/open-tc')
const which = require('./site/which-md')

module.exports = function () {
  const argv = parseArgs(process.argv.slice(3), showHelp)

  const [siteName, fileName] = guess(argv._)
  run(siteName, fileName).catch(console.error)
}

function showHelp() {
  const cmd = 'nm tc'
  console.log(`Usage: ${cmd} [site] [file]
`)
}

async function run(siteName, fileName) {
  const file = await which(siteName, fileName)
  return openTc(file.path)
}
