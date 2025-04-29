'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Lock, Mail, Loader2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isMounted) return;
    
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Identifiants incorrects');
      }

      login(data.user, data.token);
      router.push('/dashboard');
    } catch (err) {
      if (isMounted) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      }
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f4ed] via-[#f1e8d9] to-[#e8d5b5] p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl">
        {/* En-tête avec effet de profondeur */}
        <div className="relative h-40 bg-gradient-to-r from-primary-600 to-primary-700 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/texture.png')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-3xl font-bold text-white tracking-tight">Bienvenue à nouveau</h2>
            <p className="mt-2 text-primary-100/90">Accédez à votre espace sécurisé</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-500 to-primary-400"></div>
        </div>

        <div className="p-8 space-y-6">
          {error && (
            <div className="animate-fade-in rounded-xl bg-red-50/80 backdrop-blur-sm p-4 border border-red-100 shadow-sm">
              <p className="text-red-600 text-sm font-medium flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700/90">
                Adresse email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-transform group-focus-within:-translate-y-1">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/90 focus:ring-2 focus:ring-primary-400 focus:border-transparent shadow-sm transition-all duration-300 hover:border-gray-300"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700/90">
                Mot de passe
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-transform group-focus-within:-translate-y-1">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl bg-white/90 focus:ring-2 focus:ring-primary-400 focus:border-transparent shadow-sm transition-all duration-300 hover:border-gray-300"
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
            </div>

            {/* Options */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-all"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700/90">
                  Se souvenir de moi
                </label>
              </div>

              <Link 
                href="/auth/verify-mail" 
                className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors hover:underline underline-offset-4"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Bouton de connexion */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl text-lg font-semibold  bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
                  loading ? 'opacity-90 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-3 h-5 w-5" />
                    Connexion en cours...
                  </>
                ) : (
                  'Se connecter'
                )}
              </button>
            </div>
          </form>

          {/* Lien vers inscription */}
          <div className="pt-6 text-center">
            <p className="text-sm text-gray-600/90">
              Nouveau sur DakarImmo ?{' '}
              <Link 
                href="/auth/register" 
                className="font-semibold text-primary-600 hover:text-primary-500 transition-colors hover:underline underline-offset-4"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}