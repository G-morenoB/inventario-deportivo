import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  nombre: string;
  marca: string;
  tipo: string;
  color: string;
  precio: number;
  imagen: string;
  descripcion?: string;
}

const ProductSchema: Schema = new Schema({
  nombre:      { type: String, required: true },
  marca:       { type: String, required: true },
  tipo:        { type: String, required: true },
  color:       { type: String, required: true },
  precio:      { type: Number, required: true },
  imagen:      { type: String, required: true },
  descripcion: { type: String },
}, { timestamps: true });

ProductSchema.index({ nombre: 'text', marca: 'text', descripcion: 'text' });

export default mongoose.model<IProduct>('Product', ProductSchema);