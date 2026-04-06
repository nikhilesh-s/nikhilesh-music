import { useState } from 'react';
import { playlistFilters, playlistsPageItems, type PlaylistFilter } from '../data/playlists';

export default function Playlists() {
  const [selectedCategory, setSelectedCategory] = useState<PlaylistFilter>('all');

  const filteredPlaylists = selectedCategory === 'all'
    ? playlistsPageItems
    : playlistsPageItems.filter((playlist) => playlist.category === selectedCategory);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <section className="mb-12">
          <h1 className="text-3xl font-light text-gray-400 mb-3">playlists</h1>
          <p className="text-sm font-light text-gray-600 leading-relaxed mb-8">
            synced from spotify, with manual tags for the sections you care about
          </p>

          <div className="flex flex-wrap gap-3">
            {playlistFilters.map((category) => (
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
