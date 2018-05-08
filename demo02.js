const Koa = require('koa')
const app = new Koa()

function parseData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postData = ''
            ctx.req.addListener('data', (data) => {
                postData += data
            })
            ctx.req.on('end', () => {
                resolve(jsonParse(postData))
            })
        } catch (error) {
            reject(error)
        }
    })
}

function jsonParse(qeury) {
    let params = {}
    let paramsList = qeury.split('&')
    for(let [index, val] of paramsList.entries()) {
        let itemList = val.split('=')
        params[itemList[0]] = decodeURIComponent(itemList[1])
    }
    return params
}

app.use(async ctx => {
    if (ctx.url === '/' && ctx.method === 'GET') {
        let html = `
            <h1>Koa form</h1>
            <form method="POST" action="/">
                <p>userName</p>
                <input type="text" name="name"/>
                <p>age</p>
                <input type="text" name="age"/>
                <input type="submit"/>
            </form>
        `
        ctx.body = html
    } else if (ctx.url === '/' && ctx.method === 'POST') {
        let postData = await parseData(ctx)
        ctx.body = postData
    } else {
        ctx.body = '404'
    }
})
app.listen(3000, () => {
    console.log('server started at port at 3000')
})