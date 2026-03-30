import type { Product } from '../types/product'
import { Pencil,Trash } from 'lucide-react'



interface ProductGridProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

function ProductGrid({ products, onEdit, onDelete }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ">
      {products.map((product) => (
    <div key={product._id} className="bg-white rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-xl">       
    <div className="overflow-hidden h-90 ">
          <img
            src={product.imagen}
            alt={product.nombre}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>          
        <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-base font-bold text-gray-900 leading-tight">{product.nombre}</h3>
              <span className="text-base font-bold text-green-600 whitespace-nowrap">${product.precio.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500 mb-3">{product.marca}</p>
            <div className="flex gap-2 mb-3">
              <span className="text-xs border border-gray-300 rounded-md px-2 py-1 text-black bg-gray-200">{product.tipo}</span>
              <span className="text-xs border border-gray-300 rounded-md px-2 py-1 text-black">{product.color}</span>
           </div>
           <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.descripcion}</p>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(product)}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm hover:bg-gray-50"
            >
              <Pencil color="#000000" /> Editar
            </button>
            <button
              onClick={() => onDelete(product._id)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#D4183D] hover:bg-red-600 text-white py-2 px-3 rounded-lg text-sm"
           >
             <Trash color="#ffffff" /> Eliminar
            </button>
         </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductGrid