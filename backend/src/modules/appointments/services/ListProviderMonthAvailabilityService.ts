import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
   provider_id: string;
   month: number;
   year: number;
}

type IResponse = Array<{
   day: number;
   available: boolean;
}>;

@injectable()
class ListProviderAvailabilityService {
   constructor(
      @inject('AppointmentsRepository')
      private appointmentsRepository: IAppointmentsRepository,
   ) {}

   public async execute({
      provider_id,
      month,
      year,
   }: IRequest): Promise<IResponse> {
      const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
         {
            provider_id,
            year,
            month,
         },
      );

      console.log(appointments);

      return [{ day: 1, available: false }];
   }
}

export default ListProviderAvailabilityService;
