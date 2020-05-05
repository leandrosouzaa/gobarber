import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersControllers = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersControllers.create);

usersRouter.patch(
   '/avatar',
   ensureAuthenticated,
   upload.single('avatar'),
   userAvatarController.update,
);

export default usersRouter;
