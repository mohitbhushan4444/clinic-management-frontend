import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Search, User, Phone, MapPin, Calendar, FileText } from "lucide-react";

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
    throat: "ok",
    eyes: "ok",
    pulse: "ok"
  },
  obsGynae: "N/A",
  mentalGenerals: "Anxiety, irritable, etc (as per patient / relation etc)",
  investigation: "Blood - B Mono +ve",
  prescription: [
    "Rheumo over",
    "12 × 2016", 
    "17/1-50 Tm 26"
  ]
};

const PatientEnquiry = ({ onBack }: PatientEnquiryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const handleSearch = () => {
    if (searchTerm === "REG001" || searchTerm.toLowerCase().includes("aman")) {
      setSelectedPatient(mockPatientDetails);
    } else {
      setSelectedPatient(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary shadow-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onBack}
              className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-primary-foreground">
              Patient Enquiry
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Patient</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search by Registration No. or Patient Name</Label>
                <Input
                  id="search"
                  placeholder="Enter registration number or patient name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleSearch} className="bg-primary text-primary-foreground">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patient Details */}
        {selectedPatient && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Patient Information - {selectedPatient.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Registration No.
                  </Label>
                  <Input value={selectedPatient.registrationNo} readOnly className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Patient Name
                  </Label>
                  <Input value={selectedPatient.name} readOnly className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Age/Date
                  </Label>
                  <Input value={`${selectedPatient.age} | ${selectedPatient.date}`} readOnly className="bg-muted" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address
                  </Label>
                  <Input value={selectedPatient.address} readOnly className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Mobile
                  </Label>
                  <Input value={selectedPatient.mobile} readOnly className="bg-muted" />
                </div>
              </div>

              {/* Medical Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold">Complaints</Label>
                    <Textarea 
                      value={selectedPatient.complaints} 
                      readOnly 
                      className="bg-muted mt-2"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-base font-semibold">Diagnosis</Label>
                    <Input value={selectedPatient.diagnosis} readOnly className="bg-muted mt-2" />
                  </div>

                  <div>
                    <Label className="text-base font-semibold">Physical Generals</Label>
                    <div className="space-y-2 mt-2">
                      <Input value={`Throat: ${selectedPatient.physicalGenerals.throat}`} readOnly className="bg-muted" />
                      <Input value={`Eyes: ${selectedPatient.physicalGenerals.eyes}`} readOnly className="bg-muted" />
                      <Input value={`Pulse: ${selectedPatient.physicalGenerals.pulse}`} readOnly className="bg-muted" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold">OBS/GYNAE</Label>
                    <Input value={selectedPatient.obsGynae} readOnly className="bg-muted mt-2" />
                  </div>

                  <div>
                    <Label className="text-base font-semibold">Mental Generals</Label>
                    <Textarea 
                      value={selectedPatient.mentalGenerals} 
                      readOnly 
                      className="bg-muted mt-2"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label className="text-base font-semibold">Investigation</Label>
                    <Input value={selectedPatient.investigation} readOnly className="bg-muted mt-2" />
                  </div>
                </div>
              </div>

              {/* Prescription */}
              <div>
                <Label className="text-base font-semibold">Prescription (Rx)</Label>
                <div className="mt-2 space-y-2">
                  {selectedPatient.prescription.map((item: string, index: number) => (
                    <Input key={index} value={`${index + 1}. ${item}`} readOnly className="bg-muted" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {searchTerm && !selectedPatient && (
          <Card>
            <CardContent className="py-8">
              <div className="text-center text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No patient found with the provided search criteria.</p>
                <p className="text-sm mt-2">Try searching with "REG001" or "Aman" for demo data.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PatientEnquiry;