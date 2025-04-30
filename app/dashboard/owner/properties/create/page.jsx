'use client';
import { useState, useRef } from 'react';
import { 
  FiSave, 
  FiX, 
  FiHome, 
  FiMapPin, 
  FiDollarSign, 
  FiLayers, 
  FiUpload, 
  FiTrash2,
  FiCamera
} from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreatePropertyPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'appartement',
    price: '',
    address: '',
    bedrooms: 1,
    bathrooms: 1,
    area: '',
    published: false,
    images: []
  });
  const [uploading, setUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (formData.images.length + files.length > 10) {
      setError('Vous ne pouvez pas ajouter plus de 10 photos');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`L'image ${file.name} est trop volumineuse (max 5MB)`);
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', 'property_images');

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData
          }
        );

        if (!response.ok) {
          throw new Error('Échec du téléchargement');
        }

        return await response.json();
      });

      const results = await Promise.all(uploadPromises);
      const uploadedUrls = results.map(result => result.secure_url);

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));

      const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
      setPreviewImages(prev => [...prev, ...newPreviews]);

    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Erreur lors du téléchargement des images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData(prev => ({ ...prev, images: newImages }));

    const newPreviews = [...previewImages];
    URL.revokeObjectURL(newPreviews[index]); 
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.images.length < 3) {
      setError('Veuillez ajouter au moins 3 photos');
      return;
    }

    try {
      const response = await fetch('/api/owner/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      router.push('/dashboard/owner/properties');
    } catch (err) {
      console.error('Error creating property:', err);
      setError(err.message || 'Erreur lors de la création du bien');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ajouter un nouveau bien</h1>
        <Link
          href="/dashboard/owner/properties"
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <FiX className="mr-1" /> Annuler
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Titre*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiHome className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Titre du bien"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Type*</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="appartement">Appartement</option>
                <option value="maison">Maison</option>
                <option value="villa">Villa</option>
                <option value="bureau">Bureau</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Prix (FCFA)*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Prix"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Adresse*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMapPin className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Adresse complète"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Chambres*</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                min="1"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Salles de bain*</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                min="1"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Superficie (m²)*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLayers className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Superficie"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Statut</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({...formData, published: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Publier immédiatement</span>
              </div>
            </div>
          </div>

          <div className="space-y-1 mb-6">
            <label className="block text-sm font-medium text-gray-700">Photos du bien*</label>
            <p className="text-xs text-gray-500 mb-2">Ajoutez au moins 3 photos (max 10)</p>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              multiple
              className="hidden"
            />

            <div className="flex flex-wrap gap-4 mb-4">
              {previewImages.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={triggerFileInput}
                disabled={uploading || formData.images.length >= 10}
                className={`w-32 h-32 flex flex-col items-center justify-center rounded-lg border-2 border-dashed ${
                  uploading || formData.images.length >= 10 
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500 cursor-pointer'
                } transition-colors`}
              >
                <FiCamera className="mb-2" size={24} />
                <span className="text-xs">Ajouter des photos</span>
                <span className="text-xs text-gray-500">{formData.images.length}/10</span>
              </button>
            </div>

            {uploading && (
              <div className="flex items-center text-sm text-blue-600">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Téléchargement en cours...
              </div>
            )}
          </div>

          <div className="space-y-1 mb-6">
            <label className="block text-sm font-medium text-gray-700">Description*</label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Description détaillée du bien..."
              required
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push('/dashboard/owner/properties')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  En cours...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" /> Enregistrer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}