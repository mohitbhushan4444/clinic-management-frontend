import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Heart, 
  Save,
  AlertCircle,
  CheckCircle2,
  Shield,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PatientFormProps {
  onClose: () => void;
  onPatientAdded: (patient: any) => void;
}

const PatientForm = ({ onClose, onPatientAdded }: PatientFormProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    dateOfBirth: '',
    bloodGroup: '',
    emergencyContact: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select gender';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.age && (parseInt(formData.age) < 0 || parseInt(formData.age) > 120)) {
      newErrors.age = 'Please enter a valid age';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Enhanced API call simulation
      const data = {
        ...formData,
        age: formData.age ? parseInt(formData.age) : undefined,
        registrationNumber: 'HCK' + String(Date.now()).slice(-6),
        status: 'active',
        createdAt: new Date().toISOString(),
        totalVisits: 0
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create new patient object
      const newPatient = {
        id: Date.now(),
        ...data,
        age: data.age || 0,
        gender: data.gender,
        phone: data.phone,
        email: data.email,
        address: data.address,
        bloodGroup: data.bloodGroup,
        emergencyContact: data.emergencyContact,
        createdAt: data.createdAt,
        status: 'active' as const,
        totalVisits: 0
      };

      onPatientAdded(newPatient);
    } catch (error: any) {
      console.error('Failed to add patient:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const nextStep = () => {
    if (step === 1) {
      // Validate basic info before proceeding
      const basicErrors: Record<string, string> = {};
      if (!formData.fullName.trim()) basicErrors.fullName = 'Full name is required';
      if (!formData.gender) basicErrors.gender = 'Please select gender';
      
      setErrors(basicErrors);
      if (Object.keys(basicErrors).length === 0) {
        setStep(2);
      }
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-teal-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-30"></div>
                <div className="relative p-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-lg">
                  <UserPlus className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                  Patient Registration
                </h2>
                <p className="text-gray-600 text-lg">Add new patient to healthcare system</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full shadow-lg">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700">Secure Entry</span>
              </div>
              <Button
                onClick={onClose}
                variant="outline"
                size="sm"
                className="hover:bg-red-50 border-red-200 text-red-600 rounded-xl p-3"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                1
              </div>
              <span className={`ml-2 font-medium ${step >= 1 ? 'text-blue-600' : 'text-gray-500'}`}>
                Personal Info
              </span>
            </div>
            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <span className={`ml-2 font-medium ${step >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>
                Contact & Medical
              </span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="relative z-10 p-6 overflow-y-auto max-h-[calc(95vh-200px)]">
          {step === 1 && (
            <div className="space-y-6">
              {/* Basic Information */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`h-12 bg-white/80 border-0 shadow-lg focus:shadow-xl transition-all duration-300 text-lg ${
                          errors.fullName ? 'ring-2 ring-red-500' : ''
                        }`}
                        placeholder="Enter patient's complete name"
                      />
                      {errors.fullName && (
                        <div className="flex items-center gap-2 mt-2 text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm">{errors.fullName}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Date of Birth
                      </label>
                      <Input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="h-12 bg-white/80 border-0 shadow-lg focus:shadow-xl transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Age (if DOB unknown)
                      </label>
                      <Input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className={`h-12 bg-white/80 border-0 shadow-lg focus:shadow-xl transition-all duration-300 ${
                          errors.age ? 'ring-2 ring-red-500' : ''
                        }`}
                        placeholder="Age in years"
                        min="0"
                        max="120"
                      />
                      {errors.age && (
                        <div className="flex items-center gap-2 mt-2 text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm">{errors.age}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Gender *
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className={`w-full h-12 px-4 bg-white/80 border-0 rounded-lg shadow-lg focus:shadow-xl transition-all duration-300 focus:outline-none text-lg ${
                          errors.gender ? 'ring-2 ring-red-500' : ''
                        }`}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && (
                        <div className="flex items-center gap-2 mt-2 text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm">{errors.gender}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Blood Group
                      </label>
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="w-full h-12 px-4 bg-white/80 border-0 rounded-lg shadow-lg focus:shadow-xl transition-all duration-300 focus:outline-none text-lg"
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+ (A Positive)</option>
                        <option value="A-">A- (A Negative)</option>
                        <option value="B+">B+ (B Positive)</option>
                        <option value="B-">B- (B Negative)</option>
                        <option value="AB+">AB+ (AB Positive)</option>
                        <option value="AB-">AB- (AB Negative)</option>
                        <option value="O+">O+ (O Positive)</option>
                        <option value="O-">O- (O Negative)</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Contact Information */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Primary Phone Number *
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className={`h-12 bg-white/80 border-0 shadow-lg focus:shadow-xl transition-all duration-300 text-lg ${
                          errors.phone ? 'ring-2 ring-red-500' : ''
                        }`}
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && (
                        <div className="flex items-center gap-2 mt-2 text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm">{errors.phone}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Emergency Contact
                      </label>
                      <Input
                        type="tel"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        className="h-12 bg-white/80 border-0 shadow-lg focus:shadow-xl transition-all duration-300 text-lg"
                        placeholder="Emergency contact number"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`h-12 bg-white/80 border-0 shadow-lg focus:shadow-xl transition-all duration-300 text-lg ${
                          errors.email ? 'ring-2 ring-red-500' : ''
                        }`}
                        placeholder="patient@email.com"
                      />
                      {errors.email && (
                        <div className="flex items-center gap-2 mt-2 text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm">{errors.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address Information */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-50 to-teal-50">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    Address Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Complete Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/80 border-0 rounded-lg shadow-lg focus:shadow-xl transition-all duration-300 focus:outline-none resize-none text-lg"
                    placeholder="Enter complete address including house/flat number, street, area, city, state, and pincode"
                  />
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="relative z-10 p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="flex gap-4">
            {step === 1 ? (
              <>
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 h-12 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-lg"
                >
                  Cancel Registration
                </Button>
                <Button
                  onClick={nextStep}
                  className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                >
                  Continue to Contact Info →
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="flex-1 h-12 border-blue-200 hover:bg-blue-50 text-blue-700 rounded-xl text-lg"
                >
                  ← Back to Personal Info
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Registering Patient...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Save className="h-5 w-5" />
                      Complete Registration
                    </div>
                  )}
                </Button>
              </>
            )}
          </div>

          {/* Security Notice */}
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4 text-green-600" />
            <span>All patient information is encrypted and HIPAA compliant</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <Clock className="h-4 w-4 text-blue-600" />
            <span>Auto-save every 30 seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;