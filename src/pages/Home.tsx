import { EnergyUsageCard } from "@/components/dashboard/EnergyUsageCard";
import { TemperatureCard } from "@/components/dashboard/TemperatureCard";
import { LightsCard } from "@/components/dashboard/LightsCard";
import { LockCard } from "@/components/dashboard/LockCard";
import { BottomNav } from "@/components/dashboard/BottomNav";

const Home = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-4">
        <h1 className="text-3xl font-light text-foreground mb-4">Welcome home,</h1>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-foreground">At a glance</span>
          <button className="px-4 py-2 bg-card rounded-full text-sm font-medium text-foreground shadow-sm">
            Edit layout
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 px-6 space-y-4">
        <EnergyUsageCard />
        <TemperatureCard />
        
        {/* Bottom row - two cards side by side */}
        <div className="grid grid-cols-2 gap-4">
          <LightsCard />
          <LockCard />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Home;
