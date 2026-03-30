import { useState, useEffect } from 'react'
import type { Product } from '../types/product'

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (formData: FormData) => void
  product?: Product
}

const TIPOS = ['Tenis', 'Calcetas', 'Jersey', 'Short Licra', 'Accesorio','Playera Licra', 'Pulsera']
const COLORES = ['Negro', 'Blanco', 'Rojo', 'Azul', 'Verde', 'Amarillo', 'Naranja']

function ProductModal({ isOpen, onClose, onSave, product }: ProductModalProps) {
  const [nombre, setNombre] = useState('')
  const [marca, setMarca] = useState('')
  const [tipo, setTipo] = useState(TIPOS[0])
  const [color, setColor] = useState(COLORES[0])
  const [precio, setPrecio] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [imagen, setImagen] = useState<File | null>(null)

  useEffect(() => {
    if (product) {
      setNombre(product.nombre)
      setMarca(product.marca)
      setTipo(product.tipo)
      setColor(product.color)
      setPrecio(product.precio.toString())
      setCantidad(product.cantidad.toString())
      setDescripcion(product.descripcion || '')
      setImagen(null)
    } else {
      setNombre('')
      setMarca('')
      setTipo(TIPOS[0])
      setColor(COLORES[0])
      setPrecio('')
      setCantidad('')
      setDescripcion('')
      setImagen(null)
    }
  }, [product, isOpen])

  const handleSubmit = () => {
    const formData = new FormData()
    formData.append('nombre', nombre)
    formData.append('marca', marca)
    formData.append('tipo', tipo)
    formData.append('color', color)
    formData.append('precio', precio)
    formData.append('cantidad', cantidad)
    formData.append('descripcion', descripcion)
    if (imagen) formData.append('imagen', imagen)
    onSave(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gray-900">
            {product ? 'Editar Producto' : 'Agregar Nuevo Producto'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>
        <p className="text-sm text-gray-500 mb-6">Completa los datos del nuevo producto</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Nombre del Producto *</label>
            <input
              type="text"
              placeholder="Ej: Air Jordan Retro"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Marca *</label>
            <input
              type="text"
              placeholder="Ej: Nike"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Tipo de Accesorio *</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-gray-400"
            >
              {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Color *</label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-gray-400"
            >
              {COLORES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Precio ($) *</label>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Cantidad *</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-gray-400"
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700">Imagen del Producto *</label>
            <label className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50">
              <span>↑</span>
              <span>{imagen ? imagen.name : 'Subir Imagen'}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImagen(e.target.files?.[0] || null)}
              />
            </label>
          </div>
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              placeholder="Describe las características del producto..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-gray-400 resize-none h-20"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            {product ? 'Guardar Cambios' : 'Agregar Producto'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductModal