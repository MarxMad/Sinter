import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Marcus Chen",
    role: "Hip-Hop Producer",
    content: "Sinter has completely changed my workflow. I can generate unique beats in minutes and customize them to perfection. My production speed has tripled.",
    rating: 5
  },
  {
    name: "Sarah Williams",
    role: "EDM DJ",
    content: "The quality of the AI-generated tracks is incredible. I use Sinter for all my live sets now. The genre accuracy is spot-on.",
    rating: 5
  },
  {
    name: "David Rodriguez",
    role: "Music Producer",
    content: "I was skeptical at first, but the stems export feature sold me. Being able to take AI beats into my DAW and work with individual elements is amazing.",
    rating: 5
  }
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Loved by Artists Worldwide
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of musicians who trust Sinter for their creative process.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-card rounded-xl border border-border"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-6">
                {`"${testimonial.content}"`}
              </p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
