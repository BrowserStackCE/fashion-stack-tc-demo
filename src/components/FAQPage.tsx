import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ChevronLeft, Search, MessageCircle, Mail } from "lucide-react";

interface FAQPageProps {
  onBack: () => void;
}

export function FAQPage({ onBack }: FAQPageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      title: "Orders & Shipping",
      faqs: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping takes 5-7 business days. Express shipping (2-3 days) and overnight shipping are also available. Free shipping is included on all orders over $50."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes! We ship to over 50 countries worldwide. International shipping typically takes 7-14 business days depending on your location. Customs duties may apply."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and visiting the 'My Orders' section."
        },
        {
          question: "Can I change or cancel my order?",
          answer: "You can modify or cancel your order within 1 hour of placement. After that, please contact our customer service team as soon as possible."
        }
      ]
    },
    {
      title: "Returns & Exchanges",
      faqs: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for unworn, unwashed items with original tags. Items must be in original condition. Return shipping is free for exchanges or store credit."
        },
        {
          question: "How do I return an item?",
          answer: "Log into your account, go to 'My Orders', and select 'Return Item'. Print the prepaid return label and drop off at any post office or schedule a pickup."
        },
        {
          question: "Do you offer exchanges?",
          answer: "Yes! We offer free exchanges for different sizes or colors of the same item. The exchange process typically takes 5-7 business days once we receive your return."
        },
        {
          question: "When will I receive my refund?",
          answer: "Refunds are processed within 3-5 business days after we receive your return. The refund will appear on your original payment method within 5-10 business days."
        }
      ]
    },
    {
      title: "Sizing & Fit",
      faqs: [
        {
          question: "How do I find my size?",
          answer: "Use our detailed size guide found on each product page. We recommend measuring yourself and comparing to our size chart. Our customer service team can also help with sizing questions."
        },
        {
          question: "Do your clothes run true to size?",
          answer: "Our items generally run true to size, but fit can vary by style. Each product page includes specific fit information and customer reviews with sizing feedback."
        },
        {
          question: "What if an item doesn't fit?",
          answer: "If an item doesn't fit as expected, you can exchange it for a different size at no cost within 30 days. We want you to love the fit of your FashionStack pieces!"
        }
      ]
    },
    {
      title: "Product Care",
      faqs: [
        {
          question: "How should I care for my items?",
          answer: "Care instructions are included with each item and on the product page. Generally, we recommend cold water washing, gentle cycle, and air drying to maintain quality and color."
        },
        {
          question: "Are your fabrics sustainable?",
          answer: "Yes! We prioritize sustainable materials including organic cotton, TENCEL™, recycled polyester, and responsibly sourced wool. Each product page lists specific fabric details."
        },
        {
          question: "Do colors fade over time?",
          answer: "Our high-quality dyes and fabrics are designed to maintain their color. Following care instructions and washing in cold water will help preserve the vibrancy of your items."
        }
      ]
    },
    {
      title: "Account & Payment",
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and buy-now-pay-later options like Klarna and Afterpay."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes! We use SSL encryption and secure payment processing. We never store your full credit card information on our servers."
        },
        {
          question: "Can I save multiple addresses?",
          answer: "Yes! You can save multiple shipping addresses in your account for faster checkout. You can also set a default shipping address."
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(
      faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

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
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-white/90">Find quick answers to common questions about our products, orders, and policies.</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#393E46] h-5 w-5" />
            <Input
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 bg-white border-2 border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-2 focus:ring-[#00ADB5]/20 text-[#222831] placeholder:text-[#393E46] rounded-2xl text-lg"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-[#222831]">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem 
                        key={faqIndex} 
                        value={`${categoryIndex}-${faqIndex}`}
                        className="border border-[#393E46]/10 rounded-xl px-4"
                      >
                        <AccordionTrigger className="text-left font-medium text-[#222831] hover:text-[#00ADB5] py-4">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-[#393E46] leading-relaxed pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
              <CardContent className="p-12 text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-[#393E46]/10 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-[#393E46]" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-[#222831]">No results found</h3>
                  <p className="text-[#393E46]">
                    We couldn't find any FAQs matching "{searchQuery}". Try searching with different keywords or contact our support team.
                  </p>
                </div>
                <Button 
                  onClick={() => setSearchQuery("")}
                  variant="outline" 
                  className="border-2 border-[#393E46]/20 text-[#222831] hover:bg-[#393E46]/5 px-6 py-3 rounded-full font-medium"
                >
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-16 max-w-2xl mx-auto">
          <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-gradient-to-r from-[#00ADB5]/5 to-[#00ADB5]/10">
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-bold text-[#222831]">Still Need Help?</h3>
                <p className="text-[#393E46] text-lg">
                  Can't find the answer you're looking for? Our customer support team is here to help you.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white px-8 py-3 rounded-full font-medium modern-shadow-md cyan-glow">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Live Chat
                </Button>
                <Button variant="outline" className="border-2 border-[#393E46]/20 text-[#222831] hover:bg-[#393E46]/5 px-8 py-3 rounded-full font-medium">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </Button>
              </div>
              
              <div className="pt-4 border-t border-[#393E46]/20">
                <p className="text-sm text-[#393E46]">
                  <strong>Support Hours:</strong> Monday - Friday, 9AM - 6PM EST<br />
                  Average response time: Under 2 hours
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}