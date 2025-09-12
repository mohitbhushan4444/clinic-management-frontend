import { useState } from "react";
import { 
  UserPlus, 
  Stethoscope, 
  Calendar, 
  Package, 
  CreditCard, 
  BarChart3,
  Bell,
  Search,
  Settings,
  Users,
  Activity,
  TrendingUp,
  Clock,
  Heart,
  Shield,
  Zap,
  Hospital,
  Star,
  ArrowRight,
  Plus,
  Filter
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      description: "Register new patients, manage medical records, track visit history and patient health profiles.",
      icon: UserPlus,
      gradient: "from-blue-500 via-blue-600 to-cyan-500",
      shadowColor: "shadow-blue-500/25",
      bgGlow: "bg-blue-500/10",
      onClick: () => setCurrentView("patient-management"),
      stats: "1,247",
      statLabel: "Active Patients",
      trend: "+12%",
      priority: "high"
    },
    {
      title: "Doctor Management", 
      description: "Manage doctor profiles, schedules, specializations and availability for optimal patient care.",
      icon: Stethoscope,
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      shadowColor: "shadow-emerald-500/25",
      bgGlow: "bg-emerald-500/10",
      stats: "24",
      statLabel: "Doctors Online",
      trend: "+2",
      priority: "medium"
    },
    {
      title: "Appointments",
      description: "Schedule appointments, manage time slots, send reminders and track patient visits efficiently.",
      icon: Calendar,
      gradient: "from-purple-500 via-violet-500 to-indigo-500",
      shadowColor: "shadow-purple-500/25",
      bgGlow: "bg-purple-500/10",
      stats: "89",
      statLabel: "Today's Bookings",
      trend: "+15%",
      priority: "high"
    },
    {
      title: "Inventory Control",
      description: "Track medicines, medical supplies, equipment status and automated reorder management.",
      icon: Package,
      gradient: "from-amber-500 via-orange-500 to-red-400",
      shadowColor: "shadow-amber-500/25",
      bgGlow: "bg-amber-500/10",
      stats: "456",
      statLabel: "Items in Stock",
      trend: "+8%",
      priority: "medium"
    },
    {
      title: "Billing & Finance",
      description: "Process payments, generate invoices, insurance claims and comprehensive financial reporting.",
      icon: CreditCard,
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      shadowColor: "shadow-green-500/25",
      bgGlow: "bg-green-500/10",
      stats: "₹2.4L",
      statLabel: "Monthly Revenue",
      trend: "+22%",
      priority: "high"
    },
    {
      title: "Analytics Hub",
      description: "Advanced analytics, performance metrics, predictive insights and comprehensive reports.",
      icon: BarChart3,
      gradient: "from-rose-500 via-pink-500 to-purple-500",
      shadowColor: "shadow-rose-500/25",
      bgGlow: "bg-rose-500/10",
      stats: "12",
      statLabel: "Active Reports",
      trend: "+5%",
      priority: "low"
    }
  ];

  const quickStats = [
    { 
      label: "Total Patients", 
      value: "1,247", 
      change: "+12%", 
      icon: Users, 
      gradient: "from-blue-500 to-cyan-400",
      bgColor: "bg-blue-50"
    },
    { 
      label: "Today's Visits", 
      value: "89", 
      change: "+8%", 
      icon: Calendar, 
      gradient: "from-purple-500 to-violet-400",
      bgColor: "bg-purple-50"
    },
    { 
      label: "Active Staff", 
      value: "24", 
      change: "+2", 
      icon: Stethoscope, 
      gradient: "from-emerald-500 to-teal-400",
      bgColor: "bg-emerald-50"
    },
    { 
      label: "Revenue", 
      value: "₹2.4L", 
      change: "+15%", 
      icon: TrendingUp, 
      gradient: "from-green-500 to-emerald-400",
      bgColor: "bg-green-50"
    }
  ];

  const recentActivities = [
    { time: "2 min ago", activity: "New patient registered - John Doe", type: "patient", icon: UserPlus, color: "text-blue-600" },
    { time: "15 min ago", activity: "Appointment confirmed with Dr. Smith", type: "appointment", icon: Calendar, color: "text-purple-600" },
    { time: "1 hour ago", activity: "Prescription updated for Sarah Wilson", type: "prescription", icon: Stethoscope, color: "text-emerald-600" },
    { time: "2 hours ago", activity: "Payment processed - ₹2,500", type: "payment", icon: CreditCard, color: "text-green-600" }
  ];

  if (currentView === "patient-management") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-8">
        <Button onClick={() => setCurrentView("dashboard")} className="mb-4 bg-gradient-to-r from-blue-600 to-cyan-600">
          ← Back to Dashboard
        </Button>
        <div className="text-center text-gray-500 bg-white/70 backdrop-blur-sm rounded-2xl p-12 shadow-2xl">
          <Hospital className="h-16 w-16 mx-auto mb-4 text-blue-600" />
          <h2 className="text-2xl font-bold mb-2">Patient Management System</h2>
          <p>Advanced patient management features coming soon...</p>
        </div>
      </div>
    );
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
            <pattern id="medical-cross" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="currentColor" />
              <path d="M18 20h4M20 18v4" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medical-cross)" />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-xl shadow-xl border-b border-white/20 sticky top-0">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl blur opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-teal-600 p-4 rounded-2xl shadow-lg">
                <Hospital className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-teal-700 bg-clip-text text-transparent">
                Homeopathic Chikitsha Kendra
              </h1>
              <p className="text-sm text-slate-600 font-medium">Advanced Healthcare Management</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-600 transition-colors" />
              <Input 
                placeholder="Search patients, doctors, appointments..." 
                className="pl-12 pr-4 py-3 w-96 bg-white/70 border-0 shadow-lg focus:shadow-xl focus:bg-white transition-all duration-300 rounded-xl"
              />
              <Button 
                size="sm" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg px-3"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="relative hover:bg-blue-50 rounded-xl">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold shadow-lg">3</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="hover:bg-blue-50 rounded-xl">
                <Settings className="h-5 w-5 text-gray-600" />
              </Button>
              
              <Button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
                Welcome back, Dr. Administrator! 
                <span className="text-3xl">👋</span>
              </h2>
              <p className="text-gray-600 text-xl">
                Your healthcare dashboard is ready with today's insights
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-green-700">All Systems Operational</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
                  <Star className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-700">Premium Plan Active</span>
                </div>
              </div>
            </div>
            
            <div className="text-right bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-sm text-gray-500 mb-1">Today's Date</div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  day: 'numeric'
                })}
              </div>
              <div className="text-lg text-gray-600">
                {new Date().toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric'
                })}
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-blue-600 font-medium">
                  {new Date().toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {quickStats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-bold">{stat.change}</span>
                    </div>
                    <span className="text-xs text-gray-500">vs last month</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`bg-gradient-to-r ${stat.gradient} h-2 rounded-full`} style={{ width: '75%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Dashboard Cards */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Management Modules</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-xl">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Module
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dashboardCards.map((card, index) => (
                <Card 
                  key={index}
                  className={`group cursor-pointer transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 bg-white/80 backdrop-blur-sm border-0 shadow-xl relative overflow-hidden ${card.shadowColor} hover:shadow-2xl`}
                  onClick={card.onClick}
                >
                  {/* Priority Badge */}
                  {card.priority === 'high' && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        HIGH
                      </div>
                    </div>
                  )}
                  
                  {/* Animated Background */}
                  <div className={`absolute inset-0 ${card.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${card.gradient} opacity-10 rounded-full -translate-y-20 translate-x-20 group-hover:scale-150 group-hover:opacity-20 transition-all duration-700`}></div>
                  
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <div style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-6 4-10 10-10s10 4 10 10-4 10-10 10-10-4-10-10zm-20 0c0-6 4-10 10-10s10 4 10 10-4 10-10 10-10-4-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundSize: '30px 30px'
                    }} className="w-full h-full"></div>
                  </div>
                  
                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <card.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-800">{card.stats}</div>
                        <div className="text-sm text-gray-600">{card.statLabel}</div>
                        <div className="flex items-center gap-1 text-green-600 mt-1">
                          <TrendingUp className="h-3 w-3" />
                          <span className="text-xs font-semibold">{card.trend}</span>
                        </div>
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors mb-3">
                      {card.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed text-sm">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 pt-0">
                    <div className="flex items-center justify-between">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-bold group-hover:translate-x-2 transition-all duration-300 flex items-center gap-2`}
                      >
                        Access Module 
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                        <span className="text-xs font-semibold text-green-700">Active</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  Live Activity Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group">
                      <div className={`p-2 rounded-xl bg-gray-100 group-hover:scale-110 transition-transform duration-300`}>
                        <activity.icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 mb-1">{activity.activity}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 hover:bg-blue-50 border-blue-200">
                  View All Activities
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12 rounded-xl">
                    <UserPlus className="h-5 w-5 mr-3" />
                    Register New Patient
                  </Button>
                  <Button className="w-full justify-start bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12 rounded-xl">
                    <Calendar className="h-5 w-5 mr-3" />
                    Book Appointment
                  </Button>
                  <Button className="w-full justify-start bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12 rounded-xl">
                    <CreditCard className="h-5 w-5 mr-3" />
                    Process Payment
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                    <span className="text-sm font-semibold text-gray-700">Server Status</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-bold text-green-700">Excellent</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                    <span className="text-sm font-semibold text-gray-700">Database</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-bold text-green-700">Connected</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                    <span className="text-sm font-semibold text-gray-700">Backup Status</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-bold text-blue-700">Scheduled</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="relative z-10 bg-white/80 backdrop-blur-xl border-t border-white/20 py-8 mt-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl blur opacity-30"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-xl shadow-lg">
                    <Hospital className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold bg-gradient-to-r from-blue-700 to-teal-700 bg-clip-text text-transparent">
                    HealthCare Pro v2.0.1
                  </div>
                  <div className="text-sm text-gray-600">© 2024 Homeopathic Chikitsha Kendra</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-8 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-green-700">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
                <Activity className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-blue-700">99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full">
                <Heart className="h-4 w-4 text-red-500" />
                <span className="font-semibold text-red-600">Made with Care</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;