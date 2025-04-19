import Link from 'next/link';
import Image from 'next/image';

export default function PropertyCard({ property }) {
  if (!property) {
    return <div className="text-center text-gray-600">Données du bien non disponibles.</div>;
  }

  const hasImages = property.images && property.images.length > 0;

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="border rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 bg-[#f5efe6]">
        <div className="relative h-48 bg-[#e0d6cc]">
          {hasImages ? (
            <Image
              src={property.images[0]}
              alt={property.title || 'Propriété'}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              [No Image Available]
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold text-[#8d7364] mb-2">
            {property.title || 'Titre non disponible'}
          </h3>

          <p className="text-gray-600 mb-4">
            {property.location || 'Localisation non disponible'}
          </p>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-[#8d7364]">
              {property.price
                ? `${property.price.toLocaleString()} FCFA/mois`
                : 'Prix non disponible'}
            </span>
            <span className="text-sm bg-[#ffcd9e] text-[#8d7364] px-2 py-1 rounded">
              {property.type || 'Type non disponible'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}