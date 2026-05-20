import type {ProductModel} from "../models/ProductModel";

export const mockProducts: ProductModel[] = [
  {
    id: 1,
    name: "Nike Air Max 90",
    brand: "Nike",
    category: "Giày Chạy Bộ",
    price: 3200000,
    stock: 45,
    images: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
    status: true,
    description: "Giày chạy bộ huyền thoại với đệm khí Air Max êm ái.",
    createdAt: "2026-01-15"
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    brand: "Adidas",
    category: "Giày Thể Thao",
    price: 4500000,
    stock: 12,
    images: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200",
    status: true,
    description: "Hoàn trả năng lượng tuyệt vời với đế Boost cao cấp.",
    createdAt: "2026-02-20"
  },
  {
    id: 3,
    name: "Jordan 1 Retro High",
    brand: "Nike",
    category: "Giày Bóng Rổ",
    price: 5800000,
    stock: 0,
    images: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=200",
    status: false,
    description: "Phiên bản cổ điển mang tính biểu tượng văn hóa sát thủ giày.",
    createdAt: "2026-03-01"
  },
  {
    id: 4,
    name: "Puma Suede Classic",
    brand: "Puma",
    category: "Giày Thời Trang",
    price: 1900000,
    stock: 28,
    images: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=200",
    status: true,
    description: "Thiết kế da lộn phong cách đường phố năng động.",
    createdAt: "2026-04-10"
  }
];