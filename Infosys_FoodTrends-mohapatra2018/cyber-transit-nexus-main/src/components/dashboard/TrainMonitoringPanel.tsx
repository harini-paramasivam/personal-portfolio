import { useState, useEffect } from "react";
import { Train, MapPin, Gauge, Users, AlertTriangle, CheckCircle } from "lucide-react";

interface TrainData {
  id: string;
  line: string;
  location: string;
  speed: number;
  passengers: number;
  status: "on-time" | "delayed" | "maintenance";
  nextStop: string;
  eta: string;
}

export const TrainMonitoringPanel = () => {
  const [trains, setTrains] = useState<TrainData[]>([
    {
      id: "T001",
      line: "Central Line",
      location: "Station District",
      speed: 65,
      passengers: 180,
      status: "on-time",
      nextStop: "Tech Hub",
      eta: "3 min"
    },
    {
      id: "T005",
      line: "East Route",
      location: "Innovation Park",
      speed: 72,
      passengers: 156,
      status: "on-time",
      nextStop: "University",
      eta: "5 min"
    },
    {
      id: "T012",
      line: "Metro Loop",
      location: "City Center",
      speed: 0,
      passengers: 89,
      status: "delayed",
      nextStop: "Financial District",
      eta: "12 min"
    },
    {
      id: "T018",
      line: "South Express",
      location: "Maintenance Depot",
      speed: 0,
      passengers: 0,
      status: "maintenance",
      nextStop: "Service Complete",
      eta: "45 min"
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrains(prev => prev.map(train => ({
        ...train,
        speed: train.status === "on-time" ? Math.max(0, train.speed + (Math.random() - 0.5) * 10) : train.speed,
        passengers: train.status !== "maintenance" ? Math.max(0, train.passengers + Math.floor((Math.random() - 0.5) * 20)) : train.passengers
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: TrainData["status"]) => {
    switch (status) {
      case "on-time": return <CheckCircle className="w-4 h-4 text-cyber-safe" />;
      case "delayed": return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "maintenance": return <AlertTriangle className="w-4 h-4 text-cyber-threat" />;
    }
  };

  const getStatusColor = (status: TrainData["status"]) => {
    switch (status) {
      case "on-time": return "border-cyber-safe/20 bg-cyber-safe/5";
      case "delayed": return "border-warning/20 bg-warning/5";
      case "maintenance": return "border-cyber-threat/20 bg-cyber-threat/5";
    }
  };

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/20">
          <Train className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Real-Time Train Monitoring</h2>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-muted-foreground">Live Data</span>
        </div>
      </div>

      <div className="space-y-4">
        {trains.map((train) => (
          <div key={train.id} className={`p-4 rounded-lg border ${getStatusColor(train.status)} transition-all duration-300`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(train.status)}
                  <span className="font-mono font-semibold text-primary">{train.id}</span>
                </div>
                <span className="text-sm text-muted-foreground">{train.line}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{train.status.replace("-", " ").toUpperCase()}</div>
                <div className="text-xs text-muted-foreground">ETA: {train.eta}</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Location</div>
                  <div className="text-sm font-medium">{train.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Speed</div>
                  <div className="text-sm font-medium">{Math.round(train.speed)} km/h</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Passengers</div>
                  <div className="text-sm font-medium">{train.passengers}/240</div>
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground">Next Stop</div>
                <div className="text-sm font-medium">{train.nextStop}</div>
              </div>
            </div>

            {train.status === "on-time" && (
              <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary animate-pulse-glow" style={{ width: `${(train.passengers / 240) * 100}%` }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};