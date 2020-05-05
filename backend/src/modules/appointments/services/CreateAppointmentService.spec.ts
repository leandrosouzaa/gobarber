import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from './CreateAppointmentService';

describe('CreateAppointment', () => {
   it('should be able to create a new appointment', async () => {
      const fakeAppointmentsRepository = new FakeAppointmentsRepository();
      const createAppointment = new CreateAppointmentsService(
         fakeAppointmentsRepository,
      );

      const appointment = await createAppointment.execute({
         date: new Date(),
         provider_id: '123',
      });

      expect(appointment).toHaveProperty('id');
      expect(appointment.provider_id).toBe('123');
   });

   // it('should not be able to create two appointments on the same time', () => {
   //    expect(1 + 2).toBe(3);
   // });
});
