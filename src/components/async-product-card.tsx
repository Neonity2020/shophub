import { ProductCard } from "@/components/product-card"
import { Product } from "@/lib/products"
import { simulateDelay } from "@/lib/utils"
import { cacheLife } from "next/cache"

interface AsyncProductCardProps {
  product: Product
  delayMs?: number
}

// This component simulates network delay and renders ProductCard
// It's marked as async to work with React Suspense
export async function AsyncProductCard({ product, delayMs = 500 }: AsyncProductCardProps) {
  'use cache';
  cacheLife('days');
  // Simulate server delay for demo purposes
  await simulateDelay(delayMs)

  return <ProductCard product={product} />
}
