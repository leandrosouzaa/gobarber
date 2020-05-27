import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
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

      @inject('CacheProvider')
      private cacheProvider: ICacheProvider,
   ) {}

   public async execute({
      provider_id,
      month,
      year,
      day,
   }: IRequest): Promise<Appointment[]> {
      const cacheKey = `provider-appointments:${provider_id}:${year}-${month}${day}`;

      // let appointmenst = await this.cacheProvider.recover<Appointment[]>(
      //    cacheKey,
      // );

      let appointments;

      if (!appointments) {
         appointments = await this.appointmentsRepository.findAllInDayFromProvider(
            {
               provider_id,
               year,
               month,
               day,
            },
         );

         await this.cacheProvider.save(cacheKey, classToClass(appointments));
      }

      return appointments;
   }
}

export default ListProviderAppointmentsService;
