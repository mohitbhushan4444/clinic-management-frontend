'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { 
  X,           // X icon (close/clear)
  XCircle,     // X in a circle
  RotateCcw,   // Reset/clear icon
  Eraser,      // Eraser icon (for clearing)
  Pen, 
  Plus, 
  Redo, 
  Save, 
  Trash2, 
  Undo 
} from "lucide-react";
import toast from 'react-hot-toast';

interface DigitalPrescriptionProps {
  patient: any;
}

const DigitalPrescription = ({ patient }: DigitalPrescriptionProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pen');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [color, setColor] = useState('#000000');
  const [strokes, setStrokes] = useState<any[]>([]);
  const [currentStroke, setCurrentStroke] = useState<any[]>([]);
  const [undoStack, setUndoStack] = useState<any[]>([]);
  
  const [prescriptionData, setPrescriptionData] = useState({
    medicines: [{ name: '', dosage: '', duration: '', instructions: '' }],
    instructions: '',
    followUpDate: '',
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.imageSmoothingEnabled = true;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    redrawCanvas();
  }, [strokes]);

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    strokes.forEach(stroke => {
      if (stroke.points.length < 2) return;
      
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.globalCompositeOperation = stroke.tool === 'eraser' ? 'destination-out' : 'source-over';
      
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      
      ctx.stroke();
    });
  };

  const getPointerPosition = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: any) => {
    setIsDrawing(true);
    const pos = getPointerPosition(e);
    setCurrentStroke([pos]);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    
    const pos = getPointerPosition(e);
    setCurrentStroke(prev => [...prev, pos]);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = strokeWidth;
    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
    
    if (currentStroke.length > 0) {
      const prevPos = currentStroke[currentStroke.length - 1];
      ctx.beginPath();
      ctx.moveTo(prevPos.x, prevPos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    
    setIsDrawing(false);
    
    if (currentStroke.length > 0) {
      const newStroke = {
        points: currentStroke,
        color: color,
        width: strokeWidth,
        tool: tool,
        timestamp: Date.now()
      };
      
      setStrokes(prev => [...prev, newStroke]);
      setUndoStack([]);
      setCurrentStroke([]);
    }
  };

  const clearCanvas = () => {
    setStrokes([]);
    setUndoStack([]);
    redrawCanvas();
  };

  const undo = () => {
    if (strokes.length === 0) return;
    
    const lastStroke = strokes[strokes.length - 1];
    setUndoStack(prev => [...prev, lastStroke]);
    setStrokes(prev => prev.slice(0, -1));
  };

  const redo = () => {
    if (undoStack.length === 0) return;
    
    const strokeToRestore = undoStack[undoStack.length - 1];
    setStrokes(prev => [...prev, strokeToRestore]);
    setUndoStack(prev => prev.slice(0, -1));
  };

  const addMedicine = () => {
    setPrescriptionData(prev => ({
      ...prev,
      medicines: [...prev.medicines, { name: '', dosage: '', duration: '', instructions: '' }]
    }));
  };

  const updateMedicine = (index: number, field: string, value: string) => {
    setPrescriptionData(prev => ({
      ...prev,
      medicines: prev.medicines.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  const removeMedicine = (index: number) => {
    setPrescriptionData(prev => ({
      ...prev,
      medicines: prev.medicines.filter((_, i) => i !== index)
    }));
  };

  const savePrescription = async () => {
    if (!patient) {
      toast.error('Please select a patient first');
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageData = canvas.toDataURL('image/png');
    const canvasData = JSON.stringify(strokes);
    
    try {
      const prescriptionPayload = {
        patientId: patient.id,
        consultationId: patient.consultations?.[0]?.id || null,
        prescriptionDate: new Date().toISOString().split('T')[0],
        digitalSignature: imageData,
        handwrittenNotes: canvasData,
        medicines: prescriptionData.medicines.filter(med => med.name.trim()),
        instructions: prescriptionData.instructions,
        followUpDate: prescriptionData.followUpDate || null
      };
      
      await axios.post('/prescriptions', prescriptionPayload);
      toast.success('Prescription saved successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save prescription');
    }
  };

  if (!patient) {
    return (
      <div className="bg-white rounded-lg shadow flex items-center justify-center h-96">
        <div className="text-center text-gray-500">
          <p>Please select a patient to create prescription</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-gray-50 gap-6">
      {/* Left Panel - Prescription Form */}
      <div className="w-1/3 bg-white rounded-lg shadow p-6 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Prescription Details</h2>
        
        {/* Patient Info */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">{patient.fullName}</h3>
          <p className="text-sm text-gray-600">Reg: {patient.registrationNumber}</p>
          <p className="text-sm text-gray-600">Age: {patient.age} • {patient.gender}</p>
          <p className="text-sm text-gray-600">Phone: {patient.phone}</p>
        </div>

        {/* Medicines */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Medicines</h3>
            <button 
              onClick={addMedicine}
              className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              <Plus size={12} />
              Add
            </button>
          </div>
          
          {prescriptionData.medicines.map((medicine, index) => (
            <div key={index} className="mb-3 p-3 border border-gray-200 rounded">
              <input
                type="text"
                placeholder="Medicine name (e.g., Belladonna 30C)"
                value={medicine.name}
                onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2 text-sm"
              />
              <input
                type="text"
                placeholder="Dosage (e.g., 3 drops twice daily)"
                value={medicine.dosage}
                onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2 text-sm"
              />
              <input
                type="text"
                placeholder="Duration (e.g., for 7 days)"
                value={medicine.duration}
                onChange={(e) => updateMedicine(index, 'duration', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2 text-sm"
              />
              
              {prescriptionData.medicines.length > 1 && (
                <button 
                  onClick={() => removeMedicine(index)}
                  className="flex items-center gap-1 text-red-600 text-sm hover:text-red-800"
                >
                  <Trash2 size={12} />
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Instructions</label>
          <textarea
            value={prescriptionData.instructions}
            onChange={(e) => setPrescriptionData(prev => ({...prev, instructions: e.target.value}))}
            placeholder="General instructions for the patient..."
            className="w-full p-3 border border-gray-300 rounded h-20 text-sm"
          />
        </div>

        {/* Follow-up Date */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Follow-up Date</label>
          <input
            type="date"
            value={prescriptionData.followUpDate}
            onChange={(e) => setPrescriptionData(prev => ({...prev, followUpDate: e.target.value}))}
            className="w-full p-2 border border-gray-300 rounded text-sm"
          />
        </div>
      </div>

      {/* Right Panel - Digital Canvas */}
      <div className="flex-1 bg-white rounded-lg shadow flex flex-col">
        {/* Canvas Toolbar */}
        <div className="p-4 border-b flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTool('pen')}
              className={`p-2 rounded ${tool === 'pen' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              <Pen size={16} />
            </button>
            <button
              onClick={() => setTool('eraser')}
              className={`p-2 rounded ${tool === 'eraser' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              <Eraser size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Width:</label>
            <input
              type="range"
              min="1"
              max="10"
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
              className="w-20"
            />
            <span className="text-sm w-8">{strokeWidth}px</span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Color:</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 rounded border"
            />
          </div>

          <div className="flex gap-2 ml-auto">
            <button onClick={undo} className="p-2 bg-gray-200 rounded hover:bg-gray-300">
              <Undo size={16} />
            </button>
            <button onClick={redo} className="p-2 bg-gray-200 rounded hover:bg-gray-300">
              <Redo size={16} />
            </button>
            <button onClick={clearCanvas} className="p-2 bg-red-200 rounded hover:bg-red-300">
              <RotateCcw size={16} />
            </button>
            <button 
              onClick={savePrescription} 
              className="flex items-center gap-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Save size={16} />
              Save
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-4">
          <canvas
            ref={canvasRef}
            className="w-full h-full border rounded-lg cursor-crosshair bg-white"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
      </div>
    </div>
  );
};

export default DigitalPrescription;