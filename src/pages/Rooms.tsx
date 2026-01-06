import { Lightbulb, Sofa, Bed, ChefHat, Bath, Car } from "lucide-react";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface Room {
  id: string;
  name: string;
  icon: typeof Lightbulb;
  lights: number;
  lightsOn: number;
}

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([
    { id: 'living', name: 'Living Room', icon: Sofa, lights: 4, lightsOn: 2 },
    { id: 'bedroom', name: 'Bedroom', icon: Bed, lights: 3, lightsOn: 0 },
    { id: 'kitchen', name: 'Kitchen', icon: ChefHat, lights: 5, lightsOn: 3 },
    { id: 'bathroom', name: 'Bathroom', icon: Bath, lights: 2, lightsOn: 1 },
    { id: 'garage', name: 'Garage', icon: Car, lights: 2, lightsOn: 0 },
  ]);

  const toggleRoom = (roomId: string) => {
    setRooms(prev => prev.map(room => {
      if (room.id === roomId) {
        const allOn = room.lightsOn === room.lights;
        return { ...room, lightsOn: allOn ? 0 : room.lights };
      }
      return room;
    }));
  };

  const totalLights = rooms.reduce((acc, r) => acc + r.lights, 0);
  const totalOn = rooms.reduce((acc, r) => acc + r.lightsOn, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-3xl font-semibold text-foreground">Rooms</h1>
        <p className="text-muted-foreground mt-1">{totalOn} of {totalLights} lights on</p>
      </div>

      <div className="flex-1 px-6 space-y-4">
        {rooms.map((room) => {
          const Icon = room.icon;
          const isActive = room.lightsOn > 0;
          
          return (
            <div
              key={room.id}
              className="bg-card rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isActive ? 'bg-yellow-100 text-yellow-600' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{room.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {room.lightsOn} of {room.lights} lights on
                    </p>
                  </div>
                </div>
                <Switch
                  checked={room.lightsOn === room.lights}
                  onCheckedChange={() => toggleRoom(room.id)}
                />
              </div>
            </div>
          );
        })}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <button
            onClick={() => setRooms(prev => prev.map(r => ({ ...r, lightsOn: r.lights })))}
            className="py-4 bg-primary text-primary-foreground rounded-full font-medium"
          >
            All Lights On
          </button>
          <button
            onClick={() => setRooms(prev => prev.map(r => ({ ...r, lightsOn: 0 })))}
            className="py-4 bg-muted text-muted-foreground rounded-full font-medium"
          >
            All Lights Off
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Rooms;
