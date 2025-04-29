'use client';
import { Paperclip, Send, Search, MoreVertical, ChevronLeft, Smile, Mic, MessageSquare } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Avatar from '@/components/ui/avatar';

export default function MessagesPage() {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "M. Dupont (Propriétaire)",
      lastMessage: "Le loyer a bien été reçu, merci",
      time: "10:30",
      unread: 0,
      avatar: "/avatars/proprietaire.jpg"
    },
    {
      id: 2,
      name: "Agence ImmoPlus",
      lastMessage: "Votre état des lieux est programmé pour le 15/06",
      time: "Hier",
      unread: 2,
      avatar: "/avatars/agence.jpg"
    },
    {
      id: 3,
      name: "Service Technique",
      lastMessage: "Votre problème de plomberie sera résolu demain",
      time: "Lundi",
      unread: 0,
      avatar: "/avatars/technique.jpg"
    }
  ]);

  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (activeConversation) {
      const demoMessages = [
        { id: 1, text: "Bonjour, je vous contacte concernant le loyer de ce mois-ci.", sender: "user", time: "10:00" },
        { id: 2, text: "Oui, je vous écoute.", sender: "recipient", time: "10:02" },
        { id: 3, text: "Le loyer a bien été versé ce matin.", sender: "user", time: "10:05" },
        { id: 4, text: "Je viens de vérifier, effectivement c'est reçu. Merci !", sender: "recipient", time: "10:30" },
      ];
      setMessages(demoMessages);
    }
  }, [activeConversation]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100">
      <div className={`bg-white border-r border-gray-200 w-full md:w-80 flex-shrink-0 ${isMobileView && activeConversation ? 'hidden' : 'block'}`}>
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Messagerie</h1>
          <p className="text-gray-600 text-sm">Communiquez avec les propriétaires ou l'administration</p>
        </div>

        <div className="p-2">
          <div className="relative mb-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={18} />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Rechercher une conversation..."
            />
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-120px)]">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`flex items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${activeConversation === conv.id ? 'bg-blue-50' : ''}`}
              onClick={() => setActiveConversation(conv.id)}
            >
              <Avatar src={conv.avatar} alt={conv.name} className="mr-3" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{conv.name}</h3>
                  <span className="text-xs text-gray-500">{conv.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="ml-2 bg-blue-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                  {conv.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {activeConversation ? (
        <div className={`flex flex-col flex-1 ${isMobileView && !activeConversation ? 'hidden' : 'flex'}`}>
          <div className="bg-white p-3 border-b border-gray-200 flex items-center">
            {isMobileView && (
              <button 
                onClick={() => setActiveConversation(null)}
                className="mr-2 p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <Avatar 
              src={conversations.find(c => c.id === activeConversation)?.avatar} 
              alt={conversations.find(c => c.id === activeConversation)?.name} 
              className="mr-3" 
            />
            <div className="flex-1">
              <h2 className="font-medium text-gray-900">
                {conversations.find(c => c.id === activeConversation)?.name}
              </h2>
              <p className="text-xs text-gray-500">En ligne</p>
            </div>
            <button className="p-1 rounded-full hover:bg-gray-100">
              <MoreVertical size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'}`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 text-right ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="bg-white p-3 border-t border-gray-200">
            <div className="flex items-center">
              <button className="p-2 rounded-full hover:bg-gray-100 mr-1">
                <Smile className="text-gray-500" size={20} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 mr-1">
                <Paperclip className="text-gray-500" size={20} />
              </button>
              <div className="flex-1 mx-2">
                <textarea
                  rows="1"
                  className="block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Écrivez un message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <button
                className="p-2 rounded-full hover:bg-gray-100 ml-1"
                onClick={handleSendMessage}
              >
                {newMessage.trim() ? (
                  <Send className="text-blue-500" size={20} />
                ) : (
                  <Mic className="text-gray-500" size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        !isMobileView && (
          <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
            <div className="text-center p-6 max-w-md">
              <div className="mx-auto h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="text-gray-500" size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Sélectionnez une conversation</h3>
              <p className="text-gray-500 text-sm">
                Choisissez une conversation existante ou démarrez-en une nouvelle pour commencer à discuter.
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
}