import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ChevronLeft, FileText, Calendar } from "lucide-react";

interface TermsOfServicePageProps {
  onBack: () => void;
}

export function TermsOfServicePage({ onBack }: TermsOfServicePageProps) {
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
              <FileText className="h-8 w-8 text-[#00ADB5]" />
              <h1 className="text-4xl lg:text-5xl font-serif font-bold">
                Terms of Service
              </h1>
            </div>
            <p className="text-xl text-white/90">
              Legal terms and conditions for using FashionStack services.
            </p>
            <div className="flex items-center gap-2 mt-4 text-white/70">
              <Calendar className="h-4 w-4" />
              <span>Last updated: December 15, 2024</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-[#222831]">
                Agreement to Terms
              </h2>
              <div className="space-y-4 text-[#393E46] leading-relaxed">
                <p>
                  Welcome to FashionStack. These Terms of Service ("Terms")
                  govern your use of our website, mobile application, and
                  services (collectively, the "Service") operated by
                  FashionStack, Inc. ("we," "us," or "our").
                </p>
                <p>
                  By accessing or using our Service, you agree to be bound by
                  these Terms. If you disagree with any part of these terms,
                  then you may not access the Service.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Account Terms */}
          <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-[#222831]">
                Account Terms
              </h2>
              <div className="space-y-4 text-[#393E46] leading-relaxed">
                <p>
                  When you create an account with us, you must provide
                  information that is accurate, complete, and current at all
                  times. You are responsible for safeguarding the password and
                  for all activities that occur under your account.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You must be at least 18 years old to use this Service</li>
                  <li>
                    You must provide accurate and complete registration
                    information
                  </li>
                  <li>
                    You are responsible for maintaining the security of your
                    account
                  </li>
                  <li>
                    You must notify us immediately of any unauthorized use of
                    your account
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Purchases and Payments */}
          <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-[#222831]">
                Purchases and Payments
              </h2>
              <div className="space-y-4 text-[#393E46] leading-relaxed">
                <p>
                  If you wish to purchase any product or service made available
                  through the Service, you may be asked to supply certain
                  information relevant to your purchase.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All prices are subject to change without notice</li>
                  <li>
                    We reserve the right to refuse or cancel orders at any time
                  </li>
                  <li>Payment must be received before product shipment</li>
                  <li>
                    You agree to provide current, complete, and accurate
                    purchase information
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Returns and Refunds */}
          <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-[#222831]">
                Returns and Refunds
              </h2>
              <div className="space-y-4 text-[#393E46] leading-relaxed">
                <p>
                  We offer a 30-day return policy for most items. Items must be
                  returned in their original condition with all tags attached.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Returns must be initiated within 30 days of delivery</li>
                  <li>
                    Items must be unworn, unwashed, and in original condition
                  </li>
                  <li>Final sale items are not eligible for return</li>
                  <li>
                    Refunds will be processed to the original payment method
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-[#222831]">
                Intellectual Property Rights
              </h2>
              <div className="space-y-4 text-[#393E46] leading-relaxed">
                <p>
                  The Service and its original content, features, and
                  functionality are and will remain the exclusive property of
                  FashionStack and its licensors. The Service is protected by
                  copyright, trademark, and other laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, create derivative
                  works of, publicly display, publicly perform, republish,
                  download, store, or transmit any of the material on our
                  Service without our prior written consent.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* User Conduct */}
          <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-[#222831]">
                User Conduct
              </h2>
              <div className="space-y-4 text-[#393E46] leading-relaxed">
                <p>You agree not to use the Service:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    For any unlawful purpose or to solicit others to unlawful
                    acts
                  </li>
                  <li>
                    To violate any international, federal, provincial, or state
                    regulations, rules, laws, or local ordinances
                  </li>
                  <li>
                    To infringe upon or violate our intellectual property rights
                    or the intellectual property rights of others
                  </li>
                  <li>
                    To harass, abuse, insult, harm, defame, slander, disparage,
                    intimidate, or discriminate
                  </li>
                  <li>To submit false or misleading information</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Policy */}
          <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-[#222831]">
                Privacy Policy
              </h2>
              <div className="space-y-4 text-[#393E46] leading-relaxed">
                <p>
                  Your privacy is important to us. Please review our Privacy
                  Policy, which also governs your use of the Service, to
                  understand our practices.
                </p>
                <p>
                  By using our Service, you agree to the collection and use of
                  information in accordance with our Privacy Policy.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-[#222831]">
                Disclaimers
              </h2>
              <div className="space-y-4 text-[#393E46] leading-relaxed">
                <p>
                  The information on this website is provided on an "as is"
                  basis. To the fullest extent permitted by law, this Company
                  excludes all representations, warranties, conditions and
                  terms.
                </p>
                <p>
                  FashionStack shall not be liable for any damages arising out
                  of or in connection with your use of our Service. This is a
                  comprehensive limitation of liability that applies to all
                  damages of any kind.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-[#222831]">
                Changes to Terms
              </h2>
              <div className="space-y-4 text-[#393E46] leading-relaxed">
                <p>
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. If a revision is material, we
                  will try to provide at least 30 days notice prior to any new
                  terms taking effect.
                </p>
                <p>
                  What constitutes a material change will be determined at our
                  sole discretion. By continuing to access or use our Service
                  after those revisions become effective, you agree to be bound
                  by the revised terms.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-gradient-to-r from-[#00ADB5]/5 to-[#00ADB5]/10">
            <CardContent className="p-8 text-center space-y-6">
              <h2 className="text-2xl font-serif font-bold text-[#222831]">
                Questions About These Terms?
              </h2>
              <p className="text-[#393E46] text-lg">
                If you have any questions about these Terms of Service, please
                contact us.
              </p>
              <div className="space-y-2 text-[#393E46]">
                <p>
                  <strong>Email:</strong> legal@fashionstack.com
                </p>
                <p>
                  <strong>Address:</strong> 123 Fashion Avenue, New York, NY
                  10001
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
