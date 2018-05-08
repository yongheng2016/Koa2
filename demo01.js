const Koa = require('koa')
const app = new Koa()
app.use(async ctx => {
    let url = ctx.url
    let req = ctx.request
    console.log('ctx', ctx)
    ctx.body = ctx
})
app.listen(3000, () => {
    console.log('server is start at port 3000')
})