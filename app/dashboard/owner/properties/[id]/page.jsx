'use client';
import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiArrowLeft, FiHome, FiMapPin, FiDollarSign, FiLayers } from 'react-icons/fi';
import { useRouter, useParams } from 'next/navigation';

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/owner/properties/${id}`);
        const data = await response.json();
        setProperty(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching property:', error);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleDelete = async () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) {
      try {
        const response = await fetch(`/api/owner/properties/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          router.push('/dashboard/owner/properties');
        }
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    }
  };

  if (loading) return <div className="text-center py-8">Chargement...</div>;
  if (!property) return <div className="text-center py-8">Bien introuvable</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push('/dashboard/owner/properties')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft className="mr-1" /> Retour
        </button>
        <div className="flex space-x-3">
          <button
            onClick={() => router.push(`/dashboard/owner/properties/edit/${id}`)}
            className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm"
          >
            <FiEdit className="mr-1" /> Modifier
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 text-sm"
          >
            <FiTrash2 className="mr-1" /> Supprimer
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{property.title}</h1>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className={`px-2 py-1 rounded-full text-xs ${
            property.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {property.published ? 'Publié' : 'Non publié'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <FiHome className="text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="capitalize">{property.type}</p>
              </div>
            </div>

            <div className="flex items-center">
              <FiDollarSign className="text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Prix</p>
                <p>{property.price} FCFA</p>
              </div>
            </div>

            <div className="flex items-center">
              <FiLayers className="text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Superficie</p>
                <p>{property.area} m²</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <FiMapPin className="text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Adresse</p>
                <p>{property.address}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="text-gray-400 mr-3 w-4 text-center">🛏️</div>
              <div>
                <p className="text-sm text-gray-500">Chambres</p>
                <p>{property.bedrooms}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="text-gray-400 mr-3 w-4 text-center">🚿</div>
              <div>
                <p className="text-sm text-gray-500">Salles de bain</p>
                <p>{property.bathrooms}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
        </div>
      </div>
    </div>
  );
}