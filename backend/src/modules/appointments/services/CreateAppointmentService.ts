import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';

interface Request {
   date: Date;
   provider_id: string;
}

class CreateAppointmentService {
   public async execute({ date, provider_id }: Request): Promise<Appointment> {
      const appointmentsRepository = getCustomRepository(
         AppointmentsRepository,
      );

      const appointmentDate = startOfHour(date);

      const findAppointmentInSameDate = await appointmentsRepository.findByDate(
         appointmentDate,
      );

      if (findAppointmentInSameDate) {
         throw new AppError('This appointment is alread booked');
      }

      const appointment = await appointmentsRepository.create({
         provider_id,
         date: appointmentDate,
      });

      return appointment;
   }
}

export default CreateAppointmentService;
