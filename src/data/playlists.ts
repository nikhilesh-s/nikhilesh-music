import generatedPlaylists from './playlists.generated.json';
import playlistMeta from './playlistMeta.json';

export type PlaylistCategory =
  | 'single-artist'
  | 'song-based'
  | 'bollywood'
  | 'tollywood'
  | 'vibes'
  | 'uncategorized';

export type PlaylistFilter = 'all' | PlaylistCategory;

interface GeneratedPlaylist {
  spotifyId: string;
  title: string;
  description: string;
  spotifyUrl: string;
  isPublic: boolean | null;
  ownerDisplayName: string;
  ownerId: string;
  collaborative: boolean;
  trackTotal: number | null;
  syncedAt: string;
}

interface PlaylistMeta {
  category?: PlaylistCategory;
  showOnPlaylistsPage?: boolean;
  featured?: boolean;
  featuredRank?: number;
  embedHeight?: number;
  titleOverride?: string;
  descriptionOverride?: string;
}

export interface SitePlaylist extends GeneratedPlaylist {
  category: PlaylistCategory;
  showOnPlaylistsPage: boolean;
  featured: boolean;
  featuredRank: number | null;
  embedHeight: number;
  isPublished: boolean;
}

const metaById = playlistMeta as Record<string, PlaylistMeta>;
const sourcePlaylists = generatedPlaylists as GeneratedPlaylist[];

export const playlists: SitePlaylist[] = sourcePlaylists.map((playlist) => {
  const meta = metaById[playlist.spotifyId] ?? {};
  const isPublished = playlist.isPublic === true;

  return {
    ...playlist,
    title: meta.titleOverride ?? playlist.title,
    description: meta.descriptionOverride ?? playlist.description,
    category: meta.category ?? 'uncategorized',
    showOnPlaylistsPage: meta.showOnPlaylistsPage ?? true,
    featured: meta.featured ?? false,
    featuredRank: meta.featuredRank ?? null,
    embedHeight: meta.embedHeight ?? 352,
    isPublished,
  };
});

export const featuredPlaylists = playlists
  .filter((playlist) => playlist.isPublished && playlist.featured)
  .sort((a, b) => {
    const aRank = a.featuredRank ?? Number.MAX_SAFE_INTEGER;
    const bRank = b.featuredRank ?? Number.MAX_SAFE_INTEGER;

    if (aRank !== bRank) {
      return aRank - bRank;
    }

    return a.title.localeCompare(b.title);
  });

export const playlistsPageItems = playlists.filter(
  (playlist) => playlist.isPublished && playlist.showOnPlaylistsPage
);

export const playlistFilters: Array<{ id: PlaylistFilter; label: string }> = [
  { id: 'all', label: 'all playlists' },
  { id: 'single-artist', label: 'single-artist' },
  { id: 'song-based', label: 'song-based' },
  { id: 'bollywood', label: 'bollywood / hindi pop' },
  { id: 'tollywood', label: 'tollywood' },
  { id: 'vibes', label: 'misc / vibes' },
  { id: 'uncategorized', label: 'uncategorized' },
];
