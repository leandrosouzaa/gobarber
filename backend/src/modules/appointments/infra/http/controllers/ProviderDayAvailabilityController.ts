import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderMonthAvailabilityController {
   public async index(req: Request, res: Response): Promise<Response> {
      const { provider_id } = req.params;

      const { month, year, day } = req.body;

      const listProviderDayAvailaibilty = container.resolve(
         ListProviderDayAvailabilityService,
      );

      const availability = await listProviderDayAvailaibilty.execute({
         provider_id,
         month,
         year,
         day,
      });

      return res.json(availability);
   }
}
