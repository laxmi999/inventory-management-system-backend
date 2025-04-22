import express from 'express';
import { authenticateJWT } from '../middlewares/auth';
import { getAllUsers } from '../controllers/userController';

const router = express.Router();

router.get('/all', authenticateJWT, getAllUsers);

export default router;
