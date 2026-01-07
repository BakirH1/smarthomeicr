import { MoreHorizontal, TrendingUp, TrendingDown, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export const EnergyUsageCard = () => {
  const [todayUsage, setTodayUsage] = useState(30.7);
  const [monthUsage, setMonthUsage] = useState(235.37);
  const [todayTrend, setTodayTrend] = useState<'up' | 'down'>('up');
  const [monthTrend, setMonthTrend] = useState<'up' | 'down'>('up');
  const [todayCost, setTodayCost] = useState(6.14);
  const [monthCost, setMonthCost] = useState(47.07);

  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 2;
      setTodayUsage(prev => {
        const newVal = Math.max(15, Math.min(50, prev + change));
        setTodayTrend(change > 0 ? 'up' : 'down');
        setTodayCost(parseFloat((newVal * 0.2).toFixed(2)));
        return parseFloat(newVal.toFixed(1));
      });
      
      const monthChange = (Math.random() - 0.5) * 5;
      setMonthUsage(prev => {
        const newVal = Math.max(180, Math.min(300, prev + monthChange));
        setMonthTrend(monthChange > 0 ? 'up' : 'down');
        setMonthCost(parseFloat((newVal * 0.2).toFixed(2)));
        return parseFloat(newVal.toFixed(2));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl p-5 text-white shadow-lg gradient-primary">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          <h3 className="text-xl font-semibold">Energy Usage</h3>
        </div>
        <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      
      <div className="w-full h-px bg-white/30 mb-4" />
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-xl p-3">
          <span className="text-sm opacity-90">Today</span>
          <div className="flex items-center gap-1 mt-1">
            {todayTrend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-xl font-semibold transition-all">{todayUsage} kWh</span>
          </div>
          <span className="text-sm opacity-75">${todayCost}</span>
        </div>
        
        <div className="bg-white/10 rounded-xl p-3">
          <span className="text-sm opacity-90">This month</span>
          <div className="flex items-center gap-1 mt-1">
            {monthTrend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-xl font-semibold transition-all">{monthUsage} kWh</span>
          </div>
          <span className="text-sm opacity-75">${monthCost}</span>
        </div>
      </div>
    </div>
  );
};