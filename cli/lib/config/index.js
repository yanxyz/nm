const path = require('path')
const configFile = path.join(__dirname, '../../config.js')
const config = require(configFile)

exports = module.exports = {
  configFile,
  cacheDir: path.join(config.www.root, 'cache'),
  ...config
}
