import { EnergyUsageCard } from "@/components/dashboard/EnergyUsageCard";
import { TemperatureCard } from "@/components/dashboard/TemperatureCard";
import { LightsCard } from "@/components/dashboard/LightsCard";
import { LockCard } from "@/components/dashboard/LockCard";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { useState } from "react";
import { X } from "lucide-react";

type CardType = 'energy' | 'temperature' | 'lights' | 'lock';

const Home = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [visibleCards, setVisibleCards] = useState<CardType[]>(['energy', 'temperature', 'lights', 'lock']);

  const toggleCard = (card: CardType) => {
    setVisibleCards(prev => 
      prev.includes(card) 
        ? prev.filter(c => c !== card)
        : [...prev, card]
    );
  };

  const cardComponents: Record<CardType, { component: React.ReactNode; label: string }> = {
    energy: { component: <EnergyUsageCard />, label: 'Energy Usage' },
    temperature: { component: <TemperatureCard />, label: 'Temperature' },
    lights: { component: <LightsCard />, label: 'Lights' },
    lock: { component: <LockCard />, label: 'Lock' },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <div className="px-5 pt-10 pb-3">
        <h1 className="text-2xl font-semibold text-foreground mb-3">Welcome home,</h1>
        
        <div className="flex items-center justify-between">
          <span className="text-base font-medium text-foreground">At a glance</span>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium card-shadow transition-colors ${
              isEditing ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground'
            }`}
          >
            {isEditing ? 'Done' : 'Edit'}
          </button>
        </div>
      </div>

      {/* Edit Mode Panel */}
      {isEditing && (
        <div className="px-5 mb-3">
          <div className="bg-card rounded-xl p-3 card-shadow">
            <p className="text-sm text-muted-foreground mb-2">Toggle cards:</p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(cardComponents) as CardType[]).map((card) => (
                <button
                  key={card}
                  onClick={() => toggleCard(card)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    visibleCards.includes(card)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {cardComponents[card].label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 px-5 space-y-3">
        {visibleCards.includes('energy') && (
          <div className="relative">
            {isEditing && (
              <button
                onClick={() => toggleCard('energy')}
                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center z-10"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <EnergyUsageCard />
          </div>
        )}
        
        {visibleCards.includes('temperature') && (
          <div className="relative">
            {isEditing && (
              <button
                onClick={() => toggleCard('temperature')}
                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center z-10"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <TemperatureCard />
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-3">
          {visibleCards.includes('lights') && (
            <div className="relative">
              {isEditing && (
                <button
                  onClick={() => toggleCard('lights')}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center z-10"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <LightsCard />
            </div>
          )}
          {visibleCards.includes('lock') && (
            <div className="relative">
              {isEditing && (
                <button
                  onClick={() => toggleCard('lock')}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center z-10"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <LockCard />
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;