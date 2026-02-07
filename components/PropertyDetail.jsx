'use client';
import Image from 'next/image';
import { MapPin, Ruler, BedDouble, Bath, Calendar, Heart, Share2, Phone, Mail, ArrowLeft, ChevronLeft, ChevronRight, CheckCircle, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const formatPrice = (price) => {
  if (typeof window !== 'undefined') {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  }
  return `${price} FCFA`; 
};

export default function PropertyDetail({ property }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [favorited, setFavorited] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f5f0]">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <p className="text-xl text-red-500 mb-4">Aucune donnée disponible pour cette propriété.</p>
        </div>
      </div>
    );
  }

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Message envoyé à l\'agent !');
    setShowContactForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f5f0] to-[#e8d5b5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#5d4a3a] mb-2">
              {property.title}
              {property.premium && (
                <span className="ml-3 bg-primary-600 text-white text-sm px-3 py-1 rounded-full align-middle">
                  Premium
                </span>
              )}
            </h1>
            <div className="flex items-center gap-2 text-[#7a6652]">
              <MapPin className="h-5 w-5 text-primary-600" />
              <span>{property.address}</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => setFavorited(!favorited)}
              className={`p-3 rounded-full ${favorited ? 'bg-red-50 text-red-500' : 'bg-white text-gray-600'} shadow-sm hover:shadow-md transition-all`}
              aria-label={favorited ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              <Heart className={`h-5 w-5 ${favorited ? 'fill-current' : ''}`} />
            </button>
            <button className="p-3 rounded-full bg-white text-gray-600 shadow-sm hover:shadow-md transition-all">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
         <p className="text-2xl md:text-3xl font-bold text-primary-600">
          {property.price ? `${property.price.toLocaleString()} FCFA` : 'Prix non disponible'}
          <span className="text-lg text-gray-500 font-normal"> / mois</span>
        </p>
        </div>

        <div className="relative mb-8 rounded-2xl overflow-hidden shadow-xl bg-white">
          {property.images && property.images.length > 0 ? (
            <>
              <div className="relative aspect-video">
                <Image
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {property.images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-md transition-all"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-800" />
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-md transition-all"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-800" />
                  </button>
                  
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'}`}
                        aria-label={`Aller à l'image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="aspect-video flex items-center justify-center bg-gray-100 text-gray-400">
              [Aucune image disponible]
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-[#5d4a3a] mb-6 pb-2 border-b border-[#e8d5b5]">
                Description
              </h2>
              <div className="prose text-gray-700 max-w-none">
                <p className="mb-4">{property.description}</p>
                
                {property.extendedDescription && (
                  <>
                    <p className="mb-4">{property.extendedDescription}</p>
                    <ul className="list-disc pl-5 mb-4">
                      <li>Emplacement exceptionnel en plein cœur de {property.neighborhood}</li>
                      <li>Proximité avec les commodités (écoles, commerces, transports)</li>
                      <li>Environnement sécurisé et résidentiel</li>
                    </ul>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-[#5d4a3a] mb-6 pb-2 border-b border-[#e8d5b5]">
                Caractéristiques
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#5d4a3a] mb-4">Intérieur</h3>
                  <ul className="space-y-3">
                    {property.features.slice(0, Math.ceil(property.features.length / 2)).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-[#5d4a3a] mb-4">Extérieur & Services</h3>
                  <ul className="space-y-3">
                    {property.features.slice(Math.ceil(property.features.length / 2)).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-[#5d4a3a] mb-6 pb-2 border-b border-[#e8d5b5]">
                Localisation
              </h2>
              
              <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                [Carte interactive de {property.neighborhood}]
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#f9f5f0] p-4 rounded-lg">
                  <h4 className="font-medium text-[#5d4a3a] mb-2">Commerces à proximité</h4>
                  <ul className="text-sm text-[#7a6652] space-y-1">
                    <li>Supermarkté - 5 min</li>
                    <li>Pharmacie - 3 min</li>
                    <li>Restaurants - 2 min</li>
                  </ul>
                </div>
                
                <div className="bg-[#f9f5f0] p-4 rounded-lg">
                  <h4 className="font-medium text-[#5d4a3a] mb-2">Écoles</h4>
                  <ul className="text-sm text-[#7a6652] space-y-1">
                    <li>École primaire - 10 min</li>
                    <li>Lycée - 15 min</li>
                    <li>Université - 20 min</li>
                  </ul>
                </div>
                
                <div className="bg-[#f9f5f0] p-4 rounded-lg">
                  <h4 className="font-medium text-[#5d4a3a] mb-2">Transports</h4>
                  <ul className="text-sm text-[#7a6652] space-y-1">
                    <li>Arrêt de bus - 3 min</li>
                    <li>Station de taxi - 5 min</li>
                    <li>Parking public - 2 min</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-[#5d4a3a] mb-6 pb-2 border-b border-[#e8d5b5]">
                Détails du bien
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-[#e8d5b5]">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium">{property.type}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-[#e8d5b5]">
                  <span className="text-gray-600">Surface</span>
                  <span className="font-medium">{property.surface} m²</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-[#e8d5b5]">
                  <span className="text-gray-600">Chambres</span>
                  <span className="font-medium">{property.bedrooms}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-[#e8d5b5]">
                  <span className="text-gray-600">Salles de bain</span>
                  <span className="font-medium">{property.bathrooms}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-[#e8d5b5]">
                  <span className="text-gray-600">Année de construction</span>
                  <span className="font-medium">{property.year}</span>
                </div>
                
                <div className="flex justify-between py-3">
                  <span className="text-gray-600">Étage</span>
                  <span className="font-medium">{property.floor || 'Rez-de-chaussée'}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm sticky top-8">
              <h2 className="text-2xl font-bold text-[#5d4a3a] mb-6 pb-2 border-b border-[#e8d5b5]">
                Contacter l'agent
              </h2>
              
              {!showContactForm ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-[#f9f5f0] rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Mamadou Diop</h4>
                      <p className="text-sm text-gray-600">Agent immobilier certifié</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Envoyer un message
                  </button>
                  
                  <div className="flex gap-2">
                    <a 
                      href="tel:+221338209876" 
                      className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      Appeler
                    </a>
                    <a 
                      href="mailto:contact@dakarimmo.sn" 
                      className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                      Email
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Votre nom</label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      value={contactFormData.name}
                      onChange={(e) => setContactFormData({...contactFormData, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      value={contactFormData.email}
                      onChange={(e) => setContactFormData({...contactFormData, email: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      value={contactFormData.phone}
                      onChange={(e) => setContactFormData({...contactFormData, phone: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      value={contactFormData.message}
                      onChange={(e) => setContactFormData({...contactFormData, message: e.target.value})}
                      defaultValue={`Je suis intéressé(e) par la propriété "${property.title}"`}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition-colors"
                    >
                      Envoyer
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}