'use client';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Votre message a été envoyé avec succès !');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (error) {
      setErrorMessage('Impossible de soumettre le formulaire. Vérifiez votre connexion.');
    }
  };

  return (
    <main className="min-h-screen bg-[#f9f5f0] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h1>
          <p className="text-gray-600">Nous sommes là pour répondre à toutes vos questions.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
            {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Envoyer
              </button>
            </form>
          </div>

          {/* Informations de contact */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                <Phone className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Téléphone</h4>
                <p className="text-gray-600">+221 33 820 98 76</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Email</h4>
                <p className="text-gray-600">contact@dakarimmo.sn</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Adresse</h4>
                <p className="text-gray-600">Dakar, Sénégal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}