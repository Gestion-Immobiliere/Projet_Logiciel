export default function PropertiesTable() {
    const properties = [
      { id: 1, address: 'Mermoz', owner: 'Lamine Ba', status: 'actif' },
      { id: 2, address: 'Dakar', owner: 'Mamadou Balde', status: 'inactif' }
    ];
  
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Adresse</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Propriétaire</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(property => (
              <tr key={property.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{property.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{property.owner}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      property.status === 'actif'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-500 text-red-800'
                    }`}
                  >
                    {property.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }