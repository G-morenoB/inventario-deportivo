interface NavbarProps {
  onAddProduct: () => void;
}

function Navbar({ onAddProduct }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-orange-500 p-2 rounded-lg">
          <span className="text-white text-xl">🏀</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Zona Basquet</h1>
          <p className="text-sm text-gray-500">Panel de Administración</p>
        </div>
      </div>
      <button
        onClick={onAddProduct}
        className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors"
      >
        <span>+</span>
        Agregar Producto
      </button>
    </nav>
  )
}

export default Navbar