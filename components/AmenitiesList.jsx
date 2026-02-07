'use client';
import { Wifi, Tv, Coffee, Utensils, Snowflake, ParkingCircle, Dumbbell, Waves } from 'lucide-react';

const amenityIcons = {
  wifi: <Wifi className="h-5 w-5" />,
  tv: <Tv className="h-5 w-5" />,
  kitchen: <Utensils className="h-5 w-5" />,
  ac: <Snowflake className="h-5 w-5" />,
  parking: <ParkingCircle className="h-5 w-5" />,
  gym: <Dumbbell className="h-5 w-5" />,
  pool: <Waves className="h-5 w-5" />,
  coffee: <Coffee className="h-5 w-5" />,
};

export default function AmenitiesList({ amenities }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {amenities.map((amenity, index) => (
        <div key={index} className="flex items-center">
          <span className="text-[#8d7364] mr-2">
            {amenityIcons[amenity.toLowerCase()] || <Coffee className="h-5 w-5" />}
          </span>
          <span className="text-[#5d4a3a] capitalize">{amenity}</span>
        </div>
      ))}
    </div>
  );
}