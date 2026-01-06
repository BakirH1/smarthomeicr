import { Lock, LockOpen } from "lucide-react";
import { useState } from "react";

export const LockCard = () => {
  const [isLocked, setIsLocked] = useState(true);

  return (
    <button 
      onClick={() => setIsLocked(!isLocked)}
      className="rounded-2xl p-5 shadow-sm h-36 flex flex-col justify-between text-left transition-colors w-full"
      style={{ background: isLocked ? 'hsl(0 65% 65%)' : 'hsl(145 50% 50%)' }}
    >
      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
        {isLocked ? (
          <Lock className="w-5 h-5 text-white" />
        ) : (
          <LockOpen className="w-5 h-5 text-white" />
        )}
      </div>
      
      <p className="text-lg font-semibold text-white">
        {isLocked ? "Lock front door" : "Unlocked"}
      </p>
    </button>
  );
};
