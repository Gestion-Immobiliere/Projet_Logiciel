import Link from 'next/link';
import { ArrowRight, Home, Building, ShieldCheck, HeartHandshake, BarChart2, MapPin, Star, BedDouble, Bath, Ruler } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import SearchBar from '@/components/SearchBar';
import Image from 'next/image';

export default function HomePage() {
  const featuredProperties = [
    {
      id: 1,
      title: "Villa Prestige aux Almadies",
      price: 4500000,
      type: "Villa",
      location: "Almadies, Dakar",
      bedrooms: 5,
      bathrooms: 4,
      surface: 320,
      images: ["/Placeholder.jpg"],
      premium: true,
      rating: 4.8
    },
    {
      id: 2,
      title: "Appartement standing au Plateau",
      price: 2500000,
      type: "Appartement",
      location: "Plateau, Dakar",
      bedrooms: 3,
      bathrooms: 2,
      surface: 180,
      images: ["/Placeholder2.jpg"],
      premium: false,
      rating: 4.5
    },
    {
      id: 3,
      title: "Studio moderne à Mermoz",
      price: 1500000,
      type: "Studio",
      location: "Mermoz, Dakar",
      bedrooms: 1,
      bathrooms: 1,
      surface: 60,
      images: ["/placeholder3.jpg"],
      premium: false,
      rating: 4.2
    },
    {
      id: 4,
      title: "Maison familiale à Yoff",
      price: 3500000,
      type: "Maison",
      location: "Yoff, Dakar",
      bedrooms: 4,
      bathrooms: 3,
      surface: 250,
      images: ["/placeholder4.jpg"],
      premium: true,
      rating: 4.7
    },
  ];

  const stats = [
    { value: "500+", label: "Propriétés disponibles" },
    { value: "95%", label: "Clients satisfaits" },
    { value: "10+", label: "Années d'expérience" },
    { value: "24h", label: "Support réactif" }
  ];

  const services = [
    {
      icon: <Home className="h-8 w-8" />,
      title: "Vente Immobilière",
      description: "Transaction sécurisée pour l'achat ou la vente de votre bien"
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "Gestion Locative",
      description: "Gestion professionnelle de vos biens en location"
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Conseil en Investissement",
      description: "Maximisez vos rendements avec nos experts"
    },
    {
      icon: <HeartHandshake className="h-8 w-8" />,
      title: "Accompagnement Personnalisé",
      description: "Un conseiller dédié à chaque client"
    }
  ];

  return (
    <main className="overflow-hidden">
      <HeroBanner
        title="L'excellence immobilière à Dakar"
        subtitle="Découvrez des propriétés d'exception adaptées à vos besoins"
        ctaText="Explorer nos biens"
      />

      {/* <div className="relative z-10 -mt-12 container mx-auto px-4">
        <SearchBar filters={['location', 'type', 'price', 'bedrooms']} />
      </div> */}

      <section className="py-16 bg-gradient-to-r from-[#f5efe6] to-[#e8d5b5]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                <p className="text-3xl font-bold text-primary-600">{stat.value}</p>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos propriétés phares</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              Découvrez notre sélection exclusive de biens immobiliers à Dakar, soigneusement choisis pour leur qualité et leur emplacement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/properties" className="inline-flex items-center px-8 py-3 bg-primary-600  rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl">
              Voir toutes nos propriétés <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f9f5f0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pourquoi nous choisir ?</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ce que disent nos clients</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-[#f9f5f0] p-8 rounded-xl">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">
                  "DakarImmo m'a trouvé la maison parfaite en moins d'une semaine. Leur service est exceptionnel et leur connaissance du marché est impressionnante."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                  <div>
                    <p className="font-medium">Aminata DIAW</p>
                    <p className="text-sm text-gray-500">Client depuis 2025</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à trouver votre propriété idéale ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Notre équipe d'experts est à votre disposition pour vous guider dans votre recherche.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="px-8 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Nous contacter
            </Link>
            <Link href="/properties" className="px-8 py-3 border-2 border-white  rounded-lg font-medium hover:bg-white/10 transition-colors">
              Voir nos biens
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function PropertyCard({ property }) {
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
    </div>
  );
}