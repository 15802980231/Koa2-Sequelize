import Router from 'koa-router';
import AuthController from '../controller/auth';

const router = new Router({ prefix: '/auth' });

router.get('/publicKey', AuthController.fetchGeneratekey);

router.post('/encrypt', AuthController.encrypt);

router.post('/login', AuthController.login);

export default router;
