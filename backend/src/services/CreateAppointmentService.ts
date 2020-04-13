import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';

import AppointmentRepository from '../repositories/AppointmentsRepository';

interface Request {
   date: Date;
   provider: string;
}

class CreateAppointmentService {
   private appointmentsRepository: AppointmentRepository;

   constructor(appointmentRepository: AppointmentRepository) {
      this.appointmentsRepository = appointmentRepository;
   }

   public execute({ date, provider }: Request): Appointment {
      const appointmentDate = startOfHour(date);

      const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
         appointmentDate,
      );

      if (findAppointmentInSameDate) {
         throw Error('This appointment is alread booked');
      }

      const appointment = this.appointmentsRepository.create({
         provider,
         date: appointmentDate,
      });

      return appointment;
   }
}

export default CreateAppointmentService;
