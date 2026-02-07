'use client';
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Send, User, Smile, Paperclip } from 'lucide-react';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [inputError, setInputError] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const socketRef = useRef();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3001');

    socketRef.current.on('connect', () => {
      setIsConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
    });

    socketRef.current.on('chatMessage', (msg) => {
      setMessages(prev => [...prev, { ...msg, type: 'user' }]);
    });

    socketRef.current.on('systemMessage', (msg) => {
      setMessages(prev => [...prev, { ...msg, type: 'system' }]);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleJoinChat = (e) => {
    e.preventDefault(); 

    if (username.trim().length >= 3 && socketRef.current) {
      console.log('Rejoindre le chat avec le nom:', username);

      socketRef.current.emit('register', username, (response) => {
        if (response.success) {
          console.log('Enregistrement réussi:', response.message);
          setIsRegistered(true); 
        } else {
          console.error('Erreur d\'enregistrement:', response.message);
          setInputError(response.message); 
        }
      });
    } else {
      console.log('Nom invalide ou socket non initialisé');
      setInputError('Le pseudo doit contenir au moins 3 caractères');
    }
  };

  const sendMessage = () => {
    if (message.trim() && socketRef.current) {
      socketRef.current.emit('chatMessage', message.trim());
      setMessage('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 h-screen flex flex-col bg-gray-50 mt-16">
      {!isRegistered ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-center mb-6">Rejoindre le chat</h2>
            <form onSubmit={handleJoinChat} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Votre pseudo
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setInputError('');
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                    inputError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="3-20 caractères (lettres, chiffres)"
                />
                {inputError && (
                  <p className="text-red-500 text-xs mt-1">{inputError}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={username.length < 3}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <User size={18} />
                Rejoindre le chat
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-t-xl p-4 border-b border-gray-200 flex justify-between items-center shadow-sm">
            <div>
              <h1 className="text-xl font-bold">Chat en direct</h1>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                {isConnected ? 'Connecté' : 'Déconnecté'} • {username}
              </p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-white">
            <div className="space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.type === 'system' ? 'justify-center' : msg.username === username ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.type === 'system' ? 'bg-gray-100 text-gray-600 text-xs text-center' :
                    msg.username === username ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {msg.type === 'user' && msg.username !== username && (
                      <p className="font-semibold text-sm">{msg.username}</p>
                    )}
                    <p>{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.username === username ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <div className="bg-white rounded-b-xl p-4 border-t border-gray-200 shadow-sm">
            <div className="flex gap-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                <Paperclip size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                <Smile size={20} />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Écrivez votre message..."
              />
              <button
                onClick={sendMessage}
                disabled={!message.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}