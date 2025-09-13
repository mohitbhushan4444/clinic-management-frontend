import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Search, 
  Eye, 
  Edit, 
  Calendar,
  Users,
  Filter,
  Download,
  Plus,
  RefreshCw,
  TrendingUp,
  User,
  Phone,
  MapPin,
  Activity,
  Shield,
  Settings,
  CheckCircle,
  Clock,
  FileText,
  MoreVertical
} from "lucide-react";

interface PatientIndexProps {
  onBack: () => void;
}

// Enhanced mock patient data
const mockPatients = [
  {
    registrationNo: "REG001",
    name: "John Doe",
    gender: "Male",
    contactNo: "1234567890",
    city: "New York",
    dateOfRegistration: "2024-05-01",
    status: "Active",
    lastVisit: "2024-05-15",
    age: 35
  },
  {
    registrationNo: "REG002", 
    name: "Jane Smith",
    gender: "Female",
    contactNo: "0987654321",
    city: "Los Angeles",
    dateOfRegistration: "2024-04-20",
    status: "Active",
    lastVisit: "2024-05-10",
    age: 28
  },
  {
    registrationNo: "REG003",
    name: "Michael Johnson",
    gender: "Male", 
    contactNo: "1122334455",
    city: "Chicago",
    dateOfRegistration: "2024-03-15",
    status: "Inactive",
    lastVisit: "2024-04-01",
    age: 42
  },
  {
    registrationNo: "REG004",
    name: "Sarah Wilson",
    gender: "Female",
    contactNo: "5566778899",
    city: "Houston",
    dateOfRegistration: "2024-05-10",
    status: "Active",
    lastVisit: "2024-05-18",
    age: 31
  },
  {
    registrationNo: "REG005",
    name: "David Brown",
    gender: "Male",
    contactNo: "9988776655",
    city: "Phoenix",
    dateOfRegistration: "2024-02-28",
    status: "Active",
    lastVisit: "2024-05-12",
    age: 29
  }
];

