import express from 'express';
import { authenticateJWT } from '../middlewares/auth';
import {
  allSuppliers,
  addNewSupplier,
  updateSupplier,
  deleteSupplier,
} from '../controllers/supplierController';

const router = express.Router();

router.get('/all', authenticateJWT, allSuppliers);
router.post('/new', authenticateJWT, addNewSupplier);
router.put('/update/:id', authenticateJWT, updateSupplier);
router.delete('/delete/:id', authenticateJWT, deleteSupplier);

export default router;
