import { useState, useEffect } from "react";
import { Train, Bus, Car, Zap, MapPin, Clock, TrendingUp, Network, AlertTriangle } from "lucide-react";

interface TransportMode {
  type: "train" | "bus" | "metro" | "ev-charging";
  id: string;
  name: string;
  status: "operational" | "delayed" | "maintenance" | "offline";
  capacity: number;
  currentLoad: number;
  efficiency: number;
  location: string;
  nextUpdate: string;
}

interface ConnectivityData {
  route: string;
  modes: string[];
  transferTime: number;
  efficiency: number;
  passengerFlow: number;
  carbonSaved: number;
}

export const MultiModalTransportPanel = () => {
  const [transportModes, setTransportModes] = useState<TransportMode[]>([
    {
      type: "train",
      id: "T-CENTRAL",
      name: "Central Line Express",
      status: "operational",
      capacity: 1200,
      currentLoad: 856,
      efficiency: 94,
      location: "Downtown Hub",
      nextUpdate: "2 min"
    },
    {
      type: "bus",
      id: "B-LOOP",
      name: "Smart Bus Loop",
      status: "operational",
      capacity: 80,
      currentLoad: 45,
      efficiency: 87,
      location: "University District",
      nextUpdate: "4 min"
    },
    {
      type: "metro",
      id: "M-EAST",
      name: "East Metro Line",
      status: "delayed",
      capacity: 800,
      currentLoad: 234,
      efficiency: 76,
      location: "Tech Corridor",
      nextUpdate: "8 min"
    },
    {
      type: "ev-charging",
      id: "EV-HUB1",
      name: "Central Charging Hub",
      status: "operational",
      capacity: 24,
      currentLoad: 16,
      efficiency: 92,
      location: "Transport Center",
      nextUpdate: "1 min"
    }
  ]);

  const [connectivity, setConnectivity] = useState<ConnectivityData[]>([
    {
      route: "Downtown ↔ University",
      modes: ["Train", "Bus", "Metro"],
      transferTime: 3.5,
      efficiency: 89,
      passengerFlow: 2340,
      carbonSaved: 145.2
    },
    {
      route: "Tech Hub ↔ Financial",
      modes: ["Train", "EV Shuttle"],
      transferTime: 2.1,
      efficiency: 92,
      passengerFlow: 1890,
      carbonSaved: 98.7
    },
    {
      route: "Airport ↔ City Center",
      modes: ["Metro", "Bus", "Train"],
      transferTime: 4.2,
      efficiency: 85,
      passengerFlow: 3120,
      carbonSaved: 189.5
    }
  ]);

  const [disruptions, setDisruptions] = useState([
    {
      mode: "M-EAST Metro", 
      issue: "Signal malfunction",
      delay: "10 min",
      aiResponse: "Extra Smart Bus Loop deployed automatically",
      status: "mitigated",
      affectedPassengers: 800
    }
  ]);

  const [carbonTrend, setCarbonTrend] = useState({
    daily: 1247.8,
    weekly: 8935.4,
    monthlyGrowth: 12.5,
    yearlyProjection: 156420
  });

  const [ecosystemMetrics, setEcosystemMetrics] = useState({
    totalPassengers: 15680,
    averageTransferTime: 3.2,
    systemEfficiency: 88.5,
    carbonReduction: 1247.8,
    energyOptimization: 94
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTransportModes(prev => prev.map(mode => ({
        ...mode,
        currentLoad: Math.max(0, Math.min(mode.capacity, mode.currentLoad + Math.floor((Math.random() - 0.5) * 20))),
        efficiency: Math.max(70, Math.min(100, mode.efficiency + (Math.random() - 0.5) * 3))
      })));

      setEcosystemMetrics(prev => ({
        ...prev,
        totalPassengers: prev.totalPassengers + Math.floor((Math.random() - 0.5) * 50),
        averageTransferTime: Math.max(2, Math.min(6, prev.averageTransferTime + (Math.random() - 0.5) * 0.3)),
        systemEfficiency: Math.max(80, Math.min(95, prev.systemEfficiency + (Math.random() - 0.5) * 1)),
        carbonReduction: prev.carbonReduction + Math.random() * 2
      }));

      setCarbonTrend(prev => ({
        ...prev,
        daily: prev.daily + Math.random() * 5,
        weekly: prev.weekly + Math.random() * 20,
        monthlyGrowth: Math.max(8, Math.min(20, prev.monthlyGrowth + (Math.random() - 0.5) * 1))
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getModeIcon = (type: TransportMode["type"]) => {
    switch (type) {
      case "train": return <Train className="w-5 h-5 text-primary" />;
      case "bus": return <Bus className="w-5 h-5 text-warning" />;
      case "metro": return <Train className="w-5 h-5 text-neural" />;
      case "ev-charging": return <Zap className="w-5 h-5 text-climate-green" />;
    }
  };

  const getStatusColor = (status: TransportMode["status"]) => {
    switch (status) {
      case "operational": return "text-cyber-safe border-cyber-safe/20 bg-cyber-safe/5";
      case "delayed": return "text-warning border-warning/20 bg-warning/5";
      case "maintenance": return "text-cyber-threat border-cyber-threat/20 bg-cyber-threat/5";
      case "offline": return "text-muted-foreground border-muted/20 bg-muted/5";
    }
  };

  const getLoadPercentage = (mode: TransportMode) => {
    return (mode.currentLoad / mode.capacity) * 100;
  };

  const getLoadColor = (percentage: number) => {
    if (percentage < 50) return "bg-cyber-safe";
    if (percentage < 80) return "bg-warning";
    return "bg-cyber-threat";
  };

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-climate-green/20">
          <Network className="w-5 h-5 text-climate-green" />
        </div>
        <h2 className="text-xl font-semibold">Multi-Modal Transport Ecosystem</h2>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-climate-green animate-pulse" />
          <span className="text-sm text-muted-foreground">Integrated Network</span>
        </div>
      </div>

      {/* Ecosystem Metrics */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Network className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Total Passengers</span>
          </div>
          <div className="text-xl font-bold text-primary">{ecosystemMetrics.totalPassengers.toLocaleString()}</div>
        </div>

        <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-warning" />
            <span className="text-sm text-muted-foreground">Avg Transfer</span>
          </div>
          <div className="text-xl font-bold text-warning">{ecosystemMetrics.averageTransferTime.toFixed(1)}m</div>
        </div>

        <div className="p-3 rounded-lg bg-neural/5 border border-neural/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-neural" />
            <span className="text-sm text-muted-foreground">Efficiency</span>
          </div>
          <div className="text-xl font-bold text-neural">{ecosystemMetrics.systemEfficiency.toFixed(1)}%</div>
        </div>

        <div className="p-3 rounded-lg bg-climate-green/5 border border-climate-green/20">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-climate-green" />
            <span className="text-sm text-muted-foreground">Carbon Saved</span>
          </div>
          <div className="text-xl font-bold text-climate-green">{ecosystemMetrics.carbonReduction.toFixed(0)}kg</div>
        </div>

        <div className="p-3 rounded-lg bg-vr-accent/5 border border-vr-accent/20">
          <div className="flex items-center gap-2 mb-2">
            <Car className="w-4 h-4 text-vr-accent" />
            <span className="text-sm text-muted-foreground">Energy Opt</span>
          </div>
          <div className="text-xl font-bold text-vr-accent">{ecosystemMetrics.energyOptimization}%</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Transport Modes */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Active Transport Modes</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {transportModes.map((mode) => (
              <div key={mode.id} className={`p-4 rounded-lg border ${getStatusColor(mode.status)} transition-all duration-300`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getModeIcon(mode.type)}
                    <div>
                      <div className="font-medium text-sm">{mode.name}</div>
                      <div className="text-xs text-muted-foreground">{mode.id}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium capitalize">{mode.status}</div>
                    <div className="text-xs text-muted-foreground">Next: {mode.nextUpdate}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Capacity:</span>
                    <span>{mode.currentLoad}/{mode.capacity}</span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${getLoadColor(getLoadPercentage(mode))}`}
                      style={{ width: `${getLoadPercentage(mode)}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Efficiency:</span>
                    <span className="font-medium">{mode.efficiency}%</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{mode.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-Modal Connectivity */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Smart Connectivity Routes</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {connectivity.map((route, index) => (
              <div key={index} className="p-4 rounded-lg border border-glass-border bg-glass/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium text-sm">{route.route}</div>
                  <div className="text-xs text-primary font-medium">{route.efficiency}% efficiency</div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {route.modes.map((mode, i) => (
                    <span key={i} className="px-2 py-1 bg-primary/20 rounded text-xs font-medium text-primary">
                      {mode}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Transfer Time:</span>
                    <div className="font-medium text-warning">{route.transferTime}m</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Passengers:</span>
                    <div className="font-medium text-ar-accent">{route.passengerFlow.toLocaleString()}</div>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-glass-border">
                  <div className="flex items-center gap-2 text-xs">
                    <Zap className="w-3 h-3 text-climate-green" />
                    <span className="text-muted-foreground">Carbon saved:</span>
                    <span className="font-medium text-climate-green">{route.carbonSaved}kg CO₂</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Disruption Management */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="p-4 rounded-lg border border-warning/20 bg-warning/5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <h3 className="font-semibold">Live Disruption Management</h3>
          </div>
          <div className="space-y-2">
            {disruptions.map((disruption, index) => (
              <div key={index} className="p-3 rounded border border-warning/30 bg-warning/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{disruption.mode}</span>
                  <span className="text-xs bg-cyber-safe/20 text-cyber-safe px-2 py-1 rounded">
                    {disruption.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs space-y-1">
                  <div>Issue: {disruption.issue} (+{disruption.delay})</div>
                  <div className="text-primary font-medium">AI Response: {disruption.aiResponse}</div>
                  <div>Passengers affected: {disruption.affectedPassengers.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carbon Savings Trend */}
        <div className="p-4 rounded-lg border border-climate-green/20 bg-climate-green/5">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-climate-green" />
            <h3 className="font-semibold">Carbon Impact Trends</h3>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-lg font-bold text-climate-green">{carbonTrend.daily.toFixed(0)}kg</div>
                <div className="text-xs text-muted-foreground">Daily CO₂ Saved</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-climate-green">{carbonTrend.weekly.toFixed(0)}kg</div>
                <div className="text-xs text-muted-foreground">Weekly CO₂ Saved</div>
              </div>
            </div>
            <div className="p-2 rounded bg-climate-green/10 border border-climate-green/20">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Monthly Growth</span>
                <TrendingUp className="w-3 h-3 text-climate-green" />
              </div>
              <div className="text-sm font-bold text-climate-green">+{carbonTrend.monthlyGrowth.toFixed(1)}%</div>
            </div>
            <div className="text-xs text-muted-foreground text-center">
              Projected yearly impact: {carbonTrend.yearlyProjection.toLocaleString()}kg CO₂
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};