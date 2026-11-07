import { router } from './trpc.js';
import { authRouter } from './routers/auth.router.js';
import { doctorRouter } from './routers/doctor.router.js';
import { appointmentRouter } from './routers/appointment.router.js';
import { queueRouter } from './routers/queue.router.js';
import { hospitalRouter } from './routers/hospital.router.js';
import { aiRouter } from './routers/ai.router.js';
import { documentRouter } from './routers/document.router.js';
import { emergencyRouter } from './routers/emergency.router.js';
import { testPriceRouter } from './routers/testPrice.router.js';
import { telemedicineRouter } from './routers/telemedicine.router.js';

export const appRouter = router({
  auth: authRouter,
  doctor: doctorRouter,
  appointment: appointmentRouter,
  queue: queueRouter,
  hospital: hospitalRouter,
  ai: aiRouter,
  document: documentRouter,
  emergency: emergencyRouter,
  testPrice: testPriceRouter,
  telemedicine: telemedicineRouter
});

export type AppRouter = typeof appRouter;

