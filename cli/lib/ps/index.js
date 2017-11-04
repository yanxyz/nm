const path = require('path')
const { spawn } = require('child_process')

// TODO: 目前是 Windows only
exports.ln = function (lnTextPath) {
  run(resolve('./ln.ps1'), [lnTextPath])
}

exports.build = function (site, options) {
  const args = []
  if (options.force) args.push('-f')
  // TODO: watch 不能正常终止
  if (options.watch) args.push('-w')

  options.cwd = site.root
  run(resolve('./build.ps1'), args, options)
}

function run(script, scriptArgs = [], options = {}) {
  const child = spawn(
    'pwsh', // PowerShell 6
    ['-f', script].concat(scriptArgs),
    Object.assign({ stdio: 'inherit' }, options))

  child.on('error', console.error)
}

function resolve(script) {
  return path.resolve(__dirname, script)
}
