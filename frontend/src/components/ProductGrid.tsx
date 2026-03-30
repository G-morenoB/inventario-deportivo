import type { Product } from '../types/product'

interface ProductGridProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

function ProductGrid({ products, onEdit, onDelete }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div key={product._id} className="bg-white rounded-xl shadow-md overflow-hidden">
          <img src={product.imagen} alt={product.nombre} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">{product.nombre}</h3>
            <p className="text-gray-600">{product.marca}</p>
            <p className="text-xl font-bold text-blue-600">${product.precio.toFixed(2)}</p>
            <p className="text-gray-500">Cantidad: {product.cantidad}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => onEdit(product)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(product._id)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductGrid