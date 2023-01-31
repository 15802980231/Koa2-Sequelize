import Router from 'koa-router';
import type { Context } from 'koa';
import swaggerJSDoc from '../config/swaggerCfg';

const router = new Router();

router.get('/docs', (ctx: Context) => {
  ctx.body = swaggerJSDoc;
});

export default router;
