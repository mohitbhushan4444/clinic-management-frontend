'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import PatientDashboard from './PatientDashboard';
import ConsultationForm from './ConsultationForm';
import DigitalPrescription from './DigitalPrescription';
import { Users, Calendar, FileText, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('patients');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const { user } = useAuth();

  const tabs = [
    { id: 'patients', name: 'Patients', icon: Users },
    { id: 'consultations', name: 'Consultations', icon: Calendar },
    { id: 'prescriptions', name: 'Prescriptions', icon: FileText },
    { id: 'reports', name: 'Reports', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'patients':
        return <PatientDashboard onPatientSelect={setSelectedPatient} />;
      case 'consultations':
        return <ConsultationForm patient={selectedPatient} />;
      case 'prescriptions':
        return <DigitalPrescription patient={selectedPatient} />;
      case 'reports':
        return <ReportsView />;
      default:
        return <PatientDashboard onPatientSelect={setSelectedPatient} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        user={user}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} activeTab={activeTab} />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const ReportsView = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-semibold mb-4">Reports & Analytics</h2>
    <p className="text-gray-600">Reports and analytics coming soon...</p>
  </div>
);

export default Dashboard;