export default function Home() {
  const featuredPlaylists = [
    {
      title: 'pfs',
      description: '',
      spotifyId: '54iz2xTfLA0l78nBmK0972',
    },
    {
      title: 'unlimited',
      description: '',
      spotifyId: '1ZtjlCoto84FYzC40zO48U',
    },
    {
      title: 'burn+ vibes',
      description: '',
      spotifyId: '1T12xrEWVzqpGSwvGA7oYu',
    },
    {
      title: 'silkncolognesilkncologne',
      description: '',
      spotifyId: '1DmKJDVkBstrL4bDJdHEXE',
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <section className="mb-24 space-y-12">
          <div className="space-y-4">
            <h1 className="text-2xl font-light text-gray-400 leading-relaxed">
              hey i'm nikhilesh :)
              <br />
              i like listening to music a lot, literally all the time
              <br />
              this is where i keep the stuff that sticks w/me.
            </h1>
          </div>

          <div className="space-y-4 pt-8">
            <h2 className="text-xl font-light text-gray-500 leading-relaxed">
              music matters a lot to me because it's one of the easiest ways for me to feel
              understood without having to explain anything
              <br />
              it helps me slow down, notice patterns, and connect with people
            </h2>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-light text-gray-500 mb-8 tracking-wide">
            featured playlists
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPlaylists.map((playlist, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-[#1a1f35]/40 to-[#0f1219]/40 rounded-2xl p-8 transition-all duration-500 hover:from-[#1a1f35]/60 hover:to-[#0f1219]/60 backdrop-blur-sm border border-gray-800/30 hover:border-pink-500/20 hover:shadow-[0_0_30px_rgba(244,114,182,0.1)]"
              >
                <h4 className="text-xl font-light text-gray-400 mb-6 transition-colors duration-300 group-hover:text-pink-400/80">
                  {playlist.title}
                </h4>
                <div className="w-full rounded-lg overflow-hidden">
                  <iframe
                    style={{ borderRadius: '12px' }}
                    src={`https://open.spotify.com/embed/playlist/${playlist.spotifyId}?utm_source=generator`}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={playlist.title}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
