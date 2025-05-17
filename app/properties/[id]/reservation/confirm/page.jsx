'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Home, Calendar, User, MapPin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmationPage({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reservation, setReservation] = useState(null);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const reservationId = searchParams.get('reservation_id');

  useEffect(() => {
    if (!reservationId) {
      router.push(`/properties/${params.id}`);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch reservation details
        const resResponse = await fetch(`/api/reservations/${reservationId}`);
        if (!resResponse.ok) throw new Error('Reservation not found');
        const resData = await resResponse.json();
        setReservation(resData);

        // Fetch property details
        const propResponse = await fetch(`/api/properties/${params.id}`);
        if (!propResponse.ok) throw new Error('Property not found');
        const propData = await propResponse.json();
        setProperty(propData);

        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        router.push(`/properties/${params.id}`);
      }
    };

    fetchData();
  }, [reservationId, params.id, router]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8d7364]"></div>
      </div>
    );
  }

  if (!reservation || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#5d4a3a] mb-4">Réservation non trouvée</h2>
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-[#5d4a3a] mb-2">Réservation confirmée !</h1>
            <p className="text-xl text-[#7a6652]">
              Votre séjour à {property.title} est confirmé.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Reservation Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold text-[#5d4a3a] mb-4 flex items-center">
                  <Home className="h-5 w-5 mr-2 text-[#8d7364]" />
                  Détails de votre réservation
                </h2>
                
                <div className="flex items-start mb-6">
                  <div className="w-24 h-24 rounded-lg overflow-hidden mr-4">
                    <img 
                      src={property.images[0]} 
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#5d4a3a]">{property.title}</h3>
                    <p className="text-[#7a6652] flex items-center mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location}
                    </p>
                    <p className="text-sm text-[#7a6652]">
                      Réservation #{reservation.id}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="border border-[#e0d6cc] rounded-lg p-4">
                    <h4 className="text-sm font-medium text-[#7a6652] mb-2">DATES DE SÉJOUR</h4>
                    <div className="flex items-center text-[#5d4a3a]">
                      <Calendar className="h-5 w-5 mr-2 text-[#8d7364]" />
                      <div>
                        <p>{formatDate(reservation.start_date)}</p>
                        <p>au {formatDate(reservation.end_date)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-[#e0d6cc] rounded-lg p-4">
                    <h4 className="text-sm font-medium text-[#7a6652] mb-2">VOYAGEURS</h4>
                    <div className="flex items-center text-[#5d4a3a]">
                      <User className="h-5 w-5 mr-2 text-[#8d7364]" />
                      <span>{reservation.guests} {reservation.guests > 1 ? 'personnes' : 'personne'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-[#e0d6cc] pt-4">
                  <h4 className="text-sm font-medium text-[#7a6652] mb-2">INFORMATIONS DE PAIEMENT</h4>
                  <div className="flex justify-between text-[#5d4a3a] mb-1">
                    <span>Total</span>
                    <span className="font-bold">{formatPrice(reservation.total_amount)}</span>
                  </div>
                  <div className="flex justify-between text-[#5d4a3a] mb-1">
                    <span>Méthode de paiement</span>
                    <span>{reservation.payment_method === 'card' ? 'Carte de crédit' : 'Mobile Money'}</span>
                  </div>
                  <div className="flex justify-between text-[#5d4a3a]">
                    <span>Statut</span>
                    <span className="font-medium text-green-600">Payé</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#5d4a3a] mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-[#8d7364]" />
                  Votre hôte
                </h2>
                
                <div className="flex items-start mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-gray-200">
                    {property.host.avatar && (
                      <img 
                        src={property.host.avatar} 
                        alt={property.host.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#5d4a3a]">{property.host.name}</h3>
                    <p className="text-[#7a6652] mb-2">Hôte depuis {new Date(property.host.joined_at).getFullYear()}</p>
                    <div className="flex items-center space-x-4">
                      <a href={`mailto:${property.host.email}`} className="flex items-center text-sm text-[#8d7364] hover:underline">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </a>
                      <a href={`tel:${property.host.phone}`} className="flex items-center text-sm text-[#8d7364] hover:underline">
                        <Phone className="h-4 w-4 mr-1" />
                        Appeler
                      </a>
                    </div>
                  </div>
                </div>
                
                <p className="text-[#5d4a3a]">
                  Votre hôte vous contactera sous peu avec les détails de votre arrivée. 
                  Vous pouvez également le contacter directement pour toute question.
                </p>
              </div>
            </div>
            
            {/* Right Column - Next Steps */}
            <div>
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-bold text-[#5d4a3a] mb-4">Prochaines étapes</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-[#f5efe6] rounded-full p-2 mr-3 flex-shrink-0">
                      <Calendar className="h-5 w-5 text-[#8d7364]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#5d4a3a] mb-1">Ajoutez à votre calendrier</h3>
                      <p className="text-sm text-[#7a6652]">
                        Importez les dates dans votre calendrier pour ne pas les oublier.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#f5efe6] rounded-full p-2 mr-3 flex-shrink-0">
                      <MapPin className="h-5 w-5 text-[#8d7364]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#5d4a3a] mb-1">Planifiez votre voyage</h3>
                      <p className="text-sm text-[#7a6652]">
                        Consultez les informations sur le quartier et les moyens de transport.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#f5efe6] rounded-full p-2 mr-3 flex-shrink-0">
                      <User className="h-5 w-5 text-[#8d7364]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#5d4a3a] mb-1">Invitez des voyageurs</h3>
                      <p className="text-sm text-[#7a6652]">
                        Partagez les détails du voyage avec vos compagnons.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link 
                    href="/dashboard/tenant" 
                    className="block w-full bg-[#8d7364] text-white py-3 rounded-lg hover:bg-[#6b594e] transition-colors text-center mb-3"
                  >
                    Voir dans mon tableau de bord
                  </Link>
                  <Link 
                    href="/properties" 
                    className="block w-full bg-white text-[#8d7364] py-3 rounded-lg border border-[#8d7364] hover:bg-[#f5efe6] transition-colors text-center"
                  >
                    Explorer d'autres propriétés
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center text-[#7a6652] text-sm">
            <p>Vous avez des questions sur votre réservation ? Contactez notre service client.</p>
          </div>
        </div>
      </div>
    </div>
  );
}