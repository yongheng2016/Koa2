const Koa = require('koa')
const app = new Koa()
app.use(async(ctx) => {
    ctx.body = 'hello world'
})
app.listen(9001)
console.log('app started at port 90001')