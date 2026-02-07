'use client';
import { useState, useEffect, useRef } from 'react';
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
  const contratInputRef = useRef(null);
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    type: '',
    categorie: '',
    localisation: '',
    prix: '',
    surface: '',
    nombreChambres: 1,
    nombreSallesBain: 1,
    statut: 'disponible',
    images: [],
    contrat: null
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [localisations, setLocalisations] = useState([]);

  // Récupérer les types, catégories et localisations depuis les API
  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const [typesRes, categoriesRes, localisationsRes] = await Promise.all([
          fetch('http://localhost:4000/api/meta/types', { headers }),
          fetch('http://localhost:4000/api/meta/categories', { headers }),
          fetch('http://localhost:4000/api/meta/localisations', { headers })
        ]);

        if (!typesRes.ok || !categoriesRes.ok || !localisationsRes.ok) {
          throw new Error('Erreur lors de la récupération des métadonnées');
        }

        const typesData = await typesRes.json();
        const categoriesData = await categoriesRes.json();
        const localisationsData = await localisationsRes.json();

        setTypes(typesData || []);
        setCategories(categoriesData || []);
        setLocalisations(localisationsData || []);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMetaData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;

    if (formData.images.length + files.length > 10) {
      setError('Vous ne pouvez pas ajouter plus de 10 photos');
      return;
    }

    // Vérifier la taille des fichiers (max 5MB)
    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setError(`Certaines images sont trop volumineuses (max 5MB)`);
      return;
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviews]);
  };

  const handleContratChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'application/pdf') {
      setError('Veuillez sélectionner un fichier PDF pour le contrat');
      return;
    }
    if (file && file.size > 10 * 1024 * 1024) {
      setError('Le contrat PDF est trop volumineux (max 10MB)');
      return;
    }
    setFormData(prev => ({ ...prev, contrat: file }));
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

  const triggerContratInput = () => {
    contratInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setUploading(true);

    if (formData.images.length < 3) {
      setError('Veuillez ajouter au moins 3 photos');
      setUploading(false);
      return;
    }

    if (!formData.type || !formData.categorie || !formData.localisation) {
      setError('Veuillez sélectionner un type, une catégorie et une localisation');
      setUploading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append('titre', formData.titre);
      data.append('description', formData.description);
      data.append('prix', formData.prix);
      data.append('type', formData.type);
      data.append('categorie', formData.categorie);
      data.append('localisation', formData.localisation);
      data.append('surface', formData.surface);
      data.append('nombreChambres', formData.nombreChambres);
      data.append('nombreSallesBain', formData.nombreSallesBain);
      data.append('statut', formData.statut);
      formData.images.forEach((image, index) => {
        data.append('images', image);
      });
      if (formData.contrat) {
        data.append('contrat', formData.contrat);
      }

      const response = await fetch('http://localhost:4000/api/biens', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: data
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création du bien');
      }

      router.push('/dashboard/owner/properties');
    } catch (err) {
      console.error('Error creating property:', err);
      setError(err.message);
    } finally {
      setUploading(false);
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
                  name="titre"
                  value={formData.titre}
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
                <option value="">Sélectionner un type</option>
                {types.map(type => (
                  <option key={type._id} value={type._id}>{type.nom}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Catégorie*</label>
              <select
                name="categorie"
                value={formData.categorie}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map(categorie => (
                  <option key={categorie._id} value={categorie._id}>{categorie.nom}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Localisation*</label>
              <select
                name="localisation"
                value={formData.localisation}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Sélectionner une localisation</option>
                {localisations.map(localisation => (
                  <option key={localisation._id} value={localisation._id}>{localisation.ville}</option>
                ))}
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
                  name="prix"
                  value={formData.prix}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Prix"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Superficie (m²)*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLayers className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="surface"
                  value={formData.surface}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Superficie"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Chambres*</label>
              <input
                type="number"
                name="nombreChambres"
                value={formData.nombreChambres}
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
                name="nombreSallesBain"
                value={formData.nombreSallesBain}
                onChange={handleChange}
                min="1"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Statut*</label>
              <select
                name="statut"
                value={formData.statut}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="disponible">Disponible</option>
                <option value="réservé">Réservé</option>
                <option value="vendu">Vendu</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Contrat (PDF)</label>
              <input
                type="file"
                ref={contratInputRef}
                accept="application/pdf"
                onChange={handleContratChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={triggerContratInput}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center"
              >
                <FiUpload className="mr-2" />
                {formData.contrat ? formData.contrat.name : 'Ajouter un contrat PDF'}
              </button>
            </div>
          </div>

          <div className="space-y-1 mb-6">
            <label className="block text-sm font-medium text-gray-700">Photos du bien*</label>
            <p className="text-xs text-gray-500 mb-2">Ajoutez au moins 3 photos (max 10, 5MB par image)</p>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
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
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
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