import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Save, 
  UserPlus,
  User,
  MapPin,
  Phone,
  Calendar,
  FileText,
  Settings,
  Shield,
  Activity,
  CheckCircle,
  AlertCircle,
  Users,
  TrendingUp,
  Clock,
  Home,
  CreditCard,
  Heart
} from "lucide-react";

interface PatientRegistrationProps {
  onBack: () => void;
}

const PatientRegistration = ({ onBack }: PatientRegistrationProps) => {
  const [formData, setFormData] = useState({
    registrationNo: `REG${Date.now().toString().slice(-6)}`, // Auto-generated
    name: "",
    address1: "",
    address2: "",
    city: "",
    district: "",
    state: "",
    pin: "",
    fatherName: "",
    contactNo: "",
    date: new Date().toISOString().split('T')[0],
    gender: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = "Patient name is required";
    }

    if (!formData.contactNo.trim()) {
      newErrors.contactNo = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contactNo)) {
      newErrors.contactNo = "Contact number must be 10 digits";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select gender";
    }

    if (formData.pin && !/^\d{6}$/.test(formData.pin)) {
      newErrors.pin = "PIN code must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setFormData({
        registrationNo: `REG${Date.now().toString().slice(-6)}`,
        name: "",
        address1: "",
        address2: "",
        city: "",
        district: "",
        state: "",
        pin: "",
        fatherName: "",
        contactNo: "",
        date: new Date().toISOString().split('T')[0],
        gender: ""
      });
      setShowSuccess(false);
    }, 3000);
  };

  const states = [
    { value: "uttarakhand", label: "Uttarakhand" },
    { value: "delhi", label: "Delhi" },
    { value: "uttar-pradesh", label: "Uttar Pradesh" },
    { value: "haryana", label: "Haryana" },
    { value: "punjab", label: "Punjab" },
    { value: "himachal-pradesh", label: "Himachal Pradesh" }
  ];

  const genderOptions = [
    { value: "male", label: "Male", icon: "♂" },
    { value: "female", label: "Female", icon: "♀" },
    { value: "non-binary", label: "Non-binary", icon: "⚧" },
    { value: "prefer-not-to-say", label: "Prefer not to say", icon: "–" }
  ];

  const quickStats = [
    {
      label: "Today's Registrations",
      value: "12",
      change: "+3",
      icon: UserPlus,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      label: "This Month",
      value: "89",
      change: "+23%",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      label: "Total Patients",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-2xl max-w-md mx-auto">
          <CardContent className="p-12 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur opacity-30"></div>
              <div className="relative p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-24 h-24 mx-auto">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-4">
              Patient <span className="font-semibold text-green-700">{formData.name}</span> has been registered successfully.
            </p>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-green-700">
                <strong>Registration ID:</strong> {formData.registrationNo}
              </p>
              <p className="text-sm text-green-700 mt-1">
                WhatsApp notification has been sent to the patient.
              </p>
            </div>
            <Button onClick={onBack} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Button>
          </CardContent>
        </Card>
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
            <pattern id="medical-pattern-reg" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="currentColor" />
              <path d="M18 20h4M20 18v4" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medical-pattern-reg)" />
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
                Back to Management
              </Button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-30"></div>
                  <div className="relative p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-lg">
                    <UserPlus className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                    Patient Registration Portal
                  </h1>
                  <p className="text-gray-600 text-lg">Streamlined patient onboarding and registration system</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-green-700">System Ready</span>
              </div>
              <Button variant="outline" size="sm" className="hover:bg-gray-50">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <span className="text-xs text-gray-500 ml-1">today</span>
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

      {/* Registration Form */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        <Card className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                <Heart className="h-7 w-7 text-white" />
              </div>
              New Patient Registration
              <div className="ml-auto text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-full">
                Auto ID: {formData.registrationNo}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Basic Information Section */}
              <div className="bg-blue-50/50 rounded-2xl p-6 border-2 border-blue-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  Basic Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="registrationNo" className="text-sm font-semibold text-gray-700">
                      Registration Number
                    </Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="registrationNo"
                        value={formData.registrationNo}
                        readOnly
                        className="pl-10 h-12 bg-gray-50 border-2 border-gray-200 rounded-xl font-bold text-blue-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter patient's full name"
                        className={`pl-10 h-12 border-2 rounded-xl transition-all duration-300 ${
                          errors.name ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-400'
                        }`}
                        required
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.name}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="fatherName" className="text-sm font-semibold text-gray-700">
                      Father's Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="fatherName"
                        value={formData.fatherName}
                        onChange={(e) => handleInputChange("fatherName", e.target.value)}
                        placeholder="Father's name"
                        className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-400 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-sm font-semibold text-gray-700">
                      Registration Date
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-400 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information Section */}
              <div className="bg-emerald-50/50 rounded-2xl p-6 border-2 border-emerald-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                    <Home className="h-5 w-5 text-white" />
                  </div>
                  Address Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="address1" className="text-sm font-semibold text-gray-700">
                      Address Line 1
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="address1"
                        value={formData.address1}
                        onChange={(e) => handleInputChange("address1", e.target.value)}
                        placeholder="Street address, house number"
                        className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-emerald-400 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address2" className="text-sm font-semibold text-gray-700">
                      Address Line 2
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="address2"
                        value={formData.address2}
                        onChange={(e) => handleInputChange("address2", e.target.value)}
                        placeholder="Apartment, suite, landmark"
                        className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-emerald-400 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-semibold text-gray-700">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="City"
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-emerald-400 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district" className="text-sm font-semibold text-gray-700">
                      District
                    </Label>
                    <Input
                      id="district"
                      value={formData.district}
                      onChange={(e) => handleInputChange("district", e.target.value)}
                      placeholder="District"
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-emerald-400 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm font-semibold text-gray-700">
                      State
                    </Label>
                    <div className="relative">
                      <select
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-emerald-400 transition-all duration-300 bg-white px-3 appearance-none"
                      >
                        <option value="">Select state</option>
                        {states.map((state) => (
                          <option key={state.value} value={state.value}>
                            {state.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pin" className="text-sm font-semibold text-gray-700">
                      PIN Code
                    </Label>
                    <Input
                      id="pin"
                      value={formData.pin}
                      onChange={(e) => handleInputChange("pin", e.target.value)}
                      placeholder="6-digit PIN"
                      maxLength={6}
                      className={`h-12 border-2 rounded-xl transition-all duration-300 ${
                        errors.pin ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-emerald-400'
                      }`}
                    />
                    {errors.pin && <p className="text-red-500 text-sm flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.pin}</p>}
                  </div>
                </div>
              </div>

              {/* Contact & Gender Section */}
              <div className="bg-purple-50/50 rounded-2xl p-6 border-2 border-purple-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  Contact & Personal Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactNo" className="text-sm font-semibold text-gray-700">
                      Contact Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="contactNo"
                        value={formData.contactNo}
                        onChange={(e) => handleInputChange("contactNo", e.target.value.replace(/\D/g, ''))}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className={`pl-10 h-12 border-2 rounded-xl transition-all duration-300 ${
                          errors.contactNo ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-purple-400'
                        }`}
                        required
                      />
                    </div>
                    {errors.contactNo && <p className="text-red-500 text-sm flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.contactNo}</p>}
                  </div>
                </div>

                {/* Gender Selection */}
                <div className="space-y-4">
                  <Label className="text-sm font-semibold text-gray-700">
                    Gender <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {genderOptions.map((option) => (
                      <div
                        key={option.value}
                        onClick={() => handleInputChange("gender", option.value)}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                          formData.gender === option.value
                            ? 'border-purple-400 bg-purple-100 shadow-lg'
                            : 'border-gray-200 bg-white hover:border-purple-200'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="text-sm font-semibold text-gray-700">{option.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.gender && <p className="text-red-500 text-sm flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.gender}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-between items-center pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-700">HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                    <Activity className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-700">Auto Backup</span>
                  </div>
                </div>

                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold px-8 h-14 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Registering Patient...
                    </div>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-3" />
                      Register Patient
                    </>
                  )}
                </Button>
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur opacity-30"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 p-3 rounded-xl shadow-lg">
                  <UserPlus className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <div className="text-lg font-bold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                  Patient Registration System v2.1
                </div>
                <div className="text-sm text-gray-600">© 2024 Homeopathic Chikitsha Kendra</div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 rounded-full">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-green-700">Secure Registration</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 rounded-full">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-blue-700">Real-time Processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration;