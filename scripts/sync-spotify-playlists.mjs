import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ENV_PATH = path.join(ROOT, '.env');
const OUTPUT_PATH = path.join(ROOT, 'src/data/playlists.generated.json');
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_PLAYLISTS_URL = 'https://api.spotify.com/v1/me/playlists';
// Only playlists owned by these Spotify user IDs are ever synced (nikhilesh suravarjjala, nik s).
const OWNER_IDS = new Set(JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/owners.json'), 'utf8')));

function loadEnvFile() {
  if (!fs.existsSync(ENV_PATH)) {
    return {};
  }

  const raw = fs.readFileSync(ENV_PATH, 'utf8');
  const entries = {};

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    entries[key] = value;
  }

  return entries;
}

function getEnv(name) {
  const fileEnv = loadEnvFile();
  return process.env[name] ?? fileEnv[name];
}

function requireEnv(name) {
  const value = getEnv(name);

  if (!value) {
    throw new Error(`Missing ${name}. Add it to .env or export it in your shell.`);
  }

  return value;
}

async function getAccessToken() {
  const clientId = requireEnv('SPOTIFY_CLIENT_ID');
  const clientSecret = requireEnv('SPOTIFY_CLIENT_SECRET');
  const refreshToken = requireEnv('SPOTIFY_REFRESH_TOKEN');

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(`Spotify refresh failed: ${JSON.stringify(payload, null, 2)}`);
  }

  return payload.access_token;
}

async function fetchSpotifyJson(url, accessToken) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(`Spotify API request failed for ${url}: ${JSON.stringify(payload, null, 2)}`);
  }

  return payload;
}

async function fetchAllPlaylists(accessToken) {
  const playlists = new Map();
  const limit = 50;
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const pageUrl = `${SPOTIFY_PLAYLISTS_URL}?limit=${limit}&offset=${offset}`;
    const page = await fetchSpotifyJson(pageUrl, accessToken);

    for (const playlist of page.items ?? []) {
      const ownerId = playlist.owner?.id ?? '';

      if (OWNER_IDS.has(ownerId)) {
        playlists.set(playlist.id, {
          spotifyId: playlist.id,
          title: playlist.name,
          description: playlist.description ?? '',
          spotifyUrl: playlist.external_urls?.spotify ?? `https://open.spotify.com/playlist/${playlist.id}`,
          isPublic: playlist.public ?? null,
          ownerDisplayName: playlist.owner?.display_name ?? '',
          ownerId,
          collaborative: playlist.collaborative ?? false,
          trackTotal: playlist.tracks?.total ?? null,
          syncedAt: new Date().toISOString(),
        });
      }
    }

    offset += page.items?.length ?? 0;
    hasMore = offset < (page.total ?? 0) && (page.items?.length ?? 0) > 0;
  }

  return [...playlists.values()].sort((a, b) => a.title.localeCompare(b.title));
}

async function main() {
  const accessToken = await getAccessToken();
  const playlists = await fetchAllPlaylists(accessToken);

  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(playlists, null, 2)}\n`);

  console.log(`Synced ${playlists.length} playlists to ${path.relative(ROOT, OUTPUT_PATH)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
