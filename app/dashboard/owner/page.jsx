'use client';

import { useState, useEffect, useRef } from 'react';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { PaperAirplaneIcon, UserCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function OwnerMessaging() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedTenant, setSelectedTenant] = useState(null);
  const messagesEndRef = useRef(null);

  // Données de démonstration
  const userId = 'owner-id';
  const tenants = [
    { id: 'tenant-1', name: 'Amadou', property: 'Appartement #12' },
    { id: 'tenant-2', name: 'Idriss', property: 'Maison #5' }
  ];

  // Charger les messages depuis Firestore
  useEffect(() => {
    if (!selectedTenant) return;

    const messagesQuery = query(
      collection(db, 'messages'),
      where('participants', 'array-contains', `${userId}_${selectedTenant.id}`),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const loadedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, [userId, selectedTenant]);

  // Faire défiler vers le bas
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Envoyer un message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedTenant) return;

    const messageData = {
      senderId: userId,
      receiverId: selectedTenant.id,
      content: newMessage,
      participants: [`${userId}_${selectedTenant.id}`, `${selectedTenant.id}_${userId}`],
      timestamp: serverTimestamp(),
      read: false
    };

    try {
      await addDoc(collection(db, 'messages'), messageData);
      setNewMessage('');
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-full">
      {/* Liste des locataires */}
      <div className="w-1/3 border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Messages</h2>
          <div className="mt-2 relative">
            <input
              type="text"
              placeholder="Rechercher un locataire..."
              className="w-full p-2 pl-8 border border-gray-300 rounded-md text-sm"
            />
            <svg
              className="absolute left-2 top-3 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-80px)]">
          {tenants.map((tenant) => (
            <div
              key={tenant.id}
              onClick={() => setSelectedTenant(tenant)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedTenant?.id === tenant.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{tenant.name}</h3>
                  <p className="text-sm text-gray-500">{tenant.property}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {messages.find(m => 
                    (m.senderId === tenant.id || m.receiverId === tenant.id) && 
                    !m.read && 
                    m.receiverId === userId
                  ) && (
                    <span className="h-2 w-2 bg-red-500 rounded-full inline-block"></span>
                  )}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600 truncate">
                {messages.find(m => m.senderId === tenant.id || m.receiverId === tenant.id)?.content || 
                 'Aucun message récent'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Zone de conversation */}
      {selectedTenant ? (
        <div className="flex-1 flex flex-col">
          {/* En-tête de conversation */}
          <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600">{selectedTenant.name.charAt(0)}</span>
                </div>
              </div>
              <div>
                <h2 className="font-semibold">{selectedTenant.name}</h2>
                <p className="text-sm text-gray-500">{selectedTenant.property}</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>Aucun message avec ce locataire</p>
                <p className="text-sm">Envoyez votre premier message</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex mb-4 ${
                    msg.senderId === userId ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                      msg.senderId === userId
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.senderId === userId ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {msg.timestamp?.toDate 
                        ? msg.timestamp.toDate().toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : 'Envoi...'}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Zone de saisie */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Écrivez votre message..."
                className="w-full border border-gray-300 rounded-lg pl-4 pr-12 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                rows="2"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className={`absolute right-3 bottom-3 p-1 rounded-full ${
                  newMessage.trim()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <PaperAirplaneIcon className="h-5 w-5 transform rotate-45" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center p-6 max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Sélectionnez un locataire
            </h3>
            <p className="text-gray-500">
              Choisissez un locataire dans la liste pour commencer une conversation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}