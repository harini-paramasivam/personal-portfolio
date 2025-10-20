import { useState, useEffect } from "react";
import { Shield, AlertTriangle, Lock, Wifi, Database, Zap, Target, Crosshair, Radio, UserX } from "lucide-react";

interface SecurityAlert {
  id: string;
  type: "anomaly" | "intrusion" | "malware" | "normal" | "spoofing" | "gps-jamming" | "unauthorized-login";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  timestamp: Date;
  source: string;
  status: "active" | "investigating" | "resolved";
  attackType?: string;
  responseAction?: string;
}

interface SecurityThreat {
  attackType: string;
  count: number;
  lastSeen: string;
  riskLevel: "low" | "medium" | "high" | "critical";
  responseAction: string;
  icon: any;
}

export const CybersecurityPanel = () => {
  const [securityStatus, setSecurityStatus] = useState<"secure" | "alert" | "critical">("secure");
  const [alerts, setAlerts] = useState<SecurityAlert[]>([
    {
      id: "SEC001",
      type: "gps-jamming",
      severity: "high",
      description: "GPS signal interference detected on Train T012",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      source: "Navigation Security Monitor",
      status: "investigating",
      attackType: "GPS Jamming",
      responseAction: "Backup navigation activated"
    },
    {
      id: "SEC002",
      type: "spoofing",
      severity: "medium", 
      description: "Sensor data spoofing attempt blocked",
      timestamp: new Date(Date.now() - 1000 * 60 * 8),
      source: "Sensor Integrity Shield",
      status: "resolved",
      attackType: "Sensor Spoofing",
      responseAction: "Source isolated & blocked"
    },
    {
      id: "SEC003",
      type: "unauthorized-login",
      severity: "critical",
      description: "Multiple failed admin login attempts detected",
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      source: "Access Control Monitor", 
      status: "active",
      attackType: "Brute Force Attack",
      responseAction: "Account locked, IP banned"
    }
  ]);

  const [threats, setThreats] = useState<SecurityThreat[]>([
    {
      attackType: "GPS Jamming",
      count: 23,
      lastSeen: "5 min ago",
      riskLevel: "high", 
      responseAction: "Switched to backup navigation",
      icon: Radio
    },
    {
      attackType: "Sensor Spoofing",
      count: 45,
      lastSeen: "8 min ago",
      riskLevel: "medium",
      responseAction: "Data source isolated",
      icon: Target
    },
    {
      attackType: "Unauthorized Access",
      count: 12,
      lastSeen: "2 min ago", 
      riskLevel: "critical",
      responseAction: "Account locked & monitored",
      icon: UserX
    },
    {
      attackType: "Network Intrusion",
      count: 8,
      lastSeen: "15 min ago",
      riskLevel: "medium",
      responseAction: "Traffic filtered & logged",
      icon: Crosshair
    }
  ]);

  const [metrics, setMetrics] = useState({
    threatsBlocked: 1247,
    systemIntegrity: 98.5,
    encryptionStatus: 100,
    networkSecurity: 96.2
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time security monitoring
      setMetrics(prev => ({
        ...prev,
        threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 3),
        systemIntegrity: Math.max(95, Math.min(100, prev.systemIntegrity + (Math.random() - 0.5) * 2)),
        networkSecurity: Math.max(90, Math.min(100, prev.networkSecurity + (Math.random() - 0.5) * 3))
      }));

      // Occasionally add new security events
      if (Math.random() < 0.1) {
        const newAlert: SecurityAlert = {
          id: `SEC${String(Date.now()).slice(-3)}`,
          type: Math.random() > 0.8 ? "anomaly" : "normal",
          severity: Math.random() > 0.7 ? "medium" : "low",
          description: "AI behavioral analysis detected minor system deviation",
          timestamp: new Date(),
          source: "Neural Security Monitor",
          status: "active"
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: SecurityAlert["severity"]) => {
    switch (severity) {
      case "low": return "text-cyber-safe border-cyber-safe/20 bg-cyber-safe/5";
      case "medium": return "text-warning border-warning/20 bg-warning/5";
      case "high": return "text-cyber-threat border-cyber-threat/20 bg-cyber-threat/10";
      case "critical": return "text-cyber-threat border-cyber-threat/40 bg-cyber-threat/20 glow-cyber";
    }
  };

  const getTypeIcon = (type: SecurityAlert["type"]) => {
    switch (type) {
      case "anomaly": return <AlertTriangle className="w-4 h-4" />;
      case "intrusion": return <Shield className="w-4 h-4" />;
      case "malware": return <Zap className="w-4 h-4" />;
      case "normal": return <Lock className="w-4 h-4" />;
      case "gps-jamming": return <Radio className="w-4 h-4" />;
      case "spoofing": return <Target className="w-4 h-4" />;
      case "unauthorized-login": return <UserX className="w-4 h-4" />;
    }
  };

  const getThreatRiskColor = (risk: SecurityThreat["riskLevel"]) => {
    switch (risk) {
      case "low": return "text-cyber-safe border-cyber-safe/20 bg-cyber-safe/5";
      case "medium": return "text-warning border-warning/20 bg-warning/5";
      case "high": return "text-cyber-threat border-cyber-threat/20 bg-cyber-threat/10";
      case "critical": return "text-cyber-threat border-cyber-threat/40 bg-cyber-threat/20 glow-cyber";
    }
  };

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-cyber-safe/20 glow-cyber">
          <Shield className="w-5 h-5 text-cyber-safe" />
        </div>
        <h2 className="text-xl font-semibold">Security Operations Center (SOC)</h2>
        <div className="ml-auto flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full animate-pulse ${
            securityStatus === "secure" ? "bg-cyber-safe" : 
            securityStatus === "alert" ? "bg-warning" : "bg-cyber-threat"
          }`} />
          <span className="text-sm text-muted-foreground">
            Status: {securityStatus.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Threats Blocked</span>
          </div>
          <div className="text-2xl font-bold text-primary">{metrics.threatsBlocked.toLocaleString()}</div>
        </div>

        <div className="p-3 rounded-lg bg-cyber-safe/5 border border-cyber-safe/20">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-cyber-safe" />
            <span className="text-sm text-muted-foreground">System Integrity</span>
          </div>
          <div className="text-2xl font-bold text-cyber-safe">{metrics.systemIntegrity.toFixed(1)}%</div>
        </div>

        <div className="p-3 rounded-lg bg-neural/5 border border-neural/20">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-neural" />
            <span className="text-sm text-muted-foreground">Encryption</span>
          </div>
          <div className="text-2xl font-bold text-neural">{metrics.encryptionStatus}%</div>
        </div>

        <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
          <div className="flex items-center gap-2 mb-2">
            <Wifi className="w-4 h-4 text-warning" />
            <span className="text-sm text-muted-foreground">Network Security</span>
          </div>
          <div className="text-2xl font-bold text-warning">{metrics.networkSecurity.toFixed(1)}%</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Threat Intelligence Dashboard */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-cyber-threat" />
            Active Threats
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {threats.map((threat, index) => {
              const Icon = threat.icon;
              return (
                <div key={index} className={`p-3 rounded-lg border ${getThreatRiskColor(threat.riskLevel)} transition-all duration-300`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="font-medium text-sm">{threat.attackType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">{threat.count} attempts</span>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${getThreatRiskColor(threat.riskLevel)}`}>
                        {threat.riskLevel.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Last seen: {threat.lastSeen}</div>
                    <div className="font-medium text-primary">Response: {threat.responseAction}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Security Events */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Live Security Feed</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)} transition-all duration-300`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(alert.type)}
                    <span className="font-medium text-sm">{alert.id}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {alert.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm mb-2">{alert.description}</p>
                {alert.attackType && (
                  <div className="text-xs mb-1">
                    <span className="text-cyber-threat font-medium">Attack Type:</span> {alert.attackType}
                  </div>
                )}
                {alert.responseAction && (
                  <div className="text-xs mb-2">
                    <span className="text-cyber-safe font-medium">Response:</span> {alert.responseAction}
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Source: {alert.source}</span>
                  <span className={`px-2 py-1 rounded ${
                    alert.status === "resolved" ? "bg-cyber-safe/20 text-cyber-safe" :
                    alert.status === "investigating" ? "bg-warning/20 text-warning" :
                    "bg-cyber-threat/20 text-cyber-threat"
                  }`}>
                    {alert.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};