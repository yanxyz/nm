const edit = require('../utils/open-editor')
const config = require('.')

module.exports = function () {
  edit(config.configFile)
}
