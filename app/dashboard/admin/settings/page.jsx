'use client';
import { useState } from 'react';

export default function AdminSettings() {
  const [emailAlerts, setEmailAlerts] = useState(true); 

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Configuration</h1>
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <section>
          <h2 className="font-semibold mb-3">Notifications</h2>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="toggle"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)} 
              />
              <span>Alertes par email</span>
            </label>
          </div>
        </section>
        <section className="border-t pt-4">
          <h2 className="font-semibold mb-3">Sécurité</h2>
          <button className="btn-danger">Réinitialiser tous les mots de passe</button>
        </section>
      </div>
    </div>
  );
}