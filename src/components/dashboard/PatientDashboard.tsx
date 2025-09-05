'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, UserPlus, Phone, MapPin, Calendar, FileText, Eye } from 'lucide-react';
import PatientForm from './PatientForm';
import PatientDetails from './PatientDetails';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

interface Patient {
  id: number;
  registrationNumber: string;
  fullName: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  createdAt: string;
  consultations?: any[];
}

interface PatientDashboardProps {
  onPatientSelect: (patient: Patient | null) => void;
}

const PatientDashboard = ({ onPatientSelect }: PatientDashboardProps) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    const filtered = patients.filter(patient =>
      patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      patient.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [patients, searchTerm]);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('/patients');
      setPatients(response.data);
      setLoading(false);
    } catch (error: any) {
      toast.error('Failed to fetch patients');
      setLoading(false);
    }
  };

  const handlePatientSelect = async (patient: Patient) => {
    try {
      setSelectedPatient(patient);
      onPatientSelect(patient);
      
      // Fetch detailed patient data
      const response = await axios.get(`/patients/${patient.id}/history`);
      setSelectedPatient(response.data.patient);
    } catch (error) {
      toast.error('Failed to fetch patient details');
    }
  };

  const handlePatientAdded = (newPatient: Patient) => {
    setPatients(prev => [newPatient, ...prev]);
    setShowAddForm(false);
    toast.success('Patient added successfully!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex h-full gap-6">
      {/* Patients List */}
      <div className="w-1/3 bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Patients ({patients.length})</h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <UserPlus size={16} />
              Add Patient
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-y-auto h-full">
          {filteredPatients.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <UserPlus className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <p>No patients found</p>
            </div>
          ) : (
            filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedPatient?.id === patient.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
                onClick={() => handlePatientSelect(patient)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{patient.fullName}</h3>
                  <span className="text-xs text-blue-600 font-medium">
                    {patient.registrationNumber}
                  </span>
                </div>

                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone size={12} />
                    <span>{patient.phone || 'No phone'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={12} />
                    <span className="truncate">{patient.address || 'No address'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Age: {patient.age} • {patient.gender}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(patient.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Patient Details */}
      <div className="flex-1">
        {selectedPatient ? (
          <PatientDetails patient={selectedPatient} />
        ) : (
          <div className="bg-white rounded-lg shadow flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <Eye size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Select a patient to view details</p>
            </div>
          </div>
        )}
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