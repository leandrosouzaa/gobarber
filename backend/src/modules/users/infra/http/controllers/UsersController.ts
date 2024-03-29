import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UsersController {
   public async create(req: Request, res: Response): Promise<Response> {
      const { name, email, password } = req.body;

      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({ name, email, password });

      return res.json(classToClass(user));
   }

   public async updateAvatar(req: Request, res: Response): Promise<Response> {
      const updateUserAvatarService = container.resolve(
         UpdateUserAvatarService,
      );

      const user = await updateUserAvatarService.execute({
         user_id: req.user.id,
         avatarFilename: req.file.filename,
      });

      return res.json(classToClass(user));
   }
}
