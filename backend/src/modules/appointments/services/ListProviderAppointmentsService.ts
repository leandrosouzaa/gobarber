import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
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

      let appointmenst = await this.cacheProvider.recover<Appointment[]>(
         cacheKey,
      );

      if (!appointmenst) {
         appointmenst = await this.appointmentsRepository.findAllInDayFromProvider(
            {
               provider_id,
               year,
               month,
               day,
            },
         );

         console.log('A query foi executada');
         await this.cacheProvider.save(cacheKey, appointmenst);
      }

      return appointmenst;
   }
}

export default ListProviderAppointmentsService;
