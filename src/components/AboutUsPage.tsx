import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ChevronLeft, Heart, Leaf, Users, Award, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AboutUsPageProps {
  onBack: () => void;
}

export function AboutUsPage({ onBack }: AboutUsPageProps) {
  const values = [
    {
      icon: Heart,
      title: "Quality First",
      description: "We believe in sourcing only the finest materials and working with skilled artisans who share our commitment to excellence."
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Our responsibility to the planet drives us to make conscious choices in our supply chain and production processes."
    },
    {
      icon: Users,
      title: "Community",
      description: "Fashion is about connection. We build relationships with our customers, partners, and the communities we serve."
    },
    {
      icon: Award,
      title: "Innovation",
      description: "We continuously evolve, embracing new technologies and ideas while honoring timeless design principles."
    }
  ];

  const milestones = [
    { year: "2018", title: "Founded", description: "Started with a vision to make premium fashion accessible" },
    { year: "2019", title: "First Collection", description: "Launched our debut sustainable fashion line" },
    { year: "2021", title: "Global Expansion", description: "Expanded to serve customers worldwide" },
    { year: "2023", title: "Community Impact", description: "Partnered with local artisans and sustainable suppliers" },
    { year: "2024", title: "Innovation Hub", description: "Launched our design innovation center" }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      bio: "Former fashion executive with 15+ years in sustainable luxury fashion."
    },
    {
      name: "Marcus Rodriguez",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      bio: "Award-winning designer who believes fashion should be both beautiful and responsible."
    },
    {
      name: "Emma Thompson",
      role: "Head of Sustainability",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      bio: "Environmental scientist turned fashion advocate, leading our sustainable initiatives."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#222831] to-[#393E46] text-white py-20">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-8 text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
          
          <div className="max-w-4xl">
            <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-6">About FashionStack</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              We're redefining fashion by creating beautiful, sustainable clothing that empowers individuals to express their unique style while caring for our planet.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl font-serif font-bold text-[#222831]">Our Mission</h2>
                <p className="text-lg text-[#393E46] leading-relaxed">
                  Founded in 2018, FashionStack was born from a simple belief: fashion should be beautiful, sustainable, and accessible to everyone. We're committed to creating pieces that not only look good but also do good for the world.
                </p>
                <p className="text-lg text-[#393E46] leading-relaxed">
                  Every piece in our collection tells a story of craftsmanship, sustainability, and style. We work directly with artisans and sustainable suppliers to ensure that our impact on both people and planet is positive.
                </p>
              </div>
              <Button className="bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white px-8 py-3 rounded-full font-medium modern-shadow-md cyan-glow">
                Our Sustainability Report
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Fashion design process"
                className="w-full h-96 object-cover rounded-3xl modern-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-[#EEEEEE]/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#222831] mb-6">Our Values</h2>
            <p className="text-xl text-[#393E46] max-w-2xl mx-auto">
              These core principles guide everything we do, from design to delivery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white text-center">
                <CardContent className="p-8 space-y-6">
                  <div className="mx-auto w-16 h-16 bg-[#00ADB5]/10 rounded-full flex items-center justify-center">
                    <value.icon className="h-8 w-8 text-[#00ADB5]" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-[#222831]">{value.title}</h3>
                    <p className="text-[#393E46] leading-relaxed">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#222831] mb-6">Our Journey</h2>
            <p className="text-xl text-[#393E46] max-w-2xl mx-auto">
              From a small startup to a global sustainable fashion brand.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-8 items-center">
                  <div className="flex-shrink-0 w-24 text-right">
                    <span className="text-2xl font-bold text-[#00ADB5]">{milestone.year}</span>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 bg-[#00ADB5] rounded-full"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#222831] text-lg mb-2">{milestone.title}</h3>
                    <p className="text-[#393E46]">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-[#EEEEEE]/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#222831] mb-6">Meet Our Team</h2>
            <p className="text-xl text-[#393E46] max-w-2xl mx-auto">
              The passionate individuals behind FashionStack's vision and mission.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white text-center overflow-hidden">
                <CardContent className="p-0">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-semibold text-[#222831] text-lg">{member.name}</h3>
                      <p className="text-[#00ADB5] font-medium">{member.role}</p>
                    </div>
                    <p className="text-[#393E46] text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <Card className="border-[#393E46]/20 rounded-3xl modern-shadow bg-gradient-to-r from-[#222831] to-[#393E46] text-white overflow-hidden">
            <CardContent className="p-12 text-center space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl font-serif font-bold">Join Our Journey</h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Be part of a fashion revolution that puts people and planet first. Discover our collections and join thousands of conscious fashion lovers.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={onBack} className="bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white px-8 py-3 rounded-full font-medium modern-shadow-md cyan-glow">
                  Shop Our Collections
                </Button>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#222831] px-8 py-3 rounded-full font-medium">
                  Learn About Sustainability
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}