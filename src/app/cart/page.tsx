"use client"

import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, Trash2, ShoppingBag, Truck, Shield, RotateCcw, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { state, dispatch } = useCart()
  const { toast } = useToast()

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id })
      toast({
        title: "Item removed",
        description: "The item has been removed from your cart.",
        variant: "destructive",
      })
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
      toast({
        title: "Quantity updated",
        description: "Your cart has been updated.",
      })
    }
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
      variant: "destructive",
    })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
      variant: "destructive",
    })
  }

  const shipping = state.total >= 50 ? 0 : 9.99
  const tax = state.total * 0.08
  const total = state.total + shipping + tax

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Browse our products and add some items to get started.
          </p>
          <Link href="/products">
            <Button size="lg" className="group">
              Start Shopping
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ArrowRight className="h-4 w-4" />
        <span className="text-foreground">Shopping Cart</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">
              Shopping Cart ({state.items.reduce((total, item) => total + item.quantity, 0)} items)
            </h1>
            <Button variant="outline" size="sm" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>

          <div className="space-y-4">
            {state.items.map((item) => (
              <Card key={item.product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between">
                        <div>
                          <Link href={`/products/${item.product.id}`}>
                            <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="text-muted-foreground">{item.product.brand}</p>
                          {item.product.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="mt-2 mr-2">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${item.product.price} each
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>

                          <span className="w-12 text-center font-semibold">
                            {item.quantity}
                          </span>

                          <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Truck className="h-10 w-10 mx-auto mb-2 text-blue-600" />
                <h4 className="font-semibold">Free Shipping</h4>
                <p className="text-sm text-muted-foreground">On orders over $50</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Shield className="h-10 w-10 mx-auto mb-2 text-green-600" />
                <h4 className="font-semibold">Secure Payment</h4>
                <p className="text-sm text-muted-foreground">SSL Encrypted</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <RotateCcw className="h-10 w-10 mx-auto mb-2 text-purple-600" />
                <h4 className="font-semibold">Easy Returns</h4>
                <p className="text-sm text-muted-foreground">30-day policy</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Link href="/checkout">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              <div className="text-center">
                <Badge variant="secondary" className="mt-2">
                  {shipping === 0 ? "✓ Free shipping unlocked!" : `Add $${(50 - state.total).toFixed(2)} for free shipping`}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
