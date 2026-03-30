import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Stats from './components/Stats'
import SearchBar from './components/SearchBar'
import ProductGrid from './components/ProductGrid'
import ProductModal from './components/ProductModal'
import { getStats, getProducts, searchProducts, createProduct, updateProduct, deleteProduct } from './services/api'
import type { Product } from './types/product'

function App() {
  const [totalProductos, setTotalProductos] = useState(0)
  const [totalMarcas, setTotalMarcas] = useState(0)
  const [products, setProducts] = useState<Product[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productToEdit, setProductToEdit] = useState<Product | null>(null)
  const [filters, setFilters] = useState<{ tipo?: string; color?: string }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getStats(),
      getProducts()
    ]).then(([statsData, productsData]) => {
      setTotalProductos(statsData.totalProductos)
      setTotalMarcas(statsData.totalMarcas)
      setProducts(productsData)
      setLoading(false)
    })
  }, [])

  const handleAddProduct = () => {
    setProductToEdit(null)
    setIsModalOpen(true)
  }

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      getProducts().then(setProducts)
    } else {
      searchProducts(query).then(setProducts)
    }
  }

  const handleFilter = (newFilter: { tipo?: string; color?: string }) => {
    const updatedFilters = { ...filters, ...newFilter }
    setFilters(updatedFilters)
    getProducts(updatedFilters).then(setProducts)
  }

  const handleEdit = (product: Product) => {
    setIsModalOpen(true)
    setProductToEdit(product)
  }

  const handleDelete = async (id: string) => {
    await deleteProduct(id)
    getProducts().then(setProducts)
    getStats().then(data => {
      setTotalProductos(data.totalProductos)
      setTotalMarcas(data.totalMarcas)
    })
  }

  const handleSave = async (formData: FormData) => {
    if (productToEdit === null) {
      await createProduct(formData)
    } else {
      await updateProduct(productToEdit._id, formData)
    }
    setIsModalOpen(false)
    setProductToEdit(null)
    getProducts().then(setProducts)
    getStats().then(data => {
      setTotalProductos(data.totalProductos)
      setTotalMarcas(data.totalMarcas)
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF5EE] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Cargando Zona Basquet...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFF5EE]">
      <Navbar onAddProduct={handleAddProduct} />
      <Stats totalProductos={totalProductos} totalMarcas={totalMarcas} />
      <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
      <ProductGrid products={products} onEdit={handleEdit} onDelete={handleDelete} />
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        product={productToEdit ?? undefined}
      />
    </div>
  )
}

export default App