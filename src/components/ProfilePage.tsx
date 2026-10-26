import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import {
  ArrowLeft,
  Edit3,
  Check,
  X,
  Heart,
  Package,
  Settings,
  User,
  MapPin,
  Plus,
  Trash2,
  Eye,
  LogOut,
} from "lucide-react";
import { useCart, type Product } from "./CartContext";
import { toast } from "sonner";

interface ProfilePageProps {
  user: any;
  onBack: () => void;
  onLogout: () => void;
}

interface Address {
  id: number;
  type: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export function ProfilePage({ user, onBack, onLogout }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(true);

  // Address management states
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      type: "Home",
      name: "John Doe",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      name: "John Doe",
      address: "456 Business Ave, Suite 200",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "United States",
      isDefault: false,
    },
  ]);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressForm, setAddressForm] = useState({
    type: "Home",
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    isDefault: false,
  });

  // Wishlist state management - using the exact Product interface from CartContext
  //const [wishlistItems, setWishlistItems] = useState<Product[]>([
  //  {
  //    id: 1,
  //    name: "Silk Wrap Dress",
  //    price: 189.99,
  //    originalPrice: 249.99,
  //    rating: 4.8,
  //    reviews: 124,
  //    image:
  //      "https://images.unsplash.com/photo-1678637803638-0bcc1e13ecae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
  //    isOnSale: true,
  //    colors: ["Navy", "Emerald", "Blush"],
  //    sizes: ["XS", "S", "M", "L", "XL"],
  //    category: "women",
  //    description: "Elegant silk wrap dress perfect for any occasion.",
  //    features: [
  //      "100% Silk",
  //      "Dry Clean Only",
  //      "Adjustable Tie",
  //      "Midi Length",
  //    ],
  //    materials: ["Premium Silk Crepe", "Lined"],
  //    colorImages: {
  //      Navy: "https://images.unsplash.com/photo-1678637803638-0bcc1e13ecae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
  //      Emerald:
  //        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
  //      Blush:
  //        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
  //    },
  //  },
  //  {
  //    id: 2,
  //    name: "Essential Hoodie",
  //    price: 89.99,
  //    originalPrice: 119.99,
  //    rating: 4.5,
  //    reviews: 267,
  //    image:
  //      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
  //    isOnSale: true,
  //    colors: ["Grey", "Black", "Navy"],
  //    sizes: ["S", "M", "L", "XL", "XXL"],
  //    category: "men",
  //    description:
  //      "Comfortable pullover hoodie made from premium cotton blend.",
  //    features: [
  //      "Cotton Blend",
  //      "Pullover Style",
  //      "Drawstring Hood",
  //      "Kangaroo Pocket",
  //    ],
  //    materials: ["Cotton Blend", "Fleece Lining"],
  //    colorImages: {
  //      Grey: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
  //      Black:
  //        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
  //      Navy: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
  //    },
  //  },
  //]);

  const [editedData, setEditedData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: "+1 (555) 123-4567",
  });

  const { addToCart } = useCart();

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: "+1 (555) 123-4567",
    });
  };

  const handleViewOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  const handleAddToCartFromWishlist = (product: Product) => {
    try {
      // Ensure we have valid colors and sizes
      if (!product.colors || product.colors.length === 0) {
        toast.error("Product color options not available");
        return;
      }

      if (!product.sizes || product.sizes.length === 0) {
        toast.error("Product size options not available");
        return;
      }

      // Add to cart with first available color and size
      const selectedColor = product.colors[0];
      const selectedSize = product.sizes[0];

      addToCart(product, selectedColor, selectedSize, 1);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  //const handleRemoveFromWishlist = (itemId: number) => {
  //  setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
  //  toast.success("Item removed from wishlist");
  //};

  // Address management functions
  const handleAddAddress = () => {
    setEditingAddress(null);
    setAddressForm({
      type: "Home",
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      isDefault: false,
    });
    setIsAddressModalOpen(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setAddressForm({
      type: address.type,
      name: address.name,
      address: address.address,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isDefault: address.isDefault,
    });
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = () => {
    if (editingAddress) {
      // Update existing address
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddress.id
            ? { ...addr, ...addressForm }
            : addressForm.isDefault
            ? { ...addr, isDefault: false }
            : addr
        )
      );
      toast.success("Address updated successfully!");
    } else {
      // Add new address
      const newAddress: Address = {
        id: Date.now(),
        ...addressForm,
      };

      setAddresses((prev) =>
        addressForm.isDefault
          ? [...prev.map((addr) => ({ ...addr, isDefault: false })), newAddress]
          : [...prev, newAddress]
      );
      toast.success("Address added successfully!");
    }
    setIsAddressModalOpen(false);
  };

  const handleDeleteAddress = (addressId: number) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
    toast.success("Address deleted successfully!");
  };

  // Navigation tabs
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    //{ id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "addresses", label: "Addresses", icon: MapPin },
  ];

  // Mock data for orders
  const mockOrders = [
    {
      id: "#FS-2024-001",
      date: "Jan 15, 2024",
      status: "Delivered",
      total: "$259.97",
      items: 3,
      statusColor: "bg-green-100 text-green-800",
      orderDetails: {
        items: [
          {
            name: "Silk Wrap Dress",
            quantity: 1,
            price: "$189.99",
            image:
              "https://images.unsplash.com/photo-1678637803638-0bcc1e13ecae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
          },
          {
            name: "Classic Oxford Shirt",
            quantity: 2,
            price: "$79.99",
            image:
              "https://images.unsplash.com/photo-1603252109612-24fa03d145c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
          },
        ],
        shippingAddress: "123 Main St, New York, NY 10001",
        paymentMethod: "**** **** **** 1234",
        trackingNumber: "1Z999AA1234567890",
      },
    },
    {
      id: "#FS-2024-002",
      date: "Jan 18, 2024",
      status: "Processing",
      total: "$189.99",
      items: 1,
      statusColor: "bg-blue-100 text-blue-800",
      orderDetails: {
        items: [
          {
            name: "Professional Office Blouse",
            quantity: 1,
            price: "$189.99",
            image:
              "https://images.unsplash.com/photo-1736939666660-d4c776e0532c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
          },
        ],
        shippingAddress: "123 Main St, New York, NY 10001",
        paymentMethod: "**** **** **** 1234",
        trackingNumber: "Processing",
      },
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="bg-white">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-[#222831] mb-2">
                  Profile Information
                </h2>
                <p className="text-[#9CA3AF]">
                  Manage your personal information
                </p>
              </div>
              {!isEditing ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        onClick={() => setIsEditing(true)}
                        className="text-[#6B7280] hover:text-[#00ADB5] flex items-center gap-2 relative z-10"
                      >
                        <Edit3 className="h-4 w-4" />
                        <span>Edit</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center" className="z-50">
                      <p>Edit profile information</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCancel}
                          className="text-[#6B7280] hover:text-red-600 relative z-10"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        align="center"
                        className="z-50"
                      >
                        <p>Cancel changes</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleSave}
                          className="text-[#6B7280] hover:text-[#00ADB5] relative z-10"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        align="center"
                        className="z-50"
                      >
                        <p>Save changes</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[#374151] font-medium">
                    First Name
                  </Label>
                  {isEditing ? (
                    <Input
                      value={editedData.firstName}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          firstName: e.target.value,
                        })
                      }
                      className="border-[#E5E7EB] bg-white text-[#111827] focus:border-[#00ADB5] focus:ring-[#00ADB5]"
                    />
                  ) : (
                    <p className="text-[#6B7280] py-2">
                      {editedData.firstName}
                    </p>
                  )}
                </div>
                <div className="space-y-3">
                  <Label className="text-[#374151] font-medium">
                    Last Name
                  </Label>
                  {isEditing ? (
                    <Input
                      value={editedData.lastName}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          lastName: e.target.value,
                        })
                      }
                      className="border-[#E5E7EB] bg-white text-[#111827] focus:border-[#00ADB5] focus:ring-[#00ADB5]"
                    />
                  ) : (
                    <p className="text-[#6B7280] py-2">{editedData.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[#374151] font-medium">
                  Email Address
                </Label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={editedData.email}
                    onChange={(e) =>
                      setEditedData({ ...editedData, email: e.target.value })
                    }
                    className="border-[#E5E7EB] bg-white text-[#111827] focus:border-[#00ADB5] focus:ring-[#00ADB5]"
                  />
                ) : (
                  <p className="text-[#6B7280] py-2">{editedData.email}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-[#374151] font-medium">
                  Phone Number
                </Label>
                {isEditing ? (
                  <Input
                    type="tel"
                    value={editedData.phone}
                    onChange={(e) =>
                      setEditedData({ ...editedData, phone: e.target.value })
                    }
                    className="border-[#E5E7EB] bg-white text-[#111827] focus:border-[#00ADB5] focus:ring-[#00ADB5]"
                  />
                ) : (
                  <p className="text-[#6B7280] py-2">{editedData.phone}</p>
                )}
              </div>
            </div>
          </div>
        );

      case "orders":
        return (
          <div className="bg-white">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#222831] mb-2">
                Order History
              </h2>
              <p className="text-[#9CA3AF]">
                View your recent purchases and order status
              </p>
            </div>
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-6 border border-[#E5E7EB] rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="font-medium text-[#222831]">
                        {order.id}
                      </span>
                      <Badge className={`${order.statusColor} border-0`}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-[#6B7280]">
                      {order.date} • {order.items} item
                      {order.items > 1 ? "s" : ""}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-[#222831] mb-2">
                      {order.total}
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewOrderDetails(order)}
                            className="border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] flex items-center gap-2 relative z-10"
                          >
                            <Eye className="h-4 w-4" />
                            <span>View Details</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          align="center"
                          className="z-50"
                        >
                          <p>View order details</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Details Modal */}
            <Dialog
              open={isOrderDetailsOpen}
              onOpenChange={setIsOrderDetailsOpen}
            >
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
                  <DialogDescription>
                    Placed on {selectedOrder?.date} • Status:{" "}
                    {selectedOrder?.status}
                  </DialogDescription>
                </DialogHeader>
                {selectedOrder && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-[#222831] mb-3">
                        Items Ordered
                      </h4>
                      <div className="space-y-3">
                        {selectedOrder.orderDetails.items.map(
                          (item: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center gap-4 p-3 border border-[#E5E7EB] rounded-lg"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h5 className="font-medium text-[#222831]">
                                  {item.name}
                                </h5>
                                <p className="text-sm text-[#6B7280]">
                                  Quantity: {item.quantity}
                                </p>
                              </div>
                              <p className="font-medium text-[#222831]">
                                {item.price}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-[#222831] mb-2">
                          Shipping Address
                        </h4>
                        <p className="text-[#6B7280]">
                          {selectedOrder.orderDetails.shippingAddress}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#222831] mb-2">
                          Payment Method
                        </h4>
                        <p className="text-[#6B7280]">
                          {selectedOrder.orderDetails.paymentMethod}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-[#222831] mb-2">
                        Tracking Information
                      </h4>
                      <p className="text-[#6B7280]">
                        {selectedOrder.orderDetails.trackingNumber}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-[#E5E7EB]">
                      <span className="font-medium text-[#222831]">Total:</span>
                      <span className="font-semibold text-[#222831] text-lg">
                        {selectedOrder.total}
                      </span>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        );

      //      case "wishlist":
      //        return (
      //          <div className="bg-white">
      //            <div className="mb-8">
      //              <h2 className="text-2xl font-semibold text-[#222831] mb-2">
      //                My Wishlist
      //              </h2>
      //              <p className="text-[#9CA3AF]">Items you've saved for later</p>
      //            </div>
      //            {wishlistItems.length === 0 ? (
      //              <div className="text-center py-12">
      //                <Heart className="h-12 w-12 text-[#9CA3AF] mx-auto mb-4" />
      //                <h3 className="font-medium text-[#222831] mb-2">
      //                  Your wishlist is empty
      //                </h3>
      //                <p className="text-[#6B7280]">
      //                  Save items you love to view them later
      //                </p>
      //              </div>
      //            ) : (
      //              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      //                {wishlistItems.map((item) => (
      //                  <div
      //                    key={item.id}
      //                    className="border border-[#E5E7EB] rounded-lg overflow-hidden"
      //                  >
      //                    <img
      //                      src={item.image}
      //                      alt={item.name}
      //                      className="w-full h-48 object-cover"
      //                    />
      //                    <div className="p-4">
      //                      <h3 className="font-medium text-[#222831] mb-2">
      //                        {item.name}
      //                      </h3>
      //                      <div className="flex items-center justify-between mb-3">
      //                        <span className="font-semibold text-[#222831]">
      //                          ${item.price}
      //                        </span>
      //                        <Badge
      //                          variant={
      //                            item.colors &&
      //                            item.colors.length > 0 &&
      //                            item.sizes &&
      //                            item.sizes.length > 0
      //                              ? "default"
      //                              : "secondary"
      //                          }
      //                        >
      //                          {item.colors &&
      //                          item.colors.length > 0 &&
      //                          item.sizes &&
      //                          item.sizes.length > 0
      //                            ? "In Stock"
      //                            : "Out of Stock"}
      //                        </Badge>
      //                      </div>
      //                      <div className="flex gap-2">
      //                        <TooltipProvider>
      //                          <Tooltip>
      //                            <TooltipTrigger asChild>
      //                              <Button
      //                                size="sm"
      //                                className="flex-1 bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white relative z-10"
      //                                disabled={
      //                                  !item.colors ||
      //                                  item.colors.length === 0 ||
      //                                  !item.sizes ||
      //                                  item.sizes.length === 0
      //                                }
      //                                onClick={() =>
      //                                  handleAddToCartFromWishlist(item)
      //                                }
      //                              >
      //                                <span>
      //                                  {item.colors &&
      //                                  item.colors.length > 0 &&
      //                                  item.sizes &&
      //                                  item.sizes.length > 0
      //                                    ? "Add to Cart"
      //                                    : "Out of Stock"}
      //                                </span>
      //                              </Button>
      //                            </TooltipTrigger>
      //                            <TooltipContent
      //                              side="top"
      //                              align="center"
      //                              className="z-50"
      //                            >
      //                              <p>
      //                                {item.colors &&
      //                                item.colors.length > 0 &&
      //                                item.sizes &&
      //                                item.sizes.length > 0
      //                                  ? "Add item to cart"
      //                                  : "Item is out of stock"}
      //                              </p>
      //                            </TooltipContent>
      //                          </Tooltip>
      //                        </TooltipProvider>
      //
      //                        <TooltipProvider>
      //                          <Tooltip>
      //                            <TooltipTrigger asChild>
      //                              <Button
      //                                size="sm"
      //                                variant="outline"
      //                                className="border-[#E5E7EB] text-[#6B7280] hover:text-red-600 hover:border-red-300 relative z-10"
      //                                onClick={() =>
      //                                  handleRemoveFromWishlist(item.id)
      //                                }
      //                              >
      //                                <Trash2 className="h-4 w-4" />
      //                              </Button>
      //                            </TooltipTrigger>
      //                            <TooltipContent
      //                              side="top"
      //                              align="center"
      //                              className="z-50"
      //                            >
      //                              <p>Remove from wishlist</p>
      //                            </TooltipContent>
      //                          </Tooltip>
      //                        </TooltipProvider>
      //                      </div>
      //                    </div>
      //                  </div>
      //                ))}
      //              </div>
      //            )}
      //          </div>
      //        );

      case "addresses":
        return (
          <div className="bg-white">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-[#222831] mb-2">
                  Saved Addresses
                </h2>
                <p className="text-[#9CA3AF]">
                  Manage your shipping and billing addresses
                </p>
              </div>
              <Button
                onClick={handleAddAddress}
                className="bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Address
              </Button>
            </div>
            <div className="space-y-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="p-6 border border-[#E5E7EB] rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-medium text-[#222831]">
                          {address.type}
                        </span>
                        {address.isDefault && (
                          <Badge className="bg-[#00ADB5] text-white border-0">
                            Default
                          </Badge>
                        )}
                      </div>
                      <div className="text-[#6B7280] space-y-1">
                        <div className="font-medium text-[#374151]">
                          {address.name}
                        </div>
                        <div>{address.address}</div>
                        <div>
                          {address.city}, {address.state} {address.zipCode}
                        </div>
                        <div>{address.country}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditAddress(address)}
                              className="border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] flex items-center gap-2 relative z-10"
                            >
                              <Edit3 className="h-4 w-4" />
                              <span>Edit</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            align="center"
                            className="z-50"
                          >
                            <p>Edit address</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteAddress(address.id)}
                              className="border-[#E5E7EB] text-[#6B7280] hover:text-red-600 hover:border-red-300 relative z-10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            align="center"
                            className="z-50"
                          >
                            <p>Delete address</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add/Edit Address Modal */}
            <Dialog
              open={isAddressModalOpen}
              onOpenChange={setIsAddressModalOpen}
            >
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>
                    {editingAddress ? "Edit Address" : "Add New Address"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingAddress
                      ? "Update your address information"
                      : "Add a new shipping or billing address"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="addressType">Address Type</Label>
                      <Select
                        value={addressForm.type}
                        onValueChange={(value: any) =>
                          setAddressForm({ ...addressForm, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Home">Home</SelectItem>
                          <SelectItem value="Work">Work</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="addressName">Full Name</Label>
                      <Input
                        id="addressName"
                        value={addressForm.name}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            name: e.target.value,
                          })
                        }
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="addressLine">Address</Label>
                    <Textarea
                      id="addressLine"
                      value={addressForm.address}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          address: e.target.value,
                        })
                      }
                      placeholder="123 Main Street, Apt 4B"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={addressForm.city}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            city: e.target.value,
                          })
                        }
                        placeholder="New York"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={addressForm.state}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            state: e.target.value,
                          })
                        }
                        placeholder="NY"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={addressForm.zipCode}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            zipCode: e.target.value,
                          })
                        }
                        placeholder="10001"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={addressForm.country}
                        onValueChange={(value: any) =>
                          setAddressForm({ ...addressForm, country: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="United States">
                            United States
                          </SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="United Kingdom">
                            United Kingdom
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isDefault"
                      checked={addressForm.isDefault}
                      onCheckedChange={(checked: any) =>
                        setAddressForm({ ...addressForm, isDefault: checked })
                      }
                    />
                    <Label htmlFor="isDefault">Set as default address</Label>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddressModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveAddress}
                      className="bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white"
                    >
                      {editingAddress ? "Update Address" : "Save Address"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        );

      case "settings":
        return (
          <div className="bg-white">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#222831] mb-2">
                Settings
              </h2>
              <p className="text-[#9CA3AF]">Manage your account preferences</p>
            </div>
            <div className="space-y-6">
              <div className="border border-[#E5E7EB] rounded-lg p-6">
                <h3 className="font-medium text-[#222831] mb-4">
                  Notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#374151]">
                        Email Notifications
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        Receive order updates and promotions via email
                      </p>
                      {emailNotifications && (
                        <p className="text-xs text-[#00ADB5] mt-1">
                          ✓ Email notifications are enabled
                        </p>
                      )}
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={(
                        checked: boolean | ((prevState: boolean) => boolean)
                      ) => {
                        setEmailNotifications(checked);
                        toast.success(
                          checked
                            ? "Email notifications enabled"
                            : "Email notifications disabled"
                        );
                      }}
                      className="data-[state=checked]:bg-[#00ADB5]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#374151]">
                        SMS Notifications
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        Receive shipping updates via text
                      </p>
                      {smsNotifications && (
                        <p className="text-xs text-[#00ADB5] mt-1">
                          ✓ SMS notifications are enabled
                        </p>
                      )}
                    </div>
                    <Switch
                      checked={smsNotifications}
                      onCheckedChange={(
                        checked: boolean | ((prevState: boolean) => boolean)
                      ) => {
                        setSmsNotifications(checked);
                        toast.success(
                          checked
                            ? "SMS notifications enabled"
                            : "SMS notifications disabled"
                        );
                      }}
                      className="data-[state=checked]:bg-[#00ADB5]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#374151]">
                        Marketing Emails
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        Receive special offers and promotions
                      </p>
                      {marketingEmails && (
                        <p className="text-xs text-[#00ADB5] mt-1">
                          ✓ Marketing emails are enabled
                        </p>
                      )}
                    </div>
                    <Switch
                      checked={marketingEmails}
                      onCheckedChange={(
                        checked: boolean | ((prevState: boolean) => boolean)
                      ) => {
                        setMarketingEmails(checked);
                        toast.success(
                          checked
                            ? "Marketing emails enabled"
                            : "Marketing emails disabled"
                        );
                      }}
                      className="data-[state=checked]:bg-[#00ADB5]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header with Back Button */}
      <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-[#222831] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 p-2 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#222831]">
                My Account
              </h1>
              <p className="text-[#6B7280]">
                Manage your account settings and preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full justify-start gap-3 h-12 px-4 ${
                    activeTab === tab.id
                      ? "bg-[#00ADB5] text-white hover:bg-[#00ADB5]/90"
                      : "text-[#374151] hover:bg-[#F9FAFB] hover:text-[#00ADB5]"
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </Button>
              ))}
            </nav>

            {/* Logout Button */}
            <div className="mt-8 pt-8 border-t border-[#E5E7EB]">
              <Button
                variant="ghost"
                onClick={onLogout}
                className="w-full justify-start gap-3 h-12 px-4 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}
