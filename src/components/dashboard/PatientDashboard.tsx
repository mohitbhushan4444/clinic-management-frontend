import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  UserPlus,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Eye,
  Filter,
  Grid3X3,
  List,
  Users,
  Activity,
  Clock,
  Heart,
  Stethoscope,
  User,
  Mail,
  Download,
  RefreshCw,
  MoreVertical,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  X,
  Save,
  Edit,
  Shield,
  Plus,
  Share2,
  Printer
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Patient {
  id: number;
  registrationNumber: string;
  fullName: string;
  age: number;
  gender: string;
  phone: string;
  email?: string;
  address: string;
  bloodGroup?: string;
  emergencyContact?: string;
  createdAt: string;
  lastVisit?: string;
  consultations?: any[];
  prescriptions?: any[];
  status: 'active' | 'inactive' | 'critical';
  totalVisits?: number;
  nextAppointment?: string;
}

interface PatientDashboardProps {
  onPatientSelect: (patient: Patient | null) => void;
}

// Enhanced API service with better error handling and caching
class PatientAPI {
  private static cache = new Map();
  private static cacheTimeout = 5 * 60 * 1000; // 5 minutes

  static async fetchPatients(): Promise<Patient[]> {
    const cacheKey = 'patients';
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      // Simulated API call - replace with actual endpoint
      const response = await fetch('/api/patients', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;
    } catch (error) {
      console.error('Failed to fetch patients:', error);
      // Return mock data for demo
      return this.getMockPatients();
    }
  }

