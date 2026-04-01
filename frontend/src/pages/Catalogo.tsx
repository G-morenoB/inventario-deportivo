import { useState, useEffect } from 'react'
import { getProducts, searchProducts } from '../services/api'
import type { Product } from '../types/product'

const TIPOS = ['Todos los tipos', 'Tenis', 'Calcetas', 'Jersey', 'Short Licra', 'Accesorio', 'Playera Licra', 'Pulsera']
const COLORES = ['Todos los colores', 'Negro', 'Blanco', 'Rojo', 'Azul', 'Verde', 'Amarillo', 'Naranja']

function Catalogo() {
  const [products, setProducts] = useState<Product[]>([])
  const [filters, setFilters] = useState<{ tipo?: string; color?: string }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      getProducts(filters).then(setProducts)
    } else {
      searchProducts(query).then(setProducts)
    }
  }

  const handleFilter = (newFilter: { tipo?: string; color?: string }) => {
    const updatedFilters = { ...filters, ...newFilter }
    setFilters(updatedFilters)
    getProducts(updatedFilters).then(setProducts)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF5EE] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Cargando productos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFF5EE]">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
        <div className="bg-orange-500 p-2 rounded-lg">
          <span className="text-white text-xl">🏀</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Zona Basquet</h1>
          <p className="text-sm text-gray-500">Catálogo de productos</p>
        </div>
      </nav>

      <div className="mx-6 mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Buscar por nombre, marca o descripción..."
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-400"
          />
          <select
            onChange={(e) => handleFilter({ tipo: e.target.value === 'Todos los tipos' ? undefined : e.target.value })}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-400"
          >
            {TIPOS.map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
          <select
            onChange={(e) => handleFilter({ color: e.target.value === 'Todos los colores' ? undefined : e.target.value })}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-400"
          >
            {COLORES.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {products.map((product, index) => (
          <div
            key={product._id}
            className="card-animate bg-white rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-xl"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="overflow-hidden h-64">
              <img
                src={product.imagen}
                alt={product.nombre}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-base font-bold text-gray-900">{product.nombre}</h3>
                <span className="text-base font-bold text-green-600 whitespace-nowrap">${product.precio.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-500 mb-3">{product.marca}</p>
              <div className="flex gap-2 mb-3">
                <span className="text-xs border border-gray-300 rounded-md px-2 py-1 text-gray-600">{product.tipo}</span>
                <span className="text-xs border border-gray-300 rounded-md px-2 py-1 text-gray-600">{product.color}</span>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2">{product.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Catalogo