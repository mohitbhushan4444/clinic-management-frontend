import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hospital, Eye, EyeOff, Mail, Lock, ArrowRight, KeyRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { login, resetPassword } from "@/services/authService";

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [resetData, setResetData] = useState({ email: "", newPassword: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleResetInputChange = (field: string, value: string) => {
    setResetData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await login(formData);
      localStorage.setItem("token", data.token);

      toast({
        title: "Login Successful!",
        description: `Welcome ${data.user?.name || "User"}`,
      });

      onLogin();
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Validation
    if (!resetData.email || !resetData.newPassword || !resetData.confirmPassword) {
      toast({
        title: "All Fields Required",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (resetData.newPassword !== resetData.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please ensure both passwords are identical",
        variant: "destructive",
      });
      return;
    }

    if (resetData.newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsResettingPassword(true);

    try {
      console.log('eggoerfsfwefew', resetData)
      // Call reset password API with email and new password
      await resetPassword({
        email: resetData.email,
        password: resetData.newPassword
      });

      toast({
        title: "Password Reset Successful!",
        description: "Your password has been updated. You can now login with your new password.",
      });

      // Reset form and go back to login
      setResetData({ email: "", newPassword: "", confirmPassword: "" });
      setShowForgotPassword(false);

    } catch (error: any) {
      toast({
        title: "Password Reset Failed",
        description: error.message || "Failed to reset password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResettingPassword(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
        {/* Medical pattern background */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <pattern id="medical-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="currentColor" />
                <path d="M18 20h4M20 18v4" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#medical-pattern)" />
          </svg>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-teal-600/10" />

        {/* Geometric shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400/10 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        <Card className="backdrop-blur-xl bg-white/90 shadow-2xl border-0 ring-1 ring-white/20">
          <CardHeader className="text-center pb-2">
            {/* Logo with enhanced styling */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl blur opacity-50" />
                <div className="relative bg-gradient-to-r from-blue-600 to-teal-600 p-4 rounded-2xl">
                  <Hospital className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>

            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-teal-700 bg-clip-text text-transparent">
              Homeopathic Chikitsha Kendra
            </CardTitle>
            <p className="text-slate-600 mt-2 font-medium">Hospital Management System</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full mx-auto mt-4" />
          </CardHeader>

          <CardContent className="pt-6">
            {!showForgotPassword ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-700 font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4 text-blue-600" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 pr-12 transition-all duration-200"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-500" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-slate-600">Remember me</span>
                  </label>
                  <Button
                    type="button"
                    variant="link"
                    className="text-blue-600 hover:text-blue-700 p-0 h-auto font-medium"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot Password?
                  </Button>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Sign In
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email" className="text-slate-700 font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-600" />
                      Email Address
                    </Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="Enter your email"
                      value={resetData.email}
                      onChange={(e) => handleResetInputChange("email", e.target.value)}
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-slate-700 font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4 text-blue-600" />
                      New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password (min. 8 characters)"
                        value={resetData.newPassword}
                        onChange={(e) => handleResetInputChange("newPassword", e.target.value)}
                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 pr-12"
                        required
                        minLength={8}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4 text-slate-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-slate-500" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-slate-700 font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4 text-blue-600" />
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your new password"
                        value={resetData.confirmPassword}
                        onChange={(e) => handleResetInputChange("confirmPassword", e.target.value)}
                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 pr-12"
                        required
                        minLength={8}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-slate-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-slate-500" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Password strength indicator */}
                  {resetData.newPassword && (
                    <div className="space-y-2">
                      <div className="text-xs text-slate-600">Password Strength:</div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full ${resetData.newPassword.length >= level * 2
                                ? level <= 2
                                  ? "bg-red-400"
                                  : level === 3
                                    ? "bg-yellow-400"
                                    : "bg-green-400"
                                : "bg-slate-200"
                              }`}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-slate-500">
                        {resetData.newPassword.length < 6 && "Weak"}
                        {resetData.newPassword.length >= 6 && resetData.newPassword.length < 8 && "Fair"}
                        {resetData.newPassword.length >= 8 && resetData.newPassword.length < 12 && "Good"}
                        {resetData.newPassword.length >= 12 && "Strong"}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 h-11 border-slate-200 hover:bg-slate-50"
                      onClick={() => {
                        setShowForgotPassword(false);
                        setResetData({ email: "", newPassword: "", confirmPassword: "" });
                      }}
                    >
                      Back to Login
                    </Button>
                    <Button
                      onClick={handleResetPassword}
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 group"
                      disabled={isResettingPassword}
                    >
                      {isResettingPassword ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Resetting...
                        </div>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                Secure healthcare management platform
              </p>
              <div className="flex justify-center gap-4 mt-3">
                <span className="text-xs text-slate-400">24/7 Support</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-400">HIPAA Compliant</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-400">SSL Encrypted</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Version info */}
        <div className="text-center mt-6">
          <p className="text-xs text-slate-400">Version 2.0.1 • © 2024 Homeopathic Chikitsha Kendra</p>
        </div>
      </div>
    </div>
  );
};

export default Login;