import { useState } from 'react';

type Category = 'all' | 'single-artist' | 'song-based' | 'bollywood' | 'tollywood' | 'vibes';

interface Playlist {
  title: string;
  spotifyId: string;
  category: Category;
}

export default function Playlists() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const playlists: Playlist[] = [
    { title: 'cloudy rocky', spotifyId: '3vbH9PSznBzY6gB3NdgUU9', category: 'single-artist' },
    { title: 'tecca merchant 🤓☝🏾', spotifyId: '4V1x3xaaMSq30P6Tv0fcRx', category: 'single-artist' },
    { title: 'bandits', spotifyId: '1Z3dQQp1MfohVu6KSWmBdP', category: 'single-artist' },
    { title: 'cHase sHakur', spotifyId: '3vXqN481qLojxVnY1MKdpx', category: 'single-artist' },

    { title: 'test of time', spotifyId: '3T7TiVyk3GgaoABrdRGEV2', category: 'song-based' },
    { title: 'yes', spotifyId: '23EeVuTo5zXt8bfrcY9oAC', category: 'song-based' },
    { title: 'silkncolognesilkncologne', spotifyId: '1DmKJDVkBstrL4bDJdHEXE', category: 'song-based' },
    { title: 'unlimited', spotifyId: '1ZtjlCoto84FYzC40zO48U', category: 'song-based' },
    { title: 'outsidee', spotifyId: '1SqHYqwT17HBnt4nrVh4da', category: 'song-based' },
    { title: 'yamborghini 🐂', spotifyId: '4mfi177VOFoFw0EG8XakTa', category: 'song-based' },
    { title: 'dumbo 😛', spotifyId: '4VJmdm3a6rXJdyr0OmceYn', category: 'song-based' },
    { title: 'hawktuah matata', spotifyId: '4ZBSvBigtliV6cEdx9QoCr', category: 'song-based' },
    { title: 'my lil demon', spotifyId: '2XAKVhEtU61A5nMTbvCZ94', category: 'song-based' },
    { title: 'burn+ vibes', spotifyId: '1T12xrEWVzqpGSwvGA7oYu', category: 'song-based' },

    { title: 'war inspired bolly bangers', spotifyId: '2UMNaaaD9nPnmwWWJe9ylT', category: 'bollywood' },
    { title: 'lit bollyy', spotifyId: '3At3hUSZ7G7vggupik445P', category: 'bollywood' },
    { title: 'chill bolly/tollywood', spotifyId: '1v5BgDKsYWIZJCTEE5lFT2', category: 'bollywood' },
    { title: 'dil lagda hai', spotifyId: '6wy9A3ETRJW5DkpibOq4kC', category: 'bollywood' },
    { title: 'hype bolly/tollywood', spotifyId: '26y4DuyBXfthkB4bcg8oS3', category: 'bollywood' },
    { title: 'देसी प्यार का सौंदर्य', spotifyId: '3H0k5kvdIZbKgudy0pKYXz', category: 'bollywood' },
    { title: 'hindi bops', spotifyId: '4K2tq0dGnQv7uNrOFkiBWU', category: 'bollywood' },

    { title: 'mass paatalu', spotifyId: '0b0IETDCMBvjfUebZLMWCB', category: 'tollywood' },
    { title: 'sufi pataalu', spotifyId: '115HnPCBlJRfrKUDtd3Sfc', category: 'tollywood' },

    { title: 'indie flow state', spotifyId: '1Gqj6NyNdhsBx0o0b4Nw18', category: 'vibes' },
    { title: 'soft boy vibes', spotifyId: '1UsSqSFPOkovneUT7lBN73', category: 'vibes' },
    { title: 'east coast lyricism', spotifyId: '6weypY8xXdljAujojxrH76', category: 'vibes' },
    { title: 'pfs (fweah)', spotifyId: '54iz2xTfLA0l78nBmK0972', category: 'vibes' },
    { title: 'drift mode', spotifyId: '5r057Nl6g5DrsklejRj22x', category: 'vibes' },
    { title: 'chill late night rapnb', spotifyId: '6fZ67hdy5pF4WPUH7ZlCyR', category: 'vibes' },
    { title: 'late night songs 🤑🍾', spotifyId: '6UPqprWFNO1ZILrdwBOPXH', category: 'vibes' },
    { title: 'wibey', spotifyId: '3Od4zdbgpDhZM4f6ZVnlIt', category: 'vibes' },
    { title: 'house rnb', spotifyId: '3QsZzay5Y7I2neZd5xUya8', category: 'vibes' },
    { title: 'midnight frequency', spotifyId: '6Skq6E8UZXvMz8rGyffPbp', category: 'vibes' },
    { title: 'vibe rollercoaster 📈📉', spotifyId: '1uYmf41nHmIgo3BBlFakbY', category: 'vibes' },
    { title: 'afrobeats?', spotifyId: '03KUKhu7SYlRWX0MgjDMYW', category: 'vibes' },
  ];

  const categories = [
    { id: 'all' as Category, label: 'all playlists' },
    { id: 'single-artist' as Category, label: 'single-artist' },
    { id: 'song-based' as Category, label: 'song-based' },
    { id: 'bollywood' as Category, label: 'bollywood / hindi pop' },
    { id: 'tollywood' as Category, label: 'tollywood' },
    { id: 'vibes' as Category, label: 'misc / vibes' },
  ];

  const filteredPlaylists = selectedCategory === 'all'
    ? playlists
    : playlists.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <section className="mb-12">
          <h1 className="text-3xl font-light text-gray-400 mb-3">playlists</h1>
          <p className="text-sm font-light text-gray-600 leading-relaxed mb-8">
            collections of songs for different moods and moments
          </p>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-light transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-pink-500/20 text-pink-400/90 border border-pink-500/40 shadow-[0_0_20px_rgba(244,114,182,0.2)]'
                    : 'bg-gray-900/30 text-gray-500 border border-gray-800/50 hover:border-green-500/30 hover:text-green-400/80 hover:bg-gray-900/50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaylists.map((playlist, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-[#1a1f35]/40 to-[#0f1219]/40 rounded-2xl p-6 transition-all duration-500 hover:from-[#1a1f35]/60 hover:to-[#0f1219]/60 backdrop-blur-sm border border-gray-800/30 hover:border-green-500/20 hover:shadow-[0_0_30px_rgba(74,222,128,0.1)]"
            >
              <h2 className="text-xl font-light text-gray-400 mb-6 transition-colors duration-300 group-hover:text-green-400/80">
                {playlist.title}
              </h2>
              <div className="w-full rounded-lg overflow-hidden">
                <iframe
                  style={{ borderRadius: '12px' }}
                  src={`https://open.spotify.com/embed/playlist/${playlist.spotifyId}?utm_source=generator`}
                  width="100%"
                  height="352"
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

        {filteredPlaylists.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg font-light text-gray-600">no playlists in this category yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
