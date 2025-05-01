'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPlus, FiSearch, FiHome, FiEye, FiEyeOff, FiEdit, FiMenu, FiX } from 'react-icons/fi';

export default function OwnerPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setShowFilters(false);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchOwnerProperties = async () => {
      try {
        const mockProperties = [
          {
            id: 1,
            title: 'Villa moderne à Dakar',
            address: 'Rue des Jardins, Almadies',
            type: 'maison',
            price: 75000000,
            published: true,
            image: '/villa.jpg'
          },
          {
            id: 2,
            title: 'Appartement à louer',
            address: 'Avenue Moussa Tavele, Dakar',
            type: 'appartement',
            price: 200000,
            published: false,
            image: '/appartement.jpg'
          },
          {
            id: 3,
            title: 'Terrain à vendre',
            address: 'Route de l\'aéroport, Dakar',
            type: 'terrain',
            price: 15000000,
            published: true,
            image: '/terrain.jpg'
          }
        ];
        setProperties(mockProperties);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchOwnerProperties();
  }, []);

  const togglePublishStatus = (propertyId) => {
    setProperties(properties.map(prop => 
      prop.id === propertyId ? { ...prop, published: !prop.published } : prop
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Mes biens immobiliers</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Gérez vos propriétés</p>
        </div>
        <Link 
          href="/dashboard/owner/properties/create" 
          className="flex items-center bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium w-full sm:w-auto justify-center"
        >
          <FiPlus className="mr-1 sm:mr-2" /> 
          <span>Ajouter un bien</span>
        </Link>
      </div>

      <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {isMobile && (
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-3 py-2 border border-gray-200 rounded-lg text-sm"
            >
              {showFilters ? <FiX className="mr-1" /> : <FiMenu className="mr-1" />}
              Filtres
            </button>
          )}
        </div>

        {showFilters && isMobile && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-2">
              <option>Tous types</option>
              <option>Maison</option>
              <option>Appartement</option>
            </select>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-2">
              <option>Tous statuts</option>
              <option>Publié</option>
              <option>Brouillon</option>
            </select>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bien</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Type</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties
              .filter(prop => prop.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(property => (
              <tr key={property.id} className="hover:bg-gray-50">
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                      {property.image ? (
                        <img src={property.image} alt={property.title} className="h-full w-full object-cover rounded-md" />
                      ) : (
                        <FiHome className="text-gray-500" />
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{property.title}</div>
                      <div className="text-xs text-gray-500 sm:hidden capitalize">{property.type}</div>
                      <div className="text-xs text-gray-500 truncate max-w-[150px] sm:max-w-none">{property.address}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                  <div className="text-sm text-gray-900 capitalize">{property.type}</div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {new Intl.NumberFormat('fr-FR').format(property.price)} FCFA
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    property.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {property.published ? 'Publié' : 'Brouillon'}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2 sm:space-x-3">
                    <button
                      onClick={() => togglePublishStatus(property.id)}
                      className="text-gray-600 hover:text-gray-900 p-1"
                      title={property.published ? 'Dépublier' : 'Publier'}
                    >
                      {property.published ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                    <Link
                      href={`/dashboard/owner/properties/edit/${property.id}`}
                      className="text-blue-600 hover:text-blue-900 p-1"
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

      {properties.length > 5 && (
        <div className="mt-4 flex justify-center sm:hidden">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm">
            Charger plus de biens
          </button>
        </div>
      )}
    </div>
  );
}