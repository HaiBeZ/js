const Koa = require('koa');
const app = new Koa();

// 响应
app.use(ctx => {
  console.log("ctx",ctx.fresh);
  ctx.body = 'Hello Koa';
});

app.listen(3000);