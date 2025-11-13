import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { aiMentorAPI } from '../services/api';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const AIMentor = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchChatHistory = async () => {
    try {
      const response = await aiMentorAPI.getChatHistory();
      setMessages(response.data);
    } catch (error) {
      toast.error('Failed to load chat history');
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage('');
    setLoading(true);

    // Add user message to UI immediately
    const tempMessage = {
      id: Date.now(),
      message: userMessage,
      response: '',
      created_at: new Date().toISOString(),
    };
    setMessages([...messages, tempMessage]);

    try {
      const response = await aiMentorAPI.chat(userMessage, {
        current_module: null,
      });

      // Replace temp message with actual response
      setMessages(prev => [...prev.slice(0, -1), response.data]);
    } catch (error) {
      toast.error('Failed to get response');
      setMessages(prev => prev.slice(0, -1)); // Remove temp message
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "How do I manage my cash flow?",
    "Tips for finding customers",
    "How to price my products?",
    "What investors look for?",
  ];

  if (loadingHistory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI Business Mentor</h1>
              <p className="text-purple-100">Get personalized guidance for your business</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 300px)' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <Sparkles size={64} className="mx-auto text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Start a Conversation</h3>
                <p className="text-gray-600 mb-6">Ask me anything about your business!</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(prompt)}
                      className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left text-gray-700 transition-colors"
                    >
                      💡 {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div key={msg.id}>
                    {/* User Message */}
                    <div className="flex items-start justify-end mb-4">
                      <div className="bg-primary-600 text-white rounded-2xl rounded-tr-none px-6 py-3 max-w-[80%]">
                        <p>{msg.message}</p>
                      </div>
                      <div className="ml-3 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User size={20} className="text-primary-600" />
                      </div>
                    </div>

                    {/* AI Response */}
                    {msg.response && (
                      <div className="flex items-start mb-4">
                        <div className="mr-3 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot size={20} className="text-purple-600" />
                        </div>
                        <div className="bg-gray-100 rounded-2xl rounded-tl-none px-6 py-3 max-w-[80%]">
                          <p className="text-gray-800 whitespace-pre-wrap">{msg.response}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="flex items-start">
                    <div className="mr-3 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Bot size={20} className="text-purple-600" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-none px-6 py-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Form */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask your business question..."
                disabled={loading}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !inputMessage.trim()}
                className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>💡 Tip:</strong> Be specific with your questions for better advice. 
            Example: "How do I reduce costs in my retail business?" instead of "How do I save money?"
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIMentor;