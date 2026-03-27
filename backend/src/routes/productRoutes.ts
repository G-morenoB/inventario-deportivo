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

const router = Router();

router.get('/stats', getStats);
router.get('/search', searchProducts);
router.get('/', getProducts);
router.post('/', upload.single('imagen'), createProduct);
router.put('/:id', upload.single('imagen'), updateProduct);
router.delete('/:id', deleteProduct);

export default router;