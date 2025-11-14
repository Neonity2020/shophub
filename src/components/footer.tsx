"use client"

import Link from "next/link"
import { Separator } from "./ui/separator"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">ShopHub</h3>
            <p className="text-sm text-muted-foreground">
              Your trusted online marketplace for quality products at great prices.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">Categories</Link></li>
              <li><Link href="/products?sort=price-low" className="text-muted-foreground hover:text-foreground transition-colors">Deals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Shipping Info</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Returns</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 ShopHub. All rights reserved.
          </p>

          <Link
            href="https://neonity.cc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline transition-colors"
          >
            A website of neonity.cc
          </Link>
        </div>
      </div>
    </footer>
  )
}
