// ============================================================
// MOCK DATA – thay bằng API call thực tế sau này
// ============================================================

export const mockStats = {
  totalRevenue: 1_248_500_000,
  totalOrders: 342,
  totalUsers: 1_058,
  totalProducts: 87,
  revenueGrowth: { value: 12.5, label: "so với tháng trước", isPositive: true },
  ordersGrowth: { value: 8.3, label: "so với tháng trước", isPositive: true },
  usersGrowth: { value: 5.1, label: "so với tháng trước", isPositive: true },
  productsGrowth: { value: 2.0, label: "sản phẩm mới", isPositive: true },
};

export const mockRecentOrders = [
  {
    id: 1048,
    username: "Nguyễn Văn An",
    totalAmount: 2_450_000,
    status: "DELIVERED",
    createdAt: "2025-05-14T08:30:00",
    items: [{}, {}],
  },
  {
    id: 1047,
    username: "Trần Thị Bảo",
    totalAmount: 1_890_000,
    status: "SHIPPING",
    createdAt: "2025-05-14T07:10:00",
    items: [{}],
  },
  {
    id: 1046,
    username: "Lê Hoàng Cường",
    totalAmount: 3_200_000,
    status: "PROCESSING",
    createdAt: "2025-05-13T21:45:00",
    items: [{}, {}, {}],
  },
  {
    id: 1045,
    username: "Phạm Minh Đức",
    totalAmount: 980_000,
    status: "PENDING",
    createdAt: "2025-05-13T18:20:00",
    items: [{}],
  },
  {
    id: 1044,
    username: "Hoàng Thị Em",
    totalAmount: 1_560_000,
    status: "CANCELLED",
    createdAt: "2025-05-13T15:00:00",
    items: [{}, {}],
  },
];

export const mockTopProducts = [
  {
    id: 1,
    name: "Nike Air Max 270",
    brand: "Nike",
    image: "https://placehold.co/48x48/f0f0f0/333?text=N",
    sold: 142,
    revenue: 284_000_000,
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    brand: "Adidas",
    image: "https://placehold.co/48x48/f0f0f0/333?text=A",
    sold: 118,
    revenue: 236_000_000,
  },
  {
    id: 3,
    name: "New Balance 574",
    brand: "New Balance",
    image: "https://placehold.co/48x48/f0f0f0/333?text=NB",
    sold: 97,
    revenue: 145_500_000,
  },
  {
    id: 4,
    name: "Converse Chuck 70",
    brand: "Converse",
    image: "https://placehold.co/48x48/f0f0f0/333?text=C",
    sold: 85,
    revenue: 127_500_000,
  },
  {
    id: 5,
    name: "Puma RS-X",
    brand: "Puma",
    image: "https://placehold.co/48x48/f0f0f0/333?text=P",
    sold: 73,
    revenue: 109_500_000,
  },
];

export const mockMonthlyRevenue = [
  { month: "T1", revenue: 85_000_000 },
  { month: "T2", revenue: 62_000_000 },
  { month: "T3", revenue: 97_000_000 },
  { month: "T4", revenue: 110_000_000 },
  { month: "T5", revenue: 134_000_000 },
  { month: "T6", revenue: 128_000_000 },
  { month: "T7", revenue: 145_000_000 },
  { month: "T8", revenue: 138_000_000 },
  { month: "T9", revenue: 162_000_000 },
  { month: "T10", revenue: 175_000_000 },
  { month: "T11", revenue: 190_000_000 },
  { month: "T12", revenue: 210_000_000 },
];
