import express from 'express';
import { userLogin } from '../controllers/authController';

const router = express.Router();

router.post('/login', userLogin);

export default router;
