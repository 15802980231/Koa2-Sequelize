import Router from 'koa-router';
import MenuController from '../controller/menu';

const router = new Router({ prefix: '/menu' });

router.get('/list', MenuController.menuList);

export default router;
