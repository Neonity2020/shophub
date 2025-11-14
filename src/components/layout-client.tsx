"use client"

import { Navigation } from "@/components/navigation"
import { CartSheet } from "@/components/cart-sheet"
import { useState } from "react"
import { Toaster } from "@/components/ui/sonner"

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <>
      <Navigation onCartClick={() => setIsCartOpen(true)} />
      <main className="min-h-screen">{children}</main>
      <CartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Toaster />
    </>
  )
}