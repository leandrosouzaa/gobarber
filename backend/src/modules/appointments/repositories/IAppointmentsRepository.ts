import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';

export default interface IAppointmentsReposotiry {
   create(data: ICreateAppointmentDTO): Promise<Appointment>;
   findByDate(
      date: Date,
      provider_id: string,
   ): Promise<Appointment | undefined>;
   findAllInMonthFromProvider(
      date: IFindAllInMonthFromProviderDTO,
   ): Promise<Appointment[]>;
   findAllInDayFromProvider(
      date: IFindAllInDayFromProviderDTO,
   ): Promise<Appointment[]>;
}
