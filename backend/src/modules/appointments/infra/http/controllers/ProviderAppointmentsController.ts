import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProvidersController {
   public async index(req: Request, res: Response): Promise<Response> {
      const provider_id = req.user.id;
      const { day, month, year } = req.query;

      const listProviderAppointments = container.resolve(
         ListProviderAppointmentsService,
      );

      const apppointments = await listProviderAppointments.execute({
         day: Number(day),
         month: Number(month),
         year: Number(year),
         provider_id,
      });

      return res.json(apppointments);
   }
}
