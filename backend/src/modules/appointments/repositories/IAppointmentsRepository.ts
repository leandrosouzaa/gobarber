import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

export default interface IAppointmentsReposotiry {
   findByDate(date: Date): Promise<Appointment | undefined>;
}
