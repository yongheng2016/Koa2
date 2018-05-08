const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router
    .get('/', (ctx, next) => {
        ctx.body = 'hello'
    })
    .get('/todo', (ctx, next) => {
        ctx.body = 'todo'
    })

app.use(router.routes())
    .use(router.allowedMethods())

app.listen(3000, () => {
    console.log('started at port 3000')
})