import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export const footerLinks = {
  shop: [
    { name: "New Arrivals", action: "category-new-arrivals" },
    { name: "Women", action: "category-women" },
    { name: "Men", action: "category-men" },
    { name: "Kids", action: "category-kids" },
    { name: "Sale", action: "category-sale" }
  ],
  support: [
    { name: "FAQ", action: "faq" },
    { name: "Help Center", action: "contact" },
    { name: "Shipping Info", action: "contact" },
    { name: "Track Order", action: "contact" }
  ],
  company: [
    { name: "About Us", action: "about" }
  ]
};

export const socialLinks = [
  { icon: Facebook, label: "Facebook", url: "#" },
  { icon: Twitter, label: "Twitter", url: "#" },
  { icon: Instagram, label: "Instagram", url: "#" },
  { icon: Youtube, label: "YouTube", url: "#" }
];

export const companyInfo = {
  name: "FashionStack",
  description: "Your premier destination for contemporary fashion. We curate high-quality clothing and accessories that blend timeless elegance with modern trends.",
  contact: {
    address: "123 Fashion Avenue, New York, NY 10001",
    phone: "+1 (555) 123-4567",
    email: "support@fashionstack.com"
  }
};

export const legalLinks = [
  { name: "Privacy Policy", action: "privacy" },
  { name: "Terms of Service", action: "terms" },
  { name: "Contact Us", action: "contact" }
];