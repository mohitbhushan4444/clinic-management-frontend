import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, UserPlus, Search, List } from "lucide-react";
import PatientRegistration from "./PatientRegistration";
import PatientIndex from "./PatientIndex";
import PatientEnquiry from "./PatientEnquiry";

interface PatientManagementProps {
  onBack: () => void;
}

const PatientManagement = ({ onBack }: PatientManagementProps) => {
  const [currentView, setCurrentView] = useState<string>("menu");

  const menuItems = [
    {
      id: "index",
      title: "Patient Index",
      description: "View all registered patients",
      icon: List,
      component: <PatientIndex onBack={() => setCurrentView("menu")} />
    },
    {
      id: "registration", 
      title: "Patient Registration",
      description: "Register new patients",
      icon: UserPlus,
      component: <PatientRegistration onBack={() => setCurrentView("menu")} />
    },
    {
      id: "enquiry",
      title: "Patient Enquiry", 
      description: "Search and view patient details",
      icon: Search,
      component: <PatientEnquiry onBack={() => setCurrentView("menu")} />
    },
    {
      id: "patients",
      title: "Patients",
      description: "Manage patient records",
      icon: Users
    }
  ];

  const currentItem = menuItems.find(item => item.id === currentView);
  if (currentItem?.component) {
    return currentItem.component;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary shadow-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onBack}
              className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-primary-foreground">
              Patient Management
            </h1>
          </div>
        </div>
      </div>

      {/* Sidebar and Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-primary min-h-screen p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentView === item.id 
                    ? "bg-primary-light text-primary-foreground" 
                    : "text-primary-foreground hover:bg-primary-dark"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Patient Management Options
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuItems.map((item) => (
                <Card
                  key={item.id}
                  className="cursor-pointer transition-all duration-300 hover:shadow-hover hover:scale-105"
                  onClick={() => setCurrentView(item.id)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <item.icon className="h-6 w-6 text-primary" />
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientManagement;