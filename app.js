'use strict';

const koa     = require('koa')
const http    = require('http')
const path    = require('path')
const router = require('koa-router');
const render  = require('koa-views')
const serve   = require('koa-static')
const app = koa()

app.use(function*(next) {
  this.cookies.set('test999', 19999);
  return yield next;
})

// serve files from ./client
app.use(serve(path.join(__dirname, './')))
   .use(render(path.join(__dirname, "./"), {
        map: {
           html: 'ejs'
        }
   }))
   .use(router(app))


app.get('/v1/test/', function *(next) {
  this.cookies.set('test3333', 3333)
  this.body = {code: 200, message: 'success'}
  return yield next;
})


app.get('/', function *(next) {
  yield this.render('./index')
})

// app
//   .use(router.routes())
//   .use(router.allowedMethods());


http.createServer(app.callback()).listen(3000)
console.log('listen on 3000.')

