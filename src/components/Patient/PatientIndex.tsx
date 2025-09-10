import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Search, Eye, Edit, Trash2, Calendar } from "lucide-react";

interface PatientIndexProps {
  onBack: () => void;
}

// Mock patient data
const mockPatients = [
  {
    registrationNo: "REG001",
    name: "John Doe",
    gender: "Male",
    contactNo: "1234567890",
    city: "New York",
    dateOfRegistration: "2024-05-01"
  },
  {
    registrationNo: "REG002", 
    name: "Jane Smith",
    gender: "Female",
    contactNo: "0987654321",
    city: "Los Angeles",
    dateOfRegistration: "2024-04-20"
  },
  {
    registrationNo: "REG003",
    name: "Michael Johnson",
    gender: "Male", 
    contactNo: "1122334455",
    city: "Chicago",
    dateOfRegistration: "2024-03-15"
  }
];

const PatientIndex = ({ onBack }: PatientIndexProps) => {
  const [searchFilters, setSearchFilters] = useState({
    registrationNo: "",
    patientName: "",
    contactNo: "",
    date: ""
  });

  const [filteredPatients, setFilteredPatients] = useState(mockPatients);

  const handleSearch = () => {
    const filtered = mockPatients.filter(patient => {
      return (
        (!searchFilters.registrationNo || patient.registrationNo.toLowerCase().includes(searchFilters.registrationNo.toLowerCase())) &&
        (!searchFilters.patientName || patient.name.toLowerCase().includes(searchFilters.patientName.toLowerCase())) &&
        (!searchFilters.contactNo || patient.contactNo.includes(searchFilters.contactNo)) &&
        (!searchFilters.date || patient.dateOfRegistration === searchFilters.date)
      );
    });
    setFilteredPatients(filtered);
  };

  const handleClear = () => {
    setSearchFilters({
      registrationNo: "",
      patientName: "",
      contactNo: "", 
      date: ""
    });
    setFilteredPatients(mockPatients);
  };

  const handleFilterChange = (field: string, value: string) => {
    setSearchFilters(prev => ({ ...prev, [field]: value }));
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
              Patient Index
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search & Filter Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="regNo">Registration No.</Label>
                <Input
                  id="regNo"
                  placeholder="Enter registration number"
                  value={searchFilters.registrationNo}
                  onChange={(e) => handleFilterChange("registrationNo", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name</Label>
                <Input
                  id="patientName"
                  placeholder="Enter patient name"
                  value={searchFilters.patientName}
                  onChange={(e) => handleFilterChange("patientName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactNo">Contact No.</Label>
                <Input
                  id="contactNo"
                  placeholder="Enter contact number"
                  value={searchFilters.contactNo}
                  onChange={(e) => handleFilterChange("contactNo", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={searchFilters.date}
                  onChange={(e) => handleFilterChange("date", e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button onClick={handleSearch} className="bg-primary text-primary-foreground">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle>Patient List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Registration No.</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Contact No.</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Date of Registration</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <TableRow key={patient.registrationNo}>
                        <TableCell className="font-medium">{patient.registrationNo}</TableCell>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.gender}</TableCell>
                        <TableCell>{patient.contactNo}</TableCell>
                        <TableCell>{patient.city}</TableCell>
                        <TableCell>{patient.dateOfRegistration}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-2">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        No patients found matching your search criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientIndex;