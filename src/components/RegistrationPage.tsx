import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import {
  ChevronLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Check,
  X,
} from "lucide-react";
import logoImage from "figma:asset/39e9bc28f4d03024a78e834fbff4e985d3feffd1.png";
import { register } from "../api/auth";

interface RegistrationPageProps {
  onRegister: (userData: any) => void;
  onNavigateToLogin: () => void;
  onBack: () => void;
}

export function RegistrationPage({
  onRegister,
  onNavigateToLogin,
  onBack,
}: RegistrationPageProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Password validation
  const passwordRequirements = [
    { test: (pwd: string) => pwd.length >= 8, text: "At least 8 characters" },
    { test: (pwd: string) => /[A-Z]/.test(pwd), text: "One uppercase letter" },
    { test: (pwd: string) => /[a-z]/.test(pwd), text: "One lowercase letter" },
    { test: (pwd: string) => /\d/.test(pwd), text: "One number" },
    {
      test: (pwd: string) => /[!@#$%^&*]/.test(pwd),
      text: "One special character",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      // Optionally show error message here
      return;
    }

    setIsLoading(true);

    try {
      // Call the register API
      const response = await register({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      });

      onRegister({
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        id: response.id || Date.now(), // use ID from API if returned
      });
    } catch (error: any) {
      console.error("Registration failed:", error.message);
      // Optionally show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  const isPasswordValid = passwordRequirements.every((req) =>
    req.test(formData.password)
  );
  const doPasswordsMatch =
    formData.password === formData.confirmPassword &&
    formData.confirmPassword !== "";

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 text-[#222831] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 p-2 rounded-full"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Button>

        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img
              src={logoImage}
              alt="FashionStack Logo"
              className="w-12 h-12 object-contain"
            />
            <h1 className="text-2xl font-serif font-bold text-[#222831] gradient-text">
              FashionStack
            </h1>
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#222831] mb-2">
            Create Account
          </h2>
          <p className="text-[#393E46]">
            Join FashionStack and discover premium fashion
          </p>
        </div>

        {/* Registration Form */}
        <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
          <CardHeader>
            <CardTitle className="text-center text-[#222831]">
              Sign Up
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[#222831]">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#393E46]" />
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="pl-10 bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl"
                      placeholder="First name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[#222831]">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#222831]">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#393E46]" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#222831]">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#393E46]" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="pl-10 pr-10 bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#393E46] hover:text-[#00ADB5]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                {formData.password && (
                  <div className="mt-3 p-3 bg-[#EEEEEE]/50 rounded-xl">
                    <p className="text-sm font-medium text-[#222831] mb-2">
                      Password requirements:
                    </p>
                    <ul className="space-y-1">
                      {passwordRequirements.map((req, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          {req.test(formData.password) ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <X className="h-3 w-3 text-[#393E46]" />
                          )}
                          <span
                            className={
                              req.test(formData.password)
                                ? "text-green-600"
                                : "text-[#393E46]"
                            }
                          >
                            {req.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#222831]">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#393E46]" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className={`pl-10 pr-10 bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl ${
                      formData.confirmPassword && !doPasswordsMatch
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#393E46] hover:text-[#00ADB5]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword && !doPasswordsMatch && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <X className="h-3 w-3" />
                    Passwords do not match
                  </p>
                )}
                {doPasswordsMatch && (
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    Passwords match
                  </p>
                )}
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked: any) =>
                      handleInputChange("agreeToTerms", !!checked)
                    }
                    className="mt-1"
                  />
                  <Label
                    htmlFor="agreeToTerms"
                    className="text-sm text-[#393E46] leading-relaxed"
                  >
                    I agree to the{" "}
                    <button
                      type="button"
                      className="text-[#00ADB5] hover:underline"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="text-[#00ADB5] hover:underline"
                    >
                      Privacy Policy
                    </button>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="subscribeNewsletter"
                    checked={formData.subscribeNewsletter}
                    onCheckedChange={(checked: any) =>
                      handleInputChange("subscribeNewsletter", !!checked)
                    }
                  />
                  <Label
                    htmlFor="subscribeNewsletter"
                    className="text-sm text-[#393E46]"
                  >
                    Subscribe to our newsletter for exclusive offers
                  </Label>
                </div>
              </div>

              {/* Sign Up Button */}
              <Button
                type="submit"
                disabled={
                  isLoading ||
                  !isPasswordValid ||
                  !doPasswordsMatch ||
                  !formData.agreeToTerms
                }
                className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white py-3 rounded-xl font-medium modern-shadow-md cyan-glow transition-all duration-300 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              {/* Divider */}
              <div className="relative">
                <Separator className="border-[#393E46]/20" />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-[#393E46]">
                  or
                </span>
              </div>

              {/* Social Registration Buttons */}
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-2 border-[#393E46]/20 text-[#222831] hover:bg-[#393E46]/5 py-3 rounded-xl font-medium"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign up with Google
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-[#393E46]">
            Already have an account?{" "}
            <Button
              type="button"
              variant="ghost"
              onClick={onNavigateToLogin}
              className="text-[#00ADB5] hover:text-[#00ADB5]/80 p-0 h-auto font-medium"
            >
              Sign in here
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
