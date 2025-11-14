export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  subcategory: string
  brand: string
  image: string
  images: string[]
  rating: number
  reviews: number
  inStock: boolean
  tags: string[]
}

export const demoProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    description: "The most advanced iPhone ever with titanium design and pro camera system.",
    price: 1199,
    originalPrice: 1299,
    category: "Electronics",
    subcategory: "Smartphones",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
    ],
    rating: 4.8,
    reviews: 2341,
    inStock: true,
    tags: ["bestseller", "premium"]
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    description: "Flagship Android phone with S Pen and AI-powered features.",
    price: 1099,
    category: "Electronics",
    subcategory: "Smartphones",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
    ],
    rating: 4.6,
    reviews: 1876,
    inStock: true,
    tags: ["flagship", "android"]
  },
  {
    id: "3",
    name: "MacBook Pro 16\" M3",
    description: "Powerful laptop with M3 chip for professionals and creators.",
    price: 2499,
    category: "Electronics",
    subcategory: "Laptops",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop",
    ],
    rating: 4.9,
    reviews: 892,
    inStock: true,
    tags: ["professional", "laptop"]
  },
  {
    id: "4",
    name: "Nike Air Max 270",
    description: "Comfortable and stylish sneakers for everyday wear.",
    price: 150,
    originalPrice: 180,
    category: "Clothing",
    subcategory: "Shoes",
    brand: "Nike",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
    ],
    rating: 4.4,
    reviews: 1243,
    inStock: true,
    tags: ["sneakers", "comfort"]
  },
  {
    id: "5",
    name: "Sony WH-1000XM5",
    description: "Premium noise-canceling headphones with industry-leading sound.",
    price: 399,
    originalPrice: 449,
    category: "Electronics",
    subcategory: "Headphones",
    brand: "Sony",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
    ],
    rating: 4.7,
    reviews: 2156,
    inStock: true,
    tags: ["audio", "premium"]
  },
  {
    id: "6",
    name: "Levi's 501 Original Jeans",
    description: "Classic straight fit jeans, the original since 1873.",
    price: 89,
    category: "Clothing",
    subcategory: "Pants",
    brand: "Levi's",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop",
    ],
    rating: 4.3,
    reviews: 987,
    inStock: true,
    tags: ["classic", "denim"]
  },
  {
    id: "7",
    name: "Ikea MALM Bed Frame",
    description: "Modern bed frame with storage drawers, perfect for small spaces.",
    price: 299,
    category: "Home & Garden",
    subcategory: "Furniture",
    brand: "Ikea",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop",
    ],
    rating: 4.2,
    reviews: 543,
    inStock: true,
    tags: ["bedroom", "storage"]
  },
  {
    id: "8",
    name: "KitchenAid Stand Mixer",
    description: "Professional stand mixer for baking enthusiasts and home cooks.",
    price: 449,
    category: "Home & Garden",
    subcategory: "Kitchen",
    brand: "KitchenAid",
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
    ],
    rating: 4.8,
    reviews: 1678,
    inStock: true,
    tags: ["kitchen", "baking"]
  }
]

export function getProductsByCategory(category: string): Product[] {
  return demoProducts.filter(product =>
    product.category.toLowerCase() === category.toLowerCase()
  )
}

export function getProductById(id: string): Product | undefined {
  return demoProducts.find(product => product.id === id)
}

export function getFeaturedProducts(): Product[] {
  return demoProducts.filter(product => product.tags.includes("bestseller") || product.tags.includes("premium"))
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return demoProducts.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery) ||
    product.brand.toLowerCase().includes(lowerQuery)
  )
}