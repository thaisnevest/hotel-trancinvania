import { Express, Router } from 'express';
import PromotionController from '../controllers/promotion.controller';
import EmailService from '../services/email.service';
import ReservationController from '../controllers/reservation.controller';
import PublishedReservationController from '../controllers/publishedReservation.controller';
// import { di } from '../di';
// import TestController from '../controllers/test.controller';
// import TestService from '../services/test.service';

// const router = Router();
// const prefix = '/api';

// export default (app: Express) => {
//   app.use(
//     prefix,
//     new TestController(router, di.getService(TestService)).router
//   );
// };

const router = Router();

const promotionController = new PromotionController();
const reservationController = new ReservationController();
const publishedReservationController = new PublishedReservationController();

router.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello World!' });
});


reservationController.setupRoutes(router);
promotionController.setupRoutes(router);
publishedReservationController.setupRoutes(router);

export default router;
