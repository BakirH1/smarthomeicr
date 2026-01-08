import { Flame, Lightbulb, Camera, BarChart3 } from "lucide-react";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { useNavigate } from "react-router-dom";

const Control = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <div className="px-5 pt-10 pb-4">
        <h1 className="text-2xl font-semibold text-foreground">Control</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Select a module</p>
      </div>

      <div className="flex-1 px-5 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/climate')}
            className="bg-card rounded-2xl p-4 card-shadow text-left hover:card-shadow-lg transition-shadow"
          >
            <h3 className="text-base font-semibold text-foreground">Climate control</h3>
            <p className="text-muted-foreground text-sm mt-0.5">Global heat control</p>
            <Flame className="w-7 h-7 text-foreground mt-3" />
          </button>
          
          <button
            onClick={() => navigate('/rooms')}
            className="bg-card rounded-2xl p-4 card-shadow text-left hover:card-shadow-lg transition-shadow"
          >
            <h3 className="text-base font-semibold text-foreground">Rooms</h3>
            <p className="text-muted-foreground text-sm mt-0.5">Room selection</p>
            <Lightbulb className="w-7 h-7 text-foreground mt-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/cameras')}
            className="bg-card rounded-2xl p-4 card-shadow h-36 flex flex-col justify-between text-left hover:card-shadow-lg transition-shadow"
          >
            <div className="flex justify-center">
              <Camera className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Camera status</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                <span className="text-muted-foreground text-xs">Online</span>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => navigate('/stats')}
            className="bg-card rounded-2xl p-4 card-shadow h-36 flex flex-col justify-between text-left hover:card-shadow-lg transition-shadow"
          >
            <h3 className="text-sm font-semibold text-foreground">Stats and bills</h3>
            <BarChart3 className="w-full h-14 text-muted-foreground" />
          </button>
        </div>

        <button className="w-full py-3 bg-primary text-primary-foreground rounded-2xl font-medium mt-4">
          Customize page content
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Control;