const parseArgs = require('./utils/parse-args')
const { exec } = require('./utils')
const path = require('path')

const tips = 'Use `pm2 delete nm` to stop and remove server.'

module.exports = function () {
  parseArgs(process.argv.slice(3), showHelp)

  run().catch(console.error)
}

function showHelp() {
  const cmd = 'nm start'
  console.log(`Usage: ${cmd}

${tips}
`)
}

async function run() {
  const opts = {
    cwd: path.join(__dirname, '../../server'),
    windowsHide: true
  }

  await exec('pm2 startOrReload pm2.config.js', opts)
  const { stdout } = await exec('pm2 show nm', opts)
  console.log(stdout)
  console.log(tips)
  console.log()
}
