import { useState, useEffect } from 'react';
import { useChat } from './useChat';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

export function useProfile() {
  const [activeProfile, setActiveProfile] = useState('finance');
  const [chatHistory, setChatHistory] = useState<Record<string, Message[]>>({});
  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('goals');
    return saved ? JSON.parse(saved) : [];
  });

  const { sendMessage: sendChatMessage, isLoading } = useChat();

  // Load chat history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chatHistory');
    if (saved) {
      setChatHistory(JSON.parse(saved));
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Save goals to localStorage
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const sendMessage = async (profile: string, content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    setChatHistory(prev => ({
      ...prev,
      [profile]: [...(prev[profile] || []), userMessage],
    }));

    try {
      const response = await sendChatMessage(profile, content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: Date.now(),
      };

      setChatHistory(prev => ({
        ...prev,
        [profile]: [...(prev[profile] || []), assistantMessage],
      }));
    } catch (error) {
      console.error('Failed to get AI response:', error);
    }
  };

  const addGoal = (text: string) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const removeGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const toggleGoal = (id: string) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  return {
    activeProfile,
    setActiveProfile,
    chatHistory,
    sendMessage,
    goals,
    addGoal,
    removeGoal,
    toggleGoal,
    isLoading
  };
}