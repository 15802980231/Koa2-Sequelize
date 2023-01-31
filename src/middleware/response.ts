import type { Context, Next } from 'koa';
import { logger } from './logger';

// 这个middleware用于将ctx.result中的内容最终回传给客户端
// 回传的格式遵循这样的格式：{ code: 0, msg: any data: any }
export const responseHandler = async (ctx: Context, next: Next) => {
  await next();

  if (ctx.result !== undefined) {
    ctx.type = 'json';
    ctx.body = {
      code: 200,
      msg: ctx.msg || 'success',
      data: ctx.result
    };
  }
};

// 这个middleware处理在其它middleware中出现的异常
// 并将异常消息回传给客户端：{ code: '错误代码', msg: '错误信息' }
export const errorHandler = (ctx: Context, next: Next) => {
  return next().catch(err => {
    if (err.code === null) {
      logger.error(err.stack);
    }

    if (err.status === 401) {
      ctx.body = {
        code: err.status,
        data: null,
        msg: 'no authorization'
      };
    } else {
      ctx.body = {
        code: err.code || 500,
        data: null,
        msg: err.message.trim() || 'error'
      };
    }
    // 保证返回状态是 200, 这样前端不会抛出异常
    ctx.status = 200;
    return Promise.resolve();
  });
};
