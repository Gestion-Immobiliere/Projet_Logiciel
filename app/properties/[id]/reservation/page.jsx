'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Calendar, User, MapPin, Home, Shield } from 'lucide-react';
import Link from 'next/link';

export default function ReservationPage({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Get dates from URL
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const guests = searchParams.get('guests') || 1;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push(`/login?redirect=/properties/${params.id}/reservation?startDate=${startDate}&endDate=${endDate}&guests=${guests}`);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch property details
        const propResponse = await fetch(`http://localhost:4000/api/biens/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!propResponse.ok) throw new Error('Propriété non trouvée');
        const propData = await propResponse.json();
        setProperty({
          id: propData._id,
          title: propData.titre,
          price: propData.prix,
          neighborhood: propData.localisation?.ville || 'Inconnu',
          images: propData.images || ['/placeholder.jpg'],
          cancellationPolicy: propData.cancellationPolicy || "Annulation gratuite jusqu'à 7 jours avant l'arrivée."
        });

        // Fetch user data
        const userResponse = await fetch('http://localhost:4000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
          setFormData({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            phone: userData.phone || '',
            specialRequests: ''
          });
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, router, startDate, endDate, guests]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const calculateDuration = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      router.push(`/login?redirect=/properties/${params.id}/reservation?startDate=${startDate}&endDate=${endDate}&guests=${guests}`);
      return;
    }

    if (!acceptTerms) {
      setError('Vous devez accepter les conditions générales.');
      return;
    }

    const dureeValidite = calculateDuration();
    if (dureeValidite < 1) {
      setError('La durée de location doit être d\'au moins 1 jour.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bien: params.id,
          montant: property.price,
          dureeValidite
        })
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          router.push(`/login?redirect=/properties/${params.id}/reservation?startDate=${startDate}&endDate=${endDate}&guests=${guests}`);
          return;
        }
        throw new Error(data.description || 'Erreur lors de la réservation');
      }

      window.location.href = data.url; // Rediriger vers Stripe
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

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#5d4a3a] mb-4">Propriété non trouvée</h2>
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
          <h1 className="text-3xl font-bold text-[#5d4a3a] mb-8">Finalisez votre réservation</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold text-[#5d4a3a] mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-[#8d7364]" />
                  Informations personnelles
                </h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-[#5d4a3a] mb-1">Prénom</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-[#e0d6cc] rounded-lg"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#5d4a3a] mb-1">Nom</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-[#e0d6cc] rounded-lg"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#5d4a3a] mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-[#e0d6cc] rounded-lg"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#5d4a3a] mb-1">Téléphone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-[#e0d6cc] rounded-lg"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[#5d4a3a] mb-1">Demandes spéciales (optionnel)</label>
                    <textarea
                      className="w-full px-4 py-2 border border-[#e0d6cc] rounded-lg h-24"
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="flex items-center text-sm text-[#5d4a3a]">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="mr-2"
                      />
                      J'accepte les conditions générales et la politique de confidentialité
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-[#8d7364] text-white py-3 rounded-lg hover:bg-[#6b594e] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={!acceptTerms}
                  >
                    Confirmer et payer
                  </button>
                  <p className="text-center text-sm text-[#7a6652] mt-2">
                    Vous serez redirigé vers Stripe pour le paiement
                  </p>
                </form>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#5d4a3a] mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-[#8d7364]" />
                  Politique d'annulation
                </h2>
                <p className="text-[#5d4a3a] mb-4">
                  {property.cancellationPolicy}
                </p>
                <p className="text-[#7a6652] text-sm">
                  En effectuant cette réservation, vous acceptez les conditions générales et la politique de confidentialité.
                </p>
              </div>
            </div>
            
            {/* Right Column - Summary */}
            <div>
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-bold text-[#5d4a3a] mb-4 flex items-center">
                  <Home className="h-5 w-5 mr-2 text-[#8d7364]" />
                  Votre séjour
                </h2>
                
                <div className="mb-6">
                  <div className="flex items-start mb-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden mr-4">
                      <img 
                        src={property.images[0]} 
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#5d4a3a]">{property.title}</h3>
                      <p className="text-sm text-[#7a6652] flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {property.neighborhood}
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t border-b border-[#e0d6cc] py-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-[#5d4a3a]">Dates</span>
                      <span className="text-[#5d4a3a]">
                        {startDate ? new Date(startDate).toLocaleDateString('fr-FR') : 'Non défini'} - 
                        {endDate ? new Date(endDate).toLocaleDateString('fr-FR') : 'Non défini'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5d4a3a]">Voyageurs</span>
                      <span className="text-[#5d4a3a]">{guests} {guests > 1 ? 'personnes' : 'personne'}</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-bold text-[#5d4a3a] mb-2">Détails du prix</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-[#5d4a3a]">
                      {formatPrice(property.price)} × {calculateDuration()} jours
                    </span>
                    <span className="text-[#5d4a3a]">{formatPrice(property.price)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between border-t border-[#e0d6cc] pt-4 mb-6">
                  <span className="font-bold text-[#5d4a3a]">Total</span>
                  <span className="font-bold text-[#5d4a3a]">{formatPrice(property.price)}</span>
                </div>
                
                <p className="text-sm text-[#7a6652]">
                  Vous serez redirigé vers Stripe pour finaliser le paiement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}