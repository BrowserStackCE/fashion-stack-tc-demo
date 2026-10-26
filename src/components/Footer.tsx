import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import {
  Truck,
  RotateCcw,
  Shield,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import {
  footerLinks,
  socialLinks,
  companyInfo,
  legalLinks,
} from "./constants/footerData";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);

    setTimeout(() => {
      toast.success("Successfully subscribed!", {
        description:
          "Welcome to FashionStack newsletter. You'll receive exclusive offers and style updates.",
        duration: 4000,
      });
      setEmail("");
      setIsSubscribing(false);
    }, 1000);
  };

  const features = [
    { icon: Truck, title: "Free Shipping", description: "On orders over $50" },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "SSL encrypted checkout",
    },
    {
      icon: CreditCard,
      title: "Payment Options",
      description: "Multiple payment methods",
    },
  ];

  return (
    <footer className="bg-[#222831] text-[#EEEEEE]">
      {/* Features section */}
      <div className="border-b border-[#393E46]">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-[#00ADB5]/20 rounded-full flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-[#00ADB5]" />
                </div>
                <h4 className="font-semibold text-[#EEEEEE]">
                  {feature.title}
                </h4>
                <p className="text-sm text-[#EEEEEE]/70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter section */}
      <div className="border-b border-[#393E46]">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-serif font-bold text-[#EEEEEE]">
                Stay in Style
              </h3>
              <p className="text-lg text-[#EEEEEE]/80">
                Get the latest fashion updates, exclusive offers, and style tips
                delivered to your inbox.
              </p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#EEEEEE]/60" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-[#393E46] border-[#393E46] text-[#EEEEEE] placeholder:text-[#EEEEEE]/60 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 rounded-full py-3 px-6"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isSubscribing}
                className="bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white px-8 py-3 rounded-full font-medium modern-shadow-md transition-all duration-300 cyan-glow disabled:opacity-70"
              >
                {isSubscribing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
            <p className="text-xs text-[#EEEEEE]/60">
              By subscribing, you agree to our Privacy Policy and Terms of
              Service.
            </p>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-bold text-[#EEEEEE]">
                {companyInfo.name}
              </h3>
              <p className="text-[#EEEEEE]/80 leading-relaxed max-w-md">
                {companyInfo.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#EEEEEE]/80">
                <MapPin className="h-5 w-5 flex-shrink-0 text-[#00ADB5]" />
                <span>{companyInfo.contact.address}</span>
              </div>
              <div className="flex items-center gap-3 text-[#EEEEEE]/80">
                <Phone className="h-5 w-5 flex-shrink-0 text-[#00ADB5]" />
                <span>{companyInfo.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-[#EEEEEE]/80">
                <Mail className="h-5 w-5 flex-shrink-0 text-[#00ADB5]" />
                <span>{companyInfo.contact.email}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="text-[#EEEEEE]/70 hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 p-3 rounded-full transition-all duration-200"
                >
                  <social.icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-[#EEEEEE]">Shop</h4>
            <nav className="flex flex-col space-y-3">
              {footerLinks.shop.map((link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => onNavigate(link.action)}
                  className="justify-start p-0 h-auto text-[#EEEEEE]/80 hover:text-[#00ADB5] hover:bg-transparent font-normal"
                >
                  {link.name}
                </Button>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="font-semibold text-[#EEEEEE]">Support</h4>
            <nav className="flex flex-col space-y-3">
              {footerLinks.support.map((link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => onNavigate(link.action)}
                  className="justify-start p-0 h-auto text-[#EEEEEE]/80 hover:text-[#00ADB5] hover:bg-transparent font-normal"
                >
                  {link.name}
                </Button>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="font-semibold text-[#EEEEEE]">Company</h4>
            <nav className="flex flex-col space-y-3">
              {footerLinks.company.map((link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => onNavigate(link.action)}
                  className="justify-start p-0 h-auto text-[#EEEEEE]/80 hover:text-[#00ADB5] hover:bg-transparent font-normal"
                >
                  {link.name}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <Separator className="border-[#393E46]" />

      {/* Bottom footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-[#EEEEEE]/70">
            © {new Date().getFullYear()} {companyInfo.name}. All rights
            reserved.
          </p>
          <div className="flex space-x-8">
            {legalLinks.map((link, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => onNavigate(link.action)}
                className="text-sm text-[#EEEEEE]/70 hover:text-[#00ADB5] p-0 h-auto font-normal"
              >
                {link.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
