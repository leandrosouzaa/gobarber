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

injectable();
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
      const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
         {
            day,
            month,
            year,
            provider_id,
         },
      );

      console.log(provider_id, month, year, day);

      console.log(appointments);

      return appointments;
   }
}

export default ListProviderAppointmentsService;
