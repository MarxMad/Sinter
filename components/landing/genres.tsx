const genres = [
  { name: "Hip-Hop", tracks: "12.5K" },
  { name: "EDM", tracks: "8.3K" },
  { name: "House", tracks: "7.2K" },
  { name: "Trap", tracks: "9.8K" },
  { name: "R&B", tracks: "5.4K" },
  { name: "Lo-Fi", tracks: "11.2K" },
  { name: "Techno", tracks: "6.1K" },
  { name: "Drill", tracks: "4.7K" },
  { name: "Reggaeton", tracks: "3.9K" },
  { name: "Pop", tracks: "8.6K" },
  { name: "Ambient", tracks: "2.8K" },
  { name: "Jazz", tracks: "1.9K" },
]

export function Genres() {
  return (
    <section id="genres" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Generate Any Genre
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From Hip-Hop to Ambient, our AI understands the nuances of every style.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {genres.map((genre, index) => (
            <div
              key={index}
              className="group p-6 bg-card rounded-xl border border-border hover:border-primary transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {genre.name}
                </h3>
                <span className="text-sm text-muted-foreground">{genre.tracks}</span>
              </div>
              <div className="mt-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-1 rounded-full bg-border group-hover:bg-primary/50 transition-colors"
                    style={{ opacity: 1 - i * 0.15 }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
