import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { ChevronLeft, Mail, ArrowRight, Check } from "lucide-react";
import logoImage from 'figma:asset/39e9bc28f4d03024a78e834fbff4e985d3feffd1.png';

interface ForgotPasswordPageProps {
  onBack: () => void;
}

export function ForgotPasswordPage({ onBack }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsEmailSent(true);
      setIsLoading(false);
    }, 1000);
  };

  if (isEmailSent) {
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
            Back to Login
          </Button>

          {/* Success State */}
          <div className="text-center space-y-8">
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

            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Check className="h-10 w-10 text-green-500" />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-[#222831]">Check Your Email</h2>
              <p className="text-[#393E46] leading-relaxed">
                We've sent a password reset link to <span className="font-medium text-[#222831]">{email}</span>
              </p>
              <p className="text-sm text-[#393E46]">
                Didn't receive the email? Check your spam folder or try again in a few minutes.
              </p>
            </div>

            <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-[#222831]">What's next?</h3>
                <ul className="text-left space-y-2 text-sm text-[#393E46]">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#00ADB5] rounded-full mt-2 flex-shrink-0"></div>
                    Click the reset link in your email
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#00ADB5] rounded-full mt-2 flex-shrink-0"></div>
                    Create a new secure password
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#00ADB5] rounded-full mt-2 flex-shrink-0"></div>
                    Sign in with your new password
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Button
                onClick={() => setIsEmailSent(false)}
                variant="outline"
                className="border-2 border-[#393E46]/20 text-[#222831] hover:bg-[#393E46]/5 py-3 px-6 rounded-xl font-medium"
              >
                Try Different Email
              </Button>
              
              <Button 
                onClick={onBack}
                className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white py-3 rounded-xl font-medium modern-shadow-md cyan-glow"
              >
                Back to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          Back to Login
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
          <h2 className="text-3xl font-serif font-bold text-[#222831] mb-2">Reset Password</h2>
          <p className="text-[#393E46]">Enter your email to receive a password reset link</p>
        </div>

        {/* Reset Password Form */}
        <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
          <CardHeader>
            <CardTitle className="text-center text-[#222831]">Forgot Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#222831]">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#393E46]" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <p className="text-sm text-[#393E46]">
                  We'll send you a secure link to reset your password
                </p>
              </div>

              {/* Send Reset Link Button */}
              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white py-3 rounded-xl font-medium modern-shadow-md cyan-glow transition-all duration-300 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending Link...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-6 border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
          <CardContent className="p-6">
            <h3 className="font-semibold text-[#222831] mb-4 flex items-center gap-2">
              <span className="text-[#00ADB5]">💡</span>
              Password Reset Tips
            </h3>
            <ul className="space-y-2 text-sm text-[#393E46]">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#00ADB5] rounded-full mt-2 flex-shrink-0"></div>
                Check your spam folder if you don't see the email
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#00ADB5] rounded-full mt-2 flex-shrink-0"></div>
                The reset link will expire in 1 hour for security
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#00ADB5] rounded-full mt-2 flex-shrink-0"></div>
                Make sure to use the email associated with your account
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Alternative Actions */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-[#393E46]">
            Remember your password?{" "}
            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className="text-[#00ADB5] hover:text-[#00ADB5]/80 p-0 h-auto font-medium"
            >
              Sign in here
            </Button>
          </p>
          
          <p className="text-xs text-[#393E46]">
            Need more help? Contact our{" "}
            <button className="text-[#00ADB5] hover:underline">
              support team
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}