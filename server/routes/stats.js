import express from 'express';
import {
  top3Days,
  monthlyChange,
  predictedNextMonth,
} from '../controllers/statsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/top-days', top3Days);
router.get('/monthly-change', monthlyChange);
router.get('/predicted', predictedNextMonth);


export default router;
