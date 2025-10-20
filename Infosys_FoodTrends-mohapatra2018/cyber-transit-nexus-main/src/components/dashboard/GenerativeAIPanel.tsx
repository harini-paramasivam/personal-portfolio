import { useState, useEffect } from "react";
import { Brain, Zap, AlertTriangle, Bus, Train, Shield, Play, CheckCircle, Clock } from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  description: string;
  type: "accident" | "flood" | "cyberattack" | "maintenance" | "surge";
  severity: "low" | "medium" | "high" | "critical";
  icon: any;
  estimatedImpact: string;
}

interface SimulationResult {
  id: string;
  scenario: string;
  aiResponse: string[];
  executionTime: number;
  status: "running" | "completed" | "analyzing";
  impactMitigation: string;
}

export const GenerativeAIPanel = () => {
  const [scenarios] = useState<Scenario[]>([
    {
      id: "SIM001",
      name: "Accident on T005",
      description: "Simulate train collision on East Route during peak hours",
      type: "accident", 
      severity: "critical",
      icon: AlertTriangle,
      estimatedImpact: "2,500 passengers affected"
    },
    {
      id: "SIM002", 
      name: "Flood Alert - East Route",
      description: "Heavy rainfall flooding tracks and stations",
      type: "flood",
      severity: "high", 
      icon: AlertTriangle,
      estimatedImpact: "4 stations offline, 3,200 passengers"
    },
    {
      id: "SIM003",
      name: "Cyberattack Attempt",
      description: "Coordinated attack on control systems", 
      type: "cyberattack",
      severity: "critical",
      icon: Shield,
      estimatedImpact: "Network-wide security protocols"
    },
    {
      id: "SIM004",
      name: "Emergency Maintenance",
      description: "Critical infrastructure failure requiring immediate response",
      type: "maintenance",
      severity: "medium",
      icon: Train,
      estimatedImpact: "Central Line capacity reduced 40%"
    }
  ]);

  const [activeSimulation, setActiveSimulation] = useState<SimulationResult | null>(null);
  const [simulationHistory, setSimulationHistory] = useState<SimulationResult[]>([
    {
      id: "RES001",
      scenario: "Accident on T005",
      aiResponse: [
        "🚨 Immediate emergency response activated",
        "🚌 12 emergency buses deployed to affected route", 
        "📱 Passenger alerts sent to 2,500 affected users",
        "🚑 Emergency services notified and coordinated",
        "🔄 Alternative routes calculated and activated"
      ],
      executionTime: 2.3,
      status: "completed",
      impactMitigation: "92% passenger flow maintained"
    }
  ]);

  const [aiMetrics, setAiMetrics] = useState({
    scenariosProcessed: 1247,
    averageResponseTime: 2.1,
    accuracyRate: 96.8,
    mitigationSuccess: 94.2
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAiMetrics(prev => ({
        ...prev,
        scenariosProcessed: prev.scenariosProcessed + Math.floor(Math.random() * 3),
        averageResponseTime: Math.max(1.5, Math.min(4.0, prev.averageResponseTime + (Math.random() - 0.5) * 0.2)),
        accuracyRate: Math.max(94, Math.min(99, prev.accuracyRate + (Math.random() - 0.5) * 0.5)),
        mitigationSuccess: Math.max(90, Math.min(98, prev.mitigationSuccess + (Math.random() - 0.5) * 0.3))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const runSimulation = (scenario: Scenario) => {
    const newSimulation: SimulationResult = {
      id: `RES${Date.now()}`,
      scenario: scenario.name,
      aiResponse: [],
      executionTime: 0,
      status: "running",
      impactMitigation: "Calculating..."
    };
    
    setActiveSimulation(newSimulation);

    // Simulate AI processing
    setTimeout(() => {
      const responses = generateAIResponse(scenario);
      setActiveSimulation(prev => prev ? {
        ...prev,
        aiResponse: responses,
        status: "analyzing"
      } : null);
      
      setTimeout(() => {
        const completedSimulation: SimulationResult = {
          ...newSimulation,
          aiResponse: responses,
          executionTime: Math.random() * 3 + 1,
          status: "completed",
          impactMitigation: `${Math.floor(Math.random() * 20 + 80)}% impact mitigated`
        };
        
        setActiveSimulation(null);
        setSimulationHistory(prev => [completedSimulation, ...prev.slice(0, 4)]);
      }, 3000);
    }, 2000);
  };

  const generateAIResponse = (scenario: Scenario): string[] => {
    const baseResponses = {
      accident: [
        "🚨 Emergency protocols activated immediately", 
        "🚌 Emergency bus fleet deployed to maintain service",
        "📱 Real-time passenger notifications sent",
        "🚑 Emergency services coordination initiated",
        "🔄 Dynamic route optimization activated"
      ],
      flood: [
        "🌧️ Weather monitoring systems activated",
        "🚇 Alternative underground routes prioritized", 
        "⚡ Power systems switched to flood-safe mode",
        "📢 Early evacuation procedures initiated",
        "🛡️ Infrastructure protection measures deployed"
      ],
      cyberattack: [
        "🔒 All systems immediately isolated",
        "🛡️ Backup security protocols activated",
        "📊 AI threat analysis initiated",
        "🔄 Manual override systems engaged",
        "📱 Secure communication channels established"
      ],
      maintenance: [
        "🔧 Predictive maintenance schedule optimized",
        "🚌 Temporary transport alternatives deployed",
        "📊 Capacity reallocation algorithms activated", 
        "⏰ Maintenance window optimized for minimal impact",
        "📱 Passenger journey replanning initiated"
      ]
    };
    
    return baseResponses[scenario.type] || baseResponses.accident;
  };

  const getSeverityColor = (severity: Scenario["severity"]) => {
    switch (severity) {
      case "low": return "text-cyber-safe border-cyber-safe/20 bg-cyber-safe/5";
      case "medium": return "text-warning border-warning/20 bg-warning/5"; 
      case "high": return "text-cyber-threat border-cyber-threat/20 bg-cyber-threat/10";
      case "critical": return "text-cyber-threat border-cyber-threat/40 bg-cyber-threat/20 glow-cyber";
    }
  };

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg gradient-neural glow-neural">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold">Generative AI Simulation Center</h2>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neural animate-pulse" />
          <span className="text-sm text-muted-foreground">AI Engine Active</span>
        </div>
      </div>

      {/* AI Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-3 rounded-lg bg-neural/5 border border-neural/20">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-neural" />
            <span className="text-sm text-muted-foreground">Scenarios Processed</span>
          </div>
          <div className="text-2xl font-bold text-neural">{aiMetrics.scenariosProcessed.toLocaleString()}</div>
        </div>

        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Response Time</span>
          </div>
          <div className="text-2xl font-bold text-primary">{aiMetrics.averageResponseTime.toFixed(1)}s</div>
        </div>

        <div className="p-3 rounded-lg bg-cyber-safe/5 border border-cyber-safe/20">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-cyber-safe" />
            <span className="text-sm text-muted-foreground">Accuracy Rate</span>
          </div>
          <div className="text-2xl font-bold text-cyber-safe">{aiMetrics.accuracyRate.toFixed(1)}%</div>
        </div>

        <div className="p-3 rounded-lg bg-ar-accent/5 border border-ar-accent/20">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-ar-accent" />
            <span className="text-sm text-muted-foreground">Mitigation Success</span>
          </div>
          <div className="text-2xl font-bold text-ar-accent">{aiMetrics.mitigationSuccess.toFixed(1)}%</div>
        </div>
      </div>

      {/* Active Simulation */}
      {activeSimulation && (
        <div className="mb-6 p-4 rounded-lg border border-neural/20 bg-neural/5">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-neural animate-spin" />
            <h3 className="font-semibold">Running Simulation: {activeSimulation.scenario}</h3>
          </div>
          {activeSimulation.status === "running" && (
            <div className="text-sm text-muted-foreground">
              AI is analyzing scenario parameters and generating response strategies...
            </div>
          )}
          {activeSimulation.status === "analyzing" && (
            <div className="space-y-2">
              {activeSimulation.aiResponse.map((response, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-cyber-safe" />
                  <span>{response}</span>
                </div>
              ))}
              <div className="text-sm text-neural">Analyzing mitigation effectiveness...</div>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* What-If Scenarios */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Play className="w-5 h-5 text-primary" />
            What-If Scenarios
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon;
              return (
                <div key={scenario.id} className={`p-3 rounded-lg border ${getSeverityColor(scenario.severity)} transition-all duration-300`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="font-medium text-sm">{scenario.name}</span>
                    </div>
                    <button
                      onClick={() => runSimulation(scenario)}
                      disabled={!!activeSimulation}
                      className="px-3 py-1 bg-primary/20 hover:bg-primary/30 rounded text-xs font-medium text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Run Simulation
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{scenario.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`px-2 py-1 rounded font-medium ${getSeverityColor(scenario.severity)}`}>
                      {scenario.severity.toUpperCase()}
                    </span>
                    <span className="text-muted-foreground">{scenario.estimatedImpact}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Simulation Results */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-cyber-safe" />
            Recent Simulations
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {simulationHistory.map((result) => (
              <div key={result.id} className="p-3 rounded-lg border border-glass-border bg-glass/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{result.scenario}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-primary">{result.executionTime.toFixed(1)}s</span>
                    <CheckCircle className="w-3 h-3 text-cyber-safe" />
                  </div>
                </div>
                
                <div className="space-y-1 mb-2">
                  {result.aiResponse.slice(0, 2).map((response, index) => (
                    <div key={index} className="text-xs text-muted-foreground">{response}</div>
                  ))}
                  {result.aiResponse.length > 2 && (
                    <div className="text-xs text-primary">+{result.aiResponse.length - 2} more actions</div>
                  )}
                </div>
                
                <div className="text-xs font-medium text-cyber-safe">
                  Result: {result.impactMitigation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};