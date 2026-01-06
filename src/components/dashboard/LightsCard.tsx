import { Lightbulb } from "lucide-react";

export const LightsCard = () => {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm h-36 flex flex-col justify-between">
      <Lightbulb className="w-8 h-8 text-foreground" fill="currentColor" />
      
      <div>
        <p className="text-sm text-muted-foreground">Living Room</p>
        <p className="text-lg font-semibold text-foreground">Lights</p>
        <p className="text-sm text-muted-foreground">100%</p>
      </div>
    </div>
  );
};
