import { useState, useEffect } from "react";
import { Glasses, Monitor, Headphones, Zap, Eye, Hand, Layers } from "lucide-react";

interface ARVRSession {
  id: string;
  user: string;
  type: "AR" | "VR";
  location: string;
  duration: number;
  activity: string;
  status: "active" | "standby" | "maintenance";
}

interface ImmersiveFeature {
  name: string;
  type: "visualization" | "interaction" | "collaboration" | "training";
  status: "online" | "offline" | "updating";
  users: number;
  description: string;
}

export const ARVRInterfacePanel = () => {
  const [sessions, setSessions] = useState<ARVRSession[]>([
    {
      id: "AR001",
      user: "Operations Manager",
      type: "AR",
      location: "Control Center",
      duration: 45,
      activity: "Live train monitoring overlay",
      status: "active"
    },
    {
      id: "VR002",
      user: "Maintenance Team",
      type: "VR",
      location: "Remote Office",
      duration: 23,
      activity: "Virtual inspection simulation",
      status: "active"
    },
    {
      id: "AR003",
      user: "Safety Inspector",
      type: "AR",
      location: "Station Platform",
      duration: 67,
      activity: "Real-time safety assessment",
      status: "active"
    }
  ]);

  const [features, setFeatures] = useState<ImmersiveFeature[]>([
    {
      name: "3D Train Visualization",
      type: "visualization",
      status: "online",
      users: 8,
      description: "Real-time 3D models of all active trains with sensor data overlay"
    },
    {
      name: "Holographic Controls",
      type: "interaction",
      status: "online",
      users: 3,
      description: "Gesture-based control interface for system management"
    },
    {
      name: "Collaborative Workspaces",
      type: "collaboration",
      status: "online",
      users: 12,
      description: "Shared virtual environments for team coordination"
    },
    {
      name: "Emergency Response Training",
      type: "training",
      status: "updating",
      users: 0,
      description: "VR-based crisis simulation and response training modules"
    }
  ]);

  const [immersiveMetrics, setImmersiveMetrics] = useState({
    activeUsers: 23,
    averageSessionTime: 42,
    systemLoad: 68,
    renderQuality: 94
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSessions(prev => prev.map(session => ({
        ...session,
        duration: session.status === "active" ? session.duration + 1 : session.duration
      })));

      setImmersiveMetrics(prev => ({
        ...prev,
        activeUsers: Math.max(15, Math.min(35, prev.activeUsers + Math.floor((Math.random() - 0.5) * 3))),
        systemLoad: Math.max(50, Math.min(90, prev.systemLoad + Math.floor((Math.random() - 0.5) * 5))),
        renderQuality: Math.max(85, Math.min(100, prev.renderQuality + Math.floor((Math.random() - 0.5) * 2)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getTypeColor = (type: ARVRSession["type"]) => {
    return type === "AR" ? "text-ar-accent" : "text-vr-accent";
  };

  const getTypeBackground = (type: ARVRSession["type"]) => {
    return type === "AR" ? "bg-ar-accent/20 border-ar-accent/30" : "bg-vr-accent/20 border-vr-accent/30";
  };

  const getStatusColor = (status: ARVRSession["status"]) => {
    switch (status) {
      case "active": return "text-cyber-safe";
      case "standby": return "text-warning";
      case "maintenance": return "text-cyber-threat";
    }
  };

  const getFeatureStatusColor = (status: ImmersiveFeature["status"]) => {
    switch (status) {
      case "online": return "text-cyber-safe border-cyber-safe/20 bg-cyber-safe/5";
      case "offline": return "text-cyber-threat border-cyber-threat/20 bg-cyber-threat/5";
      case "updating": return "text-warning border-warning/20 bg-warning/5";
    }
  };

  const getFeatureIcon = (type: ImmersiveFeature["type"]) => {
    switch (type) {
      case "visualization": return <Eye className="w-4 h-4" />;
      case "interaction": return <Hand className="w-4 h-4" />;
      case "collaboration": return <Layers className="w-4 h-4" />;
      case "training": return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg gradient-ar">
          <Glasses className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold">Immersive AR/VR Interface</h2>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-ar-accent animate-pulse" />
          <span className="text-sm text-muted-foreground">Mixed Reality Active</span>
        </div>
      </div>

      {/* AR/VR Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-3 rounded-lg bg-ar-accent/5 border border-ar-accent/20">
          <div className="flex items-center gap-2 mb-2">
            <Glasses className="w-4 h-4 text-ar-accent" />
            <span className="text-sm text-muted-foreground">Active Users</span>
          </div>
          <div className="text-2xl font-bold text-ar-accent">{immersiveMetrics.activeUsers}</div>
        </div>

        <div className="p-3 rounded-lg bg-vr-accent/5 border border-vr-accent/20">
          <div className="flex items-center gap-2 mb-2">
            <Monitor className="w-4 h-4 text-vr-accent" />
            <span className="text-sm text-muted-foreground">Avg Session</span>
          </div>
          <div className="text-2xl font-bold text-vr-accent">{immersiveMetrics.averageSessionTime}m</div>
        </div>

        <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-warning" />
            <span className="text-sm text-muted-foreground">System Load</span>
          </div>
          <div className="text-2xl font-bold text-warning">{immersiveMetrics.systemLoad}%</div>
        </div>

        <div className="p-3 rounded-lg bg-cyber-safe/5 border border-cyber-safe/20">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-cyber-safe" />
            <span className="text-sm text-muted-foreground">Render Quality</span>
          </div>
          <div className="text-2xl font-bold text-cyber-safe">{immersiveMetrics.renderQuality}%</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Active Sessions */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {sessions.map((session) => (
              <div key={session.id} className={`p-3 rounded-lg border ${getTypeBackground(session.type)} transition-all duration-300`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(session.type)} border ${session.type === "AR" ? "border-ar-accent/30" : "border-vr-accent/30"}`}>
                      {session.type}
                    </div>
                    <span className="font-medium text-sm">{session.id}</span>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(session.status)} animate-pulse`} />
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm">
                    <span className="text-muted-foreground">User:</span> {session.user}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Location:</span> {session.location}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Activity:</span> {session.activity}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Duration:</span> {session.duration} minutes
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Immersive Features */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Immersive Features</h3>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {features.map((feature, index) => (
              <div key={index} className={`p-3 rounded-lg border ${getFeatureStatusColor(feature.status)} transition-all duration-300`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getFeatureIcon(feature.type)}
                    <span className="font-medium text-sm">{feature.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium capitalize">{feature.status}</span>
                    {feature.users > 0 && (
                      <span className="text-xs text-muted-foreground">({feature.users} users)</span>
                    )}
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">{feature.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground capitalize">{feature.type}</span>
                  {feature.status === "online" && feature.users > 0 && (
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-1 rounded-full bg-cyber-safe animate-pulse" />
                      <span className="text-xs text-cyber-safe">Active</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mini 3D City Preview */}
      <div className="mt-6 p-4 rounded-lg border border-primary/20 bg-primary/5">
        <div className="flex items-center gap-2 mb-3">
          <Headphones className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">3D City Digital Twin Preview</h3>
        </div>
        
        {/* Mock 3D Visualization */}
        <div className="relative h-48 bg-gradient-to-br from-primary/10 via-ar-accent/5 to-vr-accent/10 rounded-lg border border-primary/20 mb-3 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Train paths with animated dots */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200">
              {/* Train routes */}
              <path d="M20,60 Q100,40 180,60 T280,80" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0.6" />
              <path d="M20,100 Q80,120 160,110 T280,120" stroke="hsl(var(--ar-accent))" strokeWidth="2" fill="none" opacity="0.6" />
              <path d="M20,140 Q120,160 200,140 T280,160" stroke="hsl(var(--neural))" strokeWidth="2" fill="none" opacity="0.6" />
              
              {/* Animated train dots */}
              <circle r="4" fill="hsl(var(--primary))" opacity="0.8">
                <animateMotion dur="8s" repeatCount="indefinite" path="M20,60 Q100,40 180,60 T280,80" />
              </circle>
              <circle r="4" fill="hsl(var(--ar-accent))" opacity="0.8">
                <animateMotion dur="10s" repeatCount="indefinite" path="M20,100 Q80,120 160,110 T280,120" />
              </circle>
              <circle r="4" fill="hsl(var(--neural))" opacity="0.8">
                <animateMotion dur="12s" repeatCount="indefinite" path="M20,140 Q120,160 200,140 T280,160" />
              </circle>
              
              {/* Station nodes */}
              <circle cx="50" cy="55" r="6" fill="hsl(var(--cyber-safe))" opacity="0.8" />
              <circle cx="150" cy="65" r="6" fill="hsl(var(--warning))" opacity="0.8" />
              <circle cx="220" cy="70" r="6" fill="hsl(var(--cyber-threat))" opacity="0.8" />
              
              {/* Passenger density heatmaps */}
              <circle cx="50" cy="55" r="20" fill="hsl(var(--cyber-safe))" opacity="0.1" />
              <circle cx="150" cy="65" r="35" fill="hsl(var(--warning))" opacity="0.15" />
              <circle cx="220" cy="70" r="25" fill="hsl(var(--cyber-threat))" opacity="0.2" />
            </svg>
            
            {/* 3D Effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
          </div>
          
          {/* AR/VR View Toggle */}
          <div className="absolute top-2 right-2 flex gap-2">
            <button className="px-2 py-1 bg-ar-accent/20 rounded text-xs font-medium text-ar-accent hover:bg-ar-accent/30 transition-colors">
              AR View
            </button>
            <button className="px-2 py-1 bg-vr-accent/20 rounded text-xs font-medium text-vr-accent hover:bg-vr-accent/30 transition-colors">
              VR View
            </button>
          </div>
          
          {/* Real-time data overlays */}
          <div className="absolute bottom-2 left-2 space-y-1">
            <div className="flex items-center gap-1 text-xs text-cyber-safe bg-black/20 px-2 py-1 rounded">
              <div className="w-2 h-2 rounded-full bg-cyber-safe animate-pulse" />
              Low Density
            </div>
            <div className="flex items-center gap-1 text-xs text-warning bg-black/20 px-2 py-1 rounded">
              <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
              Medium Density
            </div>
            <div className="flex items-center gap-1 text-xs text-cyber-threat bg-black/20 px-2 py-1 rounded">
              <div className="w-2 h-2 rounded-full bg-cyber-threat animate-pulse" />
              High Density
            </div>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground mb-3">
          Experience real-time train movements, passenger density heatmaps, and system status in immersive 3D. 
          Switch between AR overlays and full VR environments for optimal situational awareness.
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            Live Train Tracking
          </span>
          <span className="flex items-center gap-1">
            <Hand className="w-3 h-3" />
            Gesture Controls
          </span>
          <span className="flex items-center gap-1">
            <Layers className="w-3 h-3" />
            Passenger Heatmaps
          </span>
        </div>
      </div>
    </div>
  );
};