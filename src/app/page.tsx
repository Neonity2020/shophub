import { Suspense } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { getFeaturedProducts } from "@/lib/products"
import { ProductGridSkeleton } from "@/components/product-card-skeleton"
import { AsyncProductCard } from "@/components/async-product-card"
import Link from "next/link"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to ShopHub
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices. Shop from thousands of items across electronics, fashion, home goods, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" variant="secondary">
                Shop Now
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline" className="bg-white/20 border-white text-white hover:bg-white/30">
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked selection of our best-selling and most popular items
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Suspense key={product.id} fallback={<ProductGridSkeleton count={1} />}>
                <AsyncProductCard product={product} delayMs={500} />
              </Suspense>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600">Find exactly what you're looking for</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/categories/electronics" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop"
                  alt="Electronics"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">Electronics</h3>
                </div>
              </div>
            </Link>

            <Link href="/categories/clothing" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                  alt="Clothing"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">Clothing</h3>
                </div>
              </div>
            </Link>

            <Link href="/categories/home-garden" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=600&h=400&fit=crop"
                  alt="Home & Garden"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">Home & Garden</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Fast Shipping</h3>
              <p className="text-gray-600">Free delivery on orders over $50</p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Quality Guarantee</h3>
              <p className="text-gray-600">30-day return policy on all items</p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Secure Payment</h3>
              <p className="text-gray-600">SSL encrypted checkout process</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}