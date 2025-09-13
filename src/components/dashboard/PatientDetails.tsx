import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  User, 
  Heart,
  Activity,
  Stethoscope,
  Clock,
  AlertCircle,
  CheckCircle2,
  Edit,
  Download,
  Plus,
  Shield,
  TrendingUp,
  Eye,
  Share2,
  Printer,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PatientDetailsProps {
  patient: any;
}

const PatientDetails = ({ patient }: PatientDetailsProps) => {
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-amber-600 bg-amber-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return <Activity className="h-3 w-3" />;
      case 'completed': return <CheckCircle2 className="h-3 w-3" />;
      case 'pending': return <Clock className="h-3 w-3" />;
      case 'cancelled': return <AlertCircle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
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
              className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {tab.count !== undefined && (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
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

        {activeTab === 'consultations' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Calendar className="h-7 w-7 text-blue-600" />
                Consultation History ({consultations.length})
              </h3>
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                New Consultation
              </Button>
            </div>
            
            {consultations.length === 0 ? (
              <Card className="border-0 shadow-xl">
                <CardContent className="p-12 text-center">
                  <Calendar className="mx-auto mb-6 h-20 w-20 text-gray-300" />
                  <h4 className="text-xl font-bold text-gray-700 mb-3">No Consultations Yet</h4>
                  <p className="text-gray-500 mb-6">Start tracking this patient's medical consultations and visits</p>
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Record First Consultation
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {consultations.map((consultation: any) => (
                  <Card key={consultation.id} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-blue-600 text-xl mb-2">
                            {new Date(consultation.visitDate).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </h4>
                          <p className="text-gray-600 font-medium">{consultation.doctor?.fullName}</p>
                        </div>
                        <div className="text-right">
                          <div className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 mb-2 ${getStatusColor(consultation.status)}`}>
                            {getStatusIcon(consultation.status)}
                            {consultation.status}
                          </div>
                          <div className="text-2xl font-bold text-gray-900">₹{consultation.consultationFee}</div>
                        </div>
                      </div>
                      
                      {consultation.vitals && (
                        <div className="mb-4 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl">
                          <h5 className="font-semibold text-cyan-700 mb-3 flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            Vital Signs
                          </h5>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-600">Temperature:</span>
                              <p className="font-bold text-cyan-700">{consultation.vitals.temperature}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Blood Pressure:</span>
                              <p className="font-bold text-cyan-700">{consultation.vitals.bp}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Pulse:</span>
                              <p className="font-bold text-cyan-700">{consultation.vitals.pulse}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {consultation.chiefComplaints && (
                        <div className="mb-4 p-4 bg-red-50 rounded-xl border-l-4 border-red-400">
                          <h5 className="font-semibold text-red-700 mb-2">Chief Complaints</h5>
                          <p className="text-red-600">{consultation.chiefComplaints}</p>
                        </div>
                      )}
                      
                      {consultation.diagnosis && (
                        <div className="mb-4 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-400">
                          <h5 className="font-semibold text-blue-700 mb-2">Diagnosis</h5>
                          <p className="text-blue-600">{consultation.diagnosis}</p>
                        </div>
                      )}

                      {consultation.followUpRequired && consultation.followUpDate && (
                        <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200">
                          <div className="flex items-center gap-2 text-amber-700">
                            <Calendar className="h-4 w-4" />
                            <span className="font-semibold">
                              Follow-up Required: {new Date(consultation.followUpDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'prescriptions' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <FileText className="h-7 w-7 text-purple-600" />
                Prescription History ({prescriptions.length})
              </h3>
              <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                New Prescription
              </Button>
            </div>
            
            {prescriptions.length === 0 ? (
              <Card className="border-0 shadow-xl">
                <CardContent className="p-12 text-center">
                  <FileText className="mx-auto mb-6 h-20 w-20 text-gray-300" />
                  <h4 className="text-xl font-bold text-gray-700 mb-3">No Prescriptions Yet</h4>
                  <p className="text-gray-500 mb-6">Start managing this patient's medication prescriptions</p>
                  <Button className="bg-gradient-to-r from-purple-600 to-violet-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Prescription
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {prescriptions.map((prescription: any) => (
                  <Card key={prescription.id} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-purple-600 text-xl mb-2">
                            {new Date(prescription.prescriptionDate).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </h4>
                          <p className="text-gray-600 font-medium">Rx #{prescription.prescriptionNumber}</p>
                          <p className="text-gray-500 text-sm">Prescribed by: {prescription.prescribedBy}</p>
                        </div>
                        <div className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusColor(prescription.status)}`}>
                          {getStatusIcon(prescription.status)}
                          {prescription.status}
                        </div>
                      </div>

                      {prescription.medicines && prescription.medicines.length > 0 && (
                        <div className="space-y-3 mb-6">
                          <h5 className="font-semibold text-gray-700 text-lg">Prescribed Medicines</h5>
                          {prescription.medicines.map((medicine: any, index: number) => (
                            <div key={index} className="p-4 bg-purple-50 rounded-xl border-l-4 border-purple-400">
                              <div className="flex items-center justify-between mb-2">
                                <div className="font-bold text-purple-700 text-lg">{medicine.name}</div>
                                <div className="text-sm text-purple-600 font-medium">{medicine.duration}</div>
                              </div>
                              <div className="text-purple-600 mb-2">
                                <span className="font-medium">Dosage:</span> {medicine.dosage} • {medicine.frequency}
                              </div>
                              {medicine.instructions && (
                                <div className="text-sm text-purple-600 bg-purple-100 p-2 rounded">
                                  <span className="font-medium">Instructions:</span> {medicine.instructions}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {prescription.instructions && (
                        <div className="p-4 bg-amber-50 rounded-xl border-l-4 border-amber-400 mb-4">
                          <h5 className="font-semibold text-amber-700 mb-2">General Instructions</h5>
                          <p className="text-amber-600">{prescription.instructions}</p>
                        </div>
                      )}

                      {prescription.followUpDate && (
                        <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                          <div className="flex items-center gap-2 text-blue-700">
                            <Calendar className="h-4 w-4" />
                            <span className="font-semibold">
                              Follow-up Appointment: {new Date(prescription.followUpDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'vitals' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Activity className="h-7 w-7 text-green-600" />
                Vital Signs & Health Metrics
              </h3>
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Record Vitals
              </Button>
            </div>

            <Card className="border-0 shadow-xl">
              <CardContent className="p-12 text-center">
                <Activity className="mx-auto mb-6 h-20 w-20 text-gray-300" />
                <h4 className="text-xl font-bold text-gray-700 mb-3">Vital Signs Tracking</h4>
                <p className="text-gray-500 mb-6">Track patient's vital signs, health metrics, and monitoring data over time</p>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Start Vital Monitoring
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
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

export default PatientDetails;