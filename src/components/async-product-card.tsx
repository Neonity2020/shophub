import { ProductCard } from "@/components/product-card"
import { Product } from "@/lib/products"
import { simulateDelay } from "@/lib/utils"

interface AsyncProductCardProps {
  product: Product
  delayMs?: number
}

// This component simulates network delay and renders ProductCard
// It's marked as async to work with React Suspense
export async function AsyncProductCard({ product, delayMs = 500 }: AsyncProductCardProps) {
  // Simulate server delay for demo purposes
  await simulateDelay(delayMs)

  return <ProductCard product={product} />
}
