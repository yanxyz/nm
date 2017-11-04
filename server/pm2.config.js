/**
 * PM2 configuration
 * http://pm2.keymetrics.io/docs/usage/application-declaration/
 */

const config = require('./config')

module.exports = {
  name: 'nm',
  script: './app.js',
  cwd: __dirname, // server 所在目录
  env: {
    port: config.port
  },
  out_file: '/dev/null'
}
