import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import { protect } from './middlewares/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/productos', productRoutes);

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.error('Error al conectar MongoDB:', err));

app.get('/', (req, res) => {
  res.json({ message: 'API Zona Basquet funcionando' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});