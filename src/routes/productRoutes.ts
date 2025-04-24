import express from 'express';
import { authenticateJWT } from '../middlewares/auth';
import {
  getAllProducts,
  addNewProduct,
  updateProduct,
} from '../controllers/productController';
import { upload } from '../middlewares/imageUpload';

const router = express.Router();

router.get('/all', authenticateJWT, getAllProducts);
router.post('/new', authenticateJWT, upload.single('image'), addNewProduct);
router.put(
  '/update/:id',
  authenticateJWT,
  upload.single('image'),
  updateProduct
);

export default router;
