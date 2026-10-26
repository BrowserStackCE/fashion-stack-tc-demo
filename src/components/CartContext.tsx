import { createContext, useContext, useState, ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  isOnSale: boolean;
  image: string;
  categoryId: number;
  features?: string[];
  materials?: string[];
  sizes?: string[];
  colors: string[];
  colorImages?: Record<string, string>;
}

// Promo codes and the fraction of the subtotal they take off
export const PROMO_CODES: Record<string, number> = {
  SAVE10: 0.1,
};

export interface OrderSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    product: Product,
    color: string,
    size: string,
    quantity?: number
  ) => void;
  removeFromCart: (productId: number, color: string, size: string) => void;
  updateQuantity: (
    productId: number,
    color: string,
    size: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  promoCode: string | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  getOrderSummary: () => OrderSummary;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);

  const addToCart = (
    product: Product,
    color: string,
    size: string,
    quantity = 1
  ) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        { ...product, quantity, selectedColor: color, selectedSize: size },
      ];
    });
  };

  const removeFromCart = (productId: number, color: string, size: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
          )
      )
    );
  };

  const updateQuantity = (
    productId: number,
    color: string,
    size: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId &&
        item.selectedColor === color &&
        item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode(null);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const applyPromoCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (!(normalized in PROMO_CODES)) return false;
    setPromoCode(normalized);
    return true;
  };

  const removePromoCode = () => {
    setPromoCode(null);
  };

  const getOrderSummary = (): OrderSummary => {
    const subtotal = getTotalPrice();
    const discount = promoCode ? subtotal * PROMO_CODES[promoCode] : 0;
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = (subtotal - discount) * 0.08;
    const total = subtotal - discount + shipping + tax;
    return { subtotal, discount, shipping, tax, total };
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        promoCode,
        applyPromoCode,
        removePromoCode,
        getOrderSummary,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
