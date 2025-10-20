import { useState, useEffect } from "react";
import { CloudRain, Sun, Wind, Thermometer, Droplets, Eye, AlertTriangle } from "lucide-react";

interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  condition: "clear" | "cloudy" | "rain" | "storm" | "snow";
  alerts: string[];
}

interface ClimateImpact {
  type: "temperature" | "precipitation" | "wind" | "visibility";
  severity: "low" | "medium" | "high";
  description: string;
  affectedRoutes: string[];
  recommendation: string;
}

export const ClimateMonitoringPanel = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([
    {
      location: "Central District",
      temperature: 22,
      humidity: 65,
      windSpeed: 12,
      visibility: 10,
      condition: "clear",
      alerts: []
    },
    {
      location: "East Route",
      temperature: 24,
      humidity: 58,
      windSpeed: 8,
      visibility: 15,
      condition: "cloudy",
      alerts: []
    },
    {
      location: "Metro Loop",
      temperature: 28,
      humidity: 72,
      windSpeed: 15,
      visibility: 8,
      condition: "rain",
      alerts: ["Light rain expected until 3 PM"]
    }
  ]);

  const [climateImpacts, setClimateImpacts] = useState<ClimateImpact[]>([
    {
      type: "temperature",
      severity: "medium",
      description: "Elevated temperatures detected on South Express route",
      affectedRoutes: ["South Express", "Metro Loop"],
      recommendation: "Reduce speed by 10% to prevent track deformation"
    },
    {
      type: "precipitation",
      severity: "low",
      description: "Light rainfall on eastern sections",
      affectedRoutes: ["East Route"],
      recommendation: "Monitor brake performance and visibility"
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWeatherData(prev => prev.map(data => ({
        ...data,
        temperature: Math.max(15, Math.min(35, data.temperature + (Math.random() - 0.5) * 2)),
        humidity: Math.max(30, Math.min(90, data.humidity + (Math.random() - 0.5) * 5)),
        windSpeed: Math.max(0, Math.min(25, data.windSpeed + (Math.random() - 0.5) * 3)),
        visibility: Math.max(1, Math.min(20, data.visibility + (Math.random() - 0.5) * 2))
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getConditionIcon = (condition: WeatherData["condition"]) => {
    switch (condition) {
      case "clear": return <Sun className="w-5 h-5 text-warning" />;
      case "cloudy": return <CloudRain className="w-5 h-5 text-muted-foreground" />;
      case "rain": return <CloudRain className="w-5 h-5 text-climate-blue" />;
      case "storm": return <CloudRain className="w-5 h-5 text-cyber-threat" />;
      case "snow": return <CloudRain className="w-5 h-5 text-primary" />;
    }
  };

  const getSeverityColor = (severity: ClimateImpact["severity"]) => {
    switch (severity) {
      case "low": return "border-climate-green/20 bg-climate-green/5 text-climate-green";
      case "medium": return "border-warning/20 bg-warning/5 text-warning";
      case "high": return "border-cyber-threat/20 bg-cyber-threat/5 text-cyber-threat";
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < 10) return "text-climate-blue";
    if (temp < 25) return "text-climate-green";
    if (temp < 30) return "text-warning";
    return "text-cyber-threat";
  };

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-climate-blue/20">
          <CloudRain className="w-5 h-5 text-climate-blue" />
        </div>
        <h2 className="text-xl font-semibold">Climate-Aware Operations</h2>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-climate-blue animate-pulse" />
          <span className="text-sm text-muted-foreground">Real-time Weather</span>
        </div>
      </div>

      {/* Weather Stations */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {weatherData.map((station, index) => (
          <div key={index} className="p-4 rounded-lg border border-glass-border bg-glass/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">{station.location}</h3>
              {getConditionIcon(station.condition)}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Temp</span>
                </div>
                <span className={`text-sm font-medium ${getTemperatureColor(station.temperature)}`}>
                  {station.temperature.toFixed(1)}°C
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Humidity</span>
                </div>
                <span className="text-sm font-medium">{station.humidity.toFixed(0)}%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Wind</span>
                </div>
                <span className="text-sm font-medium">{station.windSpeed.toFixed(1)} km/h</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Visibility</span>
                </div>
                <span className="text-sm font-medium">{station.visibility.toFixed(1)} km</span>
              </div>
            </div>

            {station.alerts.length > 0 && (
              <div className="mt-3 pt-3 border-t border-glass-border">
                {station.alerts.map((alert, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-3 h-3 text-warning mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-warning">{alert}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Climate Impact Analysis */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Climate Impact Analysis</h3>
        <div className="space-y-3">
          {climateImpacts.map((impact, index) => (
            <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(impact.severity)} transition-all duration-300`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-medium text-sm capitalize">{impact.type} Impact</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(impact.severity)}`}>
                    {impact.severity.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <p className="text-sm mb-3">{impact.description}</p>
              
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-muted-foreground font-medium">Affected Routes:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {impact.affectedRoutes.map((route, i) => (
                      <span key={i} className="px-2 py-1 bg-muted/50 rounded text-xs">
                        {route}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-xs text-muted-foreground font-medium">AI Recommendation:</span>
                  <p className="text-xs mt-1 text-primary font-medium">{impact.recommendation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};