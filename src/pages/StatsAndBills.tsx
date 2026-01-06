import { TrendingUp, TrendingDown, Zap, Droplets, Flame } from "lucide-react";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { useState, useEffect } from "react";

interface UsageStat {
  id: string;
  name: string;
  icon: typeof Zap;
  currentUsage: number;
  unit: string;
  cost: number;
  trend: 'up' | 'down';
  change: number;
}

const StatsAndBills = () => {
  const [stats, setStats] = useState<UsageStat[]>([
    { id: 'electricity', name: 'Electricity', icon: Zap, currentUsage: 235.4, unit: 'kWh', cost: 47.08, trend: 'up', change: 12 },
    { id: 'water', name: 'Water', icon: Droplets, currentUsage: 4520, unit: 'L', cost: 22.60, trend: 'down', change: 8 },
    { id: 'gas', name: 'Gas', icon: Flame, currentUsage: 45.2, unit: 'm³', cost: 31.64, trend: 'up', change: 5 },
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map(stat => ({
        ...stat,
        currentUsage: parseFloat((stat.currentUsage + (Math.random() - 0.5) * 2).toFixed(1)),
        cost: parseFloat((stat.cost + (Math.random() - 0.5) * 0.5).toFixed(2)),
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const totalCost = stats.reduce((acc, s) => acc + s.cost, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-3xl font-semibold text-foreground">Stats & Bills</h1>
        <p className="text-muted-foreground mt-1">Track your utility usage</p>
      </div>

      <div className="flex-1 px-6 space-y-4">
        {/* Period Selector */}
        <div className="flex gap-2 bg-card rounded-full p-1 shadow-sm">
          {(['week', 'month', 'year'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`flex-1 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                selectedPeriod === period
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Total Cost Card */}
        <div 
          className="rounded-2xl p-5 text-white shadow-lg"
          style={{
            background: 'linear-gradient(135deg, hsl(186 40% 55%) 0%, hsl(195 35% 65%) 100%)'
          }}
        >
          <p className="text-sm opacity-90">Total this {selectedPeriod}</p>
          <p className="text-4xl font-semibold mt-2">${totalCost.toFixed(2)}</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">5% from last {selectedPeriod}</span>
          </div>
        </div>

        {/* Stats Grid */}
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="bg-card rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{stat.name}</h3>
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-red-500' : 'text-green-500'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}%
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-muted-foreground text-sm">Usage</p>
                  <p className="text-xl font-semibold text-foreground">
                    {stat.currentUsage} {stat.unit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground text-sm">Cost</p>
                  <p className="text-xl font-semibold text-foreground">${stat.cost.toFixed(2)}</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Download Bill Button */}
        <button className="w-full py-4 bg-accent text-accent-foreground rounded-full font-medium mt-4">
          Download Full Bill
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default StatsAndBills;
