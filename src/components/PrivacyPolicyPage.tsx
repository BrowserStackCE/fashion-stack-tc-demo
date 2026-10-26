import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ChevronLeft, Shield, Calendar, Lock, Eye, Users, Mail } from "lucide-react";

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export function PrivacyPolicyPage({ onBack }: PrivacyPolicyPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#222831] to-[#393E46] text-white py-16">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-6 text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
          
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-[#00ADB5]" />
              <h1 className="text-4xl lg:text-5xl font-serif font-bold">Privacy Policy</h1>
            </div>
            <p className="text-xl text-white/90">How we collect, use, and protect your personal information.</p>
            <div className="flex items-center gap-2 mt-4 text-white/70">
              <Calendar className="h-4 w-4" />
              <span>Last updated: December 15, 2024</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Overview */}
          <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-[#222831]">Our Commitment to Privacy</h2>
              <div className="space-y-4 text-[#393E46] leading-relaxed">
                <p>
                  At FashionStack, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, share, and protect your information when you use our website, mobile application, and services.
                </p>
                <p>
                  We believe in transparency and want you to understand exactly how your data is handled. This policy applies to all visitors, users, and customers of FashionStack services.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="h-6 w-6 text-[#00ADB5]" />
                <h2 className="text-2xl font-serif font-bold text-[#222831]">Information We Collect</h2>
              </div>
              <div className="space-y-6 text-[#393E46] leading-relaxed">
                <div>
                  <h3 className="font-semibold text-[#222831] mb-2">Information You Provide</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Account information (name, email, password)</li>
                    <li>Billing and shipping addresses</li>
                    <li>Payment information (processed securely by third parties)</li>
                    <li>Customer service communications</li>
                    <li>Product reviews and feedback</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#222831] mb-2">Information Collected Automatically</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Device and browser information</li>
                    <li>IP address and location data</li>
                    <li>Website usage and navigation patterns</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>Purchase history and preferences</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-[#00ADB5]" />
                <h2 className="text-2xl font-serif font-bold text-[#222831]">How We Use Your Information</h2>
              </div>
              <div className="space-y-4 text-[#393E46] leading-relaxed">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Process and fulfill your orders</li>
                  <li>Provide customer service and support</li>
                  <li>Send order confirmations and shipping updates</li>
                  <li>Personalize your shopping experience</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Prevent fraud and ensure security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-[#222831]">Information Sharing</h2>
              <div className="space-y-6 text-[#393E46] leading-relaxed">
                <p>We do not sell or rent your personal information to third parties. We may share your information in these limited circumstances:</p>
                
                <div>
                  <h3 className="font-semibold text-[#222831] mb-2">Service Providers</h3>
                  <p>We work with trusted third parties who help us operate our business, such as payment processors, shipping companies, and email service providers.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#222831] mb-2">Legal Requirements</h3>
                  <p>We may disclose information when required by law, to protect our rights, or to protect the safety of our customers and others.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#222831] mb-2">Business Transfers</h3>
                  <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-6 w-6 text-[#00ADB5]" />
                <h2 className="text-2xl font-serif font-bold text-[#222831]">Data Security</h2>
              </div>
              <div className="space-y-4 text-[#393E46] leading-relaxed">
                <p>
                  We implement robust security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure servers and data centers</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Access controls and employee training</li>
                  <li>PCI DSS compliance for payment processing</li>
                </ul>
                <p>
                  While we strive to protect your information, no method of transmission over the Internet is 100% secure. We continuously work to improve our security practices.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-[#222831]">Your Privacy Rights</h2>
              <div className="space-y-4 text-[#393E46] leading-relaxed">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and review your personal information</li>
                  <li>Correct inaccurate or incomplete data</li>
                  <li>Delete your account and personal data</li>
                  <li>Object to certain processing of your data</li>
                  <li>Export your data in a portable format</li>
                  <li>Opt out of marketing communications</li>
                  <li>Manage cookie preferences</li>
                </ul>
                <p>
                  To exercise these rights, please contact us at privacy@fashionstack.com or through your account settings.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-[#222831]">Cookies and Tracking</h2>
              <div className="space-y-4 text-[#393E46] leading-relaxed">
                <p>
                  We use cookies and similar technologies to enhance your experience and understand how our services are used.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-[#222831] mb-2">Essential Cookies</h3>
                    <p>Required for the website to function properly, including shopping cart and checkout functionality.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-[#222831] mb-2">Analytics Cookies</h3>
                    <p>Help us understand how visitors use our website so we can improve the user experience.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-[#222831] mb-2">Marketing Cookies</h3>
                    <p>Used to show you relevant advertisements and measure the effectiveness of our marketing campaigns.</p>
                  </div>
                </div>
                <p>
                  You can control cookie settings through your browser preferences or our cookie consent tool.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Updates to Policy */}
          <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-[#222831]">Policy Updates</h2>
              <div className="space-y-4 text-[#393E46] leading-relaxed">
                <p>
                  We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Posting the updated policy on our website</li>
                  <li>Sending email notifications for significant changes</li>
                  <li>Displaying prominent notices on our website</li>
                </ul>
                <p>
                  We encourage you to review this policy periodically to stay informed about how we protect your privacy.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-gradient-to-r from-[#00ADB5]/5 to-[#00ADB5]/10">
            <CardContent className="p-8 text-center space-y-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Mail className="h-6 w-6 text-[#00ADB5]" />
                <h2 className="text-2xl font-serif font-bold text-[#222831]">Questions About Privacy?</h2>
              </div>
              <p className="text-[#393E46] text-lg">
                If you have any questions about this Privacy Policy or our data practices, please don't hesitate to contact us.
              </p>
              <div className="space-y-2 text-[#393E46]">
                <p><strong>Privacy Officer:</strong> privacy@fashionstack.com</p>
                <p><strong>General Inquiries:</strong> support@fashionstack.com</p>
                <p><strong>Address:</strong> 123 Fashion Avenue, New York, NY 10001</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
              <div className="pt-4 border-t border-[#393E46]/20">
                <p className="text-sm text-[#393E46]">
                  <strong>Data Protection Officer:</strong> Available for EU residents<br />
                  Email: dpo@fashionstack.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}