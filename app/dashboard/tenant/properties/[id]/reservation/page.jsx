'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ReservationPage({ params }) {
  const searchParams = useSearchParams();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservation = async () => {
      const res = await fetch(`/api/reservations/${searchParams.get('reservationId')}`);
      const data = await res.json();
      setReservation(data);
      setLoading(false);
    };

    fetchReservation();
  }, [searchParams]);

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Votre réservation</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{reservation.property.title}</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-sm text-gray-500">Dates</h3>
            <p>{new Date(reservation.startDate).toLocaleDateString()} - {new Date(reservation.endDate).toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Voyageurs</h3>
            <p>{reservation.guests} personne(s)</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Prix total</h3>
          <p className="text-2xl font-bold">{reservation.totalPrice} FCFA</p>
        </div>
      </div>
    </div>
  );
}