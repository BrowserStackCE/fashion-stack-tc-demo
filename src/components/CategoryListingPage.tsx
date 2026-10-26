import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  ChevronLeft,
  SlidersHorizontal,
  Grid3X3,
  List,
  Heart,
  Eye,
  Star,
  MapPin,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { type Product } from "./CartContext";
import { getProducts } from "../api/products";

// Mock products for category listing
const response = await getProducts();
const allProducts: Product[] = response.products;

const categoryInfo = {
  women: {
    title: "Women's Fashion",
    description:
      "Discover our curated collection of women's clothing and accessories",
  },
  men: {
    title: "Men's Fashion",
    description: "Explore contemporary styles for the modern gentleman",
  },
  dresses: {
    title: "Dresses",
    description: "Elegant dresses for every occasion",
  },
  outerwear: {
    title: "Outerwear",
    description: "Stylish jackets and coats for all seasons",
  },
  accessories: {
    title: "Accessories",
    description: "Perfect finishing touches for your look",
  },
  sale: {
    title: "Sale Items",
    description: "Premium fashion at incredible prices",
  },
  offers: {
    title: "Special Offers",
    description: "Don't miss out on our exclusive deals and discounts",
  },
};

interface CategoryListingPageProps {
  category: string;
  onProductClick: (product: Product) => void;
  onBack: () => void;
}

export function CategoryListingPage({
  category,
  onProductClick,
  onBack,
}: CategoryListingPageProps) {
  const [sortBy, setSortBy] = useState("featured");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceFilter, setPriceFilter] = useState("all");
  const [country, setCountry] = useState<string | null>(null);

  // ✅ Get user’s country
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        setCountry(data.country_name); // e.g. "IN", "US", etc.
      } catch (error) {
        console.error("Error fetching country:", error);
        setCountry(null);
      }
    };
    fetchCountry();
  }, []);

  const categoryData = categoryInfo[category as keyof typeof categoryInfo] || {
    title: "Products",
    description: "Browse our product collection",
  };

  // Filter products based on category
  const filteredProducts = allProducts.filter((product) => {
    if (category === "sale") return product.isOnSale;
    if (category === "men") return product.categoryId === 2;
    if (category === "women") return product.categoryId === 1;
    if (category === "offers") {
      // Only show sale products for US/IN users
      if (country === "United States" || country === "India")
        return product.isOnSale;
      return false; // no products otherwise
    }
    return true; // return all products for new category
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  //const subcategories = ["all", "casual", "formal", "evening", "party"];

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
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
              {categoryData.title}
            </h1>
            <p className="text-xl text-white/90">{categoryData.description}</p>
            {category === "offers" && (
              <p className="text-xl text-[#00ADB5] mt-4 font-bold">
                {country ? (
                  <>
                    <MapPin className="inline-block" /> {country}
                  </>
                ) : (
                  "Loading country..."
                )}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          {/* Subcategory Filter */}
          {/*<div className="flex flex-wrap gap-2">
            {subcategories.map((subcategory) => (
              <Button
                key={subcategory}
                variant={
                  selectedSubcategory === subcategory ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedSubcategory(subcategory)}
                className={`rounded-full ${
                  selectedSubcategory === subcategory
                    ? "bg-[#00ADB5] text-white hover:bg-[#00ADB5]/90"
                    : "border-[#393E46]/20 text-[#222831] hover:bg-[#393E46]/5"
                }`}
              >
                {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
              </Button>
            ))}
          </div>*/}

          {/* Controls */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="border border-[#393E46]/20 text-[#222831] hover:bg-[#393E46]/5 rounded-full"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 border border-[#393E46]/20 rounded-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low-high">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high-low">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border border-[#393E46]/20 rounded-full p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`rounded-full ${
                  viewMode === "grid"
                    ? "bg-[#00ADB5] text-white"
                    : "text-[#393E46]"
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`rounded-full ${
                  viewMode === "list"
                    ? "bg-[#00ADB5] text-white"
                    : "text-[#393E46]"
                }`}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-[#393E46]">
            Showing {sortedProducts.length} products in {categoryData.title}
            {category === "offers" && ` for ${country}`}
          </p>
        </div>

        {/* Product Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:modern-shadow-xl transition-all duration-500 border-0 bg-white rounded-2xl overflow-hidden modern-shadow cursor-pointer"
                onClick={() => onProductClick(product)}
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
                        <Badge className="bg-[#00ADB5] text-white px-2 py-1 rounded-full font-medium text-xs">
                          Sale
                        </Badge>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {/*<Button
                        size="sm"
                        variant="ghost"
                        onClick={(e: { stopPropagation: () => void }) => {
                          e.stopPropagation();
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
                          onProductClick(product);
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:modern-shadow-lg transition-all duration-300 border-0 bg-white rounded-2xl overflow-hidden modern-shadow cursor-pointer"
                onClick={() => onProductClick(product)}
              >
                <CardContent className="p-0">
                  <div className="flex gap-6 p-6">
                    <div className="relative flex-shrink-0">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-32 h-32 object-cover rounded-xl"
                      />
                      {product.isOnSale && (
                        <Badge className="absolute top-2 left-2 bg-[#00ADB5] text-white px-2 py-1 rounded-full font-medium text-xs">
                          Sale
                        </Badge>
                      )}
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="font-semibold text-[#222831] text-lg mb-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-3 mb-3">
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

                        <div className="flex flex-wrap gap-2 mb-3">
                          {product.colors.slice(0, 3).map((color, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-[#393E46]/10 text-[#393E46] text-xs"
                            >
                              {color}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-[#222831] text-xl">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-[#393E46] line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {/*<Button
                            size="sm"
                            variant="ghost"
                            onClick={(e: { stopPropagation: () => void }) => {
                              e.stopPropagation();
                            }}
                            className="text-[#393E46] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 p-2 rounded-full"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>*/}
                          <Button
                            size="sm"
                            onClick={(e: { stopPropagation: () => void }) => {
                              e.stopPropagation();
                              onProductClick(product);
                            }}
                            className="bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white px-6 py-2 rounded-full font-medium"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More */}
        {/*<div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-[#393E46]/20 text-[#222831] hover:bg-[#393E46]/5 px-8 py-4 rounded-full font-medium"
          >
            Load More Products
          </Button>
        </div>*/}
      </div>
    </div>
  );
}
