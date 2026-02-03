"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    ArrowLeft,
    CreditCard,
    Lock,
    ShieldCheck,
    Check,
    Music2,
    Wallet,
    Banknote,
    ChevronRight,
    CheckCircle2
} from "lucide-react"

// Mock cart summary
const cartSummary = {
    items: [
        { id: "1", name: "Boulevard al atardecer", license: "Standard", price: 29.99 },
        { id: "2", name: "Night Rider", license: "Premium", price: 99.99 },
        { id: "5", name: "Club Banger", license: "Standard", price: 44.99 },
    ],
    subtotal: 174.97,
    discount: 17.50,
    total: 157.47
}

const paymentMethods = [
    { id: "card", name: "Tarjeta de crédito/débito", icon: CreditCard },
    { id: "paypal", name: "PayPal", icon: Wallet },
    { id: "crypto", name: "Criptomonedas", icon: Banknote },
]

export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState("card")
    const [isProcessing, setIsProcessing] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        cardNumber: "",
        expiry: "",
        cvc: "",
        name: "",
        country: "México",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsProcessing(true)

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000))

        setIsProcessing(false)
        setIsComplete(true)
    }

    if (isComplete) {
        return (
            <div className="p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-10 w-10 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">¡Pago exitoso!</h1>
                    <p className="text-muted-foreground mb-6">
                        Tu compra ha sido procesada correctamente. Recibirás un email con los detalles y links de descarga.
                    </p>

                    <div className="bg-card border border-border rounded-xl p-4 mb-6 text-left">
                        <p className="text-sm text-muted-foreground mb-2">Orden #SIN-2026-0847</p>
                        <div className="space-y-2">
                            {cartSummary.items.map(item => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-foreground">{item.name}</span>
                                    <span className="text-muted-foreground">${item.price}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-border mt-3 pt-3 flex justify-between">
                            <span className="font-semibold text-foreground">Total pagado</span>
                            <span className="font-bold text-primary">${cartSummary.total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Link href="/studio/library" className="flex-1">
                            <Button variant="outline" className="w-full border-border text-foreground hover:bg-secondary bg-transparent">
                                Ir a mi biblioteca
                            </Button>
                        </Link>
                        <Link href="/studio/marketplace" className="flex-1">
                            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                Seguir comprando
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/studio/marketplace/cart"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver al carrito
                </Link>
                <div className="flex items-center gap-3">
                    <Lock className="h-6 w-6 text-green-500" />
                    <h1 className="text-2xl font-bold text-foreground">Checkout seguro</h1>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Payment Form */}
                <div className="space-y-6">
                    {/* Email */}
                    <div className="bg-card border border-border rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-foreground mb-4">Información de contacto</h2>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData(f => ({ ...f, email: e.target.value }))}
                                placeholder="tu@email.com"
                                className="bg-secondary border-border text-foreground"
                            />
                            <p className="text-xs text-muted-foreground">
                                Recibirás los links de descarga en este email
                            </p>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-card border border-border rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-foreground mb-4">Método de pago</h2>
                        <div className="space-y-3 mb-6">
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => setPaymentMethod(method.id)}
                                    className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${paymentMethod === method.id
                                            ? "bg-primary/10 border-2 border-primary"
                                            : "bg-secondary hover:bg-secondary/80 border-2 border-transparent"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <method.icon className={`h-5 w-5 ${paymentMethod === method.id ? 'text-primary' : 'text-muted-foreground'}`} />
                                        <span className="font-medium text-foreground">{method.name}</span>
                                    </div>
                                    {paymentMethod === method.id && (
                                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                            <Check className="h-3 w-3 text-primary-foreground" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Card Form */}
                        {paymentMethod === "card" && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cardNumber">Número de tarjeta</Label>
                                    <Input
                                        id="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={(e) => setFormData(f => ({ ...f, cardNumber: e.target.value }))}
                                        placeholder="4242 4242 4242 4242"
                                        className="bg-secondary border-border text-foreground"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiry">Fecha de expiración</Label>
                                        <Input
                                            id="expiry"
                                            value={formData.expiry}
                                            onChange={(e) => setFormData(f => ({ ...f, expiry: e.target.value }))}
                                            placeholder="MM/AA"
                                            className="bg-secondary border-border text-foreground"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvc">CVC</Label>
                                        <Input
                                            id="cvc"
                                            value={formData.cvc}
                                            onChange={(e) => setFormData(f => ({ ...f, cvc: e.target.value }))}
                                            placeholder="123"
                                            className="bg-secondary border-border text-foreground"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre en la tarjeta</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))}
                                        placeholder="Como aparece en la tarjeta"
                                        className="bg-secondary border-border text-foreground"
                                    />
                                </div>
                            </div>
                        )}

                        {paymentMethod === "paypal" && (
                            <div className="p-6 bg-secondary rounded-lg text-center">
                                <p className="text-muted-foreground mb-4">
                                    Serás redirigido a PayPal para completar el pago
                                </p>
                                <div className="text-2xl font-bold text-blue-500">PayPal</div>
                            </div>
                        )}

                        {paymentMethod === "crypto" && (
                            <div className="p-6 bg-secondary rounded-lg text-center">
                                <p className="text-muted-foreground mb-4">
                                    Acepta pago en múltiples criptomonedas
                                </p>
                                <div className="flex justify-center gap-4 text-xl">
                                    <span>₿</span>
                                    <span>Ξ</span>
                                    <span>◎</span>
                                    <span>XLM</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        onClick={handleSubmit}
                        disabled={isProcessing}
                        className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        {isProcessing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                                Procesando...
                            </>
                        ) : (
                            <>
                                <Lock className="h-5 w-5 mr-2" />
                                Pagar ${cartSummary.total.toFixed(2)}
                            </>
                        )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                        Al completar la compra, aceptas nuestros{" "}
                        <Link href="/terms" className="text-primary hover:underline">términos de servicio</Link>
                        {" "}y{" "}
                        <Link href="/licenses" className="text-primary hover:underline">licencias</Link>
                    </p>
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                    <div className="bg-card border border-border rounded-xl p-6 sticky top-6">
                        <h2 className="text-lg font-semibold text-foreground mb-4">Resumen del pedido</h2>

                        {/* Items */}
                        <div className="space-y-3 mb-6">
                            {cartSummary.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-purple-600/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Music2 className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-foreground truncate">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">Licencia {item.license}</p>
                                    </div>
                                    <span className="font-medium text-foreground">${item.price}</span>
                                </div>
                            ))}
                        </div>

                        {/* Totals */}
                        <div className="space-y-2 pt-4 border-t border-border">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Subtotal</span>
                                <span>${cartSummary.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-green-500">
                                <span>Descuento</span>
                                <span>-${cartSummary.discount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-border">
                                <span className="text-lg font-semibold text-foreground">Total</span>
                                <span className="text-xl font-bold text-primary">${cartSummary.total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Security */}
                        <div className="mt-6 flex items-center gap-3 p-3 bg-green-500/10 rounded-lg">
                            <ShieldCheck className="h-5 w-5 text-green-500" />
                            <div>
                                <p className="text-sm font-medium text-foreground">Pago seguro SSL</p>
                                <p className="text-xs text-muted-foreground">Datos encriptados de extremo a extremo</p>
                            </div>
                        </div>
                    </div>

                    {/* Help */}
                    <div className="bg-card border border-border rounded-xl p-4">
                        <p className="text-sm text-muted-foreground mb-3">¿Necesitas ayuda?</p>
                        <Link
                            href="#"
                            className="flex items-center justify-between text-sm text-foreground hover:text-primary transition-colors"
                        >
                            <span>Contactar soporte</span>
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
