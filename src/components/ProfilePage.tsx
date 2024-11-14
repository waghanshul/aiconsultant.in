import React from 'react';
import { ChatSection } from './profile/ChatSection';
import { GoalsSection } from './profile/GoalsSection';
import { ProfileSelector } from './profile/ProfileSelector';
import { useProfile } from '../hooks/useProfile';

export function ProfilePage() {
  const { 
    activeProfile,
    setActiveProfile,
    chatHistory,
    sendMessage,
    goals,
    addGoal,
    removeGoal,
    toggleGoal,
    isLoading
  } = useProfile();

  return (
    <div className="h-screen bg-black overflow-hidden">
      <div className="h-full max-w-7xl mx-auto px-6 flex gap-8">
        {/* Left Column - Profile Selector */}
        <div className="w-40 flex flex-col pt-4">
          <h1 className="text-xl font-semibold text-white mb-6">AI Consultant</h1>
          <ProfileSelector 
            activeProfile={activeProfile} 
            onSelect={setActiveProfile}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 py-4 pr-64 relative">
          <div className="absolute right-0 top-4 w-56 h-[calc(100%-1rem)]">
            <GoalsSection
              goals={goals}
              onAddGoal={addGoal}
              onRemoveGoal={removeGoal}
              onToggleGoal={toggleGoal}
            />
          </div>
          <div className="h-full">
            <ChatSection
              activeProfile={activeProfile}
              chatHistory={chatHistory}
              onSendMessage={sendMessage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}