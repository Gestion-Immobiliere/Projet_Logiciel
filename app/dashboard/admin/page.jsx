'use client';

import { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

export default function AdminPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Charger tous les messages en temps réel
    const q = query(collection(db, 'messages'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages = snapshot.docs.map((doc) => doc.data());
      setMessages(loadedMessages);
    });

    return () => unsubscribe(); // Arrêter l'écoute en cas de démontage
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Section Administrateur</h1>
      <p className="mt-4 text-gray-600">
        Consultez tous les messages échangés entre les utilisateurs.
      </p>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Messagerie</h2>
        <div className="border p-4 rounded-lg h-64 overflow-y-scroll bg-gray-50">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2 p-2 rounded-lg bg-gray-200">
              <p>
                <strong>{msg.senderId} → {msg.receiverId}:</strong> {msg.content}
              </p>
              <small className="text-gray-500 text-xs">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}