const assert = require('assert')
const frontmatter = require('../../lib/md/frontmatter')

describe('parse()', function () {
  const parse = frontmatter.parse

  it('', function () {
    const str = `---\n---`
    const data = parse(str)
    assert.deepStrictEqual(data, { attributes: {}, body: '' })
  })

  it('', function () {
    const str = `---\n\n---`
    const data = parse(str)
    assert.deepStrictEqual(data, { attributes: {}, body: '' })
  })
})
