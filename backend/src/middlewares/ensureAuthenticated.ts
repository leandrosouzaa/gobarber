import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface tokenPayload {
   iat: number;
   exp: number;
   sub: string;
}

export default function ensureAuthenticated(
   req: Request,
   res: Response,
   next: NextFunction,
): void {
   const authHeader = req.headers.authorization;

   if (!authHeader) {
      throw new Error('JWT Token is missing');
   }

   const [, token] = authHeader.split(' ');

   try {
      const decoded = verify(token, authConfig.jwt.secret);

      const { sub } = decoded as tokenPayload;

      req.user = {
         id: sub,
      };

      console.log(decoded);
      return next();
   } catch (err) {
      throw new Error('Invalid JWT token');
   }
}
