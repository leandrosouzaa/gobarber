/* eslint-disable @typescript-eslint/class-name-casing */
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

import authConfig from '@config/auth';

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
      throw new AppError('JWT Token is missing', 401);
   }

   const [, token] = authHeader.split(' ');

   try {
      const decoded = verify(token, authConfig.jwt.secret);

      const { sub } = decoded as tokenPayload;

      req.user = {
         id: sub,
      };

      return next();
   } catch (err) {
      throw new AppError('Invalid JWT token', 401);
   }
}
