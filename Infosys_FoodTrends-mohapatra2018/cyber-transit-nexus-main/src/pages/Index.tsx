import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TrainMonitoringPanel } from "@/components/dashboard/TrainMonitoringPanel";
import { CybersecurityPanel } from "@/components/dashboard/CybersecurityPanel";
import { ClimateMonitoringPanel } from "@/components/dashboard/ClimateMonitoringPanel";
import { PassengerAnalyticsPanel } from "@/components/dashboard/PassengerAnalyticsPanel";
import { ARVRInterfacePanel } from "@/components/dashboard/ARVRInterfacePanel";
import { MultiModalTransportPanel } from "@/components/dashboard/MultiModalTransportPanel";
import { GenerativeAIPanel } from "@/components/dashboard/GenerativeAIPanel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader />
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <TrainMonitoringPanel />
          <CybersecurityPanel />
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <ClimateMonitoringPanel />
          <PassengerAnalyticsPanel />
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <ARVRInterfacePanel />
          <MultiModalTransportPanel />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <GenerativeAIPanel />
        </div>
      </div>
    </div>
  );
};

export default Index;