import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppontimentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppontimentsRepository();

appointmentsRouter.get('/', (req, res) => {
   const appointments = appointmentsRepository.all();

   return res.json(appointments);
});

appointmentsRouter.post('/', (req, res) => {
   const { provider, date } = req.body;

   const parsedDate = startOfHour(parseISO(date));

   const findAppointmentInSameDate = appointmentsRepository.findByDate(
      parsedDate,
   );

   if (findAppointmentInSameDate) {
      return res
         .status(400)
         .json({ message: 'This appointment is already booked' });
   }

   const appointment = appointmentsRepository.create({
      provider,
      date: parsedDate,
   });

   return res.json(appointment);
});

export default appointmentsRouter;
