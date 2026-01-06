import { MoreHorizontal, TrendingUp, TrendingDown } from "lucide-react";
import { useState, useEffect } from "react";

export const EnergyUsageCard = () => {
  const [todayUsage, setTodayUsage] = useState(30.7);
  const [monthUsage, setMonthUsage] = useState(235.37);
  const [todayTrend, setTodayTrend] = useState<'up' | 'down'>('up');
  const [monthTrend, setMonthTrend] = useState<'up' | 'down'>('up');

  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 2;
      setTodayUsage(prev => {
        const newVal = Math.max(15, Math.min(50, prev + change));
        setTodayTrend(change > 0 ? 'up' : 'down');
        return parseFloat(newVal.toFixed(1));
      });
      
      const monthChange = (Math.random() - 0.5) * 5;
      setMonthUsage(prev => {
        const newVal = Math.max(180, Math.min(300, prev + monthChange));
        setMonthTrend(monthChange > 0 ? 'up' : 'down');
        return parseFloat(newVal.toFixed(2));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
      
      <div className="w-full h-px bg-white/30 mb-4" />
      
      <div className="flex gap-8">
        <div>
          <span className="text-sm opacity-90">Today</span>
          <div className="flex items-center gap-1 mt-1">
            {todayTrend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-xl font-semibold transition-all">{todayUsage} kWh</span>
          </div>
        </div>
        
        <div>
          <span className="text-sm opacity-90">This month</span>
          <div className="flex items-center gap-1 mt-1">
            {monthTrend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-xl font-semibold transition-all">{monthUsage} kWh</span>
          </div>
        </div>
      </div>
    </div>
  );
};
