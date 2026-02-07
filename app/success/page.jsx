'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reservationId = searchParams.get('reservationId');
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push(`/login?redirect=/success?reservationId=${reservationId}`);
      return;
    }

    const verifyAndFetchReservation = async () => {
      try {
        // Vérifier le paiement
        const verifyResponse = await fetch(`http://localhost:4000/api/reservations/verify-payment/${reservationId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!verifyResponse.ok) {
          const errorData = await verifyResponse.json();
          if (verifyResponse.status === 401) {
            router.push(`/login?redirect=/success?reservationId=${reservationId}`);
            return;
          }
          throw new Error(errorData.message || 'Erreur lors de la vérification du paiement');
        }

        // Récupérer les détails de la réservation
        const reservationResponse = await fetch(`http://localhost:4000/api/reservations/${reservationId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!reservationResponse.ok) {
          const errorData = await reservationResponse.json();
          throw new Error(errorData.message || 'Réservation non trouvée');
        }
        const data = await reservationResponse.json();
        setReservation(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (reservationId) {
      verifyAndFetchReservation();
    } else {
      setError('Aucun ID de réservation fourni');
      setLoading(false);
    }
  }, [reservationId, router]);

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f5f0]">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#5d4a3a] mb-4">
          {reservation.status === 'confirmée' ? 'Réservation confirmée !' : 'Réservation en attente'}
        </h2>
        <p className="text-[#7a6652] mb-6">Votre réservation pour {reservation.bien.titre} est {reservation.status}.</p>
        <p className="text-[#7a6652] mb-6">Date de paiement : {new Date(reservation.datePaiement).toLocaleDateString('fr-FR')}</p>
        <p className="text-[#7a6652] mb-6">Durée de location : {reservation.dureeValidite} jours</p>
        <p className="text-[#7a6652] mb-6">Montant : {new Intl.NumberFormat('fr-FR').format(reservation.montant)} FCFA</p>
        <Link href="/properties" className="bg-[#8d7364] text-white px-6 py-2 rounded-lg">
          Retour aux propriétés
        </Link>
      </div>
    </div>
  );
}