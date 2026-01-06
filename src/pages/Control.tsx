import { Flame, Lightbulb, Camera, BarChart3 } from "lucide-react";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { useNavigate } from "react-router-dom";

const Control = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-3xl font-semibold text-foreground">Control</h1>
        <p className="text-muted-foreground mt-1">Select a module</p>
      </div>

      <div className="flex-1 px-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/climate')}
            className="bg-card rounded-2xl p-5 shadow-sm text-left hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-foreground">Climate control</h3>
            <p className="text-muted-foreground text-sm mt-1">Global heat control</p>
            <Flame className="w-8 h-8 text-foreground mt-4" />
          </button>
          
          <button
            onClick={() => navigate('/rooms')}
            className="bg-card rounded-2xl p-5 shadow-sm text-left hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-foreground">Rooms...</h3>
            <p className="text-muted-foreground text-sm mt-1">Room selection</p>
            <Lightbulb className="w-8 h-8 text-foreground mt-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/cameras')}
            className="bg-card rounded-2xl p-5 shadow-sm h-40 flex flex-col justify-between text-left hover:shadow-md transition-shadow"
          >
            <div className="flex justify-center">
              <Camera className="w-12 h-12 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Camera status</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-muted-foreground text-sm">Online</span>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => navigate('/stats')}
            className="bg-card rounded-2xl p-5 shadow-sm h-40 flex flex-col justify-between text-left hover:shadow-md transition-shadow"
          >
            <h3 className="text-base font-semibold text-foreground">Stats and bills</h3>
            <BarChart3 className="w-full h-16 text-muted-foreground" />
          </button>
        </div>

        <button className="w-full py-4 bg-accent text-accent-foreground rounded-full font-medium mt-6">
          Customize page content
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Control;
