'use client';

import { Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
export default function ForgotPasswordPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);
    const [formData, setFormData] = useState ({
        password : "",
        newpassword : ""
    });

    const handleChange = (e) => {
        e.preventDefault();
        setFormData((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }));
    }; 
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("password", formData.password);
        formDataToSend.append("newpassword", formData.newpassword);
    }

    return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="p-15 mt-2 text-center">Reinitialisation du mot de passe</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <label className="text-sm block mb-3" htmlFor="password">Votre nouveau mot de passe</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-transform group-focus-within:-translate-y-1">
                        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                    </div>
                    <input 
                        className="border pl-10 pr-4 py-3 border-gray-200 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent shadow-sm transition-all duration-300 hover:border-gray-300 pl-10 p-2  w-full" 
                        placeholder="••••••••" 
                        type={showPassword ? "text" : "password"} 
                        id="password" 
                        name="password"
                        value = {formData.password}
                        onChange={handleChange}

                    />
                    <button 
                        type="button"
                        onClick = {() => setShowPassword(!showPassword)}
                        aria-label = {showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary-500 transition-colors"
                    >
                        {showPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
                <label className="text-sm block mb-3" htmlFor="newpassword">Confirmez votre nouveau mot de passe</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-transform group-focus-within:-translate-y-1">
                        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                    </div>
                    <input 
                        className="border pl-10 pr-4 py-3 border-gray-200 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent shadow-sm transition-all duration-300 hover:border-gray-300 pl-10 p-2  w-full" 
                        placeholder="••••••••" 
                        type={showConfirmPassword ? "text" : "password"}  
                        id="newpassword" 
                        name="newpassword"
                        value = {formData.newpassword}
                        onChange={handleChange}

                    />
                    <button
                        type="button"
                        onClick={(e) => setConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary-500 transition-colors"
                        aria-label = {showConfirmPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                    >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
                <button className="mt-8 p-2 w-full border border-transparent shadow-lg rounded-xl text-lg font-semibold bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer" type="submit">Valider</button>
            </form>
        </div>
        
    </div>
  )
}
