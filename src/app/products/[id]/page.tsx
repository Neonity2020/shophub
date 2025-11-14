"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, ChevronRight } from "lucide-react"
import Link from "next/link"
import { getProductById } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { ProductCard } from "@/components/product-card"
import { demoProducts } from "@/lib/products"
import React from "react"

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { dispatch } = useCart()
  const { id } = React.use(params)
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  const relatedProducts = demoProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const addToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/products" className="hover:text-primary">
          Products
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/categories/${product.category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`} className="hover:text-primary">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground line-clamp-1">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            {discount > 0 && (
              <Badge variant="destructive" className="absolute left-4 top-4 text-lg px-3 py-1">
                -{discount}%
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg cursor-pointer">
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : i < product.rating
                        ? "fill-yellow-400/50 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
            <div className="flex gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex gap-3">
              <Button size="lg" className="flex-1" onClick={addToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            <p className={`text-sm ${product.inStock ? "text-green-600" : "text-red-600"}`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <Truck className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-sm font-medium">Free Shipping</p>
              <p className="text-xs text-muted-foreground">On orders over $50</p>
            </div>
            <div className="text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="text-sm font-medium">Secure Payment</p>
              <p className="text-xs text-muted-foreground">SSL Encrypted</p>
            </div>
            <div className="text-center">
              <RotateCcw className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="text-sm font-medium">Easy Returns</p>
              <p className="text-xs text-muted-foreground">30-day policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-gray-50 rounded-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}