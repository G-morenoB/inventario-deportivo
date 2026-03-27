import { Request, Response } from 'express';
import Product from '../models/Product';
import { uploadToCloudinary } from '../middlewares/cloudinary';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { tipo, color } = req.query;
    const filtros: any = {};

    if (tipo) filtros.tipo = tipo;
    if (color) filtros.color = color;

    const products = await Product.find(filtros).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    const products = await Product.find({
      $text: { $search: q as string }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar productos' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    let imagenUrl = '';

    if (req.file) {
      imagenUrl = await uploadToCloudinary(req.file.buffer);
    }

    const product = new Product({
      ...req.body,
      imagen: imagenUrl,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear producto', error: String(error) });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    let updateData = { ...req.body };

    if (req.file) {
      updateData.imagen = await uploadToCloudinary(req.file.buffer);
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error al editar producto' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const totalProductos = await Product.countDocuments();
    const marcas = await Product.distinct('marca');
    res.json({ totalProductos, totalMarcas: marcas.length });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener stats' });
  }
};