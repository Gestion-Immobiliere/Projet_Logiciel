'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, Home, Briefcase, Eye, EyeOff, Loader2, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { toast } from "sonner"



export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    adresseMail: '',
    numTel: '',
    motDePasse: '',
    confirmPassword: '',
    role: 'locataire',
  });
  
  const [validation, setValidation] = useState({
    passwordStrength: 0,
    passwordMatch: false,
    emailValid: false,
    phoneValid: false
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeField, setActiveField] = useState('');
  const formRef = useRef(null);
  const router = useRouter();


  useEffect(() => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let strength = 0;
    
    if (formData.motDePasse.length >= 8) strength += 1;
    if (/[A-Z]/.test(formData.motDePasse)) strength += 1;
    if (/[0-9]/.test(formData.motDePasse)) strength += 1;
    if (/[@$!%*?&]/.test(formData.motDePasse)) strength += 1;
    
    setValidation({
      passwordStrength: strength,
      passwordMatch: formData.motDePasse === formData.confirmPassword && formData.motDePasse !== '',
      emailValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.adresseMail),
      phoneValid: /^[0-9]{9,15}$/.test(formData.numTel.replace(/\D/g, ''))
    });
  }, [formData]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const roleMap = {
      locataire: 'client',
      agent_immobilier: 'agent'
    }

    const response = await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.adresseMail,
        telephone: formData.numTel.replace(/\D/g, ''),
        password: formData.motDePasse,
        confirmPassword: formData.confirmPassword,
        role: roleMap[formData.role] || 'client'
      }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Erreur lors de l'inscription");

   toast("Inscription réussie 🎉", {
  description: "Redirection vers la page de connexion..."
});


    setTimeout(() => router.push('/auth/login'), 2000);
  } catch (err) {
    toast("Erreur",{
      description: err instanceof Error ? err.message : "Une erreur est survenue",
      variant: "destructive"
    })
  } finally {
    setLoading(false);
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); 
    const formattedValue = value
      .slice(0, 9) 
      .replace(/(\d{2})(\d{3})(\d{3})/, '$1 $2 $3');
    setFormData((prev) => ({ ...prev, numTel: formattedValue }));
  };


  const PasswordStrengthIndicator = () => (
    <div className="mt-2">
      <div className="flex gap-1 h-1">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className={`flex-1 rounded-full transition-all duration-500 ${
              i < validation.passwordStrength 
                ? i < 2 ? 'bg-red-400' : i < 3 ? 'bg-yellow-400' : 'bg-green-500'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className="text-xs mt-1 text-gray-500">
        {validation.passwordStrength === 0 ? 'Très faible' :
         validation.passwordStrength === 1 ? 'Faible' :
         validation.passwordStrength === 2 ? 'Moyen' :
         validation.passwordStrength === 3 ? 'Fort' : 'Très fort'}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f4ed] via-[#f1e8d9] to-[#e8d5b5] p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        <div className="relative h-40 bg-gradient-to-r from-primary-600 to-primary-700 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/texture.png')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-3xl font-bold text-white tracking-tight">Rejoignez DakarImmo</h2>
            <p className="mt-2 text-primary-100/90">Créez votre compte en quelques étapes</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-300"></div>
        </div>

        <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="md:col-span-2 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700/90">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <div className={`relative group transition-all duration-300 ${activeField === 'nom' ? 'scale-[1.01]' : ''}`}>
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300 ${activeField === 'nom' ? 'text-primary-500 -translate-y-0.5' : 'text-gray-400'}`}>
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    required
                    value={formData.nom}
                    onChange={handleChange}
                    onFocus={() => setActiveField('nom')}
                    onBlur={() => setActiveField('')}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white/95 focus:ring-2 focus:ring-primary-400/50 focus:border-transparent shadow-sm transition-all duration-300 hover:border-gray-300"
                    placeholder="Votre prénom"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700/90">
                  Nom <span className="text-red-500">*</span>
                </label>
                <div className={`relative group transition-all duration-300 ${activeField === 'prenom' ? 'scale-[1.01]' : ''}`}>
                  <input
                    id="prenom"
                    name="prenom"
                    type="text"
                    required
                    value={formData.prenom}
                    onChange={handleChange}
                    onFocus={() => setActiveField('prenom')}
                    onBlur={() => setActiveField('')}
                    className="block w-full px-3 py-3 border border-gray-200 rounded-xl bg-white/95 focus:ring-2 focus:ring-primary-400/50 focus:border-transparent shadow-sm transition-all duration-300 hover:border-gray-300"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="adresseMail" className="block text-sm font-medium text-gray-700/90">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className={`relative group transition-all duration-300 ${activeField === 'adresseMail' ? 'scale-[1.01]' : ''}`}>
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300 ${activeField === 'adresseMail' ? 'text-primary-500 -translate-y-0.5' : 'text-gray-400'}`}>
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    id="adresseMail"
                    name="adresseMail"
                    type="adresseMail"
                    required
                    value={formData.adresseMail}
                    onChange={handleChange}
                    onFocus={() => setActiveField('adresseMail')}
                    onBlur={() => setActiveField('')}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white/95 focus:ring-2 focus:ring-primary-400/50 focus:border-transparent shadow-sm transition-all duration-300 hover:border-gray-300"
                    placeholder="votre@email.com"
                  />
                  {formData.adresseMail && (
                    <div className="absolute right-3 top-3">
                      {validation.emailValid ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="numTel" className="block text-sm font-medium text-gray-700/90">
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <div className={`relative group transition-all duration-300 ${activeField === 'numTel' ? 'scale-[1.01]' : ''}`}>
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300 ${activeField === 'numTel' ? 'text-primary-500 -translate-y-0.5' : 'text-gray-400'}`}>
                    <Phone className="h-5 w-5" />
                  </div>
                  <input
                    id="numTel"
                    name="numTel"
                    type="tel"
                    required
                    value={formData.numTel}
                    onChange={handlePhoneChange}
                    onFocus={() => setActiveField('numTel')}
                    onBlur={() => setActiveField('')}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white/95 focus:ring-2 focus:ring-primary-400/50 focus:border-transparent shadow-sm transition-all duration-300 hover:border-gray-300"
                    placeholder="77 123 45 67"
                  />
                  {formData.numTel && (
                    <div className="absolute right-3 top-3">
                      {validation.phoneValid ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700/90">
                  Vous êtes <span className="text-red-500">*</span>
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full px-3 py-3 border border-gray-200 rounded-xl bg-white/95 focus:ring-2 focus:ring-primary-400/50 focus:border-transparent shadow-sm transition-all duration-300 hover:border-gray-300"
                >
                  <option value="locataire">Locataire</option>
                  <option value="agent_immobilier">Agent Immobilier</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="motDePasse" className="block text-sm font-medium text-gray-700/90">
                  Mot de passe <span className="text-red-500">*</span>
                </label>
                <div className={`relative group transition-all duration-300 ${activeField === 'motDePasse' ? 'scale-[1.01]' : ''}`}>
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300 ${activeField === 'motDePasse' ? 'text-primary-500 -translate-y-0.5' : 'text-gray-400'}`}>
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    id="motDePasse"
                    name="motDePasse"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    value={formData.motDePasse}
                    onChange={handleChange}
                    onFocus={() => setActiveField('motDePasse')}
                    onBlur={() => setActiveField('')}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl bg-white/95 focus:ring-2 focus:ring-primary-400/50 focus:border-transparent shadow-sm transition-all duration-300 hover:border-gray-300"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary-500 transition-colors"
                    aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <PasswordStrengthIndicator />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 8 caractères, majuscule, chiffre et caractère spécial
                </p>
              </div>

              <div className="space-y-1">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700/90">
                  Confirmez le mot de passe <span className="text-red-500">*</span>
                </label>
                <div className={`relative group transition-all duration-300 ${activeField === 'confirmPassword' ? 'scale-[1.01]' : ''}`}>
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300 ${activeField === 'confirmPassword' ? 'text-primary-500 -translate-y-0.5' : 'text-gray-400'}`}>
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setActiveField('confirmPassword')}
                    onBlur={() => setActiveField('')}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl bg-white/95 focus:ring-2 focus:ring-primary-400/50 focus:border-transparent shadow-sm transition-all duration-300 hover:border-gray-300"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary-500 transition-colors"
                    aria-label={showConfirmPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  {formData.confirmPassword && (
                    <div className="absolute right-10 top-3">
                      {validation.passwordMatch ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-all"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-700/90">
                  J'accepte les{' '}
                  <Link href="/terms" className="font-medium text-primary-600 hover:text-primary-500 transition-colors hover:underline underline-offset-4">
                    conditions d'utilisation
                  </Link>{' '}
                  et la{' '}
                  <Link href="/privacy" className="font-medium text-primary-600 hover:text-primary-500 transition-colors hover:underline underline-offset-4">
                    politique de confidentialité
                  </Link>
                </label>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || !validation.emailValid || !validation.phoneValid || !validation.passwordMatch || formData.passwordStrength < 3}
                className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl text-lg font-semibold  bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
                  loading ? 'opacity-90 cursor-not-allowed' : ''
                } ${
                  !validation.emailValid || !validation.phoneValid || !validation.passwordMatch || formData.passwordStrength < 3 ? 
                  'opacity-70 cursor-not-allowed grayscale-[30%]' : ''
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-3 h-5 w-5" />
                    Création en cours...
                  </>
                ) : (
                  'Créer mon compte'
                )}
              </button>
            </div>
          </form>
          {success && (
            <div className="md:col-span-2 animate-fade-in-up rounded-xl bg-green-50/90 backdrop-blur-sm p-4 border border-green-200 shadow-sm">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <p className="text-green-700 font-medium">
                  Inscription réussie ! Redirection en cours...
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="md:col-span-2 animate-fade-in-up rounded-xl bg-red-50/90 backdrop-blur-sm p-4 border border-red-200 shadow-sm">
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}


          <div className="md:col-span-2 pt-6 text-center">
            <p className="text-sm text-gray-600/90">
              Déjà un compte ?{' '}
              <Link 
                href="/auth/login" 
                className="font-semibold text-primary-600 hover:text-primary-500 transition-colors hover:underline underline-offset-4"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}