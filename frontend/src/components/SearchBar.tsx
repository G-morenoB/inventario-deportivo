interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter: (filters: { tipo?: string; color?: string }) => void;
}

const TIPOS = ['Todos los tipos', 'Tenis', 'Calcetas', 'Jersey', 'Short Licra', 'Accesorio','Playera Licra', 'Pulsera']
const COLORES = ['Todos los colores', 'Negro', 'Blanco', 'Rojo', 'Azul', 'Verde', 'Amarillo', 'Naranja']

function SearchBar({ onSearch, onFilter }: SearchBarProps) {
  return (
    <div className="mx-6 bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        🔍 Buscar Productos
      </h2>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Buscar por nombre, marca o descripción..."
          onChange={(e) => onSearch(e.target.value)}
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-400"
        />
        <select
          onChange={(e) => onFilter({ tipo: e.target.value === 'Todos los tipos' ? undefined : e.target.value })}
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-400"
        >
          {TIPOS.map(tipo => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>
        <select
          onChange={(e) => onFilter({ color: e.target.value === 'Todos los colores' ? undefined : e.target.value })}
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-400"
        >
          {COLORES.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default SearchBar