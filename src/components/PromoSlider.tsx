import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const slides = [
  {
    id: 1,
    title: "Summer Collection 2024",
    subtitle: "Fresh styles for the season",
    description:
      "Discover our latest summer arrivals featuring breathable fabrics, vibrant colors, and timeless designs.",
    buttonText: "Shop Collection",
    buttonSecondary: "View Lookbook",
    image:
      "https://images.unsplash.com/photo-1623832101940-647285e32a58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBmYXNoaW9uJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzU1NTIyMjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    bgColor: "#EEEEEE",
    textColor: "#222831",
  },
  {
    id: 2,
    title: "Minimalist Essentials",
    subtitle: "Less is more",
    description:
      "Curated basics that form the foundation of your wardrobe. Quality materials, perfect fits, endless possibilities.",
    buttonText: "Shop Essentials",
    buttonSecondary: "Size Guide",
    image:
      "https://images.unsplash.com/photo-1655286881878-86ac4b984871?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjB3ZWFyJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTU0NDUyNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    bgColor: "#393E46",
    textColor: "#EEEEEE",
  },
  {
    id: 3,
    title: "Premium Denim",
    subtitle: "Crafted to perfection",
    description:
      "Experience our heritage denim collection, featuring sustainable materials and artisanal craftsmanship.",
    buttonText: "Shop Denim",
    buttonSecondary: "Learn More",
    image:
      "https://images.unsplash.com/photo-1715865871494-6bba579c2dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5pbSUyMGplYW5zJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTU0NzYzODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    bgColor: "#222831",
    textColor: "#EEEEEE",
  },
];

export function PromoSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-1000 ease-out ${
            index === currentSlide
              ? "translate-x-0"
              : index < currentSlide
              ? "-translate-x-full"
              : "translate-x-full"
          }`}
        >
          <div
            className="h-full relative"
            style={{ backgroundColor: slide.bgColor }}
          >
            <div className="container mx-auto px-4 h-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                <div
                  className="space-y-8 max-w-xl"
                  style={{ color: slide.textColor }}
                >
                  <div className="space-y-4">
                    <p className="text-[#00ADB5] font-medium tracking-wide uppercase text-sm">
                      {slide.subtitle}
                    </p>
                    <h2
                      className="text-5xl lg:text-6xl font-serif font-bold leading-tight text-balance"
                      style={{ color: slide.textColor }}
                    >
                      {slide.title}
                    </h2>
                    <p
                      className="text-xl leading-relaxed opacity-80"
                      style={{ color: slide.textColor }}
                    >
                      {slide.description}
                    </p>
                  </div>

                  {/*<div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 modern-shadow-md cyan-glow">
                      {slide.buttonText}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-2 px-8 py-3 rounded-full font-medium transition-all duration-300"
                      style={{ 
                        borderColor: slide.textColor, 
                        color: slide.textColor,
                        backgroundColor: 'transparent'
                      }}
                    >
                      {slide.buttonSecondary}
                    </Button>
                  </div>*/}
                </div>

                <div className="flex justify-center lg:justify-end">
                  <div className="relative w-80 h-80 lg:w-[500px] lg:h-[500px]">
                    <ImageWithFallback
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover rounded-3xl modern-shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="sm"
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#393E46] hover:text-[#00ADB5] modern-shadow-md rounded-full w-12 h-12 p-0 transition-all duration-200"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#393E46] hover:text-[#00ADB5] modern-shadow-md rounded-full w-12 h-12 p-0 transition-all duration-200"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-[#00ADB5] w-8" : "bg-[#393E46] w-3"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
