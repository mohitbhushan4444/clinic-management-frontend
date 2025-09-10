import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PatientRegistrationProps {
  onBack: () => void;
}

const PatientRegistration = ({ onBack }: PatientRegistrationProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    registrationNo: `REG${Date.now().toString().slice(-6)}`, // Auto-generated
    name: "",
    address1: "",
    address2: "",
    city: "",
    district: "",
    state: "",
    pin: "",
    fatherName: "",
    contactNo: "",
    date: new Date().toISOString().split('T')[0],
    gender: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.contactNo || !formData.gender) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name, Contact No, Gender)",
        variant: "destructive"
      });
      return;
    }

    // Simulate successful registration
    toast({
      title: "Registration Successful!",
      description: `Patient ${formData.name} registered with ID: ${formData.registrationNo}. WhatsApp notification sent.`,
      variant: "default"
    });

    // Reset form
    setFormData({
      registrationNo: `REG${Date.now().toString().slice(-6)}`,
      name: "",
      address1: "",
      address2: "",
      city: "",
      district: "",
      state: "",
      pin: "",
      fatherName: "",
      contactNo: "",
      date: new Date().toISOString().split('T')[0],
      gender: ""
    });
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
              Patient Registration
            </h1>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Register New Patient</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Registration Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="registrationNo">Registration No. *</Label>
                  <Input
                    id="registrationNo"
                    value={formData.registrationNo}
                    readOnly
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter patient's full name"
                    required
                  />
                </div>
              </div>

              {/* Address Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address1">Address 1</Label>
                  <Input
                    id="address1"
                    value={formData.address1}
                    onChange={(e) => handleInputChange("address1", e.target.value)}
                    placeholder="Street address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address2">Address 2</Label>
                  <Input
                    id="address2"
                    value={formData.address2}
                    onChange={(e) => handleInputChange("address2", e.target.value)}
                    placeholder="Apartment, suite, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) => handleInputChange("district", e.target.value)}
                    placeholder="District"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uttarakhand">Uttarakhand</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                      <SelectItem value="haryana">Haryana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pin">PIN Code</Label>
                  <Input
                    id="pin"
                    value={formData.pin}
                    onChange={(e) => handleInputChange("pin", e.target.value)}
                    placeholder="PIN Code"
                    maxLength={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fatherName">Father's Name</Label>
                  <Input
                    id="fatherName"
                    value={formData.fatherName}
                    onChange={(e) => handleInputChange("fatherName", e.target.value)}
                    placeholder="Father's name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactNo">Contact No. *</Label>
                  <Input
                    id="contactNo"
                    value={formData.contactNo}
                    onChange={(e) => handleInputChange("contactNo", e.target.value)}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                </div>
              </div>

              {/* Gender Selection */}
              <div className="space-y-3">
                <Label>Gender *</Label>
                <RadioGroup 
                  value={formData.gender} 
                  onValueChange={(value) => handleInputChange("gender", value)}
                  className="flex flex-wrap gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non-binary" id="non-binary" />
                    <Label htmlFor="non-binary">Non-binary</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                    <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Save className="h-4 w-4 mr-2" />
                  Register Patient
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientRegistration;