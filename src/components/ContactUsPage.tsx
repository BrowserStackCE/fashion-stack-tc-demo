import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ChevronLeft, Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ContactUsPageProps {
  onBack: () => void;
}

export function ContactUsPage({ onBack }: ContactUsPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours.",
        duration: 4000,
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri 9am-6pm EST"
    },
    {
      icon: Mail,
      title: "Email",
      details: "support@fashionstack.com",
      description: "We reply within 24 hours"
    },
    {
      icon: MapPin,
      title: "Address",
      details: "123 Fashion Avenue",
      description: "New York, NY 10001"
    },
    {
      icon: Clock,
      title: "Store Hours",
      details: "Mon-Sat 10am-8pm",
      description: "Sunday 12pm-6pm"
    }
  ];

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
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-white/90">We're here to help with any questions or concerns you may have.</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-[#222831]">Send us a Message</CardTitle>
                <p className="text-[#393E46]">Fill out the form below and we'll get back to you as soon as possible.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#222831]">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#222831]">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#222831]">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-[#222831]">Subject</Label>
                    <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                      <SelectTrigger className="bg-white border-[#393E46]/20 focus:border-[#00ADB5] text-[#222831] rounded-xl">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="order">Order Support</SelectItem>
                        <SelectItem value="returns">Returns & Exchanges</SelectItem>
                        <SelectItem value="sizing">Sizing Help</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[#222831]">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl min-h-32"
                      placeholder="Please describe your inquiry in detail..."
                      required
                    />
                  </div>

                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white py-3 rounded-xl font-medium modern-shadow-md cyan-glow transition-all duration-300 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-[#222831]">Get in Touch</h2>
              <p className="text-[#393E46] text-lg">
                We're committed to providing exceptional customer service. Reach out to us through any of the following channels.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="mx-auto w-12 h-12 bg-[#00ADB5]/10 rounded-full flex items-center justify-center">
                      <info.icon className="h-6 w-6 text-[#00ADB5]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#222831] mb-1">{info.title}</h3>
                      <p className="font-medium text-[#222831]">{info.details}</p>
                      <p className="text-sm text-[#393E46]">{info.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* FAQ Quick Links */}
            <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
              <CardHeader>
                <CardTitle className="text-[#222831]">Quick Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-[#393E46]">Looking for quick answers? Check out our frequently asked questions:</p>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-[#00ADB5] hover:bg-[#00ADB5]/10 p-2 rounded-xl">
                    → Shipping & Delivery Information
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-[#00ADB5] hover:bg-[#00ADB5]/10 p-2 rounded-xl">
                    → Return & Exchange Policy
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-[#00ADB5] hover:bg-[#00ADB5]/10 p-2 rounded-xl">
                    → Size Guide & Fitting Help
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-[#00ADB5] hover:bg-[#00ADB5]/10 p-2 rounded-xl">
                    → Care Instructions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}