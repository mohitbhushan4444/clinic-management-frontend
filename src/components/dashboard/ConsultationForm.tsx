'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface ConsultationFormProps {
  patient: any;
}

const ConsultationForm = ({ patient }: ConsultationFormProps) => {
  const [formData, setFormData] = useState({
    patientId: patient?.id || '',
    visitDate: new Date().toISOString().split('T')[0],
    visitTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    chiefComplaints: '',
    historyOfPresentIllness: '',
    pastHistory: '',
    familyHistory: '',
    personalHistory: '',
    physicalGenerals: '',
    mentalGenerals: '',
    investigationNotes: '',
    diagnosis: '',
    consultationFee: '',
    status: 'in-progress',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) {
      toast.error('Please select a patient first');
      return;
    }

    setLoading(true);
    try {
      const data = {
        ...formData,
        patientId: patient.id,
        consultationFee: formData.consultationFee ? parseFloat(formData.consultationFee) : undefined,
      };

      await axios.post('/consultations', data);
      toast.success('Consultation saved successfully!');
      
      // Reset form
      setFormData({
        ...formData,
        chiefComplaints: '',
        historyOfPresentIllness: '',
        diagnosis: '',
        investigationNotes: '',
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save consultation');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!patient) {
    return (
      <div className="bg-white rounded-lg shadow flex items-center justify-center h-96">
        <div className="text-center text-gray-500">
          <p>Please select a patient to start consultation</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">New Consultation</h2>
        <p className="text-gray-600">Patient: {patient.fullName} ({patient.registrationNumber})</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visit Date</label>
                <input
                  type="date"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visit Time</label>
                <input
                  type="time"
                  name="visitTime"
                  value={formData.visitTime}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chief Complaints</label>
              <textarea
                name="chiefComplaints"
                value={formData.chiefComplaints}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Main symptoms and complaints..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">History of Present Illness</label>
              <textarea
                name="historyOfPresentIllness"
                value={formData.historyOfPresentIllness}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Detailed history of current illness..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Past History</label>
              <textarea
                name="pastHistory"
                value={formData.pastHistory}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Previous medical history..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Family History</label>
              <textarea
                name="familyHistory"
                value={formData.familyHistory}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Family medical history..."
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Personal History</label>
              <textarea
                name="personalHistory"
                value={formData.personalHistory}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Personal habits, lifestyle..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Physical Generals</label>
              <textarea
                name="physicalGenerals"
                value={formData.physicalGenerals}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Physical examination findings..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mental Generals</label>
              <textarea
                name="mentalGenerals"
                value={formData.mentalGenerals}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mental state, emotional symptoms..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Investigation Notes</label>
              <textarea
                name="investigationNotes"
                value={formData.investigationNotes}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Lab reports, diagnostic tests..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
              <textarea
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Final diagnosis..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (₹)</label>
                <input
                  type="number"
                  name="consultationFee"
                  value={formData.consultationFee}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            {loading ? 'Saving...' : 'Save Consultation'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConsultationForm;