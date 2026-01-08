import { useState } from "react";
import { Flame, Snowflake, Wind, Droplets, Sun } from "lucide-react";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { Switch } from "@/components/ui/switch";

const ClimateControl = () => {
  const [temperature, setTemperature] = useState(22);
  const [isHeating, setIsHeating] = useState(true);
  const [acEnabled, setAcEnabled] = useState(false);
  const [acTemp, setAcTemp] = useState(22);
  const [selectedRoom, setSelectedRoom] = useState('kitchen');

  const minTemp = 10;
  const maxTemp = 30;
  const range = maxTemp - minTemp;
  const angle = ((temperature - minTemp) / range) * 180 - 90; // -90 to 90 degrees

  const handleDialChange = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const dial = e.currentTarget;
    const rect = dial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    let clientX: number, clientY: number;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const deltaX = clientX - centerX;
    const deltaY = centerY - clientY;
    let newAngle = Math.atan2(deltaX, deltaY) * (180 / Math.PI);
    
    // Clamp to -90 to 90 (bottom half of dial)
    newAngle = Math.max(-90, Math.min(90, newAngle));
    
    const newTemp = Math.round(((newAngle + 90) / 180) * range + minTemp);
    setTemperature(Math.max(minTemp, Math.min(maxTemp, newTemp)));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <div className="px-5 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Climate Control</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Adjust main heating system</p>
          </div>
          <Switch 
            checked={isHeating}
            onCheckedChange={setIsHeating}
          />
        </div>
      </div>

      <div className="flex-1 px-5 space-y-6">
        {/* Temperature Dial */}
        <div className="flex flex-col items-center py-6">
          {/* Temperature Labels */}
          <div className="relative w-64 h-40 mb-4">
            <span className="absolute left-0 top-1/2 text-muted-foreground text-sm">{minTemp}°</span>
            <span className="absolute left-1/2 -translate-x-1/2 top-0 text-muted-foreground text-sm">20°</span>
            <span className="absolute right-0 top-1/2 text-muted-foreground text-sm">{maxTemp}°</span>
            
            {/* Dial */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 w-48 h-48 cursor-pointer"
              onMouseDown={(e) => {
                handleDialChange(e);
                const handleMove = (e: MouseEvent) => {
                  handleDialChange(e as any);
                };
                const handleUp = () => {
                  document.removeEventListener('mousemove', handleMove);
                  document.removeEventListener('mouseup', handleUp);
                };
                document.addEventListener('mousemove', handleMove);
                document.addEventListener('mouseup', handleUp);
              }}
              onTouchStart={(e) => {
                handleDialChange(e);
                const handleMove = (e: TouchEvent) => {
                  handleDialChange(e as any);
                };
                const handleUp = () => {
                  document.removeEventListener('touchmove', handleMove);
                  document.removeEventListener('touchend', handleUp);
                };
                document.addEventListener('touchmove', handleMove);
                document.addEventListener('touchend', handleUp);
              }}
            >
              {/* Outer ring with gradient */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-muted to-secondary" />
              
              {/* Progress arc */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="6"
                  strokeDasharray={`${((temperature - minTemp) / range) * 276} 552`}
                  strokeLinecap="round"
                  className="opacity-60"
                />
              </svg>
              
              {/* Inner dial */}
              <div className="absolute inset-3 rounded-full bg-card card-shadow-lg flex flex-col items-center justify-center">
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                  {isHeating ? 'Heating' : 'Off'}
                </span>
                <span className="text-5xl font-light text-foreground mt-1">{temperature}</span>
                <Wind className="w-5 h-5 text-primary mt-2" />
              </div>
              
              {/* Dial indicator */}
              <div 
                className="absolute w-3 h-3 bg-primary rounded-full shadow-lg"
                style={{
                  left: `${50 + 42 * Math.sin(angle * Math.PI / 180)}%`,
                  top: `${50 - 42 * Math.cos(angle * Math.PI / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
              
              {/* Tick marks */}
              {Array.from({ length: 21 }).map((_, i) => {
                const tickAngle = -90 + (i * 9);
                const isMajor = i % 5 === 0;
                return (
                  <div
                    key={i}
                    className={`absolute bg-muted-foreground/30 ${isMajor ? 'w-0.5 h-3' : 'w-px h-2'}`}
                    style={{
                      left: '50%',
                      top: '4px',
                      transformOrigin: '50% 92px',
                      transform: `translateX(-50%) rotate(${tickAngle}deg)`,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Set Temperature Button */}
          <button 
            className="px-8 py-3 gradient-primary text-primary-foreground rounded-full font-medium mt-4"
            onClick={() => {}}
          >
            Set temperature
          </button>
        </div>

        {/* Air Conditioning Card */}
        <div className="bg-card rounded-2xl p-4 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Snowflake className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-foreground">Air conditioning</span>
            </div>
            <Switch 
              checked={acEnabled}
              onCheckedChange={setAcEnabled}
            />
          </div>
          
          {/* Temperature Selector */}
          <div className="flex items-center justify-between mb-3">
            {[14, 18, 22, 26, 30].map((temp) => (
              <button
                key={temp}
                onClick={() => setAcTemp(temp)}
                className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                  acTemp === temp ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {temp}°
                {acTemp === temp && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
          
          {/* Slider track */}
          <div className="h-1 bg-muted rounded-full relative mb-4">
            <div 
              className="absolute h-full bg-primary/30 rounded-full"
              style={{ width: `${((acTemp - 14) / 16) * 100}%` }}
            />
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                <Sun className="w-4 h-4 text-muted-foreground" />
              </button>
              <button className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                <Snowflake className="w-4 h-4 text-muted-foreground" />
              </button>
              <button className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                <Droplets className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <button className="px-4 py-1.5 bg-secondary rounded-full text-sm font-medium text-secondary-foreground">
              {selectedRoom.charAt(0).toUpperCase() + selectedRoom.slice(1)}
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ClimateControl;