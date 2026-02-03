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
    Crown,
    Zap,
    Star,
    Music,
    Download,
    Headphones,
    Sparkles,
    CheckCircle2,
    X
} from "lucide-react"

const plans = [
    {
        id: "free",
        name: "Free",
        price: 0,
        period: "siempre",
        icon: Zap,
        popular: false,
        features: [
            "10 generaciones/mes",
            "Géneros básicos",
            "Exportación MP3",
            "Licencia personal",
            "Marca de agua en audio"
        ],
        notIncluded: [
            "Stems por separado",
            "Acceso al marketplace",
            "Soporte prioritario"
        ]
    },
    {
        id: "pro",
        name: "Pro",
        price: 19.99,
        period: "mes",
        icon: Star,
        popular: true,
        features: [
            "Generaciones ilimitadas",
            "Todos los géneros y moods",
            "Exportación WAV + MP3",
            "Licencia comercial",
            "Sin marca de agua",
            "Stems por separado",
            "Acceso completo al marketplace",
            "Soporte prioritario"
        ],
        notIncluded: []
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: 99.99,
        period: "mes",
        icon: Crown,
        popular: false,
        features: [
            "Todo lo de Pro",
            "API access",
            "White-label",
            "Múltiples usuarios",
            "Account manager dedicado",
            "SLA garantizado",
            "Facturación personalizada"
        ],
        notIncluded: []
    }
]

