import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import {
  CheckCircle,
  Download,
  Mail,
  Truck,
  Package,
  CreditCard,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface OrderConfirmationPageProps {
  orderData: {
    orderNumber: string;
    customerInfo: any;
    items: any[];
    pricing: any;
    orderDate: string;
  };
  onContinueShopping: () => void;
}

export function OrderConfirmationPage({
  orderData,
  onContinueShopping,
}: OrderConfirmationPageProps) {
  const { orderNumber, customerInfo, items, pricing, orderDate } = orderData;
  const formattedDate = new Date(orderDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const estimatedDelivery = new Date(
    Date.now() + 5 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 📝 PDF Generator
  const handleDownloadReceipt = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Order Receipt", 14, 20);

    doc.setFontSize(12);
    doc.text(`Order Number: #${orderNumber}`, 14, 30);
    doc.text(`Order Date: ${formattedDate}`, 14, 38);
    doc.text(`Estimated Delivery: ${estimatedDelivery}`, 14, 46);

    // 🛍 Order Items
    autoTable(doc, {
      startY: 55,
      head: [["Item", "Color", "Size", "Qty", "Price"]],
      body: items.map((item) => [
        item.name,
        item.selectedColor,
        item.selectedSize,
        item.quantity,
        `$${(item.price * item.quantity).toFixed(2)}`,
      ]),
    });

    // 🚚 Shipping Info
    const shippingY = (doc as any).lastAutoTable.finalY + 10;
    doc.text("Shipping Information", 14, shippingY);
    doc.setFontSize(10);
    doc.text(
      `${customerInfo.firstName} ${customerInfo.lastName}
${customerInfo.address}${
        customerInfo.apartment ? `, ${customerInfo.apartment}` : ""
      }
${customerInfo.city}, ${customerInfo.state} ${customerInfo.zipCode}
Phone: ${customerInfo.phone}`,
      14,
      shippingY + 8
    );

    // 💳 Payment Info
    const paymentY = shippingY + 40;
    doc.setFontSize(12);
    doc.text("Payment Information", 14, paymentY);
    doc.setFontSize(10);
    doc.text(
      `Card: ****${customerInfo.cardNumber.slice(-4)}
Charged: $${pricing.total.toFixed(2)}`,
      14,
      paymentY + 8
    );

    // 📊 Order Summary
    const summaryY = paymentY + 30;
    doc.setFontSize(12);
    doc.text("Order Summary", 14, summaryY);

    autoTable(doc, {
      startY: summaryY + 5,
      body: [
        ["Subtotal", `$${pricing.subtotal.toFixed(2)}`],
        [
          "Shipping",
          pricing.shipping === 0 ? "Free" : `$${pricing.shipping.toFixed(2)}`,
        ],
        ["Tax", `$${pricing.tax.toFixed(2)}`],
        ["Total Paid", `$${pricing.total.toFixed(2)}`],
      ],
      theme: "plain",
    });

    // Save the PDF
    doc.save(`Order_${orderNumber}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#EEEEEE] py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-[#222831] mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-[#393E46] mb-2">
            Thank you for your purchase, {customerInfo.firstName}!
          </p>
          <p className="text-[#393E46]">
            Your order{" "}
            <span className="font-medium text-[#222831]">#{orderNumber}</span>{" "}
            has been successfully placed on {formattedDate}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#222831]">
                  <Package className="h-5 w-5 text-[#00ADB5]" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="flex gap-4 p-4 bg-[#EEEEEE]/50 rounded-xl"
                  >
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#222831] mb-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-[#393E46] mb-2">
                        <span>Qty: {item.quantity}</span>
                        <span>Color: {item.selectedColor}</span>
                        <span>Size: {item.selectedSize}</span>
                      </div>
                      <div className="font-bold text-[#222831]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#222831]">
                  <Truck className="h-5 w-5 text-[#00ADB5]" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-[#00ADB5]/10 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="h-4 w-4 text-[#00ADB5]" />
                    <span className="font-medium text-[#222831]">
                      Estimated Delivery
                    </span>
                  </div>
                  <p className="text-[#00ADB5] font-semibold">
                    {estimatedDelivery}
                  </p>
                  <p className="text-sm text-[#393E46]">
                    Standard shipping (5-7 business days)
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-[#222831] mb-2">
                    Shipping Address
                  </h4>
                  <div className="text-[#393E46] space-y-1">
                    <p>
                      {customerInfo.firstName} {customerInfo.lastName}
                    </p>
                    <p>{customerInfo.address}</p>
                    {customerInfo.apartment && <p>{customerInfo.apartment}</p>}
                    <p>
                      {customerInfo.city}, {customerInfo.state}{" "}
                      {customerInfo.zipCode}
                    </p>
                    <p>{customerInfo.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#222831]">
                  <CreditCard className="h-5 w-5 text-[#00ADB5]" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-[#393E46] rounded flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-[#222831]">
                      ****{customerInfo.cardNumber.slice(-4)}
                    </p>
                    <p className="text-sm text-[#393E46]">
                      Charged ${pricing.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
              <CardHeader>
                <CardTitle className="text-[#222831]">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#393E46]">Subtotal</span>
                    <span className="font-medium text-[#222831]">
                      ${pricing.subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#393E46]">Shipping</span>
                    <span
                      className={`font-medium ${
                        pricing.shipping === 0
                          ? "text-[#00ADB5]"
                          : "text-[#222831]"
                      }`}
                    >
                      {pricing.shipping === 0
                        ? "Free"
                        : `$${pricing.shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#393E46]">Tax</span>
                    <span className="font-medium text-[#222831]">
                      ${pricing.tax.toFixed(2)}
                    </span>
                  </div>

                  <Separator className="border-[#393E46]/20" />

                  <div className="flex justify-between">
                    <span className="font-semibold text-[#222831]">
                      Total Paid
                    </span>
                    <span className="font-bold text-xl text-[#222831]">
                      ${pricing.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
              <CardContent className="p-6 space-y-4">
                <Button
                  className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white py-3 rounded-full font-medium modern-shadow-md transition-all duration-300"
                  onClick={handleDownloadReceipt}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-2 border-[#393E46] text-[#222831] hover:bg-[#393E46] hover:text-white py-3 rounded-full font-medium"
                >
                  <Truck className="h-4 w-4 mr-2" />
                  Track Order
                </Button>

                <Button
                  variant="ghost"
                  onClick={onContinueShopping}
                  className="w-full text-[#393E46] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 py-3 rounded-full font-medium"
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>

            {/* Contact & Support */}
            <Card className="border-[#393E46]/20 rounded-2xl modern-shadow bg-white">
              <CardContent className="p-6 space-y-4">
                <h4 className="font-semibold text-[#222831] mb-3">
                  Need Help?
                </h4>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-[#00ADB5]" />
                    <div>
                      <p className="font-medium text-[#222831]">
                        Email Support
                      </p>
                      <p className="text-[#393E46]">support@fashionstack.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[#00ADB5]">📞</span>
                    <div>
                      <p className="font-medium text-[#222831]">
                        Phone Support
                      </p>
                      <p className="text-[#393E46]">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#393E46]/20">
                  <p className="text-xs text-[#393E46] text-center">
                    Order confirmation sent to {customerInfo.email}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
