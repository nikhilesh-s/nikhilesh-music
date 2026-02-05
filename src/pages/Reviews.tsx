export default function Reviews() {
  const sampleReview = {
    album: 'Across the Spider-Verse (Soundtrack)',
    artist: 'Metro Boomin',
    text: "this album feels like falling through dimensions. every track has this weight to it that matches the film perfectly — dark, layered, glitchy but emotional. metro really understood the assignment. the production is dense but never overwhelming, letting each moment breathe while keeping you suspended in this huge, cinematic space. it's an album that rewards repeated listens.",
    favoriteTrack: 'Annihilate (feat. Swae Lee, Lil Wayne & Offset)',
    moods: ['cinematic', 'dark', 'layered', 'atmospheric'],
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <section className="mb-16">
          <h1 className="text-3xl font-light text-gray-400 mb-4">album reviews</h1>
          <p className="text-base font-light text-gray-600 leading-relaxed">
            short thoughts on albums i've been listening to.
            <br />
            not deep criticism — just how they felt to me.
          </p>
        </section>

        <div className="space-y-8">
          <article className="group relative bg-gradient-to-br from-[#1a1f35]/40 to-[#0f1219]/40 rounded-2xl p-8 transition-all duration-500 hover:from-[#1a1f35]/60 hover:to-[#0f1219]/60 backdrop-blur-sm border border-gray-800/30 hover:border-pink-500/20 hover:shadow-[0_0_30px_rgba(244,114,182,0.1)]">
            <div className="mb-6">
              <h2 className="text-2xl font-light text-gray-300 mb-2 transition-colors duration-300 group-hover:text-pink-400/80">
                {sampleReview.album}
              </h2>
              <p className="text-base font-light text-gray-600">{sampleReview.artist}</p>
            </div>

            <p className="text-base font-light text-gray-500 leading-relaxed mb-6">
              {sampleReview.text}
            </p>

            <div className="mb-6">
              <span className="text-sm font-light text-gray-600">favorite track: </span>
              <span className="text-sm font-light text-green-400/80">
                {sampleReview.favoriteTrack}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {sampleReview.moods.map((mood, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-light bg-gray-900/50 text-gray-500 border border-gray-800/50 transition-all duration-300 hover:border-green-500/30 hover:text-green-400/80"
                >
                  {mood}
                </span>
              ))}
            </div>
          </article>

          <div className="text-center py-12">
            <p className="text-sm font-light text-gray-700">more reviews coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
