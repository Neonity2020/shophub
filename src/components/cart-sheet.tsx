import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CartSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSheet({ isOpen, onClose }: CartSheetProps) {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id })
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
    }
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-lg">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <span className="sr-only">Close</span>
              ×
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">Your cart is empty</p>
                <Link href="/products">
                  <Button onClick={onClose}>Continue Shopping</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <Card key={item.product.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <h3 className="font-medium text-sm">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">${item.product.price}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeItem(item.product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {state.items.length > 0 && (
            <div className="border-t p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${(state.total * 0.08).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${(state.total * 1.08).toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout">
                <Button className="w-full" onClick={onClose}>
                  Proceed to Checkout
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="outline" className="w-full" onClick={onClose}>
                  View Cart
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}