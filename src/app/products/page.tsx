"use client"

import { ProductCard } from "@/components/product-card"
import { demoProducts, Product } from "@/lib/products"
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
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Check, X, Filter, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

const FILTERS = {
  categories: ["Electronics", "Clothing", "Home & Garden"],
  priceRanges: ["Under $50", "$50 - $100", "$100 - $500", "Over $500"],
  ratings: [4, 3, 2, 1],
}

const getPriceRange = (range: string): [number, number | null] => {
  switch (range) {
    case "Under $50":
      return [0, 50]
    case "$50 - $100":
      return [50, 100]
    case "$100 - $500":
      return [100, 500]
    case "Over $500":
      return [500, null]
    default:
      return [0, null]
  }
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...demoProducts]

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      )
    }

    // Apply price range filter
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter(product => {
        return selectedPriceRanges.some(range => {
          const [min, max] = getPriceRange(range)
          if (max === null) {
            return product.price >= min
          }
          return product.price >= min && product.price <= max
        })
      })
    }

    // Apply rating filter
    if (selectedRatings.length > 0) {
      const minRating = Math.min(...selectedRatings)
      filtered = filtered.filter(product => product.rating >= minRating)
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
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
  }, [selectedCategories, selectedPriceRanges, selectedRatings, searchQuery, sortBy])

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handlePriceRangeToggle = (range: string) => {
    setSelectedPriceRanges(prev =>
      prev.includes(range)
        ? prev.filter(r => r !== range)
        : [...prev, range]
    )
  }

  const handleRatingToggle = (rating: number) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    )
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedPriceRanges([])
    setSelectedRatings([])
    setSearchQuery("")
  }

  const activeFiltersCount = selectedCategories.length + selectedPriceRanges.length + selectedRatings.length

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">All Products</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-64">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-xs"
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Clear all
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    {FILTERS.categories.map((category) => (
                      <Button
                        key={category}
                        variant="ghost"
                        className={`w-full justify-start text-sm ${
                          selectedCategories.includes(category)
                            ? "bg-primary/10 text-primary"
                            : ""
                        }`}
                        onClick={() => handleCategoryToggle(category)}
                      >
                        <span className="flex items-center justify-between w-full">
                          {category}
                          {selectedCategories.includes(category) && (
                            <Check className="h-3 w-3" />
                          )}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {FILTERS.priceRanges.map((range) => (
                      <Button
                        key={range}
                        variant="ghost"
                        className={`w-full justify-start text-sm ${
                          selectedPriceRanges.includes(range)
                            ? "bg-primary/10 text-primary"
                            : ""
                        }`}
                        onClick={() => handlePriceRangeToggle(range)}
                      >
                        <span className="flex items-center justify-between w-full">
                          {range}
                          {selectedPriceRanges.includes(range) && (
                            <Check className="h-3 w-3" />
                          )}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Rating</h4>
                  <div className="space-y-2">
                    {FILTERS.ratings.map((rating) => (
                      <Button
                        key={rating}
                        variant="ghost"
                        className={`w-full justify-start text-sm ${
                          selectedRatings.includes(rating)
                            ? "bg-primary/10 text-primary"
                            : ""
                        }`}
                        onClick={() => handleRatingToggle(rating)}
                      >
                        <span className="flex items-center justify-between w-full">
                          {rating}+ Stars
                          {selectedRatings.includes(rating) && (
                            <Check className="h-3 w-3" />
                          )}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">All Products</h1>
              <p className="text-muted-foreground">
                {filteredAndSortedProducts.length} products found
                {activeFiltersCount > 0 && (
                  <span className="ml-2">
                    <Badge variant="secondary">
                      {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""} active
                    </Badge>
                  </span>
                )}
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
              <Button onClick={clearAllFilters}>Clear all filters</Button>
            </div>
          )}

          {/* Pagination */}
          {filteredAndSortedProducts.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="flex gap-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
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
  )
}
