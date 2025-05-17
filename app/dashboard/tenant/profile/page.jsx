'use client';
import React, { useState, useRef } from 'react';

const TenantProfilePage = () => {
  const initialData = {
    name: "Abdoulaye DIAW",
    email: "abdoulaye.diaw@example.com",
    phone: "+221 77 123 45 67",
    currentProperty: "Appartement B12, Résidence Les Almadies",
    leaseStart: "01/03/2023",
    leaseEnd: "28/02/2024",
    rentAmount: "150 000 FCFA/mois",
    emergencyContact: "Aminata DIAW (+221 76 543 21 09)",
  };

  const [tenantData, setTenantData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150");
  const [tempImage, setTempImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTenantData(formData);
    if (tempImage) {
      setProfileImage(tempImage);
      setTempImage(null);
    }
    setIsEditing(false);
    console.log('Données mises à jour:', formData);
  };

  const handleCancel = () => {
    setFormData(tenantData);
    setTempImage(null);
    setIsEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Mon Profil Locataire</h1>
      
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="w-full md:w-1/4 lg:w-1/5 flex flex-col items-center">
          <div className="relative mb-4">
            <img 
              src={tempImage || profileImage} 
              alt="Avatar" 
              className="w-40 h-40 rounded-full border-4 border-white shadow-md object-cover"
            />
            {isEditing && (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <button 
                  type="button"
                  onClick={triggerFileInput}
                  className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-blue-100 text-blue-600 hover:bg-blue-200 text-sm font-medium px-3 py-1 rounded-full transition-colors"
                >
                  Changer photo
                </button>
              </>
            )}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">{tenantData.name}</h2>
            <p className="text-gray-500">Locataire depuis Janvier 2023</p>
          </div>
        </div>

        <div className="w-full md:w-3/4 lg:w-4/5 space-y-8">
          {!isEditing ? (
            <>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                  Informations personnelles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Nom complet</label>
                    <p className="bg-gray-50 p-3 rounded-md">{tenantData.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                    <p className="bg-gray-50 p-3 rounded-md">{tenantData.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Téléphone</label>
                    <p className="bg-gray-50 p-3 rounded-md">{tenantData.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Contact d'urgence</label>
                    <p className="bg-gray-50 p-3 rounded-md">{tenantData.emergencyContact}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                  Informations locatives
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Logement actuel</label>
                    <p className="bg-gray-50 p-3 rounded-md">{tenantData.currentProperty}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Période du bail</label>
                    <p className="bg-gray-50 p-3 rounded-md">
                      Du {tenantData.leaseStart} au {tenantData.leaseEnd}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Loyer mensuel</label>
                    <p className="bg-gray-50 p-3 rounded-md">{tenantData.rentAmount}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Modifier le profil
                </button>
              </div>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                  Modifier le profil
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Nom complet</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Contact d'urgence</label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Logement actuel</label>
                    <input
                      type="text"
                      name="currentProperty"
                      value={formData.currentProperty}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Loyer mensuel</label>
                    <input
                      type="text"
                      name="rentAmount"
                      value={formData.rentAmount}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Enregistrer les modifications
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantProfilePage;