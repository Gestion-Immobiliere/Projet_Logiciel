import Link from 'next/link';
import { ArrowRight, HeartOff } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';

export default function FavoritePage() {
  const favorites = [
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

  return (
    <main className="overflow-hidden">
      <section className="bg-gradient-to-r from-[#f5efe6] to-[#e8d5b5] py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Vos favoris</h1>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Retrouvez toutes vos propriétés coup de cœur
          </p>
        </div>
      </section>

      {/* Liste des favoris */}
      <section className="py-16 bg-[#f9f5f0]">
        <div className="container mx-auto px-4">
          {favorites.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {favorites.map((property) => (
                  <div key={property.id} className="relative">
                    <div className="absolute top-4 right-4 z-10 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Favori
                    </div>
                    <div className= "[&_.property-title]:line-clamp-1">
                      <PropertyCard property={property} />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link 
                  href="/properties" 
                  className="inline-flex items-center px-8 py-3 bg-primary-600 text-[#8d7364]"
                >
                  Retour à l'exploration <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <HeartOff className="h-20 w-20 mx-auto text-primary-600/30 mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Aucun favori pour le moment</h2>
              <Link
                href="/properties"
                className="inline-flex items-center px-8 py-3 bg-primary-600 text-[#8d7364] rounded-lg hover:bg-primary-700 transition-colors"
              >
                Découvrir nos biens
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}