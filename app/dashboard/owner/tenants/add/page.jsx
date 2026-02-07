'use client';
import { FiArrowLeft, FiSave, FiUser, FiPhone, FiMail, FiHome, FiCalendar, FiFileText } from 'react-icons/fi';
import Link from 'next/link';
import { useState } from 'react';

export default function AddTenantPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    property: '',
    startDate: '',
    rentAmount: '',
    additionalInfo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link 
          href="/dashboard/owner/tenants" 
          className="p-2 mr-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft className="mr-1" size={18} />
          <span className="text-sm font-medium">Retour</span>
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Ajouter un locataire</h1>
      </div>

      <div className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiUser className="mr-2 text-blue-600" />
              Informations personnelles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Nom complet*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FiUser size={16} />
                  </div>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Prénom Nom"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Email*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FiMail size={16} />
                  </div>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="email@exemple.com"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Téléphone*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FiPhone size={16} />
                  </div>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="06 12 34 56 78"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiHome className="mr-2 text-blue-600" />
              Détails de la location
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Bien immobilier*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FiHome size={16} />
                  </div>
                  <select 
                    name="property"
                    value={formData.property}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    required
                  >
                    <option value="">Sélectionner un bien</option>
                    <option value="apt-t2-paris">Appartement T2 Paris</option>
                    <option value="house-lyon">Maison Lyon</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Date d'entrée*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FiCalendar size={16} />
                  </div>
                  <input 
                    type="date" 
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Loyer mensuel*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FiFileText size={16} />
                  </div>
                  <input 
                    type="number" 
                    name="rentAmount"
                    value={formData.rentAmount}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Montant en FCFA"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Informations additionnelles</h2>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea 
                rows={4}
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Informations complémentaires sur le locataire..."
              ></textarea>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <p className="text-xs text-gray-500">* Champs obligatoires</p>
            <button
              type="submit"
              className="flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <FiSave className="mr-2" size={16} />
              Enregistrer le locataire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}