# Nikhilesh Music

This site now reads playlist content from Spotify-generated data in `src/data/playlists.generated.json`.
Manual curation stays in `src/data/playlistMeta.json` so you can keep homepage features and custom categories.

## Local Spotify setup

1. Create a Spotify app at `https://developer.spotify.com/dashboard`.
2. Add `http://127.0.0.1:8888/callback` as a Redirect URI in the Spotify app settings.
3. Copy `.env.example` to `.env`.
4. Fill in `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`.
5. Generate the auth URL:

```bash
npm run spotify:auth:url
```

6. Open the printed URL, approve access, and copy the `code` value from the redirect URL.
7. Exchange the code for a refresh token and save it to `.env`:

```bash
npm run spotify:auth:exchange -- --code=PASTE_CODE_HERE --save
```

8. Pull your playlists from Spotify:

```bash
npm run spotify:sync
```

## Ongoing updates

If your site redeploys on every push, the included GitHub Actions workflow can keep playlist data current automatically.

Add these GitHub repository secrets:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`
- `SPOTIFY_ONLY_OWNER` with `true` or `false`

Then enable GitHub Actions. The workflow runs daily and can also be triggered manually.

## Manual curation

- Edit `src/data/playlistMeta.json` to set categories, homepage featured playlists, and embed heights.
- Public playlists from Spotify will appear automatically as `uncategorized` unless you tag them in that file.
- Private playlists are never published to the site even if they exist in synced Spotify data.
- `showOnPlaylistsPage: false` keeps a playlist available for featured sections without listing it on the main playlists page.
