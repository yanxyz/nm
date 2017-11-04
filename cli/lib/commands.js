module.exports = [
  {
    name: 'cache',
    desc: 'Cache sites list and markdown files list'
  },
  {
    name: 'ln',
    desc: 'Link sites to www root'
  },
  {
    name: 'build',
    desc: 'Run jekyll build'
  },
  {
    name: 'sync',
    desc: 'Sync theme'
  },
  {
    name: 'config',
    desc: 'Edit config.js',
    mod: 'config/edit'
  },
  {
    name: 'start',
    desc: 'Start server by PM2',
  },
  {
    name: 'normalize',
    desc: 'normalize markdown, e.g. permalink',
  },
  {
    name: 'edit',
    desc: 'Edit file(Sublime Text)'
  },
  {
    name: 'tc',
    desc: 'Reveal file in Total Commander',
  },
  {
    name: 'open',
    desc: 'Resolve the url of file then open it in browser'
  },
]
