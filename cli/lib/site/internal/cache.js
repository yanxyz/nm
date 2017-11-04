/**
 * 缓存 site 文件列表，便于后续操作
 */

const fs = require('fs-extra')

class Cache {
  constructor(site) {
    this.site = site
    this.file = site.cacheFile
  }

  get() {
    try {
      return fs.readJson(this.file)
    } catch (err) {
      return this.set()
    }
  }

  async set() {
    const list = await this.site.walk()
    await fs.outputJson(this.file, list)
    return list
  }

  clean() {
    return fs.remove(this.file)
  }
}

module.exports = Cache
