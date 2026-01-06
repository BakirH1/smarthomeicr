import { Thermometer, Droplets } from "lucide-react";

export const TemperatureCard = () => {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            <Thermometer className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Temperature</h3>
            <p className="text-foreground">and humidity</p>
          </div>
        </div>
        
        {/* Toggle indicator */}
        <div className="w-10 h-1 bg-muted rounded-full" />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">29°</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Droplets className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">72%</span>
          </div>
        </div>
        
        <button className="px-4 py-1.5 bg-secondary rounded-full text-sm text-foreground">
          Kitchen
        </button>
      </div>
    </div>
  );
};
