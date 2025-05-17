import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmationPage({ params, searchParams }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Réservation confirmée !</h1>
        <p className="text-gray-600 mb-6">
          Votre numéro de confirmation: #{searchParams.reservationId}
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
          <p className="font-medium">Prochaines étapes :</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Vous recevrez un email de confirmation</li>
            <li>L'hôte vous contactera pour les détails d'arrivée</li>
            <li>Préparez vos documents pour le check-in</li>
          </ul>
        </div>
        
        <Link
          href={`/properties/${params.id}`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
        >
          Retour à la propriété
        </Link>
      </div>
    </div>
  );
}