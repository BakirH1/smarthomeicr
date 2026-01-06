import { Flame, Snowflake, Fan, Power } from "lucide-react";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

const ClimateControl = () => {
  const [temperature, setTemperature] = useState(22);
  const [mode, setMode] = useState<'heat' | 'cool' | 'auto'>('auto');
  const [fanSpeed, setFanSpeed] = useState(2);
  const [isOn, setIsOn] = useState(true);

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-3xl font-semibold text-foreground">Climate Control</h1>
        <p className="text-muted-foreground mt-1">Manage your home temperature</p>
      </div>

      <div className="flex-1 px-6 space-y-6">
        {/* Power Toggle */}
        <div className="bg-card rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">System Power</h3>
              <p className="text-muted-foreground text-sm">{isOn ? 'Running' : 'Off'}</p>
            </div>
            <button
              onClick={() => setIsOn(!isOn)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                isOn ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
              }`}
            >
              <Power className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Temperature Control */}
        <div className="bg-card rounded-2xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4">Temperature</h3>
          <div className="text-center mb-6">
            <span className="text-6xl font-light text-foreground">{temperature}°</span>
          </div>
          <Slider
            value={[temperature]}
            onValueChange={(val) => setTemperature(val[0])}
            min={16}
            max={30}
            step={1}
            disabled={!isOn}
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>16°C</span>
            <span>30°C</span>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="bg-card rounded-2xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4">Mode</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'heat', icon: Flame, label: 'Heat' },
              { id: 'cool', icon: Snowflake, label: 'Cool' },
              { id: 'auto', icon: Fan, label: 'Auto' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setMode(id as typeof mode)}
                disabled={!isOn}
                className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-colors ${
                  mode === id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                } disabled:opacity-50`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Fan Speed */}
        <div className="bg-card rounded-2xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4">Fan Speed</h3>
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((speed) => (
              <button
                key={speed}
                onClick={() => setFanSpeed(speed)}
                disabled={!isOn}
                className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                  fanSpeed === speed
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                } disabled:opacity-50`}
              >
                {speed}
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ClimateControl;
