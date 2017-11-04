const Koa = require('koa')
const send = require('koa-send')
const config = require('./config')

const app = module.exports = new Koa()

app.use(async (ctx, next) => {
  if (ctx.method !== 'GET') return next()

  if (ctx.path === '/') {
    ctx.redirect('/note/')
  } else {
    return send(ctx, ctx.path, {
      root: config.root,
      index: 'index.html'
    })
  }
})

const port = process.env.PORT || config.port
app.listen(port)
console.log(`Server address: http://localhost:${port}`)
