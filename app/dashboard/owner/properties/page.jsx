'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPlus, FiSearch, FiHome, FiEye, FiEyeOff, FiEdit } from 'react-icons/fi';

export default function OwnerPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOwnerProperties = async () => {
      try {
        const mockProperties = [
          {
            id: 1,
            title: 'Villa moderne à Dakar',
            address: 'Rue des Jardins, Almadies, Dakar',
            type: 'maison',
            price: 75000000,
            published: true,
            image: '/villa.jpg'
          },
          {
            id: 2,
            title: 'Appartement 3 pièces Plateau',
            address: 'Avenue Jean-Paul II, Plateau, Dakar',
            type: 'appartement',
            price: 45000000,
            published: false,
            image: '/appartement.jpg'
          },
          {
            id: 3,
            title: 'Terrain constructeur ',
            address: 'Zone AD, Dakar',
            type: 'terrain',
            price: 25000000,
            published: true,
            image: '/terrain.jpg'
          },
          {
            id: 4,
            title: 'Studio meublé à Yoff',
            address: 'Rue du Commerce, Yoff',
            type: 'studio',
            price: 18000000,
            published: true,
            image: '/studio.jpg'
          },
          {
            id: 5,
            title: 'Maison traditionnelle à Yoff',
            address: 'Quartier Résidentiel, Yoff',
            type: 'maison',
            price: 35000000,
            published: false,
            image: '/maison.jpg'
          }
        ];
        setProperties(mockProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchOwnerProperties();
  }, []);

  const togglePublishStatus = async (propertyId) => {
    try {
      setProperties(properties.map(prop => 
        prop.id === propertyId ? { ...prop, published: !prop.published } : prop
      ));
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mes biens immobiliers</h1>
          <p className="text-sm text-gray-500 mt-1">Gérez vos propriétés publiées</p>
        </div>
        <Link 
          href="/dashboard/owner/properties/create" 
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <FiPlus className="mr-2" /> Ajouter un bien
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher parmi mes biens..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bien</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties
              .filter(prop => prop.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(property => (
              <tr key={property.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                      {property.image ? (
                        <img src={property.image} alt={property.title} className="h-full w-full object-cover rounded-md" />
                      ) : (
                        <FiHome className="text-gray-500" />
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{property.title}</div>
                      <div className="text-sm text-gray-500">{property.address}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 capitalize">{property.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-medium">
                    {new Intl.NumberFormat('fr-FR').format(property.price)} FCFA
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    property.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {property.published ? 'Publié' : 'Brouillon'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => togglePublishStatus(property.id)}
                      className="text-gray-600 hover:text-gray-900"
                      title={property.published ? 'Dépublier' : 'Publier'}
                    >
                      {property.published ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                    <Link
                      href={`/dashboard/owner/properties/edit/${property.id}`}
                      className="text-blue-600 hover:text-blue-900"
                      title="Modifier"
                    >
                      <FiEdit size={18} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}