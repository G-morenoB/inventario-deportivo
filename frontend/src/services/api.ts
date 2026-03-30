import type { Product } from '../types/product';

const BASE_URL = 'http://localhost:4000/api';

export const getProducts = async (filters?: { tipo?: string; color?: string }): Promise<Product[]> => {
  const params = new URLSearchParams();
  if (filters?.tipo) params.append('tipo', filters.tipo);
  if (filters?.color) params.append('color', filters.color);

  const res = await fetch(`${BASE_URL}/productos?${params}`);
  return res.json();
};

export const searchProducts = async (q: string): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/productos/search?q=${q}`);
  return res.json();
};

export const getStats = async (): Promise<{ totalProductos: number; totalMarcas: number }> => {
  const res = await fetch(`${BASE_URL}/productos/stats`);
  return res.json();
};

export const createProduct = async (formData: FormData): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/productos`, {
    method: 'POST',
    body: formData,
  });
  return res.json();
};

export const updateProduct = async (id: string, formData: FormData): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/productos/${id}`, {
    method: 'PUT',
    body: formData,
  });
  return res.json();
};

export const deleteProduct = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/productos/${id}`, {
    method: 'DELETE',
  });
};