const PatientIndex = ({ onBack }: PatientIndexProps) => {
  const [searchFilters, setSearchFilters] = useState({
    registrationNo: "",
    patientName: "",
    contactNo: "",
    date: ""
  });

  const [filteredPatients, setFilteredPatients] = useState(mockPatients);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const filtered = mockPatients.filter(patient => {
      return (
        (!searchFilters.registrationNo || patient.registrationNo.toLowerCase().includes(searchFilters.registrationNo.toLowerCase())) &&
        (!searchFilters.patientName || patient.name.toLowerCase().includes(searchFilters.patientName.toLowerCase())) &&
        (!searchFilters.contactNo || patient.contactNo.includes(searchFilters.contactNo)) &&
        (!searchFilters.date || patient.dateOfRegistration === searchFilters.date)
      );
    });
    setFilteredPatients(filtered);
    setIsSearching(false);
  };

  const handleClear = () => {
    setSearchFilters({
      registrationNo: "",
      patientName: "",
      contactNo: "", 
      date: ""
    });
    setFilteredPatients(mockPatients);
  };

  const handleFilterChange = (field: string, value: string) => {
    setSearchFilters(prev => ({ ...prev, [field]: value }));
  };

  const getStatusBadge = (status: string) => {
    const isActive = status === "Active";
    return (
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
        isActive 
          ? 'bg-green-100 text-green-700 border-2 border-green-200' 
          : 'bg-gray-100 text-gray-700 border-2 border-gray-200'
      }`}>
        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
        {status}
      </div>
    );
  };

  const quickStats = [
    {
      label: "Total Patients",
      value: mockPatients.length.toString(),
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      label: "Active Patients",
      value: mockPatients.filter(p => p.status === "Active").length.toString(),
      change: "+8%",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      label: "New This Month",
      value: "3",
      change: "+25%",
      icon: Plus,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      label: "Recent Visits",
      value: mockPatients.filter(p => new Date(p.lastVisit) > new Date('2024-05-10')).length.toString(),
      change: "+15%",
      icon: Calendar,
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-400/10 to-green-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Medical Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <pattern id="medical-pattern-index" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="currentColor" />
              <path d="M18 20h4M20 18v4" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medical-pattern-index)" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={onBack}
                className="hover:bg-blue-50 border-blue-200 text-blue-700 hover:border-blue-300 transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-30"></div>
                  <div className="relative p-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-lg">
                    <Users className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                    Patient Directory
                  </h1>
                  <p className="text-gray-600 text-lg">Comprehensive patient index and management system</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-green-700">Database Synced</span>
              </div>
              <Button variant="outline" size="sm" className="hover:bg-gray-50">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1 font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                        <span className="text-xs text-green-600 font-semibold">{stat.change}</span>
                        <span className="text-xs text-gray-500 ml-1">vs last month</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-2xl ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Search & Filter Section */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg">
                <Filter className="h-6 w-6 text-white" />
              </div>
              Advanced Search & Filters
              <div className="ml-auto text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {filteredPatients.length} Results
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Search Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="regNo" className="text-sm font-semibold text-gray-700">Registration No.</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="regNo"
                      placeholder="Enter registration number"
                      value={searchFilters.registrationNo}
                      onChange={(e) => handleFilterChange("registrationNo", e.target.value)}
                      className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:ring-emerald-400 transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="patientName" className="text-sm font-semibold text-gray-700">Patient Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="patientName"
                      placeholder="Enter patient name"
                      value={searchFilters.patientName}
                      onChange={(e) => handleFilterChange("patientName", e.target.value)}
                      className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:ring-emerald-400 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactNo" className="text-sm font-semibold text-gray-700">Contact Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="contactNo"
                      placeholder="Enter contact number"
                      value={searchFilters.contactNo}
                      onChange={(e) => handleFilterChange("contactNo", e.target.value)}
                      className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:ring-emerald-400 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-semibold text-gray-700">Registration Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="date"
                      type="date"
                      value={searchFilters.date}
                      onChange={(e) => handleFilterChange("date", e.target.value)}
                      className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:ring-emerald-400 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 items-center justify-between">
                <div className="flex gap-3">
                  <Button 
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-6 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSearching ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Searching...
                      </div>
                    ) : (
                      <>
                        <Search className="h-5 w-5 mr-2" />
                        Search Patients
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleClear}
                    className="h-12 px-6 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="h-12 px-6 rounded-xl border-2 border-blue-300 text-blue-600 hover:bg-blue-50">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-12 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Patient
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patient List */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                Patient Directory
                <span className="text-base font-normal text-gray-500">
                  ({filteredPatients.length} patients)
                </span>
              </CardTitle>
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Last updated: 5 mins ago
                </div>
                <Button variant="outline" size="sm" className="hover:bg-gray-50">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl border-2 border-gray-200 overflow-hidden shadow-lg">
              {/* Table Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b-2 border-gray-200">
                <div className="grid grid-cols-7 gap-4 font-bold text-gray-800">
                  <div>Registration No.</div>
                  <div>Patient Details</div>
                  <div>Contact Info</div>
                  <div>Registration</div>
                  <div>Status</div>
                  <div>Last Visit</div>
                  <div className="text-center">Actions</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-100">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient, index) => (
                    <div 
                      key={patient.registrationNo}
                      className="grid grid-cols-7 gap-4 px-6 py-4 hover:bg-blue-50/50 transition-colors duration-200 items-center"
                    >
                      <div className="font-bold text-blue-700">
                        {patient.registrationNo}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                          {patient.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{patient.name}</div>
                          <div className="text-sm text-gray-500">{patient.gender} • {patient.age} years</div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-700">{patient.contactNo}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-700">{patient.city}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{patient.dateOfRegistration}</span>
                      </div>
                      
                      <div>
                        {getStatusBadge(patient.status)}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{patient.lastVisit}</span>
                      </div>
                      
                      <div className="flex justify-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-9 w-9 p-0 hover:bg-blue-50 border-blue-200 text-blue-600 rounded-xl hover:shadow-md transition-all duration-200"
                          title="View Patient"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-9 w-9 p-0 hover:bg-emerald-50 border-emerald-200 text-emerald-600 rounded-xl hover:shadow-md transition-all duration-200"
                          title="Edit Patient"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-9 w-9 p-0 hover:bg-gray-50 border-gray-200 text-gray-600 rounded-xl hover:shadow-md transition-all duration-200"
                          title="More Options"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-16 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full blur opacity-20"></div>
                        <div className="relative p-6 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full w-20 h-20">
                          <Search className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No Patients Found</h3>
                        <p className="text-gray-600 mb-4">No patients match your current search criteria.</p>
                        <Button 
                          onClick={handleClear}
                          variant="outline" 
                          className="hover:bg-blue-50 border-blue-200 text-blue-600"
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Clear Filters
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="relative z-10 bg-white/80 backdrop-blur-xl border-t border-white/20 py-6 mt-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl blur opacity-30"></div>
                <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-xl shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <div className="text-lg font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                  Patient Directory System v2.1
                </div>
                <div className="text-sm text-gray-600">© 2024 Homeopathic Chikitsha Kendra</div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 rounded-full">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-green-700">Data Protected</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 rounded-full">
                <Activity className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-blue-700">Live Sync</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-amber-100 rounded-full">
                <CheckCircle className="h-4 w-4 text-amber-600" />
                <span className="font-semibold text-amber-700">Verified Records</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientIndex;