const path = require('path')

// nw root
const appRoot = path.join(__dirname, '..')

// 注意路径用 path 方法指定，因为其它地方要求路径区分大小写

module.exports = {
  // root 为 nw 的 parent，nw 和 note 在同一个目录下
  root: path.join(appRoot, '..'),
  www: {
    root: path.join(appRoot, 'docs'),
    // node server(见 /server 目录)
    port: 9009, // node server
    // 或者使用本机 vhost
    vhostUrl: 'http://d.com',
  },
  subl: 'subl',
  totalcmd: 'TOTALCMD64.EXE',

  // alias 方便命令行输入，要求唯一
  sites: [
    {
      name: 'chrome',
      title: 'Chrome',
      alias: 'ch',
    },
    {
      name: 'csharp',
      title: 'CSharp',
      alias: 'cs',
    },
    {
      name: 'css',
      title: 'CSS',
      alias: 'c',
    },
    {
      name: 'electron',
      title: 'Electron',
      alias: 'e',
    },
    {
      name: 'github',
      title: 'Github',
      alias: 'gh',
    },
    {
      name: 'html',
      title: 'HTML',
      alias: 'h',
    },
    {
      name: 'javascript',
      title: 'JavaScript',
      alias: 'js',
    },
    {
      name: 'jquery',
      title: 'jQuery',
      alias: 'jq',
    },
    {
      name: 'nodejs',
      title: 'Node.js',
      alias: 'nj',
    },
    {
      name: 'note',
      title: 'Note',
      alias: 'n',
    },
    {
      name: 'php',
      title: 'PHP',
      alias: 'php',
    },
    {
      name: 'powershell',
      title: 'PowerShell',
      alias: 'ps',
    },
    {
      name: 'python',
      title: 'Python',
      alias: 'py',
    },
    {
      name: 'react',
      title: 'React',
      alias: 'r',
    },
    {
      name: 'shell',
      title: 'Shell',
      alias: 'sh',
    },
    {
      name: 'typescript',
      title: 'TypeScript',
      alias: 'ts',
    },
    {
      name: 'vbscript',
      title: 'VBScript',
      alias: 'vbs',
    },
    {
      name: 'vuejs',
      title: 'Vue',
      alias: 'vue',
    },
  ]
}
