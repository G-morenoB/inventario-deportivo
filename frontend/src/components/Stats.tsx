interface StatsProps {
  totalProductos: number;
  totalMarcas: number;
}

function Stats({ totalProductos, totalMarcas }: StatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600 font-medium">Total Productos</p>
          <span className="text-blue-500 text-xl">📦</span>
        </div>
        <p className="text-4xl font-bold text-gray-900">{totalProductos}</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600 font-medium">Marcas</p>
          <span className="text-orange-500 text-xl">🛍️</span>
        </div>
        <p className="text-4xl font-bold text-gray-900">{totalMarcas}</p>
      </div>
    </div>
  )
}

export default Stats