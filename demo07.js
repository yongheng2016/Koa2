const Koa = require('koa')
const app = new Koa()
app.use(async (ctx, next) => {
    if (ctx.url === '/index') {
        ctx.cookies.set('myName', 'login', {
            domain: '127.0.0.1',
            path: '/index',
            maxAge: 1000*60,
            expires: new Date('2018-10-19'),
            httpOnly: false,
            overwrite: false
        })
        ctx.body = 'have cookie'
    }else{
        if (ctx.cookies.get('myName')) {
            ctx.body = ctx.cookies.get('myName')
        }else{
            ctx.body = 'no cookie'
        }
    }
})

app.listen(3000, () => {
    console.log('served at port 3000')
})