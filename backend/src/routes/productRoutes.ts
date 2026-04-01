import { Router } from 'express';
import {
  getProducts,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getStats
} from '../controllers/productController';
import { upload } from '../middlewares/upload';
import { protect } from '../middlewares/auth';

const router = Router();

router.get('/stats', getStats);
router.get('/search', searchProducts);
router.get('/', getProducts);
router.post('/', protect, upload.single('imagen'), createProduct);
router.put('/:id', protect, upload.single('imagen'), updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;