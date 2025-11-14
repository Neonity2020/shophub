"use client"

import { ProductCard } from "@/components/product-card"
import { getProductsByCategory, Product } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useState, useMemo } from "react"
import React from "react"

const categoryInfo = {
  "electronics": {
    name: "Electronics",
    description: "Latest smartphones, laptops, headphones, and cutting-edge technology",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=300&fit=crop"
  },
  "clothing": {
    name: "Clothing",
    description: "Fashion apparel and accessories for men, women, and children",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=300&fit=crop"
  },
  "home-garden": {
    name: "Home & Garden",
    description: "Furniture, décor, appliances, and gardening supplies",
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1200&h=300&fit=crop"
  }
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = React.use(params)
  const categoryData = categoryInfo[category as keyof typeof categoryInfo]

  if (!categoryData) {
    notFound()
  }

  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const products = getProductsByCategory(categoryData.name)

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
      )
    }

    // Sort products
    const sorted = [...filtered]
    switch (sortBy) {
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "price-low":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating)
        break
    }

    return sorted
  }, [products, searchQuery, sortBy])

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={categoryData.image}
          alt={categoryData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-2">
              {categoryData.name}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              {categoryData.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/categories" className="hover:text-primary">
            Categories
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{categoryData.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Filters</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Subcategories</p>
                    <div className="space-y-1">
                      {products
                        .map(p => p.subcategory)
                        .filter((value, index, self) => self.indexOf(value) === index)
                        .map(subcategory => (
                          <Button
                            key={subcategory}
                            variant="ghost"
                            className="w-full justify-start text-sm"
                          >
                            {subcategory}
                          </Button>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-1">
                  {["Under $100", "$100 - $500", "$500 - $1000", "Over $1000"].map((range) => (
                    <Button key={range} variant="ghost" className="w-full justify-start text-sm">
                      {range}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Brand</h3>
                <div className="space-y-1">
                  {products
                    .map(p => p.brand)
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .slice(0, 5)
                    .map(brand => (
                      <Button key={brand} variant="ghost" className="w-full justify-start text-sm">
                        {brand}
                      </Button>
                    ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Header and Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">{categoryData.name}</h2>
                <p className="text-muted-foreground">
                  {filteredAndSortedProducts.length} products found
                </p>
              </div>

              <div className="flex gap-4">
                <Input
                  placeholder="Search products..."
                  className="w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <Button onClick={() => setSearchQuery("")}>
                  Clear search
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredAndSortedProducts.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex gap-2">
                  <Button variant="outline" disabled>Previous</Button>
                  <Button variant="default">1</Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <Button variant="outline">Next</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
