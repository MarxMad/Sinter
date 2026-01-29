export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Elige tu género",
      description: "Selecciona entre más de 20 géneros y define BPM, tonalidad y ambiente."
    },
    {
      step: "02",
      title: "Genera con IA",
      description: "Nuestra IA crea beats y melodías únicos según tus parámetros en segundos."
    },
    {
      step: "03",
      title: "Edita y refina",
      description: "Usa nuestro editor profesional para afinar cada aspecto de tu pista."
    },
    {
      step: "04",
      title: "Exporta o vende",
      description: "Descarga en varios formatos o publica en el marketplace para generar ingresos."
    }
  ]

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Cómo funciona
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Crea música profesional en cuatro pasos sencillos.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border -translate-x-1/2" />
              )}
              <div className="text-5xl font-bold text-primary/20 mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
