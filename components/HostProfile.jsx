'use client';
import { User, Star, Mail, Phone, Calendar } from 'lucide-react';

export default function HostProfile({ host }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-[#5d4a3a] mb-6">Votre hôte</h2>
      
      <div className="flex items-start mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-gray-200">
          {host.avatar && (
            <img 
              src={host.avatar} 
              alt={host.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#5d4a3a]">{host.name}</h3>
          <div className="flex items-center mt-1 mb-2">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.floor(host.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">{host.rating}</span>
          </div>
          <p className="text-[#7a6652]">Membre depuis {new Date(host.joined_at).toLocaleDateString('fr-FR', {year: 'numeric'})}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <Mail className="h-5 w-5 text-[#8d7364] mr-3" />
          <a href={`mailto:${host.email}`} className="text-[#5d4a3a] hover:underline">{host.email}</a>
        </div>
        
        {host.phone && (
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-[#8d7364] mr-3" />
            <a href={`tel:${host.phone}`} className="text-[#5d4a3a] hover:underline">{host.phone}</a>
          </div>
        )}
        
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-[#8d7364] mr-3" />
          <span className="text-[#5d4a3a]">Taux de réponse : {host.responseRate || '95%'}</span>
        </div>
      </div>
      
      {host.bio && (
        <div className="mt-6">
          <h4 className="font-medium text-[#5d4a3a] mb-2">À propos</h4>
          <p className="text-[#5d4a3a]">{host.bio}</p>
        </div>
      )}
    </div>
  );
}