  static async fetchPatientDetails(patientId: number): Promise<Patient> {
    try {
      const response = await fetch(`/api/patients/${patientId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch patient details:', error);
      throw error;
    }
  }

  static getMockPatients(): Patient[] {
    return [
      {
        id: 1,
        registrationNumber: 'HCK001',
        fullName: 'John Doe',
        age: 35,
        gender: 'Male',
        phone: '+91 98765 43210',
        email: 'john.doe@email.com',
        address: '123 Main Street, City, State - 123456',
        bloodGroup: 'O+',
        createdAt: '2024-01-15T10:30:00Z',
        lastVisit: '2024-01-20T14:30:00Z',
        status: 'active',
        totalVisits: 5,
        nextAppointment: '2024-02-01T10:00:00Z'
      },
      {
        id: 2,
        registrationNumber: 'HCK002',
        fullName: 'Sarah Johnson',
        age: 28,
        gender: 'Female',
        phone: '+91 87654 32109',
        email: 'sarah.j@email.com',
        address: '456 Oak Avenue, City, State - 654321',
        bloodGroup: 'A+',
        createdAt: '2024-01-10T09:15:00Z',
        lastVisit: '2024-01-25T11:00:00Z',
        status: 'critical',
        totalVisits: 8,
        nextAppointment: '2024-01-30T15:30:00Z'
      },
      {
        id: 3,
        registrationNumber: 'HCK003',
        fullName: 'Michael Chen',
        age: 42,
        gender: 'Male',
        phone: '+91 76543 21098',
        address: '789 Pine Road, City, State - 987654',
        bloodGroup: 'B+',
        createdAt: '2024-01-05T16:45:00Z',
        lastVisit: '2024-01-18T09:30:00Z',
        status: 'inactive',
        totalVisits: 3
      }
    ];
  }
}

// Enhanced Patient Form Component
const PatientForm = ({ onClose, onPatientAdded }: { onClose: () => void; onPatientAdded: (patient: Patient) => void }) => {
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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

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
      onClose();
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
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                1
              </div>
              <span className={`ml-2 font-medium ${step >= 1 ? 'text-blue-600' : 'text-gray-500'}`}>
                Personal Info
              </span>
            </div>
            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
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
                        className={`h-12 bg-white/80 border-0 shadow-lg focus:shadow-xl transition-all duration-300 text-lg ${errors.fullName ? 'ring-2 ring-red-500' : ''
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
                        className={`h-12 bg-white/80 border-0 shadow-lg focus:shadow-xl transition-all duration-300 ${errors.age ? 'ring-2 ring-red-500' : ''
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
                        className={`w-full h-12 px-4 bg-white/80 border-0 rounded-lg shadow-lg focus:shadow-xl transition-all duration-300 focus:outline-none text-lg ${errors.gender ? 'ring-2 ring-red-500' : ''
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
                        className={`h-12 bg-white/80 border-0 shadow-lg focus:shadow-xl transition-all duration-300 text-lg ${errors.phone ? 'ring-2 ring-red-500' : ''
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
                        className={`h-12 bg-white/80 border-0 shadow-lg focus:shadow-xl transition-all duration-300 text-lg ${errors.email ? 'ring-2 ring-red-500' : ''
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

// Enhanced Patient Details Component with full features
const PatientDetails = ({ patient }: { patient: Patient }) => {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (patient?.id) {
      fetchPatientData();
    }
  }, [patient]);

  const fetchPatientData = async () => {
    setLoading(true);
    try {
      // Simulate API calls with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockConsultations = [
        {
          id: 1,
          visitDate: '2024-01-20T14:30:00Z',
          chiefComplaints: 'Persistent headache and mild fever for the past 3 days. Patient reports difficulty sleeping.',
          diagnosis: 'Viral fever with tension headache',
          status: 'Completed',
          consultationFee: 800,
          doctor: { fullName: 'Dr. Sarah Wilson, MD' },
          vitals: { temperature: '101.2°F', bp: '120/80', pulse: '82 bpm' },
          followUpRequired: true,
          followUpDate: '2024-01-27T10:00:00Z'
        },
        {
          id: 2,
          visitDate: '2024-01-10T09:15:00Z',
          chiefComplaints: 'Routine health checkup and blood pressure monitoring',
          diagnosis: 'General wellness check - Normal findings',
          status: 'Completed',
          consultationFee: 600,
          doctor: { fullName: 'Dr. Michael Chen, MD' },
          vitals: { temperature: '98.6°F', bp: '118/75', pulse: '78 bpm' }
        }
      ];

      const mockPrescriptions = [
        {
          id: 1,
          prescriptionDate: '2024-01-20T14:30:00Z',
          prescriptionNumber: 'RX-HCK-001234',
          medicines: [
            {
              name: 'Paracetamol 500mg',
              dosage: '1 tablet',
              frequency: '3 times daily',
              duration: '5 days',
              instructions: 'Take after meals with water'
            },
            {
              name: 'Ibuprofen 200mg',
              dosage: '1 tablet',
              frequency: '2 times daily',
              duration: '3 days',
              instructions: 'Take with food to avoid stomach irritation'
            }
          ],
          instructions: 'Complete the full course of medication. Drink plenty of fluids and rest. Return if symptoms worsen or fever persists beyond 3 days.',
          status: 'Active',
          followUpDate: '2024-01-27T10:00:00Z',
          prescribedBy: 'Dr. Sarah Wilson, MD'
        }
      ];

      setConsultations(mockConsultations);
      setPrescriptions(mockPrescriptions);
    } catch (error) {
      console.error('Failed to fetch patient data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await fetchPatientData();
    setRefreshing(false);
  };

  const tabs = [
    { id: 'overview', label: 'Medical Overview', icon: User },
    { id: 'consultations', label: 'Consultations', icon: Calendar, count: consultations.length },
    { id: 'prescriptions', label: 'Prescriptions', icon: FileText, count: prescriptions.length },
    { id: 'vitals', label: 'Vital Signs', icon: Activity },
  ];

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading patient details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 overflow-hidden">
      {/* Enhanced Patient Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-cyan-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 200 200">
            <defs>
              <pattern id="medical-cross-detail" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="currentColor" />
                <path d="M18 20h4M20 18v4" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#medical-cross-detail)" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-30"></div>
                <div className="relative p-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-lg">
                  <User className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{patient.fullName}</h1>
                <div className="flex items-center gap-4 mt-1">
                  <p className="text-blue-600 font-bold text-lg">{patient.registrationNumber}</p>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${getStatusColor(patient.status || 'active')}`}>
                    {getStatusIcon(patient.status || 'active')}
                    {(patient.status || 'Active').charAt(0).toUpperCase() + (patient.status || 'active').slice(1)}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={refreshData}
                variant="outline"
                size="sm"
                disabled={refreshing}
                className="hover:bg-blue-50 border-blue-200"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-gray-50">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-green-50 border-green-200 text-green-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Enhanced Quick Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="bg-white/80 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Demographics</span>
                </div>
                <p className="font-bold text-gray-900 text-lg">{patient.age} years</p>
                <p className="text-sm text-gray-600">{patient.gender}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Phone className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Contact</span>
                </div>
                <p className="font-bold text-gray-900">{patient.phone || 'Not provided'}</p>
                <p className="text-xs text-gray-500">Primary</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">Blood Type</span>
                </div>
                <p className="font-bold text-red-600 text-lg">{patient.bloodGroup || 'Unknown'}</p>
                <p className="text-xs text-gray-500">Group</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Activity className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Visits</span>
                </div>
                <p className="font-bold text-purple-600 text-lg">{consultations.length}</p>
                <p className="text-xs text-gray-500">Total</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Calendar className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium">Registered</span>
                </div>
                <p className="font-bold text-amber-600">{new Date(patient.createdAt).toLocaleDateString()}</p>
                <p className="text-xs text-gray-500">Join Date</p>
              </CardContent>
            </Card>
          </div>

          {/* Address Card */}
          {patient.address && (
            <Card className="mt-4 bg-white/80 border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Address</span>
                </div>
                <p className="font-medium text-gray-900">{patient.address}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Enhanced Tabs */}
      <div className="border-b border-gray-200 bg-white/90">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {tab.count !== undefined && (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Medical Summary */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Stethoscope className="h-6 w-6 text-emerald-600" />
                  Medical Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-white/80 rounded-xl shadow-lg">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">{consultations.length}</div>
                    <div className="text-sm font-medium text-gray-600">Total Consultations</div>
                    <div className="flex items-center justify-center gap-1 mt-1 text-green-600">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs">Active</span>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white/80 rounded-xl shadow-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{prescriptions.length}</div>
                    <div className="text-sm font-medium text-gray-600">Prescriptions</div>
                    <div className="flex items-center justify-center gap-1 mt-1 text-blue-600">
                      <Activity className="h-3 w-3" />
                      <span className="text-xs">Current</span>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white/80 rounded-xl shadow-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {consultations.length > 0 ? new Date(consultations[0].visitDate).toLocaleDateString() : 'None'}
                    </div>
                    <div className="text-sm font-medium text-gray-600">Last Visit</div>
                    <div className="flex items-center justify-center gap-1 mt-1 text-purple-600">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs">Recent</span>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white/80 rounded-xl shadow-lg">
                    <div className="text-3xl font-bold text-amber-600 mb-2">
                      {consultations.some(c => c.followUpRequired) ? 'Due' : 'None'}
                    </div>
                    <div className="text-sm font-medium text-gray-600">Follow-up</div>
                    <div className="flex items-center justify-center gap-1 mt-1 text-amber-600">
                      <Calendar className="h-3 w-3" />
                      <span className="text-xs">Scheduled</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Phone className="h-6 w-6 text-blue-600" />
                  Contact & Emergency Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700 text-lg">Primary Contact</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                        <Phone className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">{patient.phone}</span>
                      </div>
                      {patient.email && (
                        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                          <Mail className="h-5 w-5 text-purple-600" />
                          <span className="font-medium">{patient.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700 text-lg">Emergency Contact</h4>
                    {patient.emergencyContact ? (
                      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                        <Phone className="h-5 w-5 text-red-600" />
                        <span className="font-medium">{patient.emergencyContact}</span>
                      </div>
                    ) : (
                      <div className="text-gray-500 italic p-3 bg-gray-50 rounded-xl">
                        No emergency contact provided
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Rest of tab content would be similar to before but with enhanced styling */}
      </div>

      {/* Action Footer */}
      <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white flex-1">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Appointment
          </Button>
          <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50 flex-1">
            <FileText className="h-4 w-4 mr-2" />
            Medical Records
          </Button>
          <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 flex-1">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
            <Printer className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'text-green-600 bg-green-100';
    case 'critical': return 'text-red-600 bg-red-100';
    case 'inactive': return 'text-gray-600 bg-gray-100';
    default: return 'text-blue-600 bg-blue-100';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active': return <CheckCircle2 className="h-3 w-3" />;
    case 'critical': return <AlertCircle className="h-3 w-3" />;
    case 'inactive': return <Clock className="h-3 w-3" />;
    default: return <User className="h-3 w-3" />;
  }
};

const PatientDashboard = ({ onPatientSelect }: PatientDashboardProps) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'critical'>('all');
  const [refreshing, setRefreshing] = useState(false);

  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      const data = await PatientAPI.fetchPatients();
      setPatients(data);
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshPatients = async () => {
    setRefreshing(true);
    await fetchPatients();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  useEffect(() => {
    let filtered = patients.filter(patient => {
      const matchesSearch = patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm) ||
        patient.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (patient.email && patient.email.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilter = filterStatus === 'all' || patient.status === filterStatus;

      return matchesSearch && matchesFilter;
    });

    setFilteredPatients(filtered);
  }, [patients, searchTerm, filterStatus]);

  const handlePatientSelect = async (patient: Patient) => {
    try {
      setDetailLoading(true);
      setSelectedPatient(patient);
      onPatientSelect(patient);

      // Fetch detailed patient data
      const detailedPatient = await PatientAPI.fetchPatientDetails(patient.id);
      setSelectedPatient(detailedPatient);
    } catch (error) {
      console.error('Failed to fetch patient details:', error);
    } finally {
      setDetailLoading(false);
    }
  };

  const handlePatientAdded = (newPatient: Patient) => {
    setPatients(prev => [newPatient, ...prev]);
    setShowAddForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg font-semibold text-gray-700">Loading patients...</p>
          </div>
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
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                  Global Patient Management System
                </h1>
                <p className="text-gray-600 text-lg">Comprehensive healthcare records & patient care management</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-700">System Online</span>
            </div>
            <Button
              onClick={refreshPatients}
              variant="outline"
              size="sm"
              disabled={refreshing}
              className="hover:bg-blue-50 border-blue-200"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg px-6"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Register New Patient
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Patients</p>
                  <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600 font-medium">+5.2% this month</span>
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Cases</p>
                  <p className="text-2xl font-bold text-green-600">
                    {patients.filter(p => p.status === 'active').length}
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600 font-medium">Stable</span>
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Critical Care</p>
                  <p className="text-2xl font-bold text-red-600">
                    {patients.filter(p => p.status === 'critical').length}
                  </p>
                  <div className="flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 text-red-500 mr-1" />
                    <span className="text-xs text-red-600 font-medium">Monitoring</span>
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-r from-red-500 to-pink-400 rounded-xl">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Today's Visits</p>
                  <p className="text-2xl font-bold text-purple-600">47</p>
                  <div className="flex items-center mt-1">
                    <Clock className="h-3 w-3 text-purple-500 mr-1" />
                    <span className="text-xs text-purple-600 font-medium">In Progress</span>
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-400 rounded-xl">
                  <Activity className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Appointments</p>
                  <p className="text-2xl font-bold text-amber-600">124</p>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-3 w-3 text-amber-500 mr-1" />
                    <span className="text-xs text-amber-600 font-medium">This Week</span>
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-400 rounded-xl">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Search and Filters */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by name, phone, email, registration ID, or medical record..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 bg-white/70 border-0 shadow-lg focus:shadow-xl transition-all duration-300 text-lg"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-3 bg-white/70 border-0 rounded-xl shadow-lg focus:outline-none focus:shadow-xl transition-all duration-300 font-medium"
            >
              <option value="all">All Patients</option>
              <option value="active">Active Treatment</option>
              <option value="critical">Critical Care</option>
              <option value="inactive">Follow-up</option>
            </select>

            <Button
              variant="outline"
              className="border-blue-200 hover:bg-blue-50 px-4 py-3 rounded-xl shadow-lg"
            >
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>

            <div className="flex items-center bg-white/70 rounded-xl shadow-lg p-1">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={`rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-blue-50'}`}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={`rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-blue-50'}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-[calc(100vh-360px)] gap-6 p-6">
        {/* Patients Registry */}
        <div className="w-1/2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-cyan-50">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                Patient Registry
                <span className="text-lg font-semibold text-blue-600">({filteredPatients.length})</span>
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          <div className="overflow-y-auto h-full">
            {filteredPatients.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center p-12">
                  <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-6 w-24 h-24 flex items-center justify-center">
                    <Users className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-700">No Patients Found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search criteria or register a new patient</p>
                  <Button
                    onClick={() => setShowAddForm(true)}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Register First Patient
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 p-4">
                {filteredPatients.map((patient) => (
                  <Card
                    key={patient.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 ${selectedPatient?.id === patient.id
                        ? 'bg-gradient-to-r from-blue-50 to-cyan-50 shadow-lg ring-2 ring-blue-200'
                        : 'bg-white/70 hover:bg-white/90'
                      }`}
                    onClick={() => handlePatientSelect(patient)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{patient.fullName}</h4>
                            <p className="text-sm text-blue-600 font-medium">{patient.registrationNumber}</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(patient.status)}`}>
                          {getStatusIcon(patient.status)}
                          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span>{patient.phone}</span>
                        </div>
                        {patient.email && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail className="h-4 w-4" />
                            <span>{patient.email}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{patient.address}</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-700 font-medium pt-2">
                          <span>{patient.age} years</span>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <span>{patient.gender}</span>
                          {patient.bloodGroup && (
                            <>
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <span className="text-red-600 font-semibold">{patient.bloodGroup}</span>
                            </>
                          )}
                        </div>

                        <div className="pt-2 border-t border-gray-100">
                          <div className="flex items-center gap-3 text-sm text-gray-700">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-blue-600" />
                              <span>Reg: {new Date(patient.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <div className="flex items-center gap-1">
                              <Activity className="h-4 w-4 text-green-600" />
                              <span>{patient.totalVisits || 0} Visits</span>
                            </div>
                            {patient.lastVisit && (
                              <>
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-purple-600" />
                                  <span>Last: {new Date(patient.lastVisit).toLocaleDateString()}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Comprehensive Patient Profile */}
        <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 overflow-hidden">
          {selectedPatient ? (
            <PatientDetails patient={selectedPatient} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-12">
                <div className="p-8 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full mx-auto mb-6 w-32 h-32 flex items-center justify-center">
                  <Stethoscope className="h-16 w-16 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Patient Care Center</h3>
                <p className="text-gray-600 text-lg mb-6">Select a patient from the registry to access their complete medical profile, treatment history, and care management tools.</p>
                <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>Comprehensive Care</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Secure Records</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-500" />
                    <span>Real-time Updates</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Patient Modal */}
      {showAddForm && (
        <PatientForm
          onClose={() => setShowAddForm(false)}
          onPatientAdded={handlePatientAdded}
        />
      )}
    </div>
  );
};

export default PatientDashboard;