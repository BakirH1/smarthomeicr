import { Lock } from "lucide-react";

export const LockCard = () => {
  return (
    <div 
      className="rounded-2xl p-5 shadow-sm h-36 flex flex-col justify-between"
      style={{ background: 'hsl(0 65% 65%)' }}
    >
      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
        <Lock className="w-5 h-5 text-white" />
      </div>
      
      <p className="text-lg font-semibold text-white">Lock front door</p>
    </div>
  );
};
