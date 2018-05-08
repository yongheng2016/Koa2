const koa = require('koa')
const app = new koa()
const fs = require('fs')
app.use(async ctx => {
    let url = ctx.request.url
    let html = await route(url)
    ctx.body = html
})
async function route(url) {
    let page = 'error.html'
    switch(url) {
        case '/':
            page = 'index.html'
            break
        case '/index':
            page = 'index.html'
            break
        case '/todo':
            page = 'todo.html'
            break
        case '/404':
            page = 'error.html'
            break
        default:
            break
    }
    let html =await render(page)
    return html
}

function render(page) {
    return new Promise((resolve, reject) => {
        let pageUrl = `./pages/${page}`
        let datas = fs.readFile(pageUrl, 'binary', (err, data) => {
            if (err) {
                reject(err)
            }else{
                resolve(data)
            }
            return data
        })
    })
}
app.listen(3000, () => {
    console.log('started at port 3000')
})