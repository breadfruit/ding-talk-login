

const Koa = require('koa');
const route = require('koa-route');
const websockify = require('koa-websocket');
const app = websockify(new Koa());
const views = require('koa-views')
const path = require('path')

app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))


app.use(route.get('/index', async ctx => {
    const {
        code,
        state
    } = ctx.query
    console.log(code)
    if (code) {
        let title = 'hello koa2'
        await ctx.render('index', {
            title,
        })
    }
}))


app.ws.use(route.get('/', ctx => {
    console.log(ctx.request.query)
    ctx.websocket.send('Hello World');
    // print message from the client
    ctx.websocket.on('message', function (message) {
        console.log('from the client', message);
    });
}));

app.listen(8080);