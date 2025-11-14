"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden bg-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
        <div className="flex items-center gap-1">
          <div className="h-3 bg-gray-200 rounded w-3 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-3 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-3 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-3 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-3 animate-pulse" />
        </div>
        <div className="h-5 bg-gray-200 rounded w-2/3 animate-pulse" />
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="w-full h-10 bg-gray-200 rounded animate-pulse" />
      </CardFooter>
    </Card>
  )
}

// Grid of skeletons for multiple products
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </>
  )
}
