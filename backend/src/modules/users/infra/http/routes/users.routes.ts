import { Router } from 'express';
import multer from 'multer';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
   const usersRepository = new UsersRepository();

   const { name, email, password } = req.body;

   const createUser = new CreateUserService(usersRepository);

   const user = await createUser.execute({ name, email, password });
   delete user.password;

   return res.json(user);
});

usersRouter.patch(
   '/avatar',
   ensureAuthenticated,
   upload.single('avatar'),
   async (req, res) => {
      const usersRepository = new UsersRepository();

      const updateUserAvatarService = new UpdateUserAvatarService(
         usersRepository,
      );

      const user = await updateUserAvatarService.execute({
         user_id: req.user.id,
         avatarFilename: req.file.filename,
      });
      delete user.password;

      return res.json(user);
   },
);

export default usersRouter;
