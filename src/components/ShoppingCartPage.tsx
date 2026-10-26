import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { ChevronLeft, Plus, Minus, Trash2, ShoppingBag, Tag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "./CartContext";

interface ShoppingCartPageProps {
  onBack: () => void;
  onCheckout: () => void;
}

export function ShoppingCartPage({ onBack, onCheckout }: ShoppingCartPageProps) {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    promoCode,
    applyPromoCode,
    removePromoCode,
    getOrderSummary,
  } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);

  const { subtotal, discount, shipping, tax, total } = getOrderSummary();

  const handleApplyPromo = () => {
    if (applyPromoCode(promoInput)) {
      setPromoError(null);
      setPromoInput("");
    } else {
      setPromoError("Invalid promo code");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-8 text-[#222831] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 p-2 rounded-full"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Continue Shopping
          </Button>

          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="mb-8">
              <div className="mx-auto w-24 h-24 bg-[#393E46]/10 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="h-12 w-12 text-[#393E46]" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-[#222831] mb-4">Your cart is empty</h2>
              <p className="text-lg text-[#393E46] mb-8">Discover our amazing products and start shopping!</p>
              <Button 
                onClick={onBack}
                className="bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white px-8 py-3 rounded-full font-medium modern-shadow-md cyan-glow"
              >
                Start Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-[#222831] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 p-2 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#222831]">Shopping Cart</h1>
            <p className="text-[#393E46]">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl"
                      />
                      {item.isOnSale && (
                        <Badge className="absolute -top-2 -right-2 bg-[#00ADB5] text-white px-2 py-1 rounded-full text-xs">
                          Sale
                        </Badge>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-[#222831] mb-1">{item.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-[#393E46]">
                            <span>Color: {item.selectedColor}</span>
                            <span>Size: {item.selectedSize}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          data-testid="cart-item-remove"
                          onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                          className="text-[#393E46] hover:text-red-500 hover:bg-red-50 p-1 rounded-full"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-[#393E46]/20 rounded-full">
                          <Button
                            variant="ghost"
                            size="sm"
                            data-testid="cart-qty-decrease"
                            onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                            className="text-[#393E46] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 rounded-full"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span data-testid="cart-item-qty" className="px-3 py-1 font-medium text-[#222831]">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            data-testid="cart-qty-increase"
                            onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                            className="text-[#393E46] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 rounded-full"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="font-bold text-[#222831]">${(item.price * item.quantity).toFixed(2)}</div>
                          {item.originalPrice && (
                            <div className="text-sm text-[#393E46] line-through">
                              ${(item.originalPrice * item.quantity).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white sticky top-8">
              <CardContent className="p-6 space-y-6">
                <h3 className="text-xl font-serif font-bold text-[#222831]">Order Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#393E46]">Subtotal</span>
                    <span data-testid="cart-subtotal" className="font-medium text-[#222831]">${subtotal.toFixed(2)}</span>
                  </div>

                  {/* Promo Code */}
                  {promoCode ? (
                    <div className="flex items-center justify-between bg-[#00ADB5]/10 p-3 rounded-xl">
                      <span className="flex items-center gap-2 text-sm text-[#00ADB5] font-medium">
                        <Tag className="h-4 w-4" />
                        {promoCode} applied — 10% off
                      </span>
                      <button
                        onClick={removePromoCode}
                        className="text-xs text-[#393E46] underline hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Promo code"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          className="rounded-full border-[#393E46]/20"
                        />
                        <Button
                          variant="outline"
                          onClick={handleApplyPromo}
                          className="rounded-full border-[#00ADB5] text-[#00ADB5] hover:bg-[#00ADB5]/10"
                        >
                          Apply
                        </Button>
                      </div>
                      {promoError && (
                        <p className="mt-2 text-xs text-red-300">{promoError}</p>
                      )}
                    </div>
                  )}

                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[#393E46]">Discount ({promoCode})</span>
                      <span data-testid="cart-discount" className="font-medium text-[#00ADB5]">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-[#393E46]">Shipping</span>
                    <span className={`font-medium ${shipping === 0 ? 'text-[#00ADB5]' : 'text-[#222831]'}`}>
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  {shipping === 0 && subtotal > 50 && (
                    <div className="bg-[#00ADB5]/10 p-3 rounded-xl">
                      <p className="text-sm text-[#00ADB5] font-medium">🎉 You qualified for free shipping!</p>
                    </div>
                  )}
                  
                  {shipping > 0 && (
                    <div className="bg-[#393E46]/10 p-3 rounded-xl">
                      <p className="text-sm text-[#393E46]">
                        Add ${(50 - subtotal).toFixed(2)} more for free shipping
                      </p>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-[#393E46]">Tax</span>
                    <span data-testid="cart-tax" className="font-medium text-[#222831]">${tax.toFixed(2)}</span>
                  </div>
                  
                  <Separator className="border-[#393E46]/20" />
                  
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#222831]">Total</span>
                    <span data-testid="cart-total" className="font-bold text-xl text-[#222831]">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  onClick={onCheckout}
                  className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white py-4 rounded-full font-medium modern-shadow-md cyan-glow transition-all duration-300"
                >
                  Secure Checkout
                </Button>

                <div className="text-center">
                  <Button 
                    variant="ghost" 
                    onClick={onBack}
                    className="text-[#393E46] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10"
                  >
                    Continue Shopping
                  </Button>
                </div>

                {/* Security Features */}
                <div className="pt-4 border-t border-[#393E46]/20">
                  <div className="flex items-center justify-center gap-6 text-sm text-[#393E46]">
                    <div className="flex items-center gap-1">
                      <span>🔒</span>
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>📱</span>
                      <span>Easy</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🚚</span>
                      <span>Fast</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}