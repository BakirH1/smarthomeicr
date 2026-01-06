import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Control from "./pages/Control";
import Settings from "./pages/Settings";
import ClimateControl from "./pages/ClimateControl";
import Rooms from "./pages/Rooms";
import CameraStatus from "./pages/CameraStatus";
import StatsAndBills from "./pages/StatsAndBills";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/control" element={<Control />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/climate" element={<ClimateControl />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/cameras" element={<CameraStatus />} />
          <Route path="/stats" element={<StatsAndBills />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
