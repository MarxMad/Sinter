"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    ArrowLeft,
    Trash2,
    ShoppingCart,
    Music2,
    Tag,
    CreditCard,
    ShieldCheck,
    X,
    Plus,
    Minus
} from "lucide-react"

// Mock cart data
const initialCartItems = [
    {
        id: "1",
        name: "Boulevard al atardecer",
        artist: "ProducerX",
        genre: "Lo-Fi",
        license: "Standard",
        price: 29.99,
    },
    {
        id: "2",
        name: "Night Rider",
        artist: "BeatMaster",
        genre: "Trap",
        license: "Premium",
        price: 99.99,
    },
    {
        id: "5",
        name: "Club Banger",
        artist: "DJMix",
        genre: "House",
        license: "Standard",
        price: 44.99,
    }
]

export default function CartPage() {
    const [cartItems, setCartItems] = useState(initialCartItems)
    const [promoCode, setPromoCode] = useState("")
    const [promoApplied, setPromoApplied] = useState(false)

    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
    const discount = promoApplied ? subtotal * 0.1 : 0
    const total = subtotal - discount

    const removeItem = (id: string) => {
        setCartItems(items => items.filter(item => item.id !== id))
    }

    const applyPromo = () => {
        if (promoCode.toLowerCase() === "sinter10") {
            setPromoApplied(true)
        }
    }

    if (cartItems.length === 0) {
        return (
            <div className="p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingCart className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-4">Tu carrito está vacío</h1>
                    <p className="text-muted-foreground mb-8">
                        Explora el marketplace y encuentra beats increíbles para tu próximo proyecto.
                    </p>
                    <Link href="/studio/marketplace">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                            <Music2 className="h-4 w-4 mr-2" />
                            Explorar marketplace
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/studio/marketplace"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Continuar comprando
                </Link>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-foreground">Tu carrito</h1>
                    <span className="px-2.5 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                    </span>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"
                        >
                            {/* Track Icon */}
                            <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-purple-600/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Music2 className="h-8 w-8 text-primary" />
                            </div>

                            {/* Track Info */}
                            <div className="flex-1 min-w-0">
                                <Link
                                    href={`/studio/marketplace/${item.id}`}
                                    className="font-semibold text-foreground hover:text-primary transition-colors"
                                >
                                    {item.name}
                                </Link>
                                <p className="text-sm text-muted-foreground">{item.artist}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded">
                                        {item.genre}
                                    </span>
                                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">
                                        {item.license}
                                    </span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                                <p className="text-lg font-bold text-foreground">${item.price}</p>
                            </div>

                            {/* Remove Button */}
                            <button
                                onClick={() => removeItem(item.id)}
                                className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    ))}

                    {/* Promo Code */}
                    <div className="bg-card border border-border rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Tag className="h-5 w-5 text-primary" />
                            <span className="font-medium text-foreground">Código promocional</span>
                        </div>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                placeholder="Ingresa tu código"
                                disabled={promoApplied}
                                className="flex-1 h-10 px-4 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground disabled:opacity-50"
                            />
                            <Button
                                onClick={applyPromo}
                                disabled={promoApplied || !promoCode}
                                variant="outline"
                                className="border-border text-foreground hover:bg-secondary bg-transparent"
                            >
                                {promoApplied ? "Aplicado" : "Aplicar"}
                            </Button>
                        </div>
                        {promoApplied && (
                            <p className="text-sm text-green-500 mt-2 flex items-center gap-1">
                                <ShieldCheck className="h-4 w-4" />
                                Código SINTER10 aplicado - 10% de descuento
                            </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">
                            Prueba: &quot;SINTER10&quot; para 10% de descuento
                        </p>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                    <div className="bg-card border border-border rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-foreground mb-4">Resumen del pedido</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Subtotal ({cartItems.length} items)</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            {promoApplied && (
                                <div className="flex justify-between text-green-500">
                                    <span>Descuento (10%)</span>
                                    <span>-${discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-muted-foreground">
                                <span>Impuestos</span>
                                <span>$0.00</span>
                            </div>
                            <div className="border-t border-border pt-3 flex justify-between">
                                <span className="text-lg font-semibold text-foreground">Total</span>
                                <span className="text-lg font-bold text-primary">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link href="/studio/marketplace/checkout">
                            <Button className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90">
                                <CreditCard className="h-5 w-5 mr-2" />
                                Proceder al pago
                            </Button>
                        </Link>
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-card border border-border rounded-xl p-4">
                        <p className="text-sm text-muted-foreground mb-3">Métodos de pago aceptados</p>
                        <div className="flex gap-2">
                            {["Visa", "MC", "Amex", "PayPal", "Crypto"].map((method) => (
                                <div key={method} className="px-3 py-1.5 bg-secondary rounded text-xs text-muted-foreground">
                                    {method}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Security Info */}
                    <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <ShieldCheck className="h-5 w-5 text-green-500" />
                        <div>
                            <p className="text-sm font-medium text-foreground">Pago 100% seguro</p>
                            <p className="text-xs text-muted-foreground">Tus datos están encriptados</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
