import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Heart, ShoppingCart, Star, Eye, Plus } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { type Product } from "./CartContext";

const products = [
  {
    id: 1,
    name: "Silk Wrap Dress",
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviewCount: 124,
    image:
      "https://images.unsplash.com/photo-1645654731316-a350fdcf3bae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwd3JhcCUyMGRyZXNzJTIwZWxlZ2FudHxlbnwxfHx8fDE3NTU1MzE1MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isOnSale: true,
    colors: ["Navy", "Emerald", "Blush"],
    category: "Dresses",
    featured: true,
    description:
      "Elegant silk wrap dress perfect for any occasion. Features a flattering silhouette with adjustable tie waist and flowing fabric that drapes beautifully.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Heritage Denim Jacket",
    price: 159.99,
    rating: 4.6,
    reviewCount: 89,
    image:
      "https://images.unsplash.com/photo-1724856604247-0de2c43b6491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5pbSUyMGphY2tldCUyMGhlcml0YWdlJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTU1MzE1MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isOnSale: false,
    colors: ["Indigo", "Black"],
    category: "Outerwear",
    featured: true,
    description:
      "Classic denim jacket crafted from premium heritage denim. Features traditional styling with modern fit and sustainable production methods.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 3,
    name: "Essential Cotton Tee",
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.9,
    reviewCount: 256,
    image:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3R0b24lMjB0LXNoaXJ0JTIwZXNzZW50aWFsJTIwYmFzaWNzfGVufDF8fHx8MTc1NTUzMTUxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isOnSale: true,
    colors: ["White", "Stone", "Black"],
    category: "Basics",
    featured: false,
    description:
      "Essential cotton t-shirt made from premium organic cotton. Soft, comfortable, and perfect for layering or wearing alone.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: 4,
    name: "Leather Crossbody Bag",
    price: 149.99,
    rating: 4.7,
    reviewCount: 67,
    image:
      "https://images.unsplash.com/photo-1749842622314-75a5c344ceab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwY3Jvc3Nib2R5JTIwYmFnJTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzU1NTMxNTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isOnSale: false,
    colors: ["Tan", "Black"],
    category: "Accessories",
    featured: false,
    description:
      "Handcrafted leather crossbody bag with premium hardware. Features adjustable strap and multiple compartments for organization.",
    sizes: ["One Size"],
  },
  {
    id: 5,
    name: "Straight Leg Jeans",
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.5,
    reviewCount: 178,
    image:
      "https://images.unsplash.com/photo-1579041925212-0475426bea28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhaWdodCUyMGxlZyUyMGplYW5zJTIwZGVuaW18ZW58MXx8fHwxNzU1NTMxNTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isOnSale: true,
    colors: ["Indigo", "Black", "Stone"],
    category: "Denim",
    featured: false,
    description:
      "Classic straight leg jeans in premium denim. Features a timeless fit that works for any occasion, from casual to smart-casual.",
    sizes: ["26", "28", "30", "32", "34", "36"],
  },
  {
    id: 6,
    name: "Linen Button Shirt",
    price: 89.99,
    rating: 4.4,
    reviewCount: 92,
    image:
      "https://images.unsplash.com/photo-1744208525808-66c60e0ea68c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaW5lbiUyMGJ1dHRvbiUyMHNoaXJ0JTIwY2FzdWFsfGVufDF8fHx8MTc1NTUzMTUyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isOnSale: false,
    colors: ["White", "Sage", "Sand"],
    category: "Shirts",
    featured: false,
    description:
      "Relaxed linen button shirt perfect for warm weather. Made from 100% European linen with a comfortable, breathable fit.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
];

interface ProductGridProps {
  onProductClick?: (product: Product) => void;
}

export function ProductGrid({ onProductClick }: ProductGridProps) {
  const featuredProducts = products.filter((product) => product.featured);
  const regularProducts = products.filter((product) => !product.featured);

  const handleProductClick = (product: any) => {
    if (onProductClick) {
      onProductClick(product as Product);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <p className="text-[#00ADB5] font-medium tracking-wide uppercase text-sm mb-4">
            Curated Selection
          </p>
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#222831] mb-6 text-balance">
            Featured Products
          </h2>
          <p className="text-xl text-[#393E46] leading-relaxed">
            Discover our handpicked selection of premium clothing and
            accessories, crafted with attention to detail and timeless style.
          </p>
        </div>

        {/* Featured Products - New Hero Layout */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`group relative overflow-hidden rounded-3xl cursor-pointer ${
                  index === 0 ? "lg:row-span-2" : ""
                }`}
                onClick={() => handleProductClick(product)}
              >
                <div className="relative h-full">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    {product.isOnSale && (
                      <Badge className="bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white px-4 py-2 rounded-full font-medium text-sm">
                        Sale
                      </Badge>
                    )}
                    <Badge
                      variant="secondary"
                      className="bg-white/95 text-[#393E46] px-4 py-2 rounded-full font-medium text-sm"
                    >
                      {product.category}
                    </Badge>
                  </div>

                  {/* Action buttons */}
                  <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {/*<Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle wishlist
                      }}
                      className="bg-white/90 hover:bg-white text-[#393E46] hover:text-[#00ADB5] rounded-full w-12 h-12 p-0 modern-shadow"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>*/}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e: { stopPropagation: () => void }) => {
                        e.stopPropagation();
                        handleProductClick(product);
                      }}
                      className="bg-white/90 hover:bg-white text-[#393E46] hover:text-[#00ADB5] rounded-full w-12 h-12 p-0 modern-shadow"
                    >
                      <Eye className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center text-[#00ADB5]">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm text-white ml-1 font-medium">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-sm text-white/80">
                          ({product.reviewCount} reviews)
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-2xl leading-tight">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-bold text-white text-xl">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-white/60 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>

                      <Button
                        onClick={(e: { stopPropagation: () => void }) => {
                          e.stopPropagation();
                          handleProductClick(product);
                        }}
                        className="bg-white text-[#222831] hover:bg-[#00ADB5] hover:text-white py-3 px-6 rounded-full font-medium transition-all duration-300 modern-shadow-md"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regular Products Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-serif font-bold text-[#222831] mb-8 text-center">
            More Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {regularProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:modern-shadow-xl transition-all duration-500 border-0 bg-white rounded-2xl overflow-hidden modern-shadow cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {product.isOnSale && (
                        <Badge className="bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white px-2 py-1 rounded-full font-medium text-xs">
                          Sale
                        </Badge>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {/*<Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle wishlist
                        }}
                        className="bg-white/95 hover:bg-white text-[#393E46] hover:text-[#00ADB5] rounded-full w-8 h-8 p-0 modern-shadow text-xs"
                      >
                        <Heart className="h-3 w-3" />
                      </Button>*/}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e: { stopPropagation: () => void }) => {
                          e.stopPropagation();
                          handleProductClick(product);
                        }}
                        className="bg-white/95 hover:bg-white text-[#393E46] hover:text-[#00ADB5] rounded-full w-8 h-8 p-0 modern-shadow text-xs"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-[#222831] text-sm leading-tight line-clamp-2">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center text-[#00ADB5]">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-xs text-[#222831] ml-1 font-medium">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-xs text-[#393E46]">
                          ({product.reviewCount})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#222831] text-sm">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#393E46] line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    <Button
                      onClick={(e: { stopPropagation: () => void }) => {
                        e.stopPropagation();
                        handleProductClick(product);
                      }}
                      className="w-full bg-[#222831] hover:bg-[#393E46] text-white py-2 rounded-full font-medium transition-all duration-300 modern-shadow text-sm"
                    >
                      <Eye className="h-3 w-3 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* View All Button */}
        {/*<div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-[#393E46] text-[#222831] hover:bg-[#00ADB5] hover:border-[#00ADB5] hover:text-white bg-transparent px-12 py-4 rounded-full font-medium modern-shadow transition-all duration-300"
          >
            View All Products
          </Button>
        </div>*/}
      </div>
    </section>
  );
}
