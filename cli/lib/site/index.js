const path = require('path')
const which = require('./internal/which')
const Cache = require('./internal/cache')
const config = require('../config')
const walk = require('./walk')

class Site {
  constructor(input) {
    const data = which(input)
    Object.assign(this, data)

    const name = data.name
    this.root = path.join(config.root, name)
    this.www = path.join(config.www.root, this.name)

    this.cacheFile = path.join(config.cacheDir, name + '.json')
    this.cache = new Cache(this)
  }

  get url() {
    let baseUrl
    if (config.www.vhostUrl) {
      baseUrl = config.www.vhostUrl
    } else {
      const port = config.www.port
      if (typeof port === 'number' || port > 1024) {
        baseUrl = 'http://localhost:' + port
      } else {
        console.error('config.www.port is invalid')
        process.exit(1)
      }
    }
    return baseUrl + '/' + this.name
  }

  async walk() {
    return walk(this.root)
  }
}

module.exports = Site
