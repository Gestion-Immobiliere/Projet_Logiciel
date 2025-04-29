'use client';
import { Heart, HeartOff, MapPin, Star, Bed, Bath, Ruler, SlidersHorizontal, Search } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function FavoritesPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const favorites = [
    {
      id: 1,
      title: "Appartement lumineux avec terrasse",
      address: "12 Rue de la Paix, 75002 Paris",
      price: 750,
      image: "/properties/apt1.jpg",
      type: "Appartement",
      rooms: 2,
      baths: 1,
      size: 45,
      rating: 4.5,
      isFavorite: true
    },
    {
      id: 2,
      title: "Studio moderne près du métro",
      address: "34 Avenue des Champs, 75008 Paris",
      price: 550,
      image: "/properties/studio2.jpg",
      type: "Studio",
      rooms: 1,
      baths: 1,
      size: 28,
      rating: 4.2,
      isFavorite: true
    },
    {
      id: 3,
      title: "Maison de ville avec jardin",
      address: "7 Rue du Commerce, 92100 Boulogne",
      price: 1200,
      image: "/properties/house3.jpg",
      type: "Maison",
      rooms: 3,
      baths: 2,
      size: 85,
      rating: 4.8,
      isFavorite: true
    },
  ];

  const filteredFavorites = favorites.filter(fav => {
    const matchesSearch = fav.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         fav.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || fav.type.toLowerCase() === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const toggleFavorite = (id) => {
    console.log(`Toggle favorite ${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Vos Favoris</h1>
        <p className="text-gray-600 mt-2">Liste des propriétés que vous avez ajoutées en favoris</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={18} />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Rechercher dans vos favoris..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <SlidersHorizontal className="mr-2" size={16} />
              Filtres
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${activeFilter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
        >
          Tous
        </button>
        <button
          onClick={() => setActiveFilter('appartement')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${activeFilter === 'appartement' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
        >
          Appartements
        </button>
        <button
          onClick={() => setActiveFilter('maison')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${activeFilter === 'maison' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
        >
          Maisons
        </button>
        <button
          onClick={() => setActiveFilter('studio')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${activeFilter === 'studio' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
        >
          Studios
        </button>
      </div>

      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  {property.isFavorite ? (
                    <Heart className="text-red-500 fill-current" size={20} />
                  ) : (
                    <HeartOff className="text-gray-400" size={20} />
                  )}
                </button>
                <div className="absolute bottom-3 left-3 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                  {property.type}
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{property.title}</h3>
                  <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
                    <Star className="text-yellow-400 fill-current mr-1" size={16} />
                    <span className="text-sm font-medium">{property.rating}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapPin className="mr-1" size={14} />
                  <span>{property.address}</span>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-gray-900">{property.price} €<span className="text-gray-500 text-sm font-normal">/mois</span></span>
                  <Link 
                    href={`/properties/${property.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Voir détails
                  </Link>
                </div>

                <div className="border-t border-gray-200 pt-3 flex justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Bed className="mr-1" size={16} />
                    <span>{property.rooms} ch.</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="mr-1" size={16} />
                    <span>{property.baths} sdb</span>
                  </div>
                  <div className="flex items-center">
                    <Ruler className="mr-1" size={16} />
                    <span>{property.size} m²</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <HeartOff className="mx-auto text-gray-400" size={48} />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {searchTerm || activeFilter !== 'all' ? "Aucun favori ne correspond à vos critères" : "Vous n'avez aucun favori"}
          </h3>
          <p className="mt-2 text-gray-500">
            {searchTerm || activeFilter !== 'all' 
              ? "Essayez de modifier vos filtres de recherche" 
              : "Commencez à explorer les propriétés et ajoutez vos favoris"}
          </p>
          {(!searchTerm && activeFilter === 'all') && (
            <Link
              href="/properties"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Parcourir les propriétés
            </Link>
          )}
        </div>
      )}
    </div>
  );
}