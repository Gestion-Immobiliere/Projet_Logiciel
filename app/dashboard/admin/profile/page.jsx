'use client';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function AdminProfilePage() {
  const { token } = useAuth();
  const [adminData, setAdminData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('/avatar-admin.png');
  const [tempImage, setTempImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setAdminData(data);
        setFormData(data);
        if (data.image) setProfileImage(data.image);
      } catch (err) {
        toast.error("Erreur lors du chargement du profil admin");
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setTempImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: formData.email,
          telephone: formData.telephone,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setAdminData((prev) => ({ ...prev, ...formData }));
      if (tempImage) {
        setProfileImage(tempImage);
        setTempImage(null);
      }

      setIsEditing(false);
      toast.success('Profil admin mis à jour');
    } catch (err) {
      toast.error(err.message || "Échec de la mise à jour");
    }
  };

  const handleCancel = () => {
    setFormData(adminData);
    setTempImage(null);
    setIsEditing(false);
  };

  if (!adminData) return <p className="text-center py-10">Chargement du profil...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Mon Profil Administrateur</h1>

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
                  className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-blue-100 text-blue-600 hover:bg-blue-200 text-sm font-medium px-3 py-1 rounded-full"
                >
                  Changer photo
                </button>
              </>
            )}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">{adminData.nom} {adminData.prenom}</h2>
            <p className="text-gray-500">Administrateur</p>
          </div>
        </div>

        <div className="w-full md:w-3/4 lg:w-4/5 space-y-8">
          {!isEditing ? (
            <>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Informations personnelles</h2>
                <p><strong>Email :</strong> {adminData.email}</p>
                <p><strong>Téléphone :</strong> {adminData.telephone}</p>
                <p><strong>Rôle :</strong> {adminData.role}</p>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Modifier le profil
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
              <div>
                <label>Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label>Téléphone</label>
                <input
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={handleCancel} className="border px-4 py-2 rounded">Annuler</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enregistrer</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
