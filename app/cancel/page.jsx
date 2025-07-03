'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CancelPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reservationId = searchParams.get('reservationId');
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push(`/login?redirect=/cancel?reservationId=${reservationId}`);
      return;
    }

    const cancelReservation = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/reservations/verify-payment/${reservationId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 401) {
            router.push(`/login?redirect=/cancel?reservationId=${reservationId}`);
            return;
          }
          throw new Error(errorData.message || 'Erreur lors de l\'annulation');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (reservationId) {
      cancelReservation();
    } else {
      setError('Aucun ID de réservation fourni');
    }
  }, [reservationId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f5f0]">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#5d4a3a] mb-4">Paiement annulé</h2>
        <p className="text-[#7a6652] mb-6">Votre réservation (ID: {reservationId || 'inconnu'}) a été annulée.</p>
        {error && <p className="text-red-500 mb-6">{error}</p>}
        <Link href="/properties" className="bg-[#8d7364] text-white px-6 py-2 rounded-lg">
          Retour aux propriétés
        </Link>
      </div>
    </div>
  );
}