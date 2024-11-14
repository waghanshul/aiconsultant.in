import React, { useState } from 'react';
import { Plus, X, Check } from 'lucide-react';

interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

interface GoalsSectionProps {
  goals: Goal[];
  onAddGoal: (text: string) => void;
  onRemoveGoal: (id: string) => void;
  onToggleGoal: (id: string) => void;
}

export function GoalsSection({ goals, onAddGoal, onRemoveGoal, onToggleGoal }: GoalsSectionProps) {
  const [newGoal, setNewGoal] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim()) {
      onAddGoal(newGoal.trim());
      setNewGoal('');
      setIsAdding(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white/5 backdrop-blur-xl rounded-2xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium text-white">Goals</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-white/10 hover:bg-white/20 text-white rounded-lg w-8 h-8
            flex items-center justify-center transition-all duration-300
            hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Add Goal Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Add a new goal..."
              autoFocus
              className="flex-1 bg-white/5 px-4 py-2 rounded-lg text-white placeholder-white/40 
                focus:outline-none focus:ring-1 focus:ring-white/20"
            />
            <button
              type="submit"
              className="bg-white/10 hover:bg-white/20 text-white rounded-lg w-10 h-10
                flex items-center justify-center transition-all duration-300
                hover:scale-105 active:scale-95 flex-shrink-0"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </form>
      )}

      {/* Goals List */}
      <div className="flex-1 overflow-y-auto space-y-2 
        scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent
        hover:scrollbar-thumb-white/20">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="group flex items-center gap-3 p-3 rounded-lg
              hover:bg-white/5 transition-all duration-300"
          >
            <button
              onClick={() => onToggleGoal(goal.id)}
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center
                transition-all duration-300 flex-shrink-0
                ${goal.completed 
                  ? 'bg-blue-500 border-blue-500' 
                  : 'border-white/30 hover:border-white/50'}`}
            >
              {goal.completed && <Check className="w-3 h-3 text-white" />}
            </button>
            <span
              className={`flex-1 text-white/90 transition-all duration-300
                ${goal.completed ? 'line-through opacity-50' : ''}`}
            >
              {goal.text}
            </span>
            <button
              onClick={() => onRemoveGoal(goal.id)}
              className="opacity-0 group-hover:opacity-100 text-white/50 hover:text-white
                transition-all duration-300 hover:scale-110 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}