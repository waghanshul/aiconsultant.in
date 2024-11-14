import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatSectionProps {
  activeProfile: string;
  chatHistory: Record<string, Message[]>;
  onSendMessage: (profile: string, message: string) => void;
  isLoading?: boolean;
}

export function ChatSection({ activeProfile, chatHistory, onSendMessage, isLoading }: ChatSectionProps) {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messages = chatHistory[activeProfile] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(activeProfile, message);
      setMessage('');
    }
  };

  return (
    <div className="h-full flex flex-col bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-6
        scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent
        hover:scrollbar-thumb-white/20">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-gradient-to-b from-transparent to-black/40">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isLoading ? "AI is thinking..." : "Type your message..."}
            disabled={isLoading}
            className="w-full bg-white/5 backdrop-blur-xl rounded-2xl px-6 py-3 pr-28
              text-white placeholder-white/40 focus:outline-none focus:ring-1 
              focus:ring-white/20 transition-all disabled:opacity-50"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
            <button
              type="button"
              disabled={isLoading}
              className="p-2 text-white/60 hover:text-white/90 transition-colors
                hover:bg-white/10 rounded-xl disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5" />
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-white text-black rounded-xl p-2
                transition-all duration-300 hover:scale-110 active:scale-95
                hover:bg-white/90 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
