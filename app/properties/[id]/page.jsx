'use client';
import { useState, useEffect } from 'react';
import { MapPin, Star, Ruler, BedDouble, Bath } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { use } from 'react';

export default function PropertyPage({ params }) {
  const { id } = use(params); // Déballer params avec React.use
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/biens/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Propriété non trouvée');
        }
        const data = await response.json();
        // Mapper les données au format attendu
        setProperty({
          id: data._id,
          title: data.titre,
          description: data.description || 'Aucune description disponible.',
          price: data.prix,
          type: data.type?.nom || 'Inconnu',
          location: data.localisation?.ville || 'Inconnu',
          bedrooms: data.nombreChambres,
          bathrooms: data.nombreSallesBain,
          surface: data.surface,
          images: data.images || ['/placeholder.jpg'],
          contract: data.contrat,
          status: data.statut,
          amenities: ['Wi-Fi', 'Climatisation', 'Cuisine'], // Valeur fictive
          host: {
            name: 'Agent Immobilier',
            joined: 'Janvier 2025',
            responseTime: 'Dans l\'heure'
          },
          rating: 4.5 // Valeur fictive
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const handleReservation = async () => {
    if (!acceptTerms) {
      alert('Vous devez accepter les termes du contrat pour réserver.');
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bienId: id,
          total: property.price // Prix mensuel
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la réservation');
      }
      alert('Réservation effectuée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      alert('Échec de la réservation : ' + error.message);
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
          <h1 className="text-3xl font-bold text-[#5d4a3a]">{property.title}</h1>
          <div className="flex items-center mt-2 text-[#7a6652]">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{property.location}</span>
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
                  <h2 className="text-2xl font-bold text-[#5d4a3a]">{property.type} · {property.location}</h2>
                  <p className="text-[#7a6652]">{property.bedrooms} {property.bedrooms > 1 ? 'chambres' : 'chambre'} · {property.bathrooms} {property.bathrooms > 1 ? 'salles de bain' : 'salle de bain'}</p>
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
                    <span className="text-[#5d4a3a]">{property.bedrooms} {property.bedrooms > 1 ? 'chambres' : 'chambre'}</span>
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

              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#5d4a3a] mb-4">Contrat</h3>
                {property.contract ? (
                  <a
                    href={property.contract}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8d7364] hover:underline"
                  >
                    Télécharger le contrat (PDF)
                  </a>
                ) : (
                  <p className="text-[#7a6652]">Aucun contrat disponible.</p>
                )}
              </div>
            </div>

            <HostProfile host={property.host} />
          </div>

          {/* Booking Sidebar */}
          <div className="sticky top-4 h-fit">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-[#e0d6cc]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-2xl font-bold text-[#8d7364]">{formatPrice(property.price)}</p>
                  <p className="text-[#7a6652]">par mois</p>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-[#5d4a3a]">{property.rating}</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="flex items-center text-sm text-[#5d4a3a]">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mr-2"
                  />
                  J'accepte les{' '}
                  {property.contract ? (
                    <a
                      href={property.contract}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8d7364] hover:underline ml-1"
                    >
                      termes du contrat
                    </a>
                  ) : (
                    <span className="text-[#8d7364] ml-1">termes du contrat</span>
                  )}
                </label>
              </div>

              <button
                onClick={handleReservation}
                className="w-full bg-[#8d7364] text-white py-3 rounded-lg hover:bg-[#816451] transition-colors disabled:bg-[#cbb6a9]  disabled:cursor-not-allowed"
                disabled={!acceptTerms}
              >
                Réserver
              </button>

              <p className="text-center text-sm text-[#7a6652] mt-2">
                Vous ne serez pas débité tout de suite
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PropertyGallery({ images }) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative h-64">
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function AmenitiesList({ amenities }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {amenities.map((amenity, index) => (
        <div key={index} className="flex items-center text-[#5d4a3a]">
          <span className="text-sm">{amenity}</span>
        </div>
      ))}
    </div>
  );
}

function HostProfile({ host }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold text-[#5d4a3a] mb-4">À propos de l'hôte</h3>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
        <div>
          <p className="font-medium text-[#5d4a3a]">{host.name}</p>
          <p className="text-sm text-[#7a6652]">Inscrit en {host.joined}</p>
          <p className="text-sm text-[#7a6652]">Temps de réponse : {host.responseTime}</p>
        </div>
      </div>
    </div>
  );
}