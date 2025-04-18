'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Ruler, BedDouble, Bath, Calendar, Heart, Share2, ChevronLeft, ChevronRight, Star, Phone, Mail, User } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function PropertyDetail() {
  const params = useParams();
  const { id } = params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [favorited, setFavorited] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const properties = [
    {
      id: "1",
      title: "Villa Prestige aux Almadies",
      price: 45000000,
      type: "Villa",
      location: "Almadies, Dakar",
      description: "Cette magnifique villa contemporaine de 5 chambres offre un cadre de vie exceptionnel avec vue directe sur l'océan. Récemment rénovée avec des matériaux haut de gamme, elle allie élégance et confort moderne.",
      extendedDescription: "La propriété comprend un vaste jardin paysagé avec piscine à débordement, une terrasse panoramique, un garage pour 3 voitures et des espaces de vie spacieux. Idéalement située dans le quartier résidentiel le plus prisé de Dakar, à proximité des écoles internationales et des commodités.",
      bedrooms: 5,
      bathrooms: 4,
      surface: 450,
      year: 2021,
      features: ["Piscine à débordement", "Jardin paysagé", "Système de sécurité", "Climatisation centrale", "Cuisine équipée", "Domotique", "Garage 3 voitures", "Terrasse panoramique"],
      images: ["/villa-almadies-1.jpg", "/villa-almadies-2.jpg", "/villa-almadies-3.jpg"],
      neighborhood: "Almadies",
      rating: 4.8,
      agent: {
        name: "Mamadou Diop",
        phone: "+221 77 123 45 67",
        email: "m.diop@dakarimmo.sn",
        yearsOfExperience: 8
      }
    },
    {
      id: "2",
      title: "Appartement Standing au Plateau",
      price: 25000000,
      type: "Appartement",
      location: "Plateau, Dakar",
      description: "Exceptionnel appartement de 3 chambres dans une résidence sécurisée avec services haut de gamme. Vue imprenable sur la ville et l'océan depuis les larges baies vitrées.",
      extendedDescription: "Cet appartement lumineux offre des finitions premium, des espaces généreux et des services résidentiels incluant piscine, salle de sport et conciergerie 24/7. Situé au cœur du quartier des affaires, à deux pas des ministères et des grandes entreprises.",
      bedrooms: 3,
      bathrooms: 2,
      surface: 180,
      year: 2019,
      features: ["Vue mer", "Ascenseur", "Parking sécurisé", "Conciergerie", "Salle de sport", "Piscine commune", "Baies vitrées", "Cuisine moderne"],
      images: ["/appartement-plateau-1.jpg", "/appartement-plateau-2.jpg"],
      neighborhood: "Plateau",
      rating: 4.5,
      agent: {
        name: "Aminata Ndiaye",
        phone: "+221 77 765 43 21",
        email: "a.ndiaye@dakarimmo.sn",
        yearsOfExperience: 5
      }
    }
  ];

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f5f0]">
        <p className="text-lg text-[#5d4a3a]">Chargement en cours...</p>
      </div>
    );
  }

  const property = properties.find((prop) => prop.id === id);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f5f0]">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <p className="text-xl text-red-500 mb-4">Propriété introuvable</p>
          <Link href="/properties" className="inline-flex items-center text-[#8d7364] hover:text-[#6b594e]">
            <ChevronLeft className="h-5 w-5 mr-2" />
            Retour aux propriétés
          </Link>
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f5f0] to-[#e8d5b5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link 
          href="/properties" 
          className="inline-flex items-center text-[#5d4a3a] hover:text-[#8d7364] transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          Retour aux propriétés
        </Link>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#5d4a3a] mb-2">
              {property.title}
              {property.type === "Villa" && (
                <span className="ml-3 bg-[#8d7364] text-white text-sm px-3 py-1 rounded-full align-middle">
                  Premium
                </span>
              )}
            </h1>
            <div className="flex items-center text-[#7a6652]">
              <MapPin className="h-5 w-5 mr-1 text-[#8d7364]" />
              <span>{property.location}</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => setFavorited(!favorited)}
              className={`p-3 rounded-full ${favorited ? 'bg-red-50 text-red-500' : 'bg-white text-gray-600'} shadow-sm hover:shadow-md transition-all`}
            >
              <Heart className={`h-5 w-5 ${favorited ? 'fill-current' : ''}`} />
            </button>
            <button className="p-3 rounded-full bg-white text-gray-600 shadow-sm hover:shadow-md transition-all">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <p className="text-2xl md:text-3xl font-bold text-[#8d7364]">
            {formatPrice(property.price)}
            <span className="text-lg text-[#7a6652] font-normal"> / mois</span>
          </p>
          
          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${i < Math.floor(property.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-[#5d4a3a]">{property.rating}</span>
          </div>
        </div>

        <div className="relative mb-8 rounded-2xl overflow-hidden shadow-xl bg-white">
          <div className="relative h-64"> 
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
              >
                <ChevronLeft className="h-6 w-6 text-gray-800" />
              </button>
              <button 
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-md transition-all"
              >
                <ChevronRight className="h-6 w-6 text-gray-800" />
              </button>
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </>
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
                      {property.neighborhood === "Almadies" && (
                        <>
                          <li>Emplacement exclusif dans la zone résidentielle la plus prisée de Dakar</li>
                          <li>À 5 minutes des plages de Ngor et des restaurants de bord de mer</li>
                          <li>Proximité des écoles internationales (ISD, EAB)</li>
                        </>
                      )}
                      {property.neighborhood === "Plateau" && (
                        <>
                          <li>Cœur du quartier des affaires, à proximité des ministères et banques</li>
                          <li>Accès facile aux transports en commun et aux axes principaux</li>
                          <li>Commerces et restaurants haut de gamme à pied</li>
                        </>
                      )}
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
                        <span className="w-2 h-2 rounded-full bg-[#8d7364] mt-2 mr-2"></span>
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
                        <span className="w-2 h-2 rounded-full bg-[#8d7364] mt-2 mr-2"></span>
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
                  <h4 className="font-medium text-[#5d4a3a] mb-2">Commerces</h4>
                  <ul className="text-sm text-[#7a6652] space-y-1">
                    {property.neighborhood === "Almadies" && (
                      <>
                        <li>Supermarkté Casino - 5 min</li>
                        <li>Boulangerie française - 3 min</li>
                        <li>Restaurant La Calebasse - 2 min</li>
                      </>
                    )}
                    {property.neighborhood === "Plateau" && (
                      <>
                        <li>Marché Kermel - 10 min</li>
                        <li>Centre commercial - 5 min</li>
                        <li>Café Touba - 2 min</li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div className="bg-[#f9f5f0] p-4 rounded-lg">
                  <h4 className="font-medium text-[#5d4a3a] mb-2">Éducation</h4>
                  <ul className="text-sm text-[#7a6652] space-y-1">
                    {property.neighborhood === "Almadies" && (
                      <>
                        <li>École Internationale (ISD) - 5 min</li>
                        <li>Lycée Français - 10 min</li>
                        <li>Université Amadou Mahtar Mbow - 15 min</li>
                      </>
                    )}
                    {property.neighborhood === "Plateau" && (
                      <>
                        <li>École Mariama Niasse - 5 min</li>
                        <li>Lycée John F. Kennedy - 8 min</li>
                        <li>Université Cheikh Anta Diop - 10 min</li>
                      </>
                    )}
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

          <div className="space-y-8 lg:min-h-screen">
            <div className="bg-white p-8 rounded-2xl shadow-sm  top-8">
              <h2 className="text-2xl font-bold text-[#5d4a3a] mb-6 pb-2 border-b border-[#e8d5b5]">
                Détails du bien
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-[#e8d5b5]">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium text-[#5d4a3a]">{property.type}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-[#e8d5b5]">
                  <span className="text-gray-600">Surface</span>
                  <span className="font-medium text-[#5d4a3a]">{property.surface} m²</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-[#e8d5b5]">
                  <span className="text-gray-600">Chambres</span>
                  <span className="font-medium text-[#5d4a3a]">{property.bedrooms}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-[#e8d5b5]">
                  <span className="text-gray-600">Salles de bain</span>
                  <span className="font-medium text-[#5d4a3a]">{property.bathrooms}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-[#e8d5b5]">
                  <span className="text-gray-600">Année</span>
                  <span className="font-medium text-[#5d4a3a]">{property.year}</span>
                </div>
                
                <div className="flex justify-between py-3">
                  <span className="text-gray-600">Quartier</span>
                  <span className="font-medium text-[#5d4a3a]">{property.neighborhood}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-[#5d4a3a] mb-6 pb-2 border-b border-[#e8d5b5]">
                Contacter l'agent
              </h2>
              
              <div className="flex items-center gap-4 p-4 bg-[#f9f5f0] rounded-lg mb-6">
                <div className="w-12 h-12 rounded-full bg-[#8d7364] flex items-center justify-center text-white">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium text-[#5d4a3a]">{property.agent.name}</h4>
                  <p className="text-sm text-[#7a6652]">Agent immobilier ({property.agent.yearsOfExperience} ans d'expérience)</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setShowContactForm(!showContactForm)}
                  className="w-full bg-[#8d7364] hover:bg-[#6b594e] text-white py-3 rounded-lg font-medium transition-colors"
                >
                  {showContactForm ? 'Masquer le formulaire' : 'Envoyer un message'}
                </button>
                
                {showContactForm && (
                  <form className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Votre nom"
                        className="w-full px-4 py-2 border border-[#e0d6cc] rounded-lg focus:ring-2 focus:ring-[#8d7364] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Votre email"
                        className="w-full px-4 py-2 border border-[#e0d6cc] rounded-lg focus:ring-2 focus:ring-[#8d7364] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Votre message"
                        rows={4}
                        className="w-full px-4 py-2 border border-[#e0d6cc] rounded-lg focus:ring-2 focus:ring-[#8d7364] focus:border-transparent"
                        defaultValue={`Je suis intéressé(e) par la propriété "${property.title}"`}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#5d4a3a] hover:bg-[#4a3a2e] text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      Envoyer
                    </button>
                  </form>
                )}
                
                <div className="flex gap-2">
                  <a 
                    href={`tel:${property.agent.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-white border border-[#e0d6cc] text-[#5d4a3a] py-3 rounded-lg font-medium hover:bg-[#f5efe6] transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    Appeler
                  </a>
                  <a 
                    href={`mailto:${property.agent.email}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-white border border-[#e0d6cc] text-[#5d4a3a] py-3 rounded-lg font-medium hover:bg-[#f5efe6] transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}