"use client"

import { useState } from "react"
import { CartSheet } from "@/components/cart-sheet"

export function CartProviderWrapper({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <>
      {children}
      <CartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

// Export a function to open the cart that can be used by components
export function useCartOpener() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  return { isCartOpen, setIsCartOpen }
}