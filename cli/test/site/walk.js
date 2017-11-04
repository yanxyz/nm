const assert = require('assert')
const which = require('../../lib/site/which-site')
const walk = require('../../lib/site/walk')

describe('walk()', function () {
  it('', async function () {
    const site = which('css')
    const files = await walk(site.root)
    assert(files.length > 0, true)
  })
})
