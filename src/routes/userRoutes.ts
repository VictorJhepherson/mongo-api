import { Router } from 'express';

import { loginRequired } from '../middlewares/loginRequired';
import userController from '../controllers/userController';

const router = Router();

router.post('/', userController.createUser);
router.put('/', loginRequired, userController.updateUser);
router.get('/:id', loginRequired, userController.getUser);
router.post('/login', userController.loginUser);

export default router;
