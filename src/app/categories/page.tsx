import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    description: "Latest gadgets, smartphones, laptops, and tech accessories",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop",
    productCount: 1567,
    popularItems: ["iPhone", "Laptops", "Headphones"]
  },
  {
    name: "Clothing",
    slug: "clothing",
    description: "Fashion apparel for men, women, and children",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    productCount: 2348,
    popularItems: ["Jeans", "T-Shirts", "Sneakers"]
  },
  {
    name: "Home & Garden",
    slug: "home-garden",
    description: "Furniture, décor, kitchen appliances, and gardening supplies",
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=600&h=400&fit=crop",
    productCount: 1892,
    popularItems: ["Furniture", "Kitchen", "Decor"]
  }
]

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our wide range of products organized by category. Find exactly what you're looking for with ease.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Card key={category.slug} className="overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                  {category.productCount} products
                </span>
              </div>

              <p className="text-muted-foreground mb-4">
                {category.description}
              </p>

              <div className="space-y-2 mb-6">
                <p className="text-sm font-medium text-muted-foreground">Popular items:</p>
                <div className="flex flex-wrap gap-2">
                  {category.popularItems.map((item) => (
                    <span
                      key={item}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <Link href={`/categories/${category.slug}`}>
                <Button className="w-full group">
                  Browse {category.name}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="mt-16">
        <Card className="bg-gradient-to-r from-primary to-purple-600 text-white border-0">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                Looking for something specific?
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-6">
                Use our advanced search to filter products by price, brand, rating, and more.
                Find the perfect product that matches your needs and budget.
              </p>
              <Link href="/products">
                <Button variant="secondary" size="lg">
                  Browse All Products
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
