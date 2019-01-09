// 引入路由

const koaRouter = require('koa-router');
const router = new koaRouter();

// 引入控制层User.js
const User = require('../db/user');

// 装载路由
router.get('/', async ctx => {
  let title = 'hello koa2';
  await ctx.render('index', {
    title
  })
})

// 获取get 登录界面渲染
router.get('/login', async ctx => {
  let title = "登录";
  await ctx.render('login', {
    title
  })
})

// 接收post登录请求处理
router.post('/login', async ctx => {
  // 拿到请求体参数
  const data = ctx.request.body;
  let queryres = await User.queryEmail(data.email);
  if (queryres) {
    if (queryres[0].password === data.password) {
      ctx.body = {
        code: 1,
        data: queryres[0],
        message: '登录成功'
      }
    } else {
      ctx.body = {
        code: 0,
        data: {},
        message: '登录失败'
      }
    }
  } else {
    ctx.body = {
      code: 0,
      data: {},
      message: '没有该用户，去注册吧...'
    }
  }
})

// 接收get请求渲染注册界面
router.get('/register', async ctx => {
  let title = "注册";
  await ctx.render('register', {
    title
  })
})
// 接收post注册请求
router.post('/register', async ctx => {
  const data = ctx.request.body;
  let queryres = await User.queryEmail(data.email);
  if (queryres) {
    ctx.body = {
      code: 0,
      data: {},
      message: '该邮箱已经存在...'
    }
  } else {
    await User.save(data);
    ctx.body = {
      code: 1,
      data: {},
      message: '注册成功'
    }
  }
})




router.get('/404', async ctx => {
  let title = "404";
  await ctx.render('err', {
    title
  })
})

module.exports = router;
