import * as React from "react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, ShoppingBag, User, Heart, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import logoImage from "figma:asset/39e9bc28f4d03024a78e834fbff4e985d3feffd1.png";
import { useCart } from "./CartContext";
import { Breadcrumb, type BreadcrumbItem } from "./Breadcrumb";
import { ScanImageButton } from "./ScanImageButton";
import { Switch } from "./ui/switch";

interface HeaderProps {
  onCartClick?: () => void;
  onSearch?: (query: string) => void;
  onCategoryClick?: (category: string) => void;
  onLoginClick?: () => void;
  onProfileClick?: () => void;
  onHomeClick?: () => void;
  user?: any;
  onLogout?: () => void;
  breadcrumbs?: BreadcrumbItem[];
  isCartPage?: boolean;
  onScan?: (query: string) => void;
}

export function Header({
  onCartClick,
  onSearch,
  onCategoryClick,
  onLoginClick,
  onProfileClick,
  onHomeClick,
  user,
  onLogout,
  breadcrumbs,
  isCartPage,
  onScan,
}: HeaderProps) {
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Switch state
  const [checked, setChecked] = React.useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  const handleProfileClick = () => {
    if (user && onProfileClick) {
      onProfileClick();
    } else if (onLoginClick) {
      onLoginClick();
    }
  };

  const categories = [
    { name: "New", key: "new-arrivals" },
    { name: "Men", key: "men" },
    { name: "Women", key: "women" },
    { name: "Sale", key: "sale" },
    { name: "Offers", key: "offers" },
  ];

  return (
    <header className="w-full bg-white backdrop-blur-md border-b border-[#393E46]/20 sticky top-0 z-50">
      {/* Top announcement bar */}
      <div className="bg-[#00ADB5] text-white py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-medium">
            Free shipping worldwide on orders over $50 • Summer Sale up to 40%
            off
          </p>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={onHomeClick}
            className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity duration-200"
          >
            <img
              src={logoImage}
              alt="FashionStack Logo"
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-xl lg:text-2xl font-serif font-bold text-[#222831] tracking-tight gradient-text">
              FashionStack
            </h1>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant="ghost"
                onClick={() => {
                  setActiveCategory(category.key);
                  onCategoryClick?.(category.key);
                }}
                className={`text-[#222831] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 font-medium transition-all duration-200 px-4 py-2 ${
                  activeCategory === category.key
                    ? "text-[#00ADB5] hover:text-white hover:bg-[#00ADB5]"
                    : ""
                }`}
              >
                {category.name}
              </Button>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            {/* Switch added here */}
            <div className="flex items-center gap-2">
              <Switch
                id="test-mode-switch"
                checked={checked}
                onCheckedChange={setChecked}
              />
            </div>
            <div>
              <ScanImageButton
                className={checked ? "bg-accent text-accent-foreground" : ""}
                onScan={onSearch}
              />
            </div>
            {/* Search bar - desktop */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:block relative"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#393E46] h-4 w-4" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-40 lg:w-48 bg-white border border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-2 focus:ring-[#00ADB5]/20 text-[#222831] placeholder:text-[#393E46] rounded-full transition-all duration-200"
              />
            </form>

            {/* Action buttons */}
            <div className="flex items-center gap-1">
              {/* Profile Icon - same for both logged in and out */}
              <Button
                variant="ghost"
                id={checked ? "Login" : "login"}
                size="sm"
                onClick={handleProfileClick}
                className="text-[#222831] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 p-2 rounded-full transition-all duration-200"
              >
                <User className="h-5 w-5" />{" "}
                <span className="hidden lg:flex">Login</span>
              </Button>

              {/*<Button variant="ghost" size="sm" className="text-[#222831] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 p-2 rounded-full transition-all duration-200">
                <Heart className="h-5 w-5" />
              </Button>*/}

              <Button
                variant="ghost"
                size="sm"
                data-testid="header-cart"
                onClick={onCartClick}
                className="text-[#222831] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 p-2 rounded-full transition-all duration-200 relative"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span data-testid="header-cart-count" className="absolute -top-1 -right-1 bg-[#00ADB5] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartItemCount}
                  </span>
                )}
              </Button>

              {/* Mobile Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden text-[#222831] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 p-2 rounded-full transition-all duration-200"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white border border-[#393E46]/20 rounded-xl modern-shadow-md w-48"
                >
                  {!user && (
                    <>
                      <DropdownMenuItem
                        onClick={onLoginClick}
                        className="text-[#222831] hover:bg-[#00ADB5]/10 cursor-pointer"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Sign In
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="border-[#393E46]/20" />
                    </>
                  )}
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category.key}
                      onClick={() => onCategoryClick?.(category.key)}
                      className={`text-[#222831] hover:bg-[#00ADB5]/10 cursor-pointer ${
                        category.key === "sale" ? "text-[#00ADB5]" : ""
                      }`}
                    >
                      {category.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb navigation */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="border-t border-[#393E46]/20 bg-[#EEEEEE]/30">
          <div className="container mx-auto px-4 py-3">
            <Breadcrumb items={breadcrumbs} />
          </div>
        </div>
      )}

      {/* Mobile search bar */}
      <div className="lg:hidden border-t border-[#393E46]/20 p-4">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#393E46] h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-white border border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-2 focus:ring-[#00ADB5]/20 text-[#222831] placeholder:text-[#393E46] rounded-full"
          />
        </form>
      </div>
    </header>
  );
}
