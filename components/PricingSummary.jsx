export default function PricingSummary({ property, dates }) {
  const nights = Math.ceil((dates.endDate - dates.startDate) / (1000 * 60 * 60 * 24));
  const subtotal = nights * property.pricePerNight;
  const serviceFee = subtotal * 0.12; 
  const total = subtotal + serviceFee;

  return (
    <div className="border-t pt-4 space-y-2">
      <div className="flex justify-between">
        <span>{property.pricePerNight} FCFA x {nights} nuit{nights > 1 ? 's' : ''}</span>
        <span>{subtotal} FCFA</span>
      </div>
      <div className="flex justify-between">
        <span>Frais de service</span>
        <span>{serviceFee.toFixed(0)} FCFA</span>
      </div>
      <div className="flex justify-between font-bold text-lg pt-2 border-t">
        <span>Total</span>
        <span>{total.toFixed(0)} FCFA</span>
      </div>
    </div>
  );
}