import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Stats from './components/Stats'
import SearchBar from './components/SearchBar'
import ProductGrid from './components/ProductGrid'
import { getStats, getProducts, searchProducts,createProduct,updateProduct,deleteProduct } from './services/api'
import type { Product } from './types/product'
import ProductModal from './components/ProductModal'

function App() {
  const [totalProductos, setTotalProductos] = useState(0)
  const [totalMarcas, setTotalMarcas] = useState(0)
  const [products, setProducts] = useState<Product[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productToEdit, setProductToEdit] = useState<Product | null>(null)
  const [filters, setFilters] = useState<{ tipo?: string; color?: string }>({})

  useEffect(() => {
    getStats().then(data => {
      setTotalProductos(data.totalProductos)
      setTotalMarcas(data.totalMarcas)
    })
    getProducts().then(setProducts)
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
    setIsModalOpen(true);
    setProductToEdit(product);
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