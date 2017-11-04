const fs = require('fs-extra')
const path = require('path')
const config = require('../config')
const { exec } = require('.')

module.exports = async function (mdPath, site) {
  if (arguments.length === 1) {
    return run([mdPath])
  }

  const projectFile = path.join(site.root, '_abc.sublime-project')
  await ensure(projectFile)
  return run(['-n', '--project', projectFile, mdPath], { cwd: site.root })
}

function run(args, opts) {
  args.unshift(config.subl)
  return exec(args.join(' '), Object.assign({ windowsHide: true }, opts))
}

async function ensure(file) {
  const exists = await fs.pathExists(file)
  if (exists) return

  const content = `
{
  "folders":
  [
    {
      "file_exclude_patterns":
        [
          "Gemfile.lock"
        ],
      "folder_exclude_patterns":
        [
          "_site"
        ],
      "path": "."
    }
  ]
}
`
  return fs.outputFile(file, content)
}
