import { useState } from "react";
import { 
  UserPlus, 
  Stethoscope, 
  Calendar, 
  Package, 
  CreditCard, 
  BarChart3 
} from "lucide-react";
import PatientManagement from "../Patient/PatientManagement";
import Header from "../dashboard/Header";
import DashboardCard from "./DashboardCard";

interface DashboardProps {
  onLogout?: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [currentView, setCurrentView] = useState<string>("dashboard");

  const handleLogout = () => {
    setCurrentView("login");
    onLogout?.();
  };

  const dashboardCards = [
    {
      title: "Patient Management",
      description: "Register patients, manage visits & records.",
      icon: UserPlus,
      iconColor: "text-primary",
      onClick: () => setCurrentView("patient-management")
    },
    {
      title: "Doctor Management", 
      description: "Manage doctor profiles & schedules.",
      icon: Stethoscope,
      iconColor: "text-info"
    },
    {
      title: "Appointments",
      description: "Book & track patient appointments.",
      icon: Calendar,
      iconColor: "text-accent"
    },
    {
      title: "Inventory Management",
      description: "Track medicines & supplies.",
      icon: Package,
      iconColor: "text-warning"
    },
    {
      title: "Billing & Payments",
      description: "Generate invoices & handle payments.",
      icon: CreditCard,
      iconColor: "text-success"
    },
    {
      title: "Reports",
      description: "View reports & analytics.",
      icon: BarChart3,
      iconColor: "text-destructive"
    }
  ];

  if (currentView === "patient-management") {
    return <PatientManagement onBack={() => setCurrentView("dashboard")} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Hospital Management Dashboard
          </h2>
          <p className="text-muted-foreground">
            Welcome to your comprehensive healthcare management system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              iconColor={card.iconColor}
              onClick={card.onClick}
            />
          ))}
        </div>
      </main>

      <footer className="bg-card border-t border-border py-6 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          © 2024 Devbhoomi Clinic - All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;