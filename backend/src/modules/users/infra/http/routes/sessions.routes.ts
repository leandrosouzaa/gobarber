import { Router } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
   const usersRepository = new UsersRepository();

   const { email, password } = req.body;
   const authenticateUser = new AuthenticateUserService(usersRepository);

   const { user, token } = await authenticateUser.execute({
      email,
      password,
   });
   delete user.password;

   return res.json({ user, token });
});

export default sessionsRouter;
