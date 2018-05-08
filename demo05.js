const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
//父级路由
const router = new Router({
    prefix: '/good'
})
//home路由
const home = new Router()
//page路由
const page = new Router()

home
    .get('/test', async (ctx) => {
        ctx.body = 'home路由下'
    })
    .get('/todo', async (ctx) => {
        ctx.body = 'home -- todo'
    })

page
    .get('/test', async (ctx) => {
        ctx.body = 'page路由下'
    })
    .get('/todo', async (ctx) => {
        ctx.body = 'page -- todo'
    })
router
    .get('/', (ctx, next) => {
        let html = `
            <ul><a href="/good">good/index</a></ul>
            <ul><a href="/good/todo">good/todo</a></ul>
            <ul><a href="/good/home/test">/good/home/test</a></ul>
            <ul><a href="/good/home/todo">/good/home/todo</a></ul>
            <ul><a href="/good/page/test">/good/page/test</a></ul>
            <ul><a href="/good/page/todo">/good/page/todo</a></ul>
        `
        ctx.body = html
    })
    .get('/todo', (ctx, next) => {
        ctx.body = 'todo'
    })

router.use('/home', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

app.use(router.routes())
    .use(router.allowedMethods())

app.listen(3000, () => {
    console.log('started at port 3000')
})