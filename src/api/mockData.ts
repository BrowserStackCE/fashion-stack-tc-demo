// src/api/mockData.ts
// Local stand-in for the backend so the demo app is fully self-contained.
import { type Product } from "../components/CartContext";

const img = (id: string) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080`;

// categoryId: 1 = women, 2 = men, 3 = accessories
export const products: Product[] = [
  {
    id: 1,
    name: "Silk Wrap Dress",
    description:
      "Elegant silk wrap dress perfect for any occasion. Features a flattering silhouette with adjustable tie waist.",
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviewCount: 124,
    isOnSale: true,
    image: img("photo-1645654731316-a350fdcf3bae"),
    categoryId: 1,
    features: ["Adjustable tie waist", "Fully lined", "Midi length"],
    materials: ["100% Mulberry Silk"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy", "Emerald", "Blush"],
  },
  {
    id: 2,
    name: "Heritage Denim Jacket",
    description:
      "Classic denim jacket crafted from premium heritage denim with a modern fit.",
    price: 159.99,
    originalPrice: 159.99,
    rating: 4.6,
    reviewCount: 89,
    isOnSale: false,
    image: img("photo-1724856604247-0de2c43b6491"),
    categoryId: 2,
    features: ["Button front", "Chest pockets"],
    materials: ["100% Cotton Denim"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Indigo", "Black"],
  },
  {
    id: 3,
    name: "Essential Cotton Tee",
    description:
      "Essential t-shirt made from premium organic cotton. Soft, comfortable, perfect for layering.",
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.9,
    reviewCount: 256,
    isOnSale: true,
    image: img("photo-1562157873-818bc0726f68"),
    categoryId: 2,
    features: ["Crew neck", "Relaxed fit"],
    materials: ["100% Organic Cotton"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Stone", "Black"],
  },
  {
    id: 4,
    name: "Leather Crossbody Bag",
    description:
      "Handcrafted leather crossbody bag with premium hardware and adjustable strap.",
    price: 149.99,
    originalPrice: 149.99,
    rating: 4.7,
    reviewCount: 67,
    isOnSale: false,
    image: img("photo-1749842622314-75a5c344ceab"),
    categoryId: 3,
    features: ["Adjustable strap", "Multiple compartments"],
    materials: ["Full-grain Leather"],
    sizes: ["One Size"],
    colors: ["Tan", "Black"],
  },
  {
    id: 5,
    name: "Straight Leg Jeans",
    description:
      "Classic straight leg jeans in premium denim with a timeless fit.",
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.5,
    reviewCount: 178,
    isOnSale: true,
    image: img("photo-1579041925212-0475426bea28"),
    categoryId: 2,
    features: ["Five-pocket styling", "Mid rise"],
    materials: ["98% Cotton", "2% Elastane"],
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Indigo", "Black", "Stone"],
  },
  {
    id: 6,
    name: "Linen Button Shirt",
    description:
      "Relaxed linen button shirt made from 100% European linen. Breathable and comfortable.",
    price: 89.99,
    originalPrice: 89.99,
    rating: 4.4,
    reviewCount: 92,
    isOnSale: false,
    image: img("photo-1744208525808-66c60e0ea68c"),
    categoryId: 2,
    features: ["Relaxed fit", "Button-down collar"],
    materials: ["100% European Linen"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Sage", "Sand"],
  },
  {
    id: 7,
    name: "Pleated Midi Skirt",
    description: "Flowing pleated midi skirt with an elasticated waistband.",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviewCount: 58,
    isOnSale: true,
    image: img("photo-1583496661160-fb5886a0aaaa"),
    categoryId: 1,
    features: ["Elastic waist", "Knife pleats"],
    materials: ["100% Recycled Polyester"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Champagne"],
  },
  {
    id: 8,
    name: "Cashmere Knit Sweater",
    description: "Luxuriously soft cashmere sweater with a relaxed silhouette.",
    price: 219.99,
    originalPrice: 219.99,
    rating: 4.9,
    reviewCount: 143,
    isOnSale: false,
    image: img("photo-1576566588028-4147f3842f27"),
    categoryId: 1,
    features: ["Ribbed cuffs", "Relaxed fit"],
    materials: ["100% Cashmere"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Oatmeal", "Charcoal", "Blush"],
  },
];

export interface MockUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Seeded account for demos and automated tests
export const DEMO_USER: MockUser = {
  id: 1001,
  name: "Demo Shopper",
  email: "demo@fashionstack.com",
  password: "Demo@123",
};

// Fixed OTP so the OTP login flow is deterministic
export const DEMO_OTP = 123456;

const USERS_KEY = "fs_users";

export const loadUsers = (): MockUser[] => {
  try {
    const stored = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    return [DEMO_USER, ...stored];
  } catch {
    return [DEMO_USER];
  }
};

export const saveUser = (user: MockUser) => {
  const stored = loadUsers().filter((u) => u.id !== DEMO_USER.id);
  localStorage.setItem(USERS_KEY, JSON.stringify([...stored, user]));
};

// Small artificial latency so loading states still render
export const delay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));
