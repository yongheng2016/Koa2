const Koa = require('koa')
const Views = require('koa-views')
const path = require('path')
const app = new Koa()

 //ejs模板引用路径
app.use(Views(path.join(__dirname, './views'), {
    extension: 'ejs' 
}))

app.use(async ctx=> {
    let title = 'hello world'
    //通过文件名(eg: index => index.ejs)来引用模板并传参
    await ctx.render('index', {title})
})

app.listen(3000, () => {
    console.log('served at port 3000')
})