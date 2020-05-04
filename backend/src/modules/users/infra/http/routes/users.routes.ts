import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
   const { name, email, password } = req.body;

   const createUser = new CreateUserService();

   const user = await createUser.execute({ name, email, password });
   delete user.password;

   return res.json(user);
});

usersRouter.patch(
   '/avatar',
   ensureAuthenticated,
   upload.single('avatar'),
   async (req, res) => {
      const updateUserAvatarService = new UpdateUserAvatarService();

      const user = await updateUserAvatarService.execute({
         user_id: req.user.id,
         avatarFilename: req.file.filename,
      });
      delete user.password;

      return res.json(user);
   },
);

export default usersRouter;
