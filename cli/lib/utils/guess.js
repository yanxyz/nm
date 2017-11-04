const Site = require('../site')

module.exports = function (args) {
  let siteName, fileName
  // input 只有一个时
  // 若 cwd 在 site 内，则它为 filename；不然为 siteName
  if (args.length === 1) {
    const firstArg = args[0]
    let site
    try {
      site = new Site()
      siteName = site.name
      fileName = firstArg
    } catch (err) {
      siteName = firstArg
    }
  } else {
    [siteName, fileName] = args
  }

  return [siteName, fileName]
}
