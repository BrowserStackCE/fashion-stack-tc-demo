import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
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
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  Heart,
  Eye,
  Star,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { type Product } from "./CartContext";
import { getProducts } from "../api/products";

// Mock products for search results
const response = await getProducts();

const mockProducts: Product[] = response.products;

interface SearchResultsPageProps {
  searchQuery: string;
  onProductClick: (product: Product) => void;
  onBack: () => void;
}

export function SearchResultsPage({
  searchQuery,
  onProductClick,
  onBack,
}: SearchResultsPageProps) {
  const [currentSearchQuery, setCurrentSearchQuery] = useState(searchQuery);
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter and sort products based on search query
  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
      product.colors.some(
        (color) => color.toLowerCase() === currentSearchQuery.toLowerCase()
      )
  );

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update search results
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#393E46]/20 bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-[#222831] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 p-2 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-serif font-bold text-[#222831]">
              Search Results
            </h1>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#393E46] h-4 w-4" />
            <Input
              placeholder="Search for products..."
              value={currentSearchQuery}
              onChange={(e) => setCurrentSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 bg-white border border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-2 focus:ring-[#00ADB5]/20 text-[#222831] placeholder:text-[#393E46] rounded-full"
            />
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div className="space-y-2">
            <p className="text-[#393E46]">
              {sortedProducts.length} results for "{searchQuery}"
            </p>
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <Badge
                  variant="secondary"
                  className="bg-[#00ADB5]/10 text-[#00ADB5] px-3 py-1 rounded-full"
                >
                  {searchQuery}
                </Badge>
              )}
            </div>
          </div>

          {/* Filters and Sorting */}
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
                <SelectItem value="relevance">Most Relevant</SelectItem>
                <SelectItem value="price-low-high">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high-low">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
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

        {/* Results */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-[#393E46]/10 rounded-full flex items-center justify-center mb-6">
              <Search className="h-12 w-12 text-[#393E46]" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#222831] mb-4">
              No results found
            </h3>
            <p className="text-[#393E46] mb-8">
              Sorry, we couldn't find any products matching "{searchQuery}". Try
              searching with different keywords.
            </p>
            <Button
              onClick={onBack}
              className="bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white px-8 py-3 rounded-full font-medium modern-shadow-md cyan-glow"
            >
              Browse All Products
            </Button>
          </div>
        ) : (
          <>
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
                      <div className="flex gap-4 p-4">
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

                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="font-semibold text-[#222831] text-lg mb-1">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-3 mb-2">
                              <div className="flex items-center text-[#00ADB5]">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="text-sm text-[#222831] ml-1 font-medium">
                                  {product.rating}
                                </span>
                              </div>
                              <span className="text-sm text-[#393E46]">
                                ({product.reviewCount} reviews)
                              </span>
                              {/*<Badge
                                variant="secondary"
                                className="bg-[#393E46]/10 text-[#393E46]"
                              >
                                {product.category}
                              </Badge>*/}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-[#222831] text-lg">
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
                                onClick={(e: {
                                  stopPropagation: () => void;
                                }) => {
                                  e.stopPropagation();
                                }}
                                className="text-[#393E46] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 p-2 rounded-full"
                              >
                                <Heart className="h-4 w-4" />
                              </Button>*/}
                              <Button
                                size="sm"
                                onClick={(e: {
                                  stopPropagation: () => void;
                                }) => {
                                  e.stopPropagation();
                                  onProductClick(product);
                                }}
                                className="bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white px-4 py-2 rounded-full font-medium"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
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
          </>
        )}
      </div>
    </div>
  );
}
