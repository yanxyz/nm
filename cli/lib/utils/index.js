const { exec, execFile } = require('child_process')
const { promisify } = require('util')

exports.exec = promisify(exec)
exports.execFile = promisify(execFile)
