import type { Product } from '../types/product';


const BASE_URL = import.meta.env.VITE_API_URL 
const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return { Authorization: `Bearer ${token}` }
}
export const getProducts = async (filters?: { tipo?: string; color?: string }): Promise<Product[]> => {
  const params = new URLSearchParams();
  if (filters?.tipo) params.append('tipo', filters.tipo);
  if (filters?.color) params.append('color', filters.color);

  const res = await fetch(`${BASE_URL}/productos?${params}`, {
    headers: getAuthHeader()
  });
  return res.json();
};

export const searchProducts = async (q: string): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/productos/search?q=${q}`, {
    headers: getAuthHeader()
  });
  return res.json();
};

export const getStats = async (): Promise<{ totalProductos: number; totalMarcas: number }> => {
  const res = await fetch(`${BASE_URL}/productos/stats`, {
    headers: getAuthHeader()
  });
  return res.json();
};

export const createProduct = async (formData: FormData): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/productos`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: formData,
  });
  return res.json();
};

export const updateProduct = async (id: string, formData: FormData): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/productos/${id}`, {
    method: 'PUT',
    headers: getAuthHeader(), 
    body: formData,
  });
  return res.json();
};

export const deleteProduct = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/productos/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  });
};