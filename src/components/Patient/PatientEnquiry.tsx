import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Search, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  FileText,
  Activity,
  Heart,
  Stethoscope,
  Shield,
  Clock,
  Eye,
  AlertCircle,
  CheckCircle,
  Info,
  TrendingUp,
  Settings
} from "lucide-react";

interface PatientEnquiryProps {
  onBack: () => void;
}

// Mock patient detail data
const mockPatientDetails = {
  registrationNo: "REG001",
  name: "Aman Sharma",
  age: "35",
  date: "24/09/16",
  address: "J.I.T. MDDA",
  mobile: "9876543210",
  complaints: "Cough, Fever, Body pain, etc (3-4 days)",
  diagnosis: "Fever",
  physicalGenerals: {
    throat: "Normal",
    eyes: "Clear", 
    pulse: "72 BPM"
  },
  obsGynae: "N/A",
  mentalGenerals: "Anxiety, irritable, etc (as per patient / relation etc)",
  investigation: "Blood - B Mono +ve",
  prescription: [
    "Rheumo over",
    "12 × 2016", 
    "17/1-50 Tm 26"
  ],
  status: "Active",
  lastVisit: "2 days ago",
  nextAppointment: "Tomorrow 2:00 PM"
};

const PatientEnquiry = ({ onBack }: PatientEnquiryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (searchTerm === "REG001" || searchTerm.toLowerCase().includes("aman")) {
      setSelectedPatient(mockPatientDetails);
    } else {
      setSelectedPatient(null);
    }
    setIsSearching(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Medical Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <pattern id="medical-pattern-enquiry" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="currentColor" />
              <path d="M18 20h4M20 18v4" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medical-pattern-enquiry)" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
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
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur opacity-30"></div>
                  <div className="relative p-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl shadow-lg">
                    <Search className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-cyan-700 bg-clip-text text-transparent">
                    Patient Enquiry System
                  </h1>
                  <p className="text-gray-600 text-lg">Advanced patient search and medical record retrieval</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-green-700">Database Online</span>
              </div>
              <Button variant="outline" size="sm" className="hover:bg-gray-50">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Search Section */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl shadow-lg">
                <Search className="h-6 w-6 text-white" />
              </div>
              Patient Search Portal
              <div className="ml-auto text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Advanced Search Enabled
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="search" className="text-base font-semibold text-gray-700 mb-3 block">
                    Search Patient Records
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Enter registration number, patient name, or mobile number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pl-12 h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-purple-400 transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-end">
                  <Button 
                    onClick={handleSearch} 
                    disabled={isSearching || !searchTerm.trim()}
                    className="h-14 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  >
                    {isSearching ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Searching...
                      </div>
                    ) : (
                      <>
                        <Search className="h-5 w-5 mr-2" />
                        Search Patient
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Search Tips */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-2">Search Tips</h3>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>• Try searching with "REG001" or "Aman" for demo data</p>
                      <p>• Use full registration number for exact matches</p>
                      <p>• Patient name searches are case-insensitive</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patient Details */}
        {selectedPatient && (
          <div className="space-y-6">
            {/* Patient Header Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                      <User className="h-7 w-7 text-white" />
                    </div>
                    Patient Profile - {selectedPatient.name}
                  </CardTitle>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-100 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-700">{selectedPatient.status}</span>
                    </div>
                    <Button variant="outline" size="sm" className="hover:bg-blue-50">
                      <Eye className="h-4 w-4 mr-2" />
                      Full History
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Last Visit</p>
                      <p className="text-lg font-bold text-gray-800">{selectedPatient.lastVisit}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Next Appointment</p>
                      <p className="text-lg font-bold text-gray-800">{selectedPatient.nextAppointment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Current Status</p>
                      <p className="text-lg font-bold text-gray-800">Under Treatment</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Patient Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-600">Registration No.</Label>
                      <div className="p-3 bg-gray-50 rounded-xl border-2 border-gray-200">
                        <p className="font-bold text-gray-800">{selectedPatient.registrationNo}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-600">Patient Name</Label>
                      <div className="p-3 bg-gray-50 rounded-xl border-2 border-gray-200">
                        <p className="font-bold text-gray-800">{selectedPatient.name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-600">Age</Label>
                      <div className="p-3 bg-gray-50 rounded-xl border-2 border-gray-200">
                        <p className="font-bold text-gray-800">{selectedPatient.age} years</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-600">Registration Date</Label>
                      <div className="p-3 bg-gray-50 rounded-xl border-2 border-gray-200">
                        <p className="font-bold text-gray-800">{selectedPatient.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Address
                    </Label>
                    <div className="p-3 bg-gray-50 rounded-xl border-2 border-gray-200">
                      <p className="font-bold text-gray-800">{selectedPatient.address}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Mobile Number
                    </Label>
                    <div className="p-3 bg-gray-50 rounded-xl border-2 border-gray-200">
                      <p className="font-bold text-gray-800">{selectedPatient.mobile}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Medical Overview */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
                      <Heart className="h-5 w-5 text-white" />
                    </div>
                    Medical Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-600">Current Complaints</Label>
                    <div className="p-4 bg-red-50 rounded-xl border-2 border-red-200">
                      <p className="text-gray-800 leading-relaxed">{selectedPatient.complaints}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-600">Diagnosis</Label>
                    <div className="p-3 bg-amber-50 rounded-xl border-2 border-amber-200">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-600" />
                        <p className="font-bold text-amber-800">{selectedPatient.diagnosis}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-600">Investigation Results</Label>
                    <div className="p-3 bg-blue-50 rounded-xl border-2 border-blue-200">
                      <p className="font-semibold text-blue-800">{selectedPatient.investigation}</p>
                    </div>
                  </div>

                  {/* Physical Generals */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-600">Physical Examination</Label>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border-2 border-green-200">
                        <span className="text-green-700 font-semibold">Throat:</span>
                        <span className="text-green-800 font-bold">{selectedPatient.physicalGenerals.throat}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border-2 border-green-200">
                        <span className="text-green-700 font-semibold">Eyes:</span>
                        <span className="text-green-800 font-bold">{selectedPatient.physicalGenerals.eyes}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border-2 border-green-200">
                        <span className="text-green-700 font-semibold">Pulse:</span>
                        <span className="text-green-800 font-bold">{selectedPatient.physicalGenerals.pulse}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Medical Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg">
                      <Stethoscope className="h-5 w-5 text-white" />
                    </div>
                    Mental & Gynecological
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-600">OBS/GYNAE</Label>
                    <div className="p-3 bg-gray-50 rounded-xl border-2 border-gray-200">
                      <p className="font-bold text-gray-800">{selectedPatient.obsGynae}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-600">Mental Generals</Label>
                    <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                      <p className="text-purple-800 leading-relaxed">{selectedPatient.mentalGenerals}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                      <Heart className="h-5 w-5 text-white" />
                    </div>
                    Current Prescription
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedPatient.prescription.map((item: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border-2 border-emerald-200 hover:bg-emerald-100 transition-colors duration-200">
                        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <p className="font-semibold text-emerald-800 flex-1">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* No Results */}
        {searchTerm && !selectedPatient && !isSearching && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="py-16">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full blur opacity-20"></div>
                  <div className="relative p-6 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full w-24 h-24 mx-auto">
                    <Search className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Patient Found</h3>
                <p className="text-gray-600 mb-4">No patient records match your search criteria.</p>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 max-w-md mx-auto">
                  <p className="text-sm text-blue-700 font-semibold">Demo Search Options:</p>
                  <p className="text-sm text-blue-600 mt-1">Try "REG001" or "Aman" for sample data</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 bg-white/80 backdrop-blur-xl border-t border-white/20 py-6 mt-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl blur opacity-30"></div>
                <div className="relative bg-gradient-to-r from-purple-600 to-cyan-600 p-3 rounded-xl shadow-lg">
                  <Search className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <div className="text-lg font-bold bg-gradient-to-r from-purple-700 to-cyan-700 bg-clip-text text-transparent">
                  Patient Enquiry System v2.1
                </div>
                <div className="text-sm text-gray-600">© 2024 Homeopathic Chikitsha Kendra</div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 rounded-full">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-green-700">Secure Access</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 rounded-full">
                <Activity className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-blue-700">Real-time Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientEnquiry;