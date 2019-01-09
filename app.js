const path = require('path');
// 引入静态文件中间件
const koaStatic = require('koa-static');

// 引入模板引擎中间件
const koaViews = require('koa-views');

const Koa = require('Koa');
const app = new Koa();

// 加载解析请求体的post参数模块
const koaBodyparser = require('koa-bodyparser');
app.use(koaBodyparser());

// 引入日志模块log4js
const log4js = require('log4js');

// log4打印
const logger = log4js.getLogger('log_file');
logger.info("this is a log4js test app.js.....");

// 加载模板引擎
app.use(
  koaViews(
    // 第一个参数为模板文件的路径配置，第二个参数为模板引擎类型
    path.join(__dirname, './views'), {extension: 'ejs'}
  )
)

// 设置静态文件的路径
const staticPath = './public';
// 加载静态文件
app.use(koaStatic(
  path.join(__dirname, staticPath)
))

// 引入路由
const router = require('./router/index');

// 使用路由
app.use(router.routes(), router.allowedMethods());


// app.use(async (ctx) => {
//   ctx.body = 'hello ctx';
// })

// app.use(async ctx => {
//   let title = 'hello koa2';
//   await ctx.render('index', {
//     title,
//   })
// })


app.listen(3000);
console.log("Server at running port 3000");
