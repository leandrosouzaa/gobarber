import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
   provider_id: string;
   month: number;
   year: number;
   day: number;
}

type IResponse = Array<{
   hour: number;
   available: boolean;
}>;

@injectable()
class ListProviderAppointmentsService {
   constructor(
      @inject('AppointmentsRepository')
      private appointmentsRepository: IAppointmentsRepository,
   ) {}

   public async execute({
      provider_id,
      month,
      year,
      day,
   }: IRequest): Promise<Appointment[]> {
      const appointmenst = await this.appointmentsRepository.findAllInDayFromProvider(
         {
            provider_id,
            year,
            month,
            day,
         },
      );

      return appointmenst;
   }
}

export default ListProviderAppointmentsService;
