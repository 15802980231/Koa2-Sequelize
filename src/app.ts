import Koa from 'koa';
import BodyParser from 'koa-bodyparser';
import { koaSwagger } from 'koa2-swagger-ui';
import Cors from 'koa2-cors';
import koaJwt from 'koa-jwt';
import { IP, JwtSecret, PORT } from './config/constant';
import User from './router/user';
import Swagger from './router/swagger';
import Role from './router/role';
import Menu from './router/menu';
import Auth from './router/auth';
import sequelize from './config/sequelizeBase';
import { loggerMiddleware } from './middleware/logger';
import { corsHandler } from './middleware/cors';
import { errorHandler, responseHandler } from './middleware/response';

const app = new Koa();

// 日志中间件
app.use(loggerMiddleware);

// 响应中间件
app.use(responseHandler);

// Error Handler
app.use(errorHandler);

// Ctx.body
app.use(BodyParser());

// koa-jwt
app.use(
  koaJwt({ secret: JwtSecret }).unless({
    path: [/^\/auth/]
  })
);

// cors
app.use(Cors(corsHandler));

// Swagger
app.use(
  koaSwagger({
    routePrefix: '/swagger',
    swaggerOptions: {
      url: '/docs'
    }
  })
);

// router
app.use(User.routes()).use(User.allowedMethods());
app.use(Swagger.routes()).use(Swagger.allowedMethods());
app.use(Auth.routes()).use(Auth.allowedMethods());
app.use(Role.routes()).use(Role.allowedMethods());
app.use(Menu.routes()).use(Menu.allowedMethods());

// 服务器启动
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('数据库连接建立成功.');
  } catch (error) {
    console.error('无法连接到数据库:', error);
  }
  console.log(`Service running at: http://${IP}:${PORT}`);
});
