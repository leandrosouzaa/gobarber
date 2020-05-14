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
      const cacheData = await this.cacheProvider.recover('asd');

      console.log(cacheData);

      const appointmenst = await this.appointmentsRepository.findAllInDayFromProvider(
         {
            provider_id,
            year,
            month,
            day,
         },
      );

      await this.cacheProvider.save('asd', 'asd');
      return appointmenst;
   }
}

export default ListProviderAppointmentsService;
