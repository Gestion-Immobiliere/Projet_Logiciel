'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { 
  PaperAirplaneIcon, 
  UserCircleIcon, 
  ArrowLeftIcon,
  EllipsisVerticalIcon,
  PaperClipIcon,
  CheckIcon,
  ClockIcon,
  PhotoIcon,
  DocumentIcon
} from '@heroicons/react/24/outline';
import { useDropzone } from 'react-dropzone';

export default function TenantMessaging() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Données utilisateur (à remplacer par votre système d'authentification)
  const userId = 'tenant-id';
  const userData = {
    name: 'Babacar',
    avatar: null
  };
  
  // Données du propriétaire (pourrait venir d'une API ou Firestore)
  const receiverData = {
    id: 'owner-id',
    name: 'M. DIAW',
    role: 'Propriétaire',
    property: 'Appartement B3 - Résidence Les Jardins',
    avatar: null,
    online: true
  };

  // Gestion des fichiers avec Dropzone
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      handleFileUpload(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    maxFiles: 1,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg'],
      'application/pdf': ['.pdf']
    }
  });

  // Charger les messages depuis Firestore
  useEffect(() => {
    const messagesQuery = query(
      collection(db, 'messages'),
      where('participants', 'array-contains', `${userId}_${receiverData.id}`),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const loadedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convertir le timestamp Firestore en Date
        timestamp: doc.data().timestamp?.toDate 
          ? doc.data().timestamp.toDate() 
          : new Date()
      }));
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, [userId, receiverData.id]);

  // Faire défiler vers le bas quand de nouveaux messages arrivent
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Envoyer un message texte
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      senderId: userId,
      receiverId: receiverData.id,
      content: newMessage,
      participants: [`${userId}_${receiverData.id}`, `${receiverData.id}_${userId}`],
      timestamp: serverTimestamp(),
      read: false,
      replyTo: replyingTo?.id
    };

    try {
      await addDoc(collection(db, 'messages'), messageData);
      setNewMessage('');
      setReplyingTo(null);
      
      // Réinitialiser la hauteur du textarea
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
    }
  };

  // Gestion de l'upload de fichiers
  const handleFileUpload = async (file) => {
    const fileId = Math.random().toString(36).substring(2, 9);
    
    // Créer une référence au fichier dans Firestore
    const fileMessage = {
      id: fileId,
      senderId: userId,
      receiverId: receiverData.id,
      participants: [`${userId}_${receiverData.id}`, `${receiverData.id}_${userId}`],
      file: {
        name: file.name,
        type: file.type,
        size: file.size,
        // En production, vous stockeriez le fichier dans Firebase Storage
        // et ajouteriez ici l'URL de téléchargement
        url: null
      },
      timestamp: serverTimestamp(),
      read: false,
      status: 'uploading'
    };

    try {
      // Ajouter le message fichier à Firestore
      await addDoc(collection(db, 'messages'), fileMessage);
      setIsMenuOpen(false);
      
      // Simuler la progression de l'upload (en production, utiliser Firebase Storage)
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return null;
          }
          return prev + 10;
        });
      }, 200);
      
    } catch (error) {
      console.error("Erreur lors de l'envoi du fichier:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Composants UI réutilisables
  const StatusIndicator = ({ status }) => {
    switch (status) {
      case 'uploading':
        return <ClockIcon className="h-3 w-3 text-gray-400" />;
      case 'delivered':
        return <CheckIcon className="h-3 w-3 text-gray-400" />;
      default:
        return null;
    }
  };

  const FilePreview = ({ file }) => {
    if (file?.type?.startsWith('image/')) {
      return (
        <div className="relative group">
          <div className="bg-gray-200 rounded-lg overflow-hidden w-48 h-32 flex items-center justify-center">
            <PhotoIcon className="h-10 w-10 text-gray-400" />
          </div>
          <span className="text-xs text-gray-500 truncate">{file.name}</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg">
        <DocumentIcon className="h-8 w-8 text-gray-400" />
        <div>
          <p className="text-sm font-medium truncate max-w-xs">{file?.name}</p>
          <p className="text-xs text-gray-500">
            {file?.size ? `${(file.size / 1024).toFixed(1)} KB` : ''}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="flex flex-col h-screen bg-gray-50"
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      {/* En-tête de la conversation */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                className="md:hidden text-gray-500 hover:text-gray-700"
                onClick={() => window.history.back()}
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              
              <div className="relative">
                {receiverData.avatar ? (
                  <img 
                    src={receiverData.avatar} 
                    alt={receiverData.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <UserCircleIcon className="h-10 w-10 text-gray-400" />
                )}
                <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                  receiverData.online ? 'bg-green-500' : 'bg-gray-400'
                }`} />
              </div>
              
              <div>
                <h2 className="font-semibold text-gray-800">{receiverData.name}</h2>
                <p className="text-xs text-gray-500 flex items-center">
                  <span>{receiverData.role}</span>
                  <span className="mx-1">•</span>
                  <span>{receiverData.property}</span>
                </p>
              </div>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <EllipsisVerticalIcon className="h-5 w-5" />
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                  <button 
                    onClick={() => document.getElementById('file-upload').click()}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <PaperClipIcon className="h-4 w-4 mr-2" />
                    Envoyer un fichier
                  </button>
                  <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    <DocumentIcon className="h-4 w-4 mr-2" />
                    Voir le contrat
                  </button>
                  <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    <PhotoIcon className="h-4 w-4 mr-2" />
                    Voir les photos du bien
                  </button>
                </div>
              )}
              
              <input 
                id="file-upload"
                type="file" 
                className="hidden" 
                onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
                accept="image/*,.pdf"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Zone de messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-3">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p className="text-center">Aucun message pour le moment</p>
              <p className="text-sm text-center">
                Envoyez votre premier message à {receiverData.name}
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === userId ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 relative ${
                    message.senderId === userId
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-200 rounded-bl-none'
                  }`}
                >
                  {/* Réponse à un message */}
                  {message.replyTo && (
                    <div className={`text-xs p-2 mb-2 rounded ${
                      message.senderId === userId
                        ? 'bg-blue-700 text-blue-100'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <p className="font-medium">Réponse à :</p>
                      <p className="truncate">
                        {messages.find(m => m.id === message.replyTo)?.content || 'Message supprimé'}
                      </p>
                    </div>
                  )}
                  
                  {/* Contenu du message ou fichier */}
                  {message.file ? (
                    <FilePreview file={message.file} />
                  ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}
                  
                  {/* Métadonnées du message */}
                  <div className={`flex items-center justify-end mt-1 space-x-1 ${
                    message.senderId === userId ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    <span className="text-xs">
                      {message.timestamp.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    {message.senderId === userId && (
                      <StatusIndicator status={message.status} />
                    )}
                  </div>
                  
                  {/* Barre de progression pour les fichiers */}
                  {message.status === 'uploading' && uploadProgress !== null && (
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full" 
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Zone de saisie */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="max-w-3xl mx-auto p-4">
          {/* Réponse à un message */}
          {replyingTo && (
            <div className="bg-gray-50 p-2 mb-2 rounded-lg border border-gray-200 flex justify-between items-start">
              <div className="text-xs text-gray-600">
                <p className="font-medium">Réponse à :</p>
                <p className="truncate">{replyingTo.content}</p>
              </div>
              <button 
                onClick={() => setReplyingTo(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                &times;
              </button>
            </div>
          )}
          
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
              }}
              onKeyDown={handleKeyPress}
              placeholder={`Écrire à ${receiverData.name}...`}
              className="w-full border border-gray-300 rounded-lg pl-4 pr-12 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all duration-100"
              rows="1"
              style={{ minHeight: '44px', maxHeight: '150px' }}
            />
            
            <div className="absolute right-3 bottom-3 flex space-x-1">
              <button
                onClick={() => document.getElementById('file-upload').click()}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <PaperClipIcon className="h-5 w-5" />
              </button>
              
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className={`p-1 rounded-full ${
                  newMessage.trim()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <PaperAirplaneIcon className="h-5 w-5 transform rotate-45" />
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">
              {isDragActive ? 'Déposez le fichier pour l\'envoyer' : 'Appuyez sur Entrée pour envoyer'}
            </p>
            <button 
              onClick={() => {
                if (messages.length > 0) {
                  setReplyingTo(messages[messages.length - 1]);
                }
              }}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Répondre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}