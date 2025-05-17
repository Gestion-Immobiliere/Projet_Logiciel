'use client';
import { FiUser, FiMail, FiLock, FiSettings, FiCreditCard, FiLogOut, FiEdit, FiSave, FiX, FiCamera } from 'react-icons/fi';
import { useState, useRef } from 'react';

export default function AdminProfile() {
  const [editMode, setEditMode] = useState(false);
  const [adminData, setAdminData] = useState({
    name: "Mamadou Diop",
    email: "admin@immo.sn",
    role: "Super Administrateur",
    lastLogin: "Aujourd'hui à 10:30",
    phone: "+221 77 123 45 67",
    joinDate: "15 Janvier 2022",
    profileImage: "https://via.placeholder.com/150"
  });
  const [formData, setFormData] = useState({...adminData});
  const [tempImage, setTempImage] = useState(null);
  const fileInputRef = useRef(null);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({...passwordData, [name]: value});
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        setMessage({ type: "error", text: "Veuillez sélectionner une image valide (JPEG, PNG)" });
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setMessage({ type: "error", text: "L'image ne doit pas dépasser 2MB" });
        return;
      }

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
    const updatedData = {
      ...formData,
      profileImage: tempImage || adminData.profileImage
    };
    setAdminData(updatedData);
    setTempImage(null);
    setEditMode(false);
    setMessage({ type: "success", text: "Profil mis à jour avec succès !" });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setMessage({ type: "error", text: "Veuillez remplir tous les champs !" });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "Les nouveaux mots de passe ne correspondent pas !" });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setMessage({ type: "error", text: "Le mot de passe doit contenir au moins 8 caractères" });
      return;
    }

    setMessage({ type: "success", text: "Mot de passe changé avec succès !" });
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setShowPasswordForm(false);
  };

  const handleCancel = () => {
    setFormData(adminData);
    setTempImage(null);
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4 space-y-3">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img 
                    src={tempImage || adminData.profileImage} 
                    alt="Admin" 
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
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
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full hover:bg-blue-200"
                      >
                        <FiCamera className="inline mr-1" /> Changer
                      </button>
                    </>
                  )}
                </div>
                <h2 className="text-lg font-semibold">{adminData.name}</h2>
                <p className="text-sm text-gray-500">{adminData.role}</p>
              </div>
            </div>

            
          </div>

          <div className="w-full md:w-3/4">
            {message.text && (
              <div className={`mb-4 p-3 rounded-md ${
                message.type === "error" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
              }`}>
                {message.text}
              </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold text-gray-800">Mon Profil Administrateur</h1>
                {!editMode ? (
                  <button 
                    onClick={() => setEditMode(true)}
                    className="btn-primary py-2 px-4"
                  >
                    <FiEdit className="mr-2" /> Modifier
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button 
                      onClick={handleCancel}
                      className="btn-outline py-2 px-4"
                    >
                      <FiX className="mr-2" /> Annuler
                    </button>
                    <button 
                      onClick={handleSubmit}
                      className="btn-primary py-2 px-4"
                    >
                      <FiSave className="mr-2" /> Enregistrer
                    </button>
                  </div>
                )}
              </div>

              {!editMode ? (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Nom complet</label>
                      <p className="p-3 bg-gray-50 rounded-md">{adminData.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Rôle</label>
                      <p className="p-3 bg-gray-50 rounded-md">{adminData.role}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Email</label>
                      <p className="p-3 bg-gray-50 rounded-md">{adminData.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Téléphone</label>
                      <p className="p-3 bg-gray-50 rounded-md">{adminData.phone}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Date d'adhésion</label>
                      <p className="p-3 bg-gray-50 rounded-md">{adminData.joinDate}</p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Dernière connexion</label>
                      <p className="p-3 bg-gray-50 rounded-md">{adminData.lastLogin}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <form className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Nom complet</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Rôle</label>
                      <input
                        type="text"
                        disabled
                        value={formData.role}
                        className="w-full p-3 bg-gray-100 rounded-md cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </form>
              )}
            </div>

            {showPasswordForm && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Changer le mot de passe</h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Mot de passe actuel</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Nouveau mot de passe</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      required
                      minLength="8"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Confirmer le nouveau mot de passe</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      required
                      minLength="8"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowPasswordForm(false)}
                      className="btn-outline py-2 px-4"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="btn-primary py-2 px-4"
                    >
                      Enregistrer
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn-primary {
          background-color: #3b82f6;
          color: white;
          border-radius: 0.375rem;
          transition: background-color 0.2s;
        }
        .btn-primary:hover {
          background-color: #2563eb;
        }
        .btn-outline {
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          transition: background-color 0.2s;
        }
        .btn-outline:hover {
          background-color: #f3f4f6;
        }
      `}</style>
    </div>
  );
}