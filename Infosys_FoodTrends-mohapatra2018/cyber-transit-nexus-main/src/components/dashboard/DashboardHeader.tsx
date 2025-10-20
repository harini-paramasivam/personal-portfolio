import { useState, useEffect } from "react";
import { Brain, Shield, CloudRain, Users, Zap, Network } from "lucide-react";

export const DashboardHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState<"optimal" | "warning" | "critical">("optimal");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: typeof systemStatus) => {
    switch (status) {
      case "optimal": return "text-cyber-safe";
      case "warning": return "text-warning";
      case "critical": return "text-cyber-threat";
    }
  };

  return (
    <header className="glass-panel rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/20 glow-primary">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-cyber bg-clip-text text-transparent">
                SMART TRAIN DIGITAL TWIN
              </h1>
              <p className="text-muted-foreground">Next-Gen AI-Powered Transportation Ecosystem</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-lg font-mono text-primary">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {currentTime.toLocaleDateString()}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(systemStatus)} animate-pulse-glow`} />
            <span className="text-sm font-medium">System {systemStatus.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-glass-border">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">42 Active Trains</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyber-safe" />
            <span className="text-sm text-muted-foreground">Security: Active</span>
          </div>
          <div className="flex items-center gap-2">
            <CloudRain className="w-4 h-4 text-climate-blue" />
            <span className="text-sm text-muted-foreground">Weather: Clear</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-ar-accent" />
            <span className="text-sm text-muted-foreground">8.2k Passengers</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-warning" />
          <span className="text-sm text-muted-foreground">Energy Efficiency: 94%</span>
        </div>
      </div>
    </header>
  );
};