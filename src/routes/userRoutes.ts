import express from 'express';
import { authenticateJWT } from '../middlewares/auth';
import { registerUser, getAllUsers } from '../controllers/userController';

const router = express.Router();

router.get('/all', authenticateJWT, getAllUsers);
router.post('/register', registerUser);

export default router;
