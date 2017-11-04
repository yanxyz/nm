const parseArgs = require('./utils/parse-args')
const which = require('./site/which-md')
const edit = require('./utils/open-editor')

module.exports = function () {
  const argv = parseArgs(process.argv.slice(3), showHelp)

  if (argv._.length < 1) {
    console.log('One argument required')
    console.log()
    showHelp()
    return
  }

  run(...argv._).catch(console.error)
}

function showHelp() {
  const cmd = 'nm edit'
  console.log(`Usage: ${cmd} <site> [file]
`)
}

async function run(siteName, fileName) {
  const file = await which(siteName, fileName)
  return edit(file.path, file.site)
}
