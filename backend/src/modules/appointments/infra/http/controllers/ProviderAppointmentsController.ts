import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProvidersController {
   public async index(req: Request, res: Response): Promise<Response> {
      const provider_id = req.user.id;
      const { day, month, year } = req.body;

      const listProviderAppointments = container.resolve(
         ListProviderAppointmentsService,
      );

      const appointments = await listProviderAppointments.execute({
         provider_id,
         day,
         month,
         year,
      });

      console.log(provider_id, day, month, year);
      console.log(appointments);

      return res.json(appointments);
   }
}