export default function SubscribePage() {
    const [selectedPlan, setSelectedPlan] = useState("pro")
    const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")
    const [step, setStep] = useState<"select" | "payment" | "success">("select")
    const [isProcessing, setIsProcessing] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        cardNumber: "",
        expiry: "",
        cvc: "",
        name: "",
    })

    const selectedPlanData = plans.find(p => p.id === selectedPlan)!
    const yearlyDiscount = 0.20
    const finalPrice = billingPeriod === "yearly"
        ? selectedPlanData.price * 12 * (1 - yearlyDiscount)
        : selectedPlanData.price

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsProcessing(true)
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsProcessing(false)
        setStep("success")
    }

    // Success State
    if (step === "success") {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-10 w-10 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">¡Bienvenido a Sinter Pro!</h1>
                    <p className="text-muted-foreground mb-6">
                        Tu suscripción está activa. Ahora tienes acceso ilimitado a todas las funciones.
                    </p>

                    <div className="bg-card border border-border rounded-xl p-4 mb-6 text-left">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <Crown className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">Plan {selectedPlanData.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    ${finalPrice.toFixed(2)}/{billingPeriod === "yearly" ? "año" : "mes"}
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Tu próxima facturación será el 3 de Marzo, 2026
                        </p>
                    </div>

                    <Link href="/studio">
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            <Sparkles className="h-4 w-4 mr-2" />
                            Comenzar a crear música
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    // Payment Step
    if (step === "payment") {
        return (
            <div className="min-h-screen bg-background p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <button
                            onClick={() => setStep("select")}
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Cambiar plan
                        </button>
                        <div className="flex items-center gap-3">
                            <Lock className="h-6 w-6 text-green-500" />
                            <h1 className="text-2xl font-bold text-foreground">Completar suscripción</h1>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Payment Form */}
                        <div className="space-y-6">
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-foreground mb-4">Información de pago</h2>
                                <form onSubmit={handlePayment} className="space-y-4">
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
                                    </div>
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
                                            <Label htmlFor="expiry">Expiración</Label>
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

                                    <Button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 mt-4"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                                                Procesando...
                                            </>
                                        ) : (
                                            <>
                                                <Lock className="h-5 w-5 mr-2" />
                                                Suscribirse por ${finalPrice.toFixed(2)}/{billingPeriod === "yearly" ? "año" : "mes"}
                                            </>
                                        )}
                                    </Button>
                                </form>

                                <p className="text-xs text-center text-muted-foreground mt-4">
                                    Puedes cancelar en cualquier momento. Al suscribirte aceptas los{" "}
                                    <Link href="/terms" className="text-primary hover:underline">términos</Link>
                                </p>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-6">
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-foreground mb-4">Tu suscripción</h2>

                                <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-lg mb-6">
                                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                                        <selectedPlanData.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">Plan {selectedPlanData.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Facturación {billingPeriod === "yearly" ? "anual" : "mensual"}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-4">
                                    {selectedPlanData.features.slice(0, 5).map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Check className="h-4 w-4 text-green-500" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2 pt-4 border-t border-border">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Plan {selectedPlanData.name}</span>
                                        <span>${selectedPlanData.price}/mes</span>
                                    </div>
                                    {billingPeriod === "yearly" && (
                                        <div className="flex justify-between text-green-500">
                                            <span>Descuento anual (20%)</span>
                                            <span>-${(selectedPlanData.price * 12 * yearlyDiscount).toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between pt-2 border-t border-border">
                                        <span className="font-semibold text-foreground">Total</span>
                                        <span className="text-xl font-bold text-primary">
                                            ${finalPrice.toFixed(2)}/{billingPeriod === "yearly" ? "año" : "mes"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                                <ShieldCheck className="h-5 w-5 text-green-500" />
                                <div>
                                    <p className="text-sm font-medium text-foreground">Garantía de 7 días</p>
                                    <p className="text-xs text-muted-foreground">Reembolso completo sin preguntas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Plan Selection
    return (
        <div className="min-h-screen bg-background p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Volver al inicio
                    </Link>
                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                        Elige tu plan
                    </h1>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                        Desbloquea todo el potencial de Sinter con nuestros planes premium.
                        Cancela cuando quieras.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={() => setBillingPeriod("monthly")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${billingPeriod === "monthly"
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Mensual
                        </button>
                        <button
                            onClick={() => setBillingPeriod("yearly")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${billingPeriod === "yearly"
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Anual
                            <span className="ml-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                                -20%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative bg-card border rounded-2xl p-6 transition-all ${selectedPlan === plan.id
                                    ? "border-primary ring-2 ring-primary/20"
                                    : "border-border hover:border-muted-foreground"
                                } ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                                    Más popular
                                </div>
                            )}

                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${plan.id === "pro" ? "bg-primary/10" : "bg-secondary"
                                    }`}>
                                    <plan.icon className={`h-5 w-5 ${plan.id === "pro" ? "text-primary" : "text-muted-foreground"
                                        }`} />
                                </div>
                                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                            </div>

                            <div className="mb-6">
                                <span className="text-4xl font-bold text-foreground">
                                    ${billingPeriod === "yearly" && plan.price > 0
                                        ? (plan.price * 12 * (1 - yearlyDiscount) / 12).toFixed(2)
                                        : plan.price}
                                </span>
                                <span className="text-muted-foreground">/{plan.period}</span>
                                {billingPeriod === "yearly" && plan.price > 0 && (
                                    <p className="text-sm text-green-500 mt-1">
                                        Ahorras ${(plan.price * 12 * yearlyDiscount).toFixed(2)}/año
                                    </p>
                                )}
                            </div>

                            <ul className="space-y-3 mb-6">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm">
                                        <Check className="h-4 w-4 text-green-500" />
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                                {plan.notIncluded.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm opacity-50">
                                        <X className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                onClick={() => {
                                    setSelectedPlan(plan.id)
                                    if (plan.price > 0) setStep("payment")
                                }}
                                className={`w-full ${plan.id === "pro"
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                        : "bg-secondary text-foreground hover:bg-secondary/80"
                                    }`}
                            >
                                {plan.price === 0 ? "Comenzar gratis" : "Elegir plan"}
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    {[
                        { icon: Music, title: "Música ilimitada", desc: "Genera tantas pistas como quieras" },
                        { icon: Download, title: "Descarga HD", desc: "WAV y MP3 de alta calidad" },
                        { icon: Headphones, title: "Uso comercial", desc: "Licencia para proyectos comerciales" },
                        { icon: ShieldCheck, title: "Sin riesgo", desc: "Garantía de 7 días" }
                    ].map((item, i) => (
                        <div key={i} className="text-center p-6 bg-card border border-border rounded-xl">
                            <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                            <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* FAQ or Contact */}
                <div className="text-center">
                    <p className="text-muted-foreground">
                        ¿Tienes preguntas?{" "}
                        <Link href="#" className="text-primary hover:underline">Contacta con nosotros</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
