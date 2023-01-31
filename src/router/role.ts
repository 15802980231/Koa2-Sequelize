import Router from 'koa-router';
import RoleController from '../controller/role';

const router = new Router({ prefix: '/role' });

router.post('/addRole', RoleController.addRole);

router.delete('/deleteRole', RoleController.deleteRole);

router.post('/updateRole', RoleController.updateRoleInfo);

export default router;
