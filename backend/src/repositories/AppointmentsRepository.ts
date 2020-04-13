import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
   provider: string;
   date: Date;
}

class AppointmentsRepository {
   private appointments: Appointment[];

   constructor() {
      this.appointments = [];
   }

   public all(): Appointment[] {
      return this.appointments;
   }

   public findByDate(date: Date): Appointment | null {
      const findAppointment = this.appointments.find(a =>
         isEqual(date, a.date),
      );

      return findAppointment || null;
   }

   public create({ provider, date }: CreateAppointmentDTO): Appointment {
      const appointment = new Appointment({ provider, date });

      this.appointments.push(appointment);

      return appointment;
   }
}

export default AppointmentsRepository;
