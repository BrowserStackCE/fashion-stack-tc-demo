import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { ChevronLeft, CreditCard, Lock, Truck } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "./CartContext";
import { PageHeader } from "./PageHeader";

interface CheckoutPageProps {
  onBack: () => void;
  onComplete: (orderData: any) => void;
}

export function CheckoutPage({ onBack, onComplete }: CheckoutPageProps) {
  const { cartItems, promoCode, getOrderSummary, clearCart } = useCart();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    billingAddress: "same",
    saveInfo: false,
    newsletter: false,
  });

  const { subtotal, discount, shipping, tax, total } = getOrderSummary();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      orderNumber: `FS${Date.now()}`,
      customerInfo: formData,
      items: cartItems,
      pricing: { subtotal, discount, promoCode, shipping, tax, total },
      orderDate: new Date().toISOString(),
    };
    clearCart();
    onComplete(orderData);
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="Checkout" onBack={onBack} />

      <div className="bg-[#EEEEEE] py-8">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact Information */}
                <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#222831]">
                      <span className="bg-[#00ADB5] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                        1
                      </span>
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-[#222831]">
                        Email address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl"
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked: any) =>
                          handleInputChange("newsletter", !!checked)
                        }
                      />
                      <Label
                        htmlFor="newsletter"
                        className="text-sm text-[#393E46]"
                      >
                        Email me with news and offers
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#222831]">
                      <span className="bg-[#00ADB5] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                        2
                      </span>
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-[#222831]">
                          First name
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className="bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-[#222831]">
                          Last name
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className="bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address" className="text-[#222831]">
                        Address
                      </Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        className="bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="apartment" className="text-[#222831]">
                        Apartment, suite, etc. (optional)
                      </Label>
                      <Input
                        id="apartment"
                        value={formData.apartment}
                        onChange={(e) =>
                          handleInputChange("apartment", e.target.value)
                        }
                        className="bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-[#222831]">
                          City
                        </Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          className="bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-[#222831]">
                          State
                        </Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value: string | boolean) =>
                            handleInputChange("state", value)
                          }
                        >
                          <SelectTrigger className="bg-white border-[#393E46]/20 focus:border-[#00ADB5] text-[#222831] rounded-xl">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="NY">New York</SelectItem>
                            <SelectItem value="TX">Texas</SelectItem>
                            <SelectItem value="FL">Florida</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="zipCode" className="text-[#222831]">
                          ZIP code
                        </Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) =>
                            handleInputChange("zipCode", e.target.value)
                          }
                          className="bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-[#222831]">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Information */}
                <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#222831]">
                      <span className="bg-[#00ADB5] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                        3
                      </span>
                      Payment Information
                      <Lock className="h-4 w-4 text-[#00ADB5] ml-auto" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber" className="text-[#222831]">
                        Card number
                      </Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) =>
                            handleInputChange("cardNumber", e.target.value)
                          }
                          placeholder="1234 1234 1234 1234"
                          className="bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl pl-10"
                          required
                        />
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#393E46]" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="nameOnCard" className="text-[#222831]">
                        Name on card
                      </Label>
                      <Input
                        id="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={(e) =>
                          handleInputChange("nameOnCard", e.target.value)
                        }
                        className="bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate" className="text-[#222831]">
                          Expiry date
                        </Label>
                        <Input
                          id="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) =>
                            handleInputChange("expiryDate", e.target.value)
                          }
                          placeholder="MM/YY"
                          className="bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-[#222831]">
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          value={formData.cvv}
                          onChange={(e) =>
                            handleInputChange("cvv", e.target.value)
                          }
                          placeholder="123"
                          className="bg-white border-[#393E46]/20 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20 text-[#222831] rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="saveInfo"
                        checked={formData.saveInfo}
                        onCheckedChange={(checked: any) =>
                          handleInputChange("saveInfo", !!checked)
                        }
                      />
                      <Label
                        htmlFor="saveInfo"
                        className="text-sm text-[#393E46]"
                      >
                        Save this information for next time
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white sticky top-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#222831]">
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Items */}
                    <div className="space-y-4 max-h-60 overflow-y-auto">
                      {cartItems.map((item) => (
                        <div
                          key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                          className="flex gap-3"
                        >
                          <div className="relative">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-xl"
                            />
                            <span className="absolute -top-2 -right-2 bg-[#393E46] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-[#222831] text-sm truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-[#393E46]">
                              {item.selectedColor} • {item.selectedSize}
                            </p>
                            <p className="font-medium text-[#222831] text-sm">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator className="border-[#393E46]/20" />

                    {/* Pricing */}
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-[#393E46]">Subtotal</span>
                        <span className="font-medium text-[#222831]">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between">
                          <span className="text-[#393E46]">
                            Discount ({promoCode})
                          </span>
                          <span
                            data-testid="checkout-discount"
                            className="font-medium text-[#00ADB5]"
                          >
                            -${discount.toFixed(2)}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span className="text-[#393E46]">Shipping</span>
                        <span
                          className={`font-medium ${
                            shipping === 0 ? "text-[#00ADB5]" : "text-[#222831]"
                          }`}
                        >
                          {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[#393E46]">Tax</span>
                        <span className="font-medium text-[#222831]">
                          ${tax.toFixed(2)}
                        </span>
                      </div>

                      <Separator className="border-[#393E46]/20" />

                      <div className="flex justify-between">
                        <span className="font-semibold text-[#222831]">
                          Total
                        </span>
                        <span
                          data-testid="checkout-total"
                          className="font-bold text-xl text-[#222831]"
                        >
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white py-4 rounded-full font-medium modern-shadow-md cyan-glow transition-all duration-300"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Complete Order
                    </Button>

                    <div className="text-center">
                      <div className="flex items-center justify-center gap-4 text-xs text-[#393E46]">
                        <div className="flex items-center gap-1">
                          <Lock className="h-3 w-3" />
                          <span>Secure SSL</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Truck className="h-3 w-3" />
                          <span>Fast Delivery</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
