import Router from 'koa-router';
import UserController from '../controller/user';

const router = new Router({ prefix: '/v1/user' });

/**
 * @swagger
 * definitions:
 *   Success:
 *     properties:
 *       code:
 *         type: integer
 *         title: 成功的状态码
 *       msg:
 *         type: string
 *         title: 提示语
 */
router.post('/add/user', UserController.addUser);

router.delete('/delete/user', UserController.deleteUser);

router.get('/info', UserController.getUserInfo);

router.post('/allocationRole', UserController.allocationRole);

export default router;
