'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Star, BedDouble, Bath, Ruler, Heart } from 'lucide-react';
import Image from 'next/image';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login?redirect=/favorites');
      return;
    }

    const fetchFavorites = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/favourites', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 401) {
            router.push('/login?redirect=/favorites');
            return;
          }
          throw new Error(errorData.message || 'Erreur lors de la récupération des favoris');
        }
        const { data } = await response.json();
        setFavorites(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [router]);

  const toggleFavorite = async (bienId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login?redirect=/favorites');
      return;
    }

    try {
      const isFavorite = favorites.find(fav => fav.id === bienId);
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
          ? prev.filter(fav => fav.id !== bienId)
          : [...prev, { id: bienId }]
      );
    } catch (err) {
      setError(err.message);
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
          <h2 className="text-2xl font-bold text-[#5d4a3a] mb-4">Erreur</h2>
          <p className="text-[#7a6652] mb-6">{error}</p>
          <Link href="/properties" className="bg-[#8d7364] text-white px-6 py-2 rounded-lg">
            Retour aux propriétés
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f5f0] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#5d4a3a] mb-8">Mes Favoris</h1>
        
        {favorites.length === 0 ? (
          <div className="text-center">
            <p className="text-[#7a6652] mb-6">Vous n'avez aucun bien dans vos favoris.</p>
            <Link href="/properties" className="bg-[#8d7364] text-white px-6 py-2 rounded-lg">
              Découvrir nos propriétés
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {favorites.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                isFavorite={true}
                toggleFavorite={() => toggleFavorite(property.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PropertyCard({ property, isFavorite, toggleFavorite }) {
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
              {property.price.toLocaleString()} FCFA
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