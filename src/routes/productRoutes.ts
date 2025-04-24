import express from 'express';
import { authenticateJWT } from '../middlewares/auth';
import { addNewProduct } from '../controllers/productController';
import { upload } from '../middlewares/imageUpload';

const router = express.Router();

router.post('/new', authenticateJWT, upload.single('image'), addNewProduct);

export default router;
