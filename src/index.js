require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const api = require('./api');
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const { jwtMiddleware } = require('lib/token');

// mongoose 연결
// node의 네이티브 Promise 사용
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
  // mongoose 5부터는 자체 내장됨.
  // useMongoClient: true
}).then(
    (res) => {
      console.log('Successfully connected mongodb');
    }
).catch(e => {
  console.error(e);
});

// router.get('/', (ctx,next) => {
//   ctx.body = '홈';
// });

// 라우터 적용보다 우선 되야함.
app.use(bodyParser());

app.use(jwtMiddleware);

// api 라우트를 /api 경로 하위 라우트로 설정
router.use('/api', api.routes());

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log('Koa server is  listening to port 4000');
});