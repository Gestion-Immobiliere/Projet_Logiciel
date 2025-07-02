'use client';
import { FiUser, FiMail, FiPhone, FiHome, FiCalendar, FiEdit, FiSave, FiX, FiCamera } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function OwnerProfile() {
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [editMode, setEditMode] = useState(false);
  const [ownerData, setOwnerData] = useState(null);
  const [formData, setFormData] = useState({});
  const [tempImage, setTempImage] = useState(null);

  // Charger les infos depuis le backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:4000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Erreur lors de la récupération du profil");

        setOwnerData(data);
        setFormData({
          email: data.email || '',
          telephone: data.telephone || '',
        });
      } catch (err) {
        toast.error("Impossible de charger le profil");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:4000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Échec de la mise à jour");

      toast.success("Profil mis à jour ✅");
      setOwnerData((prev) => ({ ...prev, ...formData }));
      setEditMode(false);
    } catch (err) {
      toast.error(err.message || "Erreur serveur");
    }
  };

  const handleCancel = () => {
    setFormData({
      email: ownerData?.email || '',
      telephone: ownerData?.telephone || '',
    });
    setTempImage(null);
    setEditMode(false);
  };

  if (!ownerData) return <p className="p-6 text-gray-600">Chargement du profil...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Profil Propriétaire</h1>
            {!editMode ? (
              <button 
                onClick={() => setEditMode(true)}
                className="flex items-center text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <FiEdit className="mr-2" /> Modifier
              </button>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={handleCancel}
                  className="flex items-center text-sm bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  <FiX className="mr-2" /> Annuler
                </button>
                <button 
                  onClick={handleSubmit}
                  className="flex items-center text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  <FiSave className="mr-2" /> Enregistrer
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex flex-col items-center">
              <div className="relative mb-3">
                <img 
                  src={tempImage || "/avatar-owner.png"} 
                  alt="Profil" 
                  className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                />
                {editMode && (
                  <>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button 
                      onClick={triggerFileInput}
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full flex items-center hover:bg-blue-200"
                    >
                      <FiCamera className="mr-1" /> Changer
                    </button>
                  </>
                )}
              </div>
              <h2 className="text-lg font-semibold">{ownerData.nom} {ownerData.prenom}</h2>
              <p className="text-sm text-gray-500">Propriétaire depuis {new Date(ownerData.createdAt).toLocaleDateString('fr-FR')}</p>
            </div>

            <div className="flex-1">
              {!editMode ? (
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FiMail className="text-gray-500 mt-1 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{ownerData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiPhone className="text-gray-500 mt-1 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Téléphone</p>
                      <p className="font-medium">{ownerData.telephone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiHome className="text-gray-500 mt-1 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Nombre de biens</p>
                      <p className="font-medium">—</p>
                    </div>
                  </div>
                </div>
              ) : (
                <form className="space-y-4">
                  <div className="flex items-start">
                    <FiMail className="text-gray-500 mt-3 mr-3" />
                    <div className="flex-1">
                      <label className="block text-sm text-gray-500 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiPhone className="text-gray-500 mt-3 mr-3" />
                    <div className="flex-1">
                      <label className="block text-sm text-gray-500 mb-1">Téléphone</label>
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Finances</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">Dernier paiement</p>
                <p className="font-bold text-blue-900">—</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">Solde actuel</p>
                <p className="font-bold text-green-900">—</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
