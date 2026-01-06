import { MoreHorizontal, TrendingUp } from "lucide-react";

export const EnergyUsageCard = () => {
  return (
    <div 
      className="rounded-2xl p-5 text-white shadow-lg"
      style={{
        background: 'linear-gradient(135deg, hsl(186 40% 55%) 0%, hsl(195 35% 65%) 100%)'
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Energy Usage</h3>
        <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      
      {/* Divider line */}
      <div className="w-full h-px bg-white/30 mb-4" />
      
      <div className="flex gap-8">
        <div>
          <span className="text-sm opacity-90">Today</span>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xl font-semibold">30.7 kWh</span>
          </div>
        </div>
        
        <div>
          <span className="text-sm opacity-90">This month</span>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xl font-semibold">235.37 kWh</span>
          </div>
        </div>
      </div>
    </div>
  );
};
