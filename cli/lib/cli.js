#!/usr/bin/env node

const commands = require('./commands')
const arg = process.argv[2]
if (!arg || arg.startsWith('-')) {
  showHelp()
}
main(arg)

function main(arg) {
  // 命令名字可以简写
  const results = commands.filter(cmd => cmd.name.startsWith(arg))
  const len = results.length
  if (!len) {
    console.log('Unknown command')
    return
  }

  if (len > 1) {
    console.log('Which?')
    console.log(results.map(x => x.name).join('\n'))
    return
  }

  const cmd = results[0]
  const lib = './' + (cmd.mod || cmd.name)
  require(lib)()
}

function showHelp() {
  const n = Math.max(...commands.map(c => c.name.length)) + 4

  console.log(`Usage: nm <command> [options]

Commands:

${commands.map(pad).join('\n')}
`)
  process.exit()

  function pad(item) {
    return item.name.padEnd(n) + item.desc
  }
}
