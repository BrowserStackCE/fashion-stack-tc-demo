import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import {
  Heart,
  ShoppingCart,
  Star,
  Truck,
  RotateCcw,
  Shield,
  ChevronLeft,
  Plus,
  Minus,
  Check,
  ArrowRight,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart, type Product } from "./CartContext";
import { toast } from "sonner";

interface ProductDetailsPageProps {
  product: Product;
  onBack: () => void;
  onNavigateToCart?: () => void;
}

export function ProductDetailsPage({
  product,
  onBack,
  onNavigateToCart,
}: ProductDetailsPageProps) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "M");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Get the current image based on selected color
  const getCurrentImage = () => {
    if (product.colorImages && product.colorImages[selectedColor]) {
      return product.colorImages[selectedColor];
    }
    return product.image;
  };

  const images = [
    getCurrentImage(),
    getCurrentImage(),
    getCurrentImage(),
    getCurrentImage(),
  ];

  const colorMap: Record<string, string> = {
    Navy: "#1e3a8a",
    Indigo: "#3730a3",
    Emerald: "#00ADB5",
    Blush: "#f3e8ff",
    White: "#ffffff",
    Black: "#222831",
    Stone: "#a8a29e",
    Tan: "#d2b48c",
    Sage: "#9ca3af",
    Sand: "#f5f5dc",
    Grey: "#6b7280",
    "Light Blue": "#3b82f6",
    Pink: "#ec4899",
    "Light Wash": "#93c5fd",
    Charcoal: "#374151",
    Camel: "#92400e",
    Cream: "#fef3c7",
    Ivory: "#fffbeb",
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    // Reset image index when color changes to show the new color's main image
    setSelectedImageIndex(0);
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    try {
      addToCart(product, selectedColor, selectedSize, quantity);

      // Show success toast with navigation option
      toast.success("Added to cart!", {
        description: `${product.name} (${selectedColor}, ${selectedSize}) × ${quantity}`,
        duration: 4000,
        action: onNavigateToCart
          ? {
              label: "View Cart",
              onClick: () => {
                onNavigateToCart();
              },
            }
          : undefined,
      });

      // Brief delay for visual feedback
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      toast.error("Failed to add to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 text-[#222831] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 p-2 rounded-full"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative group">
              <ImageWithFallback
                src={images[selectedImageIndex]}
                alt={`${product.name} in ${selectedColor}`}
                className="w-full h-[600px] object-cover rounded-3xl modern-shadow-lg"
              />

              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.isOnSale && (
                  <Badge className="bg-[#00ADB5] text-white px-4 py-2 rounded-full font-medium">
                    Sale
                  </Badge>
                )}
              </div>

              {/* Wishlist Button */}
              {/*<Button
                variant="ghost"
                className="absolute top-6 right-6 bg-white/90 hover:bg-white text-[#393E46] hover:text-[#00ADB5] rounded-full w-12 h-12 p-0 modern-shadow opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <Heart className="h-5 w-5" />
              </Button>*/}
            </div>

            {/* Thumbnail Images */}
            {/*<div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative rounded-2xl overflow-hidden modern-shadow transition-all duration-200 ${
                    selectedImageIndex === index ? "ring-2 ring-[#00ADB5]" : ""
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} view ${
                      index + 1
                    } in ${selectedColor}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>*/}
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center text-[#00ADB5]">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm text-[#222831] ml-1 font-medium">
                    {product.rating}
                  </span>
                </div>
                <span className="text-sm text-[#393E46]">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              <h1 className="text-4xl font-serif font-bold text-[#222831]">
                {product.name}
              </h1>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-[#222831]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-[#393E46] line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-lg text-[#393E46] leading-relaxed">
                {product.description ||
                  "Experience premium quality and timeless style with this carefully crafted piece. Made from the finest materials and designed for both comfort and elegance."}
              </p>
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[#222831]">
                Color: {selectedColor}
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`w-10 h-10 rounded-full border-2 modern-shadow transition-all duration-200 relative ${
                      selectedColor === color
                        ? "border-[#00ADB5] ring-2 ring-[#00ADB5]/20"
                        : "border-[#393E46]/20"
                    }`}
                    style={{ backgroundColor: colorMap[color] || "#393E46" }}
                  >
                    {selectedColor === color && (
                      <Check className="h-4 w-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[#222831]">
                Size: {selectedSize}
              </h3>
              <div className="flex gap-3">
                {(product.sizes || ["XS", "S", "M", "L", "XL"]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full border-2 font-medium transition-all duration-200 ${
                      selectedSize === size
                        ? "border-[#00ADB5] bg-[#00ADB5] text-white"
                        : "border-[#393E46]/20 text-[#222831] hover:border-[#00ADB5]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-[#222831]">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-[#393E46]/20 rounded-full">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-[#393E46] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 rounded-full"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 font-medium text-[#222831]">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-[#393E46] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 rounded-full"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex-1 bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white py-4 rounded-full font-medium modern-shadow-md cyan-glow transition-all duration-300 disabled:opacity-70"
                >
                  {isAddingToCart ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart - ${(product.price * quantity).toFixed(2)}
                    </>
                  )}
                </Button>
                {/*<Button
                  variant="outline"
                  className="border-2 border-[#393E46] text-[#222831] hover:bg-[#393E46] hover:text-white py-4 px-6 rounded-full font-medium"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Save
                </Button>*/}
              </div>

              {/* Quick Cart Navigation */}
              {onNavigateToCart && (
                <div className="text-center">
                  <Button
                    variant="ghost"
                    onClick={onNavigateToCart}
                    className="text-[#00ADB5] hover:text-[#00ADB5]/80 hover:bg-[#00ADB5]/10 flex items-center gap-2"
                  >
                    View Cart
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Features */}
            <Card className="border-[#393E46]/20 rounded-2xl modern-shadow">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center space-y-2">
                    <Truck className="h-6 w-6 text-[#00ADB5] mx-auto" />
                    <p className="text-sm font-medium text-[#222831]">
                      Free Shipping
                    </p>
                    <p className="text-xs text-[#393E46]">On orders over $50</p>
                  </div>
                  <div className="text-center space-y-2">
                    <RotateCcw className="h-6 w-6 text-[#00ADB5] mx-auto" />
                    <p className="text-sm font-medium text-[#222831]">
                      Easy Returns
                    </p>
                    <p className="text-xs text-[#393E46]">30-day policy</p>
                  </div>
                  <div className="text-center space-y-2">
                    <Shield className="h-6 w-6 text-[#00ADB5] mx-auto" />
                    <p className="text-sm font-medium text-[#222831]">Secure</p>
                    <p className="text-xs text-[#393E46]">SSL encrypted</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <div className="space-y-6">
              <Separator className="border-[#393E46]/20" />

              <div className="space-y-4">
                <h3 className="font-semibold text-[#222831]">
                  Product Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-[#222831]">
                      Material:
                    </span>
                    <span className="text-[#393E46] ml-2">
                      {product.materials?.join(", ") || "Premium Cotton Blend"}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-[#222831]">Care:</span>
                    <span className="text-[#393E46] ml-2">
                      Machine Wash Cold
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-[#222831]">Origin:</span>
                    <span className="text-[#393E46] ml-2">
                      Made in Portugal
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-[#222831]">Fit:</span>
                    <span className="text-[#393E46] ml-2">True to Size</span>
                  </div>
                </div>

                {product.features && (
                  <div className="mt-4">
                    <span className="font-medium text-[#222831] block mb-2">
                      Features:
                    </span>
                    <ul className="text-[#393E46] text-sm space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-[#00ADB5] rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
