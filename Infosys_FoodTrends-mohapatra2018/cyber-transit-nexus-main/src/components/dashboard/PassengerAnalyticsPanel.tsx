import { useState, useEffect } from "react";
import { Users, TrendingUp, MapPin, Clock, Brain, Target, AlertTriangle, GraduationCap, Briefcase, Coffee } from "lucide-react";

interface PassengerMetrics {
  totalPassengers: number;
  peakHour: string;
  averageJourneyTime: number;
  satisfactionScore: number;
  crowdedStations: string[];
  demandPrediction: {
    next1h: number;
    next3h: number;
    next6h: number;
  };
}

interface PassengerFlow {
  station: string;
  inbound: number;
  outbound: number;
  crowdingLevel: "low" | "medium" | "high" | "critical";
  predictedWaitTime: number;
}

interface PassengerSurge {
  event: string;
  station: string;
  expectedSurge: number;
  timeToImpact: string;
  type: "concert" | "sports" | "rush-hour" | "emergency";
}

interface CommuterPersona {
  type: "student" | "office-worker" | "tourist";
  icon: any;
  percentage: number;
  peakHours: string;
  satisfaction: number;
  behavior: string;
}

export const PassengerAnalyticsPanel = () => {
  const [metrics, setMetrics] = useState<PassengerMetrics>({
    totalPassengers: 8247,
    peakHour: "08:30-09:30",
    averageJourneyTime: 24,
    satisfactionScore: 4.2,
    crowdedStations: ["Central Station", "Tech Hub", "University"],
    demandPrediction: {
      next1h: 1250,
      next3h: 3100,
      next6h: 5600
    }
  });

  const [surges, setSurges] = useState<PassengerSurge[]>([
    {
      event: "Tech Conference at Convention Center",
      station: "University Station",
      expectedSurge: 500,
      timeToImpact: "15 mins",
      type: "concert"
    },
    {
      event: "Football Match Ending",
      station: "Sports Complex",
      expectedSurge: 1200,
      timeToImpact: "45 mins", 
      type: "sports"
    }
  ]);

  const [personas, setPersonas] = useState<CommuterPersona[]>([
    {
      type: "student",
      icon: GraduationCap,
      percentage: 35,
      peakHours: "8-9 AM, 4-6 PM",
      satisfaction: 4.1,
      behavior: "Price-sensitive, prefers off-peak"
    },
    {
      type: "office-worker", 
      icon: Briefcase,
      percentage: 45,
      peakHours: "7-9 AM, 5-7 PM",
      satisfaction: 3.8,
      behavior: "Time-critical, comfort-focused"
    },
    {
      type: "tourist",
      icon: Coffee,
      percentage: 20,
      peakHours: "10 AM-4 PM",
      satisfaction: 4.5,
      behavior: "Experience-focused, flexible timing"
    }
  ]);

  const [passengerFlows, setPassengerFlows] = useState<PassengerFlow[]>([
    {
      station: "Central Station",
      inbound: 180,
      outbound: 95,
      crowdingLevel: "high",
      predictedWaitTime: 4.5
    },
    {
      station: "Tech Hub",
      inbound: 120,
      outbound: 85,
      crowdingLevel: "medium",
      predictedWaitTime: 2.3
    },
    {
      station: "University",
      inbound: 200,
      outbound: 45,
      crowdingLevel: "critical",
      predictedWaitTime: 8.2
    },
    {
      station: "Financial District",
      inbound: 85,
      outbound: 160,
      crowdingLevel: "medium",
      predictedWaitTime: 3.1
    },
    {
      station: "Innovation Park",
      inbound: 60,
      outbound: 40,
      crowdingLevel: "low",
      predictedWaitTime: 1.2
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalPassengers: prev.totalPassengers + Math.floor(Math.random() * 20 - 10),
        averageJourneyTime: Math.max(15, Math.min(40, prev.averageJourneyTime + (Math.random() - 0.5) * 2)),
        satisfactionScore: Math.max(3.5, Math.min(5.0, prev.satisfactionScore + (Math.random() - 0.5) * 0.1)),
        demandPrediction: {
          next1h: Math.max(800, prev.demandPrediction.next1h + Math.floor((Math.random() - 0.5) * 100)),
          next3h: Math.max(2000, prev.demandPrediction.next3h + Math.floor((Math.random() - 0.5) * 200)),
          next6h: Math.max(4000, prev.demandPrediction.next6h + Math.floor((Math.random() - 0.5) * 300))
        }
      }));

      // Update persona satisfaction based on wait times
      setPersonas(prev => prev.map(persona => ({
        ...persona,
        satisfaction: Math.max(3.0, Math.min(5.0, persona.satisfaction + (Math.random() - 0.5) * 0.2))
      })));

      setPassengerFlows(prev => prev.map(flow => ({
        ...flow,
        inbound: Math.max(0, flow.inbound + Math.floor((Math.random() - 0.5) * 20)),
        outbound: Math.max(0, flow.outbound + Math.floor((Math.random() - 0.5) * 15)),
        predictedWaitTime: Math.max(0.5, flow.predictedWaitTime + (Math.random() - 0.5) * 1)
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getCrowdingColor = (level: PassengerFlow["crowdingLevel"]) => {
    switch (level) {
      case "low": return "text-cyber-safe border-cyber-safe/20 bg-cyber-safe/5";
      case "medium": return "text-warning border-warning/20 bg-warning/5";
      case "high": return "text-cyber-threat border-cyber-threat/20 bg-cyber-threat/5";
      case "critical": return "text-cyber-threat border-cyber-threat/40 bg-cyber-threat/10 glow-cyber";
    }
  };

  const getCrowdingIcon = (level: PassengerFlow["crowdingLevel"]) => {
    const baseClasses = "w-2 h-2 rounded-full";
    switch (level) {
      case "low": return <div className={`${baseClasses} bg-cyber-safe animate-pulse`} />;
      case "medium": return <div className={`${baseClasses} bg-warning animate-pulse`} />;
      case "high": return <div className={`${baseClasses} bg-cyber-threat animate-pulse`} />;
      case "critical": return <div className={`${baseClasses} bg-cyber-threat animate-pulse-glow`} />;
    }
  };

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-ar-accent/20">
          <Users className="w-5 h-5 text-ar-accent" />
        </div>
        <h2 className="text-xl font-semibold">Passenger Digital Twins</h2>
        <div className="ml-auto flex items-center gap-2">
          <Brain className="w-4 h-4 text-neural" />
          <span className="text-sm text-muted-foreground">AI Behavioral Analysis</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-3 rounded-lg bg-ar-accent/5 border border-ar-accent/20">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-ar-accent" />
            <span className="text-sm text-muted-foreground">Active Passengers</span>
          </div>
          <div className="text-2xl font-bold text-ar-accent">{metrics.totalPassengers.toLocaleString()}</div>
        </div>

        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Avg Journey</span>
          </div>
          <div className="text-2xl font-bold text-primary">{metrics.averageJourneyTime.toFixed(0)}m</div>
        </div>

        <div className="p-3 rounded-lg bg-neural/5 border border-neural/20">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-neural" />
            <span className="text-sm text-muted-foreground">Satisfaction</span>
          </div>
          <div className="text-2xl font-bold text-neural">{metrics.satisfactionScore.toFixed(1)}/5</div>
        </div>

        <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-warning" />
            <span className="text-sm text-muted-foreground">Peak Hour</span>
          </div>
          <div className="text-lg font-bold text-warning">{metrics.peakHour}</div>
        </div>
      </div>

      {/* AI Demand Prediction */}
      <div className="mb-6 p-4 rounded-lg border border-neural/20 bg-neural/5">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-5 h-5 text-neural" />
          <h3 className="font-semibold">AI Demand Prediction</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-neural">{metrics.demandPrediction.next1h.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Next Hour</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neural">{metrics.demandPrediction.next3h.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Next 3 Hours</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neural">{metrics.demandPrediction.next6h.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Next 6 Hours</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Passenger Surge Alerts */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            Surge Predictions
          </h3>
          <div className="space-y-3">
            {surges.map((surge, index) => (
              <div key={index} className="p-3 rounded-lg border border-warning/20 bg-warning/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{surge.event}</span>
                  <span className="text-xs font-medium text-warning">+{surge.expectedSurge} passengers</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  <div>📍 {surge.station}</div>
                  <div>⏰ Impact in {surge.timeToImpact}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commuter Personas */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-neural" />
            Commuter Personas
          </h3>
          <div className="space-y-3">
            {personas.map((persona) => {
              const Icon = persona.icon;
              return (
                <div key={persona.type} className="p-3 rounded-lg border border-neural/20 bg-neural/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-neural" />
                      <span className="font-medium text-sm capitalize">{persona.type.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">{persona.percentage}%</span>
                      <div className="flex items-center gap-1">
                        <Target className="w-3 h-3 text-primary" />
                        <span className="text-xs">{persona.satisfaction.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Peak: {persona.peakHours}</div>
                    <div>{persona.behavior}</div>
                  </div>
                  <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-neural rounded-full transition-all duration-300"
                      style={{ width: `${persona.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Station Flow Analysis */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Real-time Station Flow</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {passengerFlows.map((flow, index) => (
            <div key={index} className={`p-4 rounded-lg border ${getCrowdingColor(flow.crowdingLevel)} transition-all duration-300`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">{flow.station}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getCrowdingIcon(flow.crowdingLevel)}
                  <span className="text-sm font-medium capitalize">{flow.crowdingLevel}</span>
                  {flow.predictedWaitTime > 5 && (
                    <div className="flex items-center gap-1 text-cyber-threat">
                      <Target className="w-3 h-3" />
                      <span className="text-xs">Low Satisfaction</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">{flow.inbound}</div>
                  <div className="text-xs text-muted-foreground">Inbound</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-ar-accent">{flow.outbound}</div>
                  <div className="text-xs text-muted-foreground">Outbound</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-warning">{flow.predictedWaitTime.toFixed(1)}m</div>
                  <div className="text-xs text-muted-foreground">Wait Time</div>
                </div>
              </div>

              <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={{ 
                    width: `${Math.min(100, ((flow.inbound + flow.outbound) / 400) * 100)}%`,
                    background: flow.crowdingLevel === "critical" ? "hsl(var(--cyber-threat))" :
                               flow.crowdingLevel === "high" ? "hsl(var(--cyber-threat))" :
                               flow.crowdingLevel === "medium" ? "hsl(var(--warning))" :
                               "hsl(var(--cyber-safe))"
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};