import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentsService;

describe('CreateAppointment', () => {
   beforeEach(() => {
      fakeAppointmentsRepository = new FakeAppointmentsRepository();
      createAppointment = new CreateAppointmentsService(
         fakeAppointmentsRepository,
      );
   });
   it('should be able to create a new appointment', async () => {
      const appointment = await createAppointment.execute({
         date: new Date(),
         provider_id: '123',
         user_id: '1234',
      });

      expect(appointment).toHaveProperty('id');
      expect(appointment.provider_id).toBe('123');
   });

   it('should not be able to create two appointments on the same time', async () => {
      const appointmentDate = new Date(2020, 4, 10, 11);

      await createAppointment.execute({
         date: appointmentDate,
         provider_id: '123',
         user_id: '1234',
      });

      await expect(
         createAppointment.execute({
            date: appointmentDate,
            provider_id: '123',
            user_id: '1234',
         }),
      ).rejects.toBeInstanceOf(AppError);
   });
});
