import { hash, compare } from 'bcryptjs';

import IHashProvidder from '@modules/users/providers/HashProvider/models/IHashProvider';

export default class BCryptHashProvider implements IHashProvidder {
   public async generateHash(payload: string): Promise<string> {
      return hash(payload, 8);
   }

   public async compareHash(payload: string, hashed: string): Promise<boolean> {
      return compare(payload, hashed);
   }
}
