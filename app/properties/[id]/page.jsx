'use client';
import { useState, useEffect } from 'react';
import { MapPin, Star, Ruler, BedDouble, Bath, Calendar, Users, Heart } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import PropertyGallery from '@/components/PropertyGallery';
import AmenitiesList from '@/components/AmenitiesList';
import HostProfile from '@/components/HostProfile';

export default function PropertyPage({ params }) {
  const searchParams = useSearchParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDates, setSelectedDates] = useState({
    start: searchParams.get('startDate') || '',
    end: searchParams.get('endDate') || ''
  });
  const [guests, setGuests] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${params.id}`);
        if (!response.ok) {
          throw new Error('Property not found');
        }
        const data = await response.json();
        setProperty(data);
        
        // Check if property is in favorites
        const favResponse = await fetch('/api/favorites/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ property_id: params.id })
        });
        if (favResponse.ok) {
          const favData = await favResponse.json();
          setIsFavorite(favData.isFavorite);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const calculateTotal = () => {
    if (!selectedDates.start || !selectedDates.end || !property) return 0;
    
    const start = new Date(selectedDates.start);
    const end = new Date(selectedDates.end);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    return nights * property.pricePerNight;
  };

  const handleReservation = () => {
    // Redirect to reservation page with dates and guests
    window.location.href = `/properties/${params.id}/reservation?startDate=${selectedDates.start}&endDate=${selectedDates.end}&guests=${guests}`;
  };

  const toggleFavorite = async () => {
    try {
      const response = await fetch('/api/favorites/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ property_id: params.id })
      });
      
      if (response.ok) {
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
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
          <h2 className="text-2xl font-bold text-[#5d4a3a] mb-4">Propriété non trouvée</h2>
          <p className="text-[#7a6652] mb-6">{error}</p>
          <Link href="/properties" className="bg-[#8d7364] text-white px-6 py-2 rounded-lg">
            Retour aux propriétés
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f5f0]">
      {/* Property Header */}
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-[#5d4a3a]">{property.title}</h1>
              <div className="flex items-center mt-2 text-[#7a6652]">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.location}</span>
              </div>
            </div>
            <button 
              onClick={toggleFavorite}
              className="p-2 rounded-full hover:bg-[#f5efe6]"
              aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              <Heart 
                className={`h-6 w-6 ${isFavorite ? 'fill-[#8d7364] text-[#8d7364]' : 'text-[#8d7364]'}`} 
              />
            </button>
          </div>
        </div>
      </div>

      {/* Property Gallery */}
      <PropertyGallery images={property.images} />

      {/* Property Details */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#5d4a3a]">{property.type} entier · {property.neighborhood}</h2>
                  <p className="text-[#7a6652]">{property.guests} {property.guests > 1 ? 'voyageurs' : 'voyageur'} · {property.bedrooms} {property.bedrooms > 1 ? 'chambres' : 'chambre'} · {property.bathrooms} {property.bathrooms > 1 ? 'salles de bain' : 'salle de bain'}</p>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-[#5d4a3a]">{property.rating}</span>
                </div>
              </div>

              <div className="border-t border-b border-[#e0d6cc] py-6 my-6">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center">
                    <Ruler className="h-5 w-5 text-[#8d7364] mr-2" />
                    <span className="text-[#5d4a3a]">{property.surface} m²</span>
                  </div>
                  <div className="flex items-center">
                    <BedDouble className="h-5 w-5 text-[#8d7364] mr-2" />
                    <span className="text-[#5d4a3a]">{property.bedrooms} {property.bedrooms > 1 ? 'lits' : 'lit'}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 text-[#8d7364] mr-2" />
                    <span className="text-[#5d4a3a]">{property.bathrooms} {property.bathrooms > 1 ? 'salles de bain' : 'salle de bain'}</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#5d4a3a] mb-4">Description</h3>
                <p className="text-[#5d4a3a] whitespace-pre-line">{property.description}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#5d4a3a] mb-4">Équipements</h3>
                <AmenitiesList amenities={property.amenities} />
              </div>
            </div>

            {/* Host Profile */}
            <HostProfile host={property.host} />
          </div>

          {/* Booking Sidebar */}
          <div className="sticky top-4 h-fit">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-[#e0d6cc]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-2xl font-bold text-[#8d7364]">{formatPrice(property.pricePerNight)}</p>
                  <p className="text-[#7a6652]">par nuit</p>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-[#5d4a3a]">{property.rating}</span>
                </div>
              </div>

              <div className="border border-[#e0d6cc] rounded-lg mb-4">
                <div className="grid grid-cols-2 border-b border-[#e0d6cc]">
                  <div className="p-3 border-r border-[#e0d6cc]">
                    <label className="block text-xs font-medium text-[#5d4a3a] mb-1">ARRIVÉE</label>
                    <input
                      type="date"
                      className="w-full outline-none text-sm"
                      value={selectedDates.start}
                      onChange={(e) => setSelectedDates({...selectedDates, start: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="p-3">
                    <label className="block text-xs font-medium text-[#5d4a3a] mb-1">DÉPART</label>
                    <input
                      type="date"
                      className="w-full outline-none text-sm"
                      value={selectedDates.end}
                      onChange={(e) => setSelectedDates({...selectedDates, end: e.target.value})}
                      min={selectedDates.start || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
                <div className="p-3">
                  <label className="block text-xs font-medium text-[#5d4a3a] mb-1">VOYAGEURS</label>
                  <select
                    className="w-full outline-none text-sm"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                  >
                    {[...Array(property.maxGuests)].map((_, i) => (
                      <option key={i+1} value={i+1}>{i+1} {i+1 > 1 ? 'personnes' : 'personne'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedDates.start && selectedDates.end && (
                <div className="mb-4">
                  <div className="flex justify-between py-2">
                    <span className="text-[#5d4a3a]">
                      {formatPrice(property.pricePerNight)} × {Math.ceil((new Date(selectedDates.end) - new Date(selectedDates.start)) / (1000 * 60 * 60 * 24))} nuits
                    </span>
                    <span className="text-[#5d4a3a]">{formatPrice(calculateTotal())}</span>
                  </div>
                  <div className="flex justify-between py-2 border-t border-[#e0d6cc] font-bold">
                    <span className="text-[#5d4a3a]">Total</span>
                    <span className="text-[#5d4a3a]">{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleReservation}
                className="w-full bg-[#8d7364] text-white py-3 rounded-lg hover:bg-[#6b594e] transition-colors"
                disabled={!selectedDates.start || !selectedDates.end}
              >
                {property.instantBooking ? 'Réserver' : 'Vérifier la disponibilité'}
              </button>

              {property.instantBooking && (
                <p className="text-center text-sm text-[#7a6652] mt-2">
                  Vous ne serez pas débité tout de suite
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}