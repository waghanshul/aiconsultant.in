import React from 'react';
import { 
  LineChart, 
  Users, 
  TrendingUp, 
  Briefcase, 
  Brain 
} from 'lucide-react';

const profiles = [
  { id: 'finance', name: 'Finance', icon: LineChart },
  { id: 'sales', name: 'Sales', icon: TrendingUp },
  { id: 'hr', name: 'HR', icon: Users },
  { id: 'business', name: 'Business', icon: Briefcase },
  { id: 'strategy', name: 'Strategy', icon: Brain }
];

interface ProfileSelectorProps {
  activeProfile: string;
  onSelect: (profile: string) => void;
}

export function ProfileSelector({ activeProfile, onSelect }: ProfileSelectorProps) {
  return (
    <div className="space-y-2">
      {profiles.map(({ id, name, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`w-full p-3 rounded-xl transition-all duration-300
            hover:-translate-x-1 group flex items-center gap-3
            ${activeProfile === id 
              ? 'bg-white/10 text-white' 
              : 'text-white/60 hover:text-white'
            }`}
        >
          <Icon className="w-5 h-5" />
          <span className="text-sm font-medium">{name}</span>
        </button>
      ))}
    </div>
  );
}