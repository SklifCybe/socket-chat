import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => {
  res.send('Server is up and running!');
});

export default router;
