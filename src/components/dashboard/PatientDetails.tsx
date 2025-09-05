'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, FileText, Phone, Mail, MapPin, User, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

interface PatientDetailsProps {
  patient: any;
}

const PatientDetails = ({ patient }: PatientDetailsProps) => {
  const [consultations, setConsultations] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (patient?.id) {
      fetchPatientData();
    }
  }, [patient]);

  const fetchPatientData = async () => {
    setLoading(true);
    try {
      const [consultationsRes, prescriptionsRes] = await Promise.all([
        axios.get(`/consultations/patient/${patient.id}`),
        axios.get(`/prescriptions/patient/${patient.id}`)
      ]);
      
      setConsultations(consultationsRes.data);
      setPrescriptions(prescriptionsRes.data);
    } catch (error) {
      toast.error('Failed to fetch patient data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow h-full overflow-y-auto">
      {/* Patient Header */}
      <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{patient.fullName}</h1>
            <p className="text-blue-600 font-medium">Reg: {patient.registrationNumber}</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Calendar size={16} />
              New Consultation
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <FileText size={16} />
              New Prescription
            </button>
          </div>
        </div>

        {/* Patient Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <User size={14} />
              <span className="text-sm">Age & Gender</span>
            </div>
            <p className="font-medium">{patient.age} years • {patient.gender === 'M' ? 'Male' : patient.gender === 'F' ? 'Female' : 'Other'}</p>
          </div>

          <div className="bg-white p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Phone size={14} />
              <span className="text-sm">Phone</span>
            </div>
            <p className="font-medium">{patient.phone || 'Not provided'}</p>
          </div>

          <div className="bg-white p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Heart size={14} />
              <span className="text-sm">Blood Group</span>
            </div>
            <p className="font-medium">{patient.bloodGroup || 'Unknown'}</p>
          </div>

          <div className="bg-white p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Calendar size={14} />
              <span className="text-sm">Registered</span>
            </div>
            <p className="font-medium">{new Date(patient.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {patient.address && (
          <div className="mt-4 bg-white p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <MapPin size={14} />
              <span className="text-sm">Address</span>
            </div>
            <p className="font-medium">{patient.address}</p>
          </div>
        )}
      </div>

      {/* Content Tabs */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Consultation History */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar size={20} />
              Consultation History ({consultations.length})
            </h3>
            
            {consultations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                <p>No consultations yet</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {consultations.map((consultation: any) => (
                  <div key={consultation.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-blue-600">
                        {new Date(consultation.visitDate).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-gray-600">{consultation.doctor?.fullName}</span>
                    </div>
                    
                    {consultation.chiefComplaints && (
                      <div className="mb-2">
                        <span className="text-sm font-medium text-gray-700">Complaints:</span>
                        <p className="text-sm text-gray-600">{consultation.chiefComplaints}</p>
                      </div>
                    )}
                    
                    {consultation.diagnosis && (
                      <div className="mb-2">
                        <span className="text-sm font-medium text-gray-700">Diagnosis:</span>
                        <p className="text-sm text-gray-600">{consultation.diagnosis}</p>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Status: {consultation.status}</span>
                      {consultation.consultationFee && (
                        <span>Fee: ₹{consultation.consultationFee}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Prescription History */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText size={20} />
              Prescription History ({prescriptions.length})
            </h3>
            
            {prescriptions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                <p>No prescriptions yet</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {prescriptions.map((prescription: any) => (
                  <div key={prescription.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <span className="font-medium text-green-600">
                        {new Date(prescription.prescriptionDate).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-gray-600">{prescription.prescriptionNumber}</span>
                    </div>

                    {prescription.medicines && prescription.medicines.length > 0 && (
                      <div className="space-y-2">
                        {prescription.medicines.map((medicine: any, index: number) => (
                          <div key={index} className="border-l-2 border-green-200 pl-3">
                            <div className="font-medium text-sm">{medicine.name}</div>
                            <div className="text-sm text-gray-600">
                              {medicine.dosage} - {medicine.duration}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {prescription.instructions && (
                      <div className="mt-3 p-2 bg-yellow-50 rounded text-sm">
                        <strong>Instructions:</strong> {prescription.instructions}
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                      <span>Status: {prescription.status}</span>
                      {prescription.followUpDate && (
                        <span>Follow-up: {new Date(prescription.followUpDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;