"use client"

import Link from "next/link"
import { ShoppingCart, User, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"

const categories = [
  {
    title: "Electronics",
    href: "/categories/electronics",
    subcategories: [
      { title: "Smartphones", href: "/categories/electronics/smartphones" },
      { title: "Laptops", href: "/categories/electronics/laptops" },
      { title: "Headphones", href: "/categories/electronics/headphones" },
    ],
  },
  {
    title: "Clothing",
    href: "/categories/clothing",
    subcategories: [
      { title: "Men", href: "/categories/clothing/men" },
      { title: "Women", href: "/categories/clothing/women" },
      { title: "Kids", href: "/categories/clothing/kids" },
    ],
  },
  {
    title: "Home & Garden",
    href: "/categories/home-garden",
    subcategories: [
      { title: "Furniture", href: "/categories/home-garden/furniture" },
      { title: "Kitchen", href: "/categories/home-garden/kitchen" },
      { title: "Garden", href: "/categories/home-garden/garden" },
    ],
  },
]

export function Navigation({ onCartClick }: { onCartClick: () => void }) {
  const { state } = useCart()
  const cartItems = state.items.reduce((total, item) => total + item.quantity, 0)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">ShopHub</span>
          </Link>

          {/* Navigation Menu */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className="px-4 py-2 text-sm font-medium hover:text-primary">
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              {categories.map((category) => (
                <NavigationMenuItem key={category.title}>
                  <NavigationMenuTrigger className="px-4 py-2 text-sm font-medium">
                    {category.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {category.subcategories.map((sub) => (
                        <li key={sub.title}>
                          <NavigationMenuLink
                            href={sub.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{sub.title}</div>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-4 w-4" />
            </Button>

            {/* User Account */}
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>

            {/* Shopping Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItems > 0 && (
                <Badge variant="destructive" className="absolute -right-2 -top-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartItems}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}