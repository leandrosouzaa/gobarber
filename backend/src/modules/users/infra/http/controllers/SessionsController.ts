import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsControllers {
   public async index(req: Request, res: Response): Promise<Response> {
      return res.status(204).json();
   }

   public async create(req: Request, res: Response): Promise<Response> {
      const { email, password } = req.body;
      const authenticateUser = container.resolve(AuthenticateUserService);

      const { user, token } = await authenticateUser.execute({
         email,
         password,
      });

      return res.json({ user: classToClass(user), token });
   }
}
