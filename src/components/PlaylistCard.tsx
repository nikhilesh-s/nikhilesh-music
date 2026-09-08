import { useEffect, useState } from 'react';
import { ExternalLink, Check } from 'lucide-react';
import type { SitePlaylist } from '../data/playlists';

interface PlaylistCardProps {
  playlist: SitePlaylist;
  index: number;
  accent: 'pink' | 'green';
  height?: number;
  padding?: string;
}

const accents = {
  pink: {
    border: 'hover:border-pink-500/30 hover:shadow-[0_0_30px_rgba(244,114,182,0.15)]',
    title: 'group-hover:text-pink-400/90',
    link: 'hover:text-pink-400/90 hover:bg-pink-500/10',
    flash: 'card-flash-pink',
    chip: 'text-pink-400/90 bg-pink-500/15 border-pink-500/30',
  },
  green: {
    border: 'hover:border-green-500/30 hover:shadow-[0_0_30px_rgba(74,222,128,0.15)]',
    title: 'group-hover:text-green-400/90',
    link: 'hover:text-green-400/90 hover:bg-green-500/10',
    flash: 'card-flash-green',
    chip: 'text-green-400/90 bg-green-500/15 border-green-500/30',
  },
};

export default function PlaylistCard({ playlist, index, accent, height = 352, padding = 'p-6' }: PlaylistCardProps) {
  const [opened, setOpened] = useState(false);
  const a = accents[accent];

  useEffect(() => {
    if (!opened) return;
    const id = window.setTimeout(() => setOpened(false), 1800);
    return () => window.clearTimeout(id);
  }, [opened]);

  return (
    <div
      style={{ animationDelay: `${Math.min(index, 12) * 60}ms` }}
      className={`card-enter group relative bg-gradient-to-br from-[#1a1f35]/40 to-[#0f1219]/40 rounded-2xl ${padding} transition-all duration-500 ease-out hover:from-[#1a1f35]/60 hover:to-[#0f1219]/60 hover:-translate-y-1 backdrop-blur-sm border border-gray-800/30 ${a.border} ${opened ? a.flash : ''}`}
    >
      <div className="flex items-start justify-between gap-3 mb-6">
        <h2 className={`text-xl font-light text-gray-400 transition-colors duration-300 ${a.title}`}>
          {playlist.title}
        </h2>
        <a
          href={playlist.spotifyUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => setOpened(true)}
          aria-label={`open ${playlist.title} in spotify`}
          className={`shrink-0 rounded-full p-2 text-gray-600 transition-all duration-300 ease-out hover:scale-110 active:scale-90 ${a.link}`}
        >
          <ExternalLink size={16} strokeWidth={1.5} />
        </a>
      </div>

      {opened && (
        <span
          role="status"
          className={`chip-pop pointer-events-none absolute top-3 right-12 flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-light ${a.chip}`}
        >
          <Check size={12} strokeWidth={2} />
          opened in spotify
        </span>
      )}

      <div className="w-full rounded-lg overflow-hidden">
        <iframe
          style={{ borderRadius: '12px' }}
          src={`https://open.spotify.com/embed/playlist/${playlist.spotifyId}?utm_source=generator`}
          width="100%"
          height={height}
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title={playlist.title}
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
