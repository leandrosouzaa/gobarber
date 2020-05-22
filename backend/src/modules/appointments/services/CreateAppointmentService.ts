import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import AppError from '@shared/errors/AppError';

interface IRequest {
   date: Date;
   provider_id: string;
   user_id: string;
}

@injectable()
class CreateAppointmentService {
   constructor(
      @inject('AppointmentsRepository')
      private appointmentsRepository: IAppointmentsRepository,

      @inject('NotificationsRepository')
      private notificationsRepository: INotificationsRepository,

      @inject('CacheProvider')
      private cacheProvider: ICacheProvider,
   ) {}

   public async execute({
      date,
      provider_id,
      user_id,
   }: IRequest): Promise<Appointment> {
      const appointmentDate = startOfHour(date);

      if (isBefore(appointmentDate, Date.now())) {
         throw new AppError(`You cant't create an appointment in a past date`);
      }

      if (user_id === provider_id) {
         throw new AppError(`You can't create an appointment with yourself`);
      }

      if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
         throw new AppError(
            `You can only create appointments between 8am and 5pm`,
         );
      }

      const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
         appointmentDate,
         provider_id,
      );

      if (findAppointmentInSameDate) {
         throw new AppError('This appointment is alread booked');
      }

      const appointment = await this.appointmentsRepository.create({
         provider_id,
         date: appointmentDate,
         user_id,
      });

      const dateFormated = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

      await this.notificationsRepository.create({
         recipient_id: provider_id,
         content: `Ǹovo agendamento para ${dateFormated}`,
      });

      await this.cacheProvider.invalidate(
         `provider-appointments:${provider_id}:${format(
            appointmentDate,
            'yyyy-M-d',
         )}`,
      );

      return appointment;
   }
}

export default CreateAppointmentService;
