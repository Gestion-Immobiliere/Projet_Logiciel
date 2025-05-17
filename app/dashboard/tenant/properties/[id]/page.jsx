import PropertyDetails from './components/PropertyDetails';
import BookingWidget from './components/BookingWidget';

async function getProperty(id) {
  const res = await fetch(`http://localhost:3000/api/properties/${id}`);
  if (!res.ok) throw new Error('Failed to fetch property');
  return res.json();
}

export default async function PropertyPage({ params }) {
  const property = await getProperty(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne de gauche - Détails */}
        <div className="lg:col-span-2">
          <PropertyDetails property={property} />
        </div>
        
        {/* Colonne de droite - Widget de réservation */}
        <div className="sticky top-4 h-fit">
          <BookingWidget property={property} />
        </div>
      </div>
    </div>
  );
}