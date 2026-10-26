import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { ChevronLeft, Eye, EyeOff, Mail, Lock } from "lucide-react";
import logoImage from "figma:asset/39e9bc28f4d03024a78e834fbff4e985d3feffd1.png";
import { login, getOtp, loginViaOtp } from "../api/auth";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { getUser } from "../api/user";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./ui/input-otp";

interface LoginPageProps {
  onLogin: (userData: any) => void;
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
  onBack: () => void;
}

export function LoginPage({
  onLogin,
  onNavigateToRegister,
  onNavigateToForgotPassword,
  onBack,
}: LoginPageProps) {
  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState<"idle" | "requested">("idle");
  const [loginMode, setLoginMode] = useState<"password" | "otp">("password"); // active mode

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      // Call your login API
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      // Fetch user info using the saved token
      const token = localStorage.getItem("jwtToken");
      if (!token) throw new Error("Token not found");

      const userResponse = await getUser(token);
      const user = userResponse.user;

      // Split name into firstName and lastName
      const nameParts = user.name.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      // Call onLogin with full user info
      onLogin({
        email: user.email,
        name: user.name,
        firstName,
        lastName,
        id: user.id,
      });
    } catch (error: any) {
      setError(error.message || "Login failed");
      setShowDialog(true); // show the alert dialog on error
      console.error("Login failed:", error.message);
      // Optionally show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestOtp = async () => {
    if (!formData.email) {
      setError("Please enter your email");
      setShowDialog(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Call the API
      const response = await getOtp({ email: formData.email });

      // Optionally, you can check response.success or response.message
      console.log("OTP requested:", response);

      // Move to the next step in the OTP flow
      setOtpStep("requested");
    } catch (error: any) {
      setError(error.message || "Unexpected error while requesting OTP.");
      setShowDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      // 1️⃣ Call login via OTP
      const otpResponse = await loginViaOtp({
        email: formData.email,
        otp: Number(otp),
      });
      console.log("OTP login response:", otpResponse);

      // 2️⃣ Fetch user info using saved token
      const token = localStorage.getItem("jwtToken");
      if (!token) throw new Error("Token not found");

      const userResponse = await getUser(token);
      const user = userResponse.user;

      // 3️⃣ Split name into firstName and lastName
      const nameParts = user.name.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      // 4️⃣ Call onLogin with full user info
      onLogin({
        email: user.email,
        name: user.name,
        firstName,
        lastName,
        id: user.id,
      });
    } catch (error: any) {
      setError(error.message || "OTP login failed");
      setShowDialog(true);
      console.error("OTP login failed:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
            Welcome Back
          </h2>
          <p className="text-[#393E46]">
            Sign in to your account to continue shopping
          </p>
        </div>

        {/* Login Form */}
        <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
          <CardHeader>
            <CardTitle className="text-center text-[#222831]">
              Sign In
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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

              {loginMode === "password" && (
                <>
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
                        placeholder="Enter your password"
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
                  </div>

                  {/* Remember Me & Forgot Password */}
                  {/*<div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberMe"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked: boolean) =>
                          handleInputChange("rememberMe", !!checked)
                        }
                      />
                      <Label
                        htmlFor="rememberMe"
                        className="text-sm text-[#393E46]"
                      >
                        Remember me
                      </Label>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={onNavigateToForgotPassword}
                      className="text-sm text-[#00ADB5] hover:text-[#00ADB5]/80 hover:bg-transparent cursor-pointer p-0 h-auto font-medium"
                    >
                      Forgot password?
                    </Button>
                  </div>*/}

                  {/* Sign In Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white py-3 rounded-xl font-medium modern-shadow-md cyan-glow transition-all duration-300 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </>
              )}
              {loginMode === "otp" && (
                <>
                  {otpStep === "idle" && (
                    <Button
                      onClick={handleRequestOtp}
                      disabled={isLoading}
                      className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white py-3 rounded-xl font-medium modern-shadow-md cyan-glow transition-all duration-300 disabled:opacity-70"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending OTP...
                        </>
                      ) : (
                        "Get OTP"
                      )}
                    </Button>
                  )}
                  {otpStep === "requested" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Enter OTP</Label>
                        <InputOTP
                          maxLength={6}
                          value={otp}
                          onChange={setOtp}
                          onComplete={(val: string) => setOtp(val)}
                        >
                          <InputOTPGroup>
                            {[0, 1, 2].map((i) => (
                              <InputOTPSlot key={i} index={i} />
                            ))}
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            {[3, 4, 5].map((i) => (
                              <InputOTPSlot key={i} index={i} />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      <div className="flex items-center justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          className="text-sm text-[#00ADB5] hover:text-[#00ADB5]/80 hover:bg-transparent cursor-pointer p-0 h-auto font-medium"
                        >
                          Resend OTP
                        </Button>
                      </div>
                      <Button
                        onClick={handleOtpLogin}
                        disabled={isLoading}
                        className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white py-3 rounded-xl font-medium modern-shadow-md cyan-glow transition-all duration-300 disabled:opacity-70"
                      >
                        {isLoading ? "Verifying..." : "Sign In"}
                      </Button>
                    </div>
                  )}
                </>
              )}

              {/* Divider */}
              <div className="relative">
                <Separator className="border-[#393E46]/20" />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-[#393E46]">
                  or
                </span>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                {loginMode === "password" && (
                  <Button
                    type="button"
                    onClick={() => setLoginMode("otp")}
                    className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white py-3 rounded-xl font-medium modern-shadow-md cyan-glow transition-all duration-300 disabled:opacity-70"
                  >
                    Sign In with OTP
                  </Button>
                )}
                {loginMode === "otp" && (
                  <Button
                    type="button"
                    onClick={() => {
                      setLoginMode("password");
                      setOtp("");
                      setOtpStep("idle");
                    }}
                    className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white py-3 rounded-xl font-medium modern-shadow-md cyan-glow transition-all duration-300 disabled:opacity-70"
                  >
                    Sign In with Password
                  </Button>
                )}
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
                  Continue with Google
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-2 border-[#393E46]/20 text-[#222831] hover:bg-[#393E46]/5 py-3 rounded-xl font-medium"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Continue with Facebook
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-[#393E46]">
            Don't have an account?{" "}
            <Button
              type="button"
              variant="ghost"
              onClick={onNavigateToRegister}
              className="text-[#00ADB5] hover:text-[#00ADB5]/80 p-0 h-auto font-medium"
            >
              Sign up here
            </Button>
          </p>
        </div>
      </div>
      {/* Alert Dialog for login errors */}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login Error</AlertDialogTitle>
            <AlertDialogDescription>{error}</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <AlertDialogCancel onClick={() => setShowDialog(false)}>
              Close
            </AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
