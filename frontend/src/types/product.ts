export interface Product {
  _id: string;
  nombre: string;
  marca: string;
  tipo: string;
  color: string;
  precio: number;
  cantidad: number; 
  imagen: string;
  descripcion?: string;
  createdAt: string;
  updatedAt: string;
}