import { useState, useMemo } from "react";
import { Header } from "./components/Header";
import { PromoSlider } from "./components/PromoSlider";
import { ProductGrid } from "./components/ProductGrid";
import { Footer } from "./components/Footer";
import { ProductDetailsPage } from "./components/ProductDetailsPage";
import { ShoppingCartPage } from "./components/ShoppingCartPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { OrderConfirmationPage } from "./components/OrderConfirmationPage";
import { LoginPage } from "./components/LoginPage";
import { RegistrationPage } from "./components/RegistrationPage";
import { ForgotPasswordPage } from "./components/ForgotPasswordPage";
import { SearchResultsPage } from "./components/SearchResultsPage";
import { CategoryListingPage } from "./components/CategoryListingPage";
import { ContactUsPage } from "./components/ContactUsPage";
import { AboutUsPage } from "./components/AboutUsPage";
import { FAQPage } from "./components/FAQPage";
import { TermsOfServicePage } from "./components/TermsOfServicePage";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";
import { ProfilePage } from "./components/ProfilePage";
import { CartProvider, type Product } from "./components/CartContext";
import { type BreadcrumbItem } from "./components/Breadcrumb";

type Page =
  | "home"
  | "product-details"
  | "cart"
  | "checkout"
  | "order-confirmation"
  | "login"
  | "register"
  | "forgot-password"
  | "search-results"
  | "category-listing"
  | "contact"
  | "about"
  | "faq"
  | "terms"
  | "privacy"
  | "profile";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderData, setOrderData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [user, setUser] = useState<any>(null);

  // Helper function to get category display name
  const getCategoryDisplayName = (categoryKey: string) => {
    const categoryMap: { [key: string]: string } = {
      "new-arrivals": "New",
      men: "Men",
      women: "Women",
      sale: "Sale",
      offers: "offers",
    };
    return categoryMap[categoryKey] || categoryKey;
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage("product-details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage("search-results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage("category-listing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToCart = () => {
    setCurrentPage("cart");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToCheckout = () => {
    setCurrentPage("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOrderComplete = (data: any) => {
    setOrderData(data);
    setCurrentPage("order-confirmation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
    setSelectedProduct(null);
    setOrderData(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    setCurrentPage("profile");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("login");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProfileClick = () => {
    setCurrentPage("profile");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate breadcrumbs based on current page
  const breadcrumbs = useMemo((): BreadcrumbItem[] => {
    switch (currentPage) {
      case "home":
        return [];

      case "product-details":
        if (selectedProduct) {
          const categoryName = getCategoryDisplayName(selectedCategory);
          return [
            { label: "Home", onClick: handleBackToHome },
            {
              label: categoryName,
              onClick: () => handleCategoryClick(selectedCategory),
            },
            { label: selectedProduct.name },
          ];
        }
        return [{ label: "Home", onClick: handleBackToHome }];

      case "category-listing":
        if (selectedCategory) {
          const categoryName = getCategoryDisplayName(selectedCategory);
          return [
            { label: "Home", onClick: handleBackToHome },
            { label: categoryName },
          ];
        }
        return [{ label: "Home", onClick: handleBackToHome }];

      case "search-results":
        return [
          { label: "Home", onClick: handleBackToHome },
          { label: `Search: "${searchQuery}"` },
        ];

      case "contact":
        return [
          { label: "Home", onClick: handleBackToHome },
          { label: "Contact Us" },
        ];

      case "about":
        return [
          { label: "Home", onClick: handleBackToHome },
          { label: "About Us" },
        ];

      case "faq":
        return [{ label: "Home", onClick: handleBackToHome }, { label: "FAQ" }];

      case "terms":
        return [
          { label: "Home", onClick: handleBackToHome },
          { label: "Terms of Service" },
        ];

      case "privacy":
        return [
          { label: "Home", onClick: handleBackToHome },
          { label: "Privacy Policy" },
        ];

      default:
        return [];
    }
  }, [currentPage, selectedProduct, selectedCategory, searchQuery]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "product-details":
        return selectedProduct ? (
          <ProductDetailsPage
            product={selectedProduct}
            onBack={handleBackToHome}
            onNavigateToCart={handleNavigateToCart}
          />
        ) : null;

      case "cart":
        return (
          <ShoppingCartPage
            onBack={handleBackToHome}
            onCheckout={handleNavigateToCheckout}
          />
        );

      case "checkout":
        return (
          <CheckoutPage
            onBack={() => setCurrentPage("cart")}
            onComplete={handleOrderComplete}
          />
        );

      case "order-confirmation":
        return orderData ? (
          <OrderConfirmationPage
            orderData={orderData}
            onContinueShopping={handleBackToHome}
          />
        ) : null;

      case "login":
        return (
          <LoginPage
            onLogin={handleLogin}
            onNavigateToRegister={() => setCurrentPage("register")}
            onNavigateToForgotPassword={() => setCurrentPage("forgot-password")}
            onBack={handleBackToHome}
          />
        );

      case "register":
        return (
          <RegistrationPage
            onRegister={handleLogin}
            onNavigateToLogin={() => setCurrentPage("login")}
            onBack={handleBackToHome}
          />
        );

      case "forgot-password":
        return <ForgotPasswordPage onBack={() => setCurrentPage("login")} />;

      case "profile":
        return user ? (
          <ProfilePage
            user={user}
            onBack={handleBackToHome}
            onLogout={handleLogout}
          />
        ) : null;

      case "search-results":
        return (
          <SearchResultsPage
            searchQuery={searchQuery}
            onProductClick={handleProductClick}
            onBack={handleBackToHome}
          />
        );

      case "category-listing":
        return (
          <CategoryListingPage
            category={selectedCategory}
            onProductClick={handleProductClick}
            onBack={handleBackToHome}
          />
        );

      case "contact":
        return <ContactUsPage onBack={handleBackToHome} />;

      case "about":
        return <AboutUsPage onBack={handleBackToHome} />;

      case "faq":
        return <FAQPage onBack={handleBackToHome} />;

      case "terms":
        return <TermsOfServicePage onBack={handleBackToHome} />;

      case "privacy":
        return <PrivacyPolicyPage onBack={handleBackToHome} />;

      default:
        return (
          <>
            <PromoSlider />
            <ProductGrid onProductClick={handleProductClick} />
          </>
        );
    }
  };

  const showHeaderAndFooter = [
    "home",
    "search-results",
    "category-listing",
    "product-details",
    "contact",
    "about",
    "faq",
    "terms",
    "privacy",
    "order-confirmation",
  ].includes(currentPage);

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        {showHeaderAndFooter && (
          <Header
            onCartClick={handleNavigateToCart}
            onSearch={handleSearch}
            onCategoryClick={handleCategoryClick}
            onLoginClick={() => setCurrentPage("login")}
            onProfileClick={handleProfileClick}
            onHomeClick={handleBackToHome}
            user={user}
            onLogout={handleLogout}
            breadcrumbs={breadcrumbs}
            onScan={handleSearch} // <-- required prop
          />
        )}

        <main>{renderCurrentPage()}</main>

        {showHeaderAndFooter && <Footer onNavigate={handleNavigate} />}
      </div>
    </CartProvider>
  );
}
