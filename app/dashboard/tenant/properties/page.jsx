'use client';
import PropertyCard from '@/components/PropertyCard';
import { Search, Filter, MapPin, ChevronDown, Star, Ruler, BedDouble, Bath, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    neighborhood: searchParams.get('neighborhood') || '',
    availability: searchParams.get('availability') || ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: searchParams.get('startDate') || null,
    endDate: searchParams.get('endDate') || null
  });

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const query = new URLSearchParams({
          q: searchTerm,
          ...filters,
          startDate: dateRange.startDate || '',
          endDate: dateRange.endDate || ''
        }).toString();
        
        const response = await fetch(`/api/properties?${query}`);
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchTerm, filters, dateRange]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setDateRange({ startDate: start, endDate: end });
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      neighborhood: '',
      availability: ''
    });
    setDateRange({ startDate: null, endDate: null });
    setSearchTerm('');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const neighborhoods = [
    { name: "Almadies", emoji: "🏝️" },
    { name: "Plateau", emoji: "🏙️" },
    { name: "Mermoz", emoji: "🌳" },
    { name: "Fann", emoji: "🏛️" },
    { name: "Ouakam", emoji: "🌊" },
    { name: "Ngor", emoji: "🏖️" },
    { name: "Yoff", emoji: "🐟" },
    { name: "Sicap", emoji: "🏘️" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8d7364]"></div>
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
            Réservez des logements uniques pour votre prochain séjour
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
                <label className="block text-sm font-medium text-[#5d4a3a] mb-2">Dates</label>
                <div className="flex items-center border border-[#e0d6cc] rounded-lg p-2 bg-white">
                  <Calendar className="h-5 w-5 text-[#8d7364] mr-2" />
                  <input
                    type="date"
                    placeholder="Arrivée"
                    className="flex-1 outline-none text-sm"
                    value={dateRange.startDate || ''}
                    onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                  />
                  <span className="mx-2">-</span>
                  <input
                    type="date"
                    placeholder="Départ"
                    className="flex-1 outline-none text-sm"
                    value={dateRange.endDate || ''}
                    onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                    min={dateRange.startDate}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5d4a3a] mb-2">Type de bien</label>
                <select
                  className="block w-full px-3 py-2 border border-[#e0d6cc] rounded-lg bg-white"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                  <option value="">Tous types</option>
                  <option value="Villa">Villa</option>
                  <option value="Appartement">Appartement</option>
                  <option value="Maison">Maison</option>
                  <option value="Studio">Studio</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#5d4a3a] mb-2">Quartier</label>
                <select
                  className="block w-full px-3 py-2 border border-[#e0d6cc] rounded-lg bg-white"
                  value={filters.neighborhood}
                  onChange={(e) => setFilters({...filters, neighborhood: e.target.value})}
                >
                  <option value="">Tous quartiers</option>
                  {neighborhoods.map((area) => (
                    <option key={area.name} value={area.name}>
                      {area.emoji} {area.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#5d4a3a] mb-2">Chambres min</label>
                <select
                  className="block w-full px-3 py-2 border border-[#e0d6cc] rounded-lg bg-white"
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
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
            <p className="text-[#7a6652]">
              {dateRange.startDate && dateRange.endDate ? 
                `Du ${new Date(dateRange.startDate).toLocaleDateString()} au ${new Date(dateRange.endDate).toLocaleDateString()}` : 
                'Dates flexibles disponibles'}
            </p>
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
              onChange={(e) => {
                // Implement sorting logic
              }}
            >
              <option value="relevance">Trier par : Pertinence</option>
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix décroissant</option>
              <option value="rating">Meilleures notes</option>
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
                formatPrice={formatPrice}
                dateRange={dateRange}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {properties.map((property) => (
              <div key={property.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-64 relative">
                    <img 
                      src={property.images[0]} 
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    {property.premium && (
                      <div className="absolute top-4 left-4 bg-[#8d7364] text-white px-3 py-1 rounded-full text-xs font-bold">
                        Premium
                      </div>
                    )}
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-[#5d4a3a]">{property.title}</h3>
                        <p className="text-[#7a6652] flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {property.location}
                        </p>
                      </div>
                      <div className="text-2xl font-bold text-[#8d7364]">
                        {formatPrice(property.pricePerNight)}
                        <span className="text-sm font-normal text-gray-500"> / nuit</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-4 space-x-4">
                      <div className="flex items-center text-[#7a6652]">
                        <BedDouble className="h-5 w-5 mr-1" />
                        <span>{property.bedrooms} chambres</span>
                      </div>
                      <div className="flex items-center text-[#7a6652]">
                        <Bath className="h-5 w-5 mr-1" />
                        <span>{property.bathrooms} sdb</span>
                      </div>
                      <div className="flex items-center text-[#7a6652]">
                        <Ruler className="h-5 w-5 mr-1" />
                        <span>{property.surface} m²</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center">
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
                    </div>
                    
                    <div className="mt-6">
                      <Link 
                        href={`/properties/${property.id}${dateRange.startDate ? `?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}` : ''}`}
                        className="inline-block bg-[#8d7364] text-white px-6 py-2 rounded-lg hover:bg-[#6b594e] transition-colors"
                      >
                        {property.instantBooking ? 'Réserver maintenant' : 'Voir les disponibilités'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Neighborhood Guide */}
        <div className="mt-16 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-[#5d4a3a] mb-6">Guide des Quartiers de Dakar</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {neighborhoods.map((area) => (
                <button
                  key={area.name} 
                  className="border border-[#e0d6cc] rounded-lg p-4 hover:bg-[#f5efe6] transition-colors text-left"
                  onClick={() => setFilters({...filters, neighborhood: area.name})}
                >
                  <div className="text-2xl mb-2">{area.emoji}</div>
                  <h4 className="font-medium text-[#5d4a3a]">{area.name}</h4>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}