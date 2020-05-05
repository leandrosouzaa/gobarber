import { Router } from 'express';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmensController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (req, res) => {
// const appointmentsRepository = new AppointmentsRepository();

//    const appointmentsRepository = getCustomRepository(AppontimentsRepository);
//    const appointments = await appointmentsRepository.find();

//    return res.json(appointments);
// });

appointmentsRouter.post('/', appointmensController.create);

export default appointmentsRouter;
