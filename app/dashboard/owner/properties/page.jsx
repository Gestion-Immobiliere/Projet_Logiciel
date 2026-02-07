'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPlus, FiSearch, FiHome, FiEye, FiEyeOff, FiEdit, FiMenu, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function OwnerPropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  const [types, setTypes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  // Récupérer les types pour le filtre
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/meta/types', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) throw new Error('Erreur lors de la récupération des types');
        const data = await response.json();
        setTypes(data || []);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchTypes();
  }, []);

  // Récupérer les biens avec filtres et pagination
  useEffect(() => {
    const fetchOwnerProperties = async () => {
      setLoading(true);
      setError('');
      try {
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: '5',
          ...(searchTerm && { titre: searchTerm }),
          ...(filterType && { type: filterType }),
          ...(filterStatut && { statut: filterStatut })
        });

        const response = await fetch(`http://localhost:4000/api/biens/filtre?${queryParams}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erreur lors de la récupération des biens');
        }

        const { data, totalPages } = await response.json();
        setProperties(data || []);
        setTotalPages(totalPages || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerProperties();
  }, [page, searchTerm, filterType, filterStatut]);

  // Bascule du statut (publier/dépublier)
  const togglePublishStatus = async (propertyId) => {
    try {
      const property = properties.find(prop => prop._id === propertyId);
      if (!property) return;

      const newStatut = property.statut === 'disponible' ? 'réservé' : 'disponible';
      const response = await fetch(`http://localhost:4000/api/biens/${propertyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ statut: newStatut })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la mise à jour du statut');
      }

      setProperties(properties.map(prop =>
        prop._id === propertyId ? { ...prop, statut: newStatut } : prop
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
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

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher par titre..."
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

        {(showFilters || !isMobile) && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            <select 
              className="text-sm border border-gray-200 rounded-lg px-3 py-2"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">Tous types</option>
              {types.map(type => (
                <option key={type._id} value={type._id}>{type.nom}</option>
              ))}
            </select>
            <select 
              className="text-sm border border-gray-200 rounded-lg px-3 py-2"
              value={filterStatut}
              onChange={(e) => setFilterStatut(e.target.value)}
            >
              <option value="">Tous statuts</option>
              <option value="disponible">Disponible</option>
              <option value="réservé">Réservé</option>
              <option value="vendu">Vendu</option>
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
              <th className="px-4 sm:px-6 py-3 text-left text-xs fontUt-1 uppercase tracking-wider">Statut</th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-4 sm:px-6 py-4 text-center text-sm text-gray-500">
                  Chargement des biens...
                </td>
              </tr>
            ) : properties.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 sm:px-6 py-4 text-center text-sm text-gray-500">
                  Aucun bien trouvé
                </td>
              </tr>
            ) : (
              properties.map(property => (
                <tr key={property._id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                        {property.images && property.images[0] ? (
                          <img src={property.images[0]} alt={property.titre} className="h-full w-full object-cover rounded-md" />
                        ) : (
                          <FiHome className="text-gray-500" />
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{property.titre}</div>
                        <div className="text-xs text-gray-500 sm:hidden capitalize">{property.type?.nom}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[150px] sm:max-w-none">{property.localisation?.ville}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <div className="text-sm text-gray-900 capitalize">{property.type?.nom}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {new Intl.NumberFormat('fr-FR').format(property.prix)} FCFA
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      property.statut === 'disponible' ? 'bg-green-100 text-green-800' :
                      property.statut === 'réservé' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {property.statut.charAt(0).toUpperCase() + property.statut.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2 sm:space-x-3">
                      <button
                        onClick={() => togglePublishStatus(property._id)}
                        className="text-gray-600 hover:text-gray-900 p-1"
                        title={property.statut === 'disponible' ? 'Dépublier' : 'Publier'}
                      >
                        {property.statut === 'disponible' ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </button>
                      <Link
                        href={`/dashboard/owner/properties/edit/${property._id}`}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Modifier"
                      >
                        <FiEdit size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={page >= totalPages || loading}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-50"
          >
            {loading ? 'Chargement...' : 'Charger plus de biens'}
          </button>
        </div>
      )}
    </div>
  );
}