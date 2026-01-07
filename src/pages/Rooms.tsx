import { 
  Sofa, Bed, ChefHat, Bath, Car, Monitor, Plus, ChevronRight, 
  Thermometer, Droplets, Lightbulb, Tv, Wind, Plug
} from "lucide-react";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { useNavigate } from "react-router-dom";
import { useDeviceContext } from "@/context/DeviceContext";

const iconMap: Record<string, typeof Sofa> = {
  Sofa, Bed, ChefHat, Bath, Car, Monitor,
  Lightbulb, Tv, Wind, Plug
};

const Rooms = () => {
  const navigate = useNavigate();
  const { rooms, getDevicesByRoom } = useDeviceContext();

  const getIcon = (iconName: string) => iconMap[iconName] || Sofa;

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">Rooms</h1>
            <p className="text-muted-foreground mt-1">
              {rooms.length} rooms • {rooms.reduce((acc, r) => acc + r.deviceCount, 0)} devices
            </p>
          </div>
          <button className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg">
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex-1 px-6 space-y-4">
        {rooms.map((room) => {
          const Icon = getIcon(room.icon);
          const roomDevices = getDevicesByRoom(room.id);
          const lightsOn = roomDevices.filter(d => d.type === 'light' && d.isOn).length;
          const totalLights = roomDevices.filter(d => d.type === 'light').length;
          
          return (
            <button
              key={room.id}
              onClick={() => navigate(`/room/${room.id}`)}
              className="w-full bg-card rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    room.activeDevices > 0 
                      ? 'bg-primary/15 text-primary' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{room.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {room.activeDevices} of {room.deviceCount} devices active
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              
              {/* Room stats */}
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
                {room.temperature && (
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">{room.temperature}°C</span>
                  </div>
                )}
                {room.humidity && (
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{room.humidity}%</span>
                  </div>
                )}
                {totalLights > 0 && (
                  <div className="flex items-center gap-2">
                    <Lightbulb className={`w-4 h-4 ${lightsOn > 0 ? 'text-[hsl(45_90%_55%)]' : 'text-muted-foreground'}`} />
                    <span className="text-sm text-muted-foreground">{lightsOn}/{totalLights}</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <button
            className="py-4 gradient-primary text-primary-foreground rounded-2xl font-medium shadow-md"
          >
            All Devices On
          </button>
          <button
            className="py-4 bg-muted text-muted-foreground rounded-2xl font-medium"
          >
            All Devices Off
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Rooms;