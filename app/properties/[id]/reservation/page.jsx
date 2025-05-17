'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Calendar, User, CreditCard, MapPin, Home, Shield } from 'lucide-react';
import Link from 'next/link';

export default function ReservationPage({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  // Get dates from URL
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const guests = searchParams.get('guests') || 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch property details
        const propResponse = await fetch(`/api/properties/${params.id}`);
        if (!propResponse.ok) throw new Error('Property not found');
        const propData = await propResponse.json();
        setProperty(propData);

        // Fetch user data
        const userResponse = await fetch('/api/auth/me');
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
      } catch (error) {
        console.error('Error:', error);
        router.push('/properties');
      }
    };

    fetchData();
  }, [params.id, router]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const calculateTotal = () => {
    if (!startDate || !endDate || !property) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    return nights * property.pricePerNight;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          property_id: params.id,
          start_date: startDate,
          end_date: endDate,
          guests: parseInt(guests),
          payment_method: paymentMethod,
          special_requests: formData.specialRequests,
          total_amount: calculateTotal()
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        router.push(`/properties/${params.id}/reservation/confirm?reservation_id=${data.id}`);
      } else {
        alert(data.error || 'Erreur lors de la réservation');
      }
    } catch (error) {
      alert('Une erreur est survenue');
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8d7364]"></div>
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
                  
                  <h2 className="text-xl font-bold text-[#5d4a3a] mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-[#8d7364]" />
                    Paiement
                  </h2>
                  
                  <div className="mb-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-lg border ${paymentMethod === 'card' ? 'border-[#8d7364] bg-[#f5efe6]' : 'border-[#e0d6cc]'}`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        Carte de crédit
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-lg border ${paymentMethod === 'mobile' ? 'border-[#8d7364] bg-[#f5efe6]' : 'border-[#e0d6cc]'}`}
                        onClick={() => setPaymentMethod('mobile')}
                      >
                        Mobile Money
                      </button>
                    </div>
                    
                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-[#5d4a3a] mb-1">Numéro de carte</label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-[#e0d6cc] rounded-lg"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-[#5d4a3a] mb-1">Date d'expiration</label>
                            <input
                              type="text"
                              className="w-full px-4 py-2 border border-[#e0d6cc] rounded-lg"
                              placeholder="MM/AA"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[#5d4a3a] mb-1">CVV</label>
                            <input
                              type="text"
                              className="w-full px-4 py-2 border border-[#e0d6cc] rounded-lg"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {paymentMethod === 'mobile' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-[#5d4a3a] mb-1">Opérateur</label>
                          <select className="w-full px-4 py-2 border border-[#e0d6cc] rounded-lg">
                            <option value="">Sélectionnez un opérateur</option>
                            <option value="orange">Orange Money</option>
                            <option value="wave">Wave</option>
                            <option value="free">Free Money</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#5d4a3a] mb-1">Numéro de téléphone</label>
                          <input
                            type="tel"
                            className="w-full px-4 py-2 border border-[#e0d6cc] rounded-lg"
                            placeholder="77 123 45 67"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-[#8d7364] text-white py-3 rounded-lg hover:bg-[#6b594e] transition-colors"
                  >
                    Confirmer et payer
                  </button>
                </form>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#5d4a3a] mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-[#8d7364]" />
                  Politique d'annulation
                </h2>
                <p className="text-[#5d4a3a] mb-4">
                  {property.cancellationPolicy || "Annulation gratuite jusqu'à 7 jours avant l'arrivée. Ensuite, annulation jusqu'à 24 heures avant l'arrivée pour un remboursement de 50%."}
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
                        {new Date(startDate).toLocaleDateString('fr-FR')} - {new Date(endDate).toLocaleDateString('fr-FR')}
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
                      {formatPrice(property.pricePerNight)} × {Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))} nuits
                    </span>
                    <span className="text-[#5d4a3a]">{formatPrice(calculateTotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5d4a3a]">Frais de service</span>
                    <span className="text-[#5d4a3a]">{formatPrice(calculateTotal() * 0.1)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between border-t border-[#e0d6cc] pt-4 mb-6">
                  <span className="font-bold text-[#5d4a3a]">Total</span>
                  <span className="font-bold text-[#5d4a3a]">{formatPrice(calculateTotal() * 1.1)}</span>
                </div>
                
                <p className="text-sm text-[#7a6652]">
                  Vous ne serez pas débité tout de suite. Le paiement sera effectué à l'approbation du propriétaire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}