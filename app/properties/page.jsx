'use client';
import { Search, Filter, MapPin, ChevronDown, Star, Ruler, BedDouble, Bath, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('titre') || '');
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    prixMin: searchParams.get('prixMin') || '',
    prixMax: searchParams.get('prixMax') || '',
    nombreChambres: searchParams.get('nombreChambres') || '',
    localisation: searchParams.get('localisation') || ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [types, setTypes] = useState([]);
  const [localisations, setLocalisations] = useState([]);
  const [sort, setSort] = useState('relevance');
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  // Récupérer les types, localisations et favoris
  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const [typesRes, localisationsRes, favoritesRes] = await Promise.all([
          fetch('http://localhost:4000/api/meta/types'),
          fetch('http://localhost:4000/api/meta/localisations'),
          localStorage.getItem('token') ? fetch('http://localhost:4000/api/favourites', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }) : Promise.resolve(null)
        ]);
        
        if (typesRes.ok) {
          const typesData = await typesRes.json();
          setTypes(typesData || []);
        }
        if (localisationsRes.ok) {
          const localisationsData = await localisationsRes.json();
          setLocalisations(localisationsData || []);
        }
        if (favoritesRes && favoritesRes.ok) {
          const favoritesData = await favoritesRes.json();
          setFavorites(favoritesData.data.map(fav => fav.id));
        }
      } catch (err) {
        console.error('Erreur:', err);
        setError('Erreur lors de la récupération des métadonnées');
      }
    };
    fetchMetaData();
  }, []);

  // Récupérer les biens
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          titre: searchTerm,
          ...filters,
          sort
        }).toString();
        
        const response = await fetch(`http://localhost:4000/api/biens/filtre?${query}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erreur lors de la récupération des biens');
        }
        const { data } = await response.json();
        const mappedProperties = data.map(bien => ({
          id: bien._id,
          title: bien.titre,
          price: bien.prix,
          type: bien.type?.nom || 'Inconnu',
          location: bien.localisation?.ville || 'Inconnu',
          bedrooms: bien.nombreChambres,
          bathrooms: bien.nombreSallesBain,
          surface: bien.surface,
          images: bien.images || ['/placeholder.jpg'],
          premium: false,
          rating: 4.5
        }));
        setProperties(mappedProperties);
      } catch (error) {
        console.error('Erreur lors de la récupération des biens:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchTerm, filters, sort]);

  const clearFilters = () => {
    setFilters({
      type: '',
      prixMin: '',
      prixMax: '',
      nombreChambres: '',
      localisation: ''
    });
    setSearchTerm('');
    setSort('relevance');
  };

  const toggleFavorite = async (bienId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login?redirect=/properties');
      return;
    }

    try {
      const isFavorite = favorites.includes(bienId);
      const url = isFavorite
        ? `http://localhost:4000/api/favourites/remove/${bienId}`
        : 'http://localhost:4000/api/favourites/add';
      const method = isFavorite ? 'DELETE' : 'POST';
      const body = isFavorite ? null : JSON.stringify({ bien: bienId });

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la mise à jour des favoris');
      }

      setFavorites(prev => 
        isFavorite 
          ? prev.filter(id => id !== bienId)
          : [...prev, bienId]
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8d7364]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#5d4a3a] mb-4">Erreur</h2>
          <p className="text-[#7a6652] mb-6">{error}</p>
          <Link href="/" className="bg-[#8d7364] text-white px-6 py-2 rounded-lg">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f5f0]">
      {/* Hero Section */}
      <div className="relative bg-[#8d7364] text-white py-20">
        <div className="absolute inset-0 bg-[url('/dakar-pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Trouvez Votre Propriété Idéale à Dakar</h1>
          <p className="text-xl text-[#e8d5b5] max-w-2xl mx-auto">
            Découvrez notre sélection de biens immobiliers à Dakar
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#8d7364]" />
              </div>
              <input
                type="text"
                placeholder="Rechercher 'Almadies', 'Appartement', 'Villa'..."
                className="block w-full pl-10 pr-4 py-3 border border-[#e0d6cc] rounded-lg bg-white focus:ring-2 focus:ring-[#8d7364] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-6 py-3 border border-[#e0d6cc] rounded-lg bg-white hover:bg-[#f5efe6] transition-colors"
            >
              <Filter className="h-5 w-5 mr-2 text-[#8d7364]" />
              <span className="text-[#5d4a3a]">Filtres</span>
              <ChevronDown className={`h-5 w-5 ml-2 text-[#8d7364] transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showFilters && (
            <div className="bg-[#f5efe6] p-6 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#5d4a3a] mb-2">Type de bien</label>
                <select
                  className="block w-full px-3 py-2 border border-[#e0d6cc] rounded-lg bg-white"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                  <option value="">Tous types</option>
                  {types.map(type => (
                    <option key={type._id} value={type._id}>{type.nom}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#5d4a3a] mb-2">Localisation</label>
                <select
                  className="block w-full px-3 py-2 border border-[#e0d6cc] rounded-lg bg-white"
                  value={filters.localisation}
                  onChange={(e) => setFilters({...filters, localisation: e.target.value})}
                >
                  <option value="">Toutes localisations</option>
                  {localisations.map(loc => (
                    <option key={loc._id} value={loc._id}>{loc.ville}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#5d4a3a] mb-2">Prix minimum (FCFA)</label>
                <input
                  type="number"
                  className="block w-full px-3 py-2 border border-[#e0d6cc] rounded-lg bg-white"
                  value={filters.prixMin}
                  onChange={(e) => setFilters({...filters, prixMin: e.target.value})}
                  placeholder="Prix min"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#5d4a3a] mb-2">Prix maximum (FCFA)</label>
                <input
                  type="number"
                  className="block w-full px-3 py-2 border border-[#e0d6cc] rounded-lg bg-white"
                  value={filters.prixMax}
                  onChange={(e) => setFilters({...filters, prixMax: e.target.value})}
                  placeholder="Prix max"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#5d4a3a] mb-2">Chambres minimum</label>
                <select
                  className="block w-full px-3 py-2 border border-[#e0d6cc] rounded-lg bg-white"
                  value={filters.nombreChambres}
                  onChange={(e) => setFilters({...filters, nombreChambres: e.target.value})}
                >
                  <option value="">Toutes</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              <div className="md:col-span-4 flex justify-between">
                <button
                  onClick={clearFilters}
                  className="text-[#8d7364] hover:underline"
                >
                  Réinitialiser tous les filtres
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="bg-[#8d7364] text-white px-4 py-2 rounded-lg"
                >
                  Appliquer les filtres
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Properties Listing */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-[#5d4a3a]">
              {properties.length} {properties.length > 1 ? 'propriétés disponibles' : 'propriété disponible'}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-white rounded-lg border border-[#e0d6cc] overflow-hidden">
              <button 
                className={`px-4 py-2 ${viewMode === 'grid' ? 'bg-[#8d7364] text-white' : 'text-[#5d4a3a]'}`}
                onClick={() => setViewMode('grid')}
              >
                Grille
              </button>
              <button 
                className={`px-4 py-2 ${viewMode === 'list' ? 'bg-[#8d7364] text-white' : 'text-[#5d4a3a]'}`}
                onClick={() => setViewMode('list')}
              >
                Liste
              </button>
            </div>
            
            <select 
              className="border border-[#e0d6cc] rounded-lg px-4 py-2 bg-white text-[#5d4a3a] focus:ring-2 focus:ring-[#8d7364]"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="relevance">Trier par : Pertinence</option>
              <option value="prix_asc">Prix croissant</option>
              <option value="prix_desc">Prix décroissant</option>
            </select>
          </div>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="mx-auto w-24 h-24 bg-[#f5efe6] rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-12 w-12 text-[#8d7364]" />
            </div>
            <h3 className="text-xl font-medium text-[#5d4a3a] mb-2">Aucun résultat trouvé</h3>
            <p className="text-[#7a6652] max-w-md mx-auto">
              Essayez d'ajuster vos critères de recherche ou{' '}
              <button 
                className="text-[#8d7364] hover:underline"
                onClick={clearFilters}
              >
                réinitialiser les filtres
              </button>
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property}
                isFavorite={favorites.includes(property.id)}
                toggleFavorite={() => toggleFavorite(property.id)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {properties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property}
                isFavorite={favorites.includes(property.id)}
                toggleFavorite={() => toggleFavorite(property.id)}
                isListView={true}
              />
            ))}
          </div>
        )}

        {/* Neighborhood Guide */}
        <div className="mt-16 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-[#5d4a3a] mb-6">Guide des Quartiers de Dakar</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {localisations.map((loc) => (
                <button
                  key={loc._id} 
                  className="border border-[#e0d6cc] rounded-lg p-4 hover:bg-[#f5efe6] transition-colors text-left"
                  onClick={() => setFilters({...filters, localisation: loc._id})}
                >
                  <h4 className="font-medium text-[#5d4a3a]">{loc.ville}</h4>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PropertyCard({ property, isFavorite, toggleFavorite, isListView = false }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  if (isListView) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 h-64 relative">
            <Image 
              src={property.images[0]} 
              alt={property.title}
              fill
              className="object-cover"
            />
            {property.premium && (
              <div className="absolute top-4 left-4 bg-[#8d7364] text-white px-3 py-1 rounded-full text-xs font-bold">
                Premium
              </div>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite();
              }}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <Heart 
                className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-500'}`}
              />
            </button>
          </div>
          <div className="md:w-2/3 p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{property.title}</h3>
              <div className="flex items-center bg-primary-100 text-primary-600 px-2 py-1 rounded text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {property.location.split(',')[0]}
              </div>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(property.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{property.rating}</span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-4">
                <span className="flex items-center text-sm text-gray-600">
                  <BedDouble className="h-4 w-4 mr-1" /> {property.bedrooms}
                </span>
                <span className="flex items-center text-sm text-gray-600">
                  <Bath className="h-4 w-4 mr-1" /> {property.bathrooms}
                </span>
                <span className="flex items-center text-sm text-gray-600">
                  <Ruler className="h-4 w-4 mr-1" /> {property.surface}m²
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <span className="text-lg font-bold text-primary-600">
                {formatPrice(property.price)}
                <span className="text-sm font-normal text-gray-500">/mois</span>
              </span>
              <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                {property.type}
              </span>
            </div>

            <div className="mt-6">
              <Link 
                href={`/properties/${property.id}`}
                className="inline-block bg-[#8d7364] text-white px-6 py-2 rounded-lg hover:bg-[#6b594e] transition-colors"
              >
                Voir les détails
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white">
      <Link href={`/properties/${property.id}`} className="block">
        {property.premium && (
          <div className="absolute top-4 left-4 z-10 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            Premium
          </div>
        )}

        <div className="relative h-60 overflow-hidden">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{property.title}</h3>
            <div className="flex items-center bg-primary-100 text-primary-600 px-2 py-1 rounded text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              {property.location.split(',')[0]}
            </div>
          </div>

          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.floor(property.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">{property.rating}</span>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <span className="flex items-center text-sm text-gray-600">
                <BedDouble className="h-4 w-4 mr-1" /> {property.bedrooms}
              </span>
              <span className="flex items-center text-sm text-gray-600">
                <Bath className="h-4 w-4 mr-1" /> {property.bathrooms}
              </span>
              <span className="flex items-center text-sm text-gray-600">
                <Ruler className="h-4 w-4 mr-1" /> {property.surface}m²
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <span className="text-lg font-bold text-primary-600">
              {formatPrice(property.price)}
              <span className="text-sm font-normal text-gray-500">/mois</span>
            </span>
            <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              {property.type}
            </span>
          </div>
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite();
        }}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
      >
        <Heart 
          className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-500'}`}
        />
      </button>
    </div>
  );
}