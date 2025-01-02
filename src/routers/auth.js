import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { authRegisterSchema, authLoginSchema } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as authController from '../controllers/auth.js';

const authRouter = Router();
authRouter.post(
  '/register',
  validateBody(authRegisterSchema),
  ctrlWrapper(authController.registerController),
);

authRouter.post(
  '/login',
  validateBody(authLoginSchema),
  ctrlWrapper(authController.loginController),
);

authRouter.post('/refresh', ctrlWrapper(authController.refreshController));

authRouter.post('/logout', ctrlWrapper(authController.logoutController));

export default authRouter;
