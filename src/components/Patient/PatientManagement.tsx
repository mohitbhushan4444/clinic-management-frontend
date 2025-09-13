import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  UserPlus,
  Search,
  List,
  Activity,
  Calendar,
  FileText,
  Heart,
  Shield,
  Clock,
  TrendingUp,
  Settings,
  Bell,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";
import PatientRegistration from "./PatientRegistration";
import PatientIndex from "./PatientIndex";
import PatientEnquiry from "./PatientEnquiry";

interface PatientManagementProps {
  onBack: () => void;
}

const PatientManagement = ({ onBack }: PatientManagementProps) => {
  const [currentView, setCurrentView] = useState<string>("menu");
  const [activeTab, setActiveTab] = useState("overview");

  const menuItems = [
    {
      id: "index",
      title: "Patient Directory",
      subtitle: "Browse & manage all patients",
      description: "Access comprehensive patient records with advanced search and filtering capabilities",
      icon: List,
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50",
      stats: "1,247 Total",
      component: <PatientIndex onBack={() => setCurrentView("menu")} />
    },
    {
      id: "registration",
      title: "New Registration",
      subtitle: "Register new patients",
      description: "Streamlined patient onboarding with medical history capture and document management",
      icon: UserPlus,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      stats: "12 Today",
      component: <PatientRegistration onBack={() => setCurrentView("menu")} />
    },
    {
      id: "enquiry",
      title: "Patient Lookup",
      subtitle: "Search & view records",
      description: "Quick access to patient information, medical history, and treatment records",
      icon: Search,
      color: "from-purple-500 to-violet-500",
      bgColor: "from-purple-50 to-violet-50",
      stats: "89 Searches",
      component: <PatientEnquiry onBack={() => setCurrentView("menu")} />
    }
  ];

  const quickStats = [
    {
      label: "Active Patients",
      value: "892",
      change: "+12",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      trend: "up"
    },
    {
      label: "Today's Appointments",
      value: "24",
      change: "+3",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100",
      trend: "up"
    },
    {
      label: "New Registrations",
      value: "8",
      change: "+2",
      icon: UserPlus,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      trend: "up"
    },
    {
      label: "Pending Records",
      value: "15",
      change: "-5",
      icon: FileText,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      trend: "down"
    }
  ];

  const recentActivities = [
    {
      type: "registration",
      message: "Sarah Johnson registered",
      time: "5 min ago",
      icon: UserPlus,
      color: "text-blue-600"
    },
    {
      type: "update",
      message: "Medical record updated for John Doe",
      time: "12 min ago",
      icon: FileText,
      color: "text-green-600"
    },
    {
      type: "appointment",
      message: "Next appointment scheduled",
      time: "18 min ago",
      icon: Calendar,
      color: "text-purple-600"
    }
  ];

  const currentItem = menuItems.find(item => item.id === currentView);
  if (currentItem?.component) {
    return currentItem.component;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Medical Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <pattern id="medical-pattern-mgmt" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="currentColor" />
              <path d="M18 20h4M20 18v4" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medical-pattern-mgmt)" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-30"></div>
                <div className="relative p-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                  Patient Care Center
                </h1>
                <p className="text-gray-600 text-lg font-medium">Comprehensive healthcare management system</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-green-700">All Systems Operational</span>
              </div>
              <Button variant="outline" size="sm" className="hover:bg-gray-50">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-gray-50">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 bg-white/60 backdrop-blur-lg border-b border-white/30">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-1">
            {[
              { id: "overview", label: "Overview", icon: Activity },
              { id: "quick-actions", label: "Quick Actions", icon: Users },
              { id: "recent", label: "Recent Activity", icon: Clock }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-all duration-300 border-b-3 ${activeTab === tab.id
                    ? 'text-blue-700 border-blue-500 bg-blue-50/50'
                    : 'text-gray-600 border-transparent hover:text-blue-600 hover:bg-blue-50/30'
                  }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2 font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className={`h-4 w-4 mr-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                      <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">today</span>
                    </div>
                  </div>
                  <div className={`p-4 rounded-2xl ${stat.bgColor}`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
          {menuItems.map((item, index) => (
            <Card
              key={item.id}
              className="group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 bg-white/80 backdrop-blur-sm border-0 shadow-xl relative overflow-hidden min-h-[280px]"
              onClick={() => setCurrentView(item.id)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>

              {/* Animated Background Shape */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${item.color} opacity-10 rounded-full group-hover:scale-150 group-hover:opacity-20 transition-all duration-700`}></div>

              <CardContent className="relative z-10 p-8 h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <item.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">{item.stats}</div>
                    <div className="text-xs text-gray-500 mt-1">Current</div>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors mb-3">
                    {item.title}
                  </h3>
                  <p className="text-base font-semibold text-blue-700 mb-4">
                    {item.subtitle}
                  </p>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                    <span className="text-xs font-semibold text-green-700">Available</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold group-hover:translate-x-2 transition-all duration-300"
                  >
                    Access Module →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  Recent Activity
                </h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition-all duration-300 group">
                    <div className={`p-3 rounded-xl bg-gray-100 group-hover:scale-110 transition-transform duration-300`}>
                      <activity.icon className={`h-5 w-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{activity.message}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Tools */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  Quick Tools
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => setCurrentView("registration")}
                  className="h-20 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl flex flex-col items-center gap-2"
                >
                  <UserPlus className="h-6 w-6" />
                  <span className="text-sm font-semibold">New Patient</span>
                </Button>

                <Button
                  onClick={() => setCurrentView("enquiry")}
                  className="h-20 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl flex flex-col items-center gap-2"
                >
                  <Search className="h-6 w-6" />
                  <span className="text-sm font-semibold">Find Patient</span>
                </Button>

                <Button
                  onClick={() => setCurrentView("index")}
                  className="h-20 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl flex flex-col items-center gap-2"
                >
                  <List className="h-6 w-6" />
                  <span className="text-sm font-semibold">View All</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-20 border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300 rounded-xl flex flex-col items-center gap-2"
                >
                  <Download className="h-6 w-6 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-600">Export Data</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 bg-white/80 backdrop-blur-xl border-t border-white/20 py-8 mt-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur opacity-30"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 p-3 rounded-xl shadow-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                  Patient Care Management System v2.1
                </div>
                <div className="text-sm text-gray-600">© 2024 Homeopathic Chikitsha Kendra - Committed to Excellence in Healthcare</div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-green-700">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
                <Activity className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-blue-700">Real-time Monitoring</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full">
                <Heart className="h-4 w-4 text-amber-600" />
                <span className="font-semibold text-amber-700">Patient-First Care</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientManagement;