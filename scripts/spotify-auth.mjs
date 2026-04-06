import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ENV_PATH = path.join(ROOT, '.env');
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

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

function getEnv(name, fallback = undefined) {
  const fileEnv = loadEnvFile();
  return process.env[name] ?? fileEnv[name] ?? fallback;
}

function getArg(flagName) {
  const exact = `--${flagName}`;
  const prefix = `${exact}=`;

  for (const arg of process.argv.slice(3)) {
    if (arg === exact) {
      return true;
    }

    if (arg.startsWith(prefix)) {
      return arg.slice(prefix.length);
    }
  }

  return undefined;
}

function requireEnv(name) {
  const value = getEnv(name);

  if (!value) {
    throw new Error(`Missing ${name}. Add it to .env or export it in your shell.`);
  }

  return value;
}

function upsertEnv(key, value) {
  const current = fs.existsSync(ENV_PATH) ? fs.readFileSync(ENV_PATH, 'utf8') : '';
  const lines = current ? current.split(/\r?\n/) : [];
  let replaced = false;

  const nextLines = lines.map((line) => {
    if (line.startsWith(`${key}=`)) {
      replaced = true;
      return `${key}=${value}`;
    }

    return line;
  });

  if (!replaced) {
    if (nextLines.length > 0 && nextLines[nextLines.length - 1] !== '') {
      nextLines.push('');
    }

    nextLines.push(`${key}=${value}`);
  }

  fs.writeFileSync(ENV_PATH, `${nextLines.join('\n').replace(/\n*$/, '\n')}`);
}

async function createAuthUrl() {
  const clientId = requireEnv('SPOTIFY_CLIENT_ID');
  const redirectUri = getEnv('SPOTIFY_REDIRECT_URI', 'http://127.0.0.1:8888/callback');
  const state = getArg('state') || Math.random().toString(36).slice(2, 14);
  const scope =
    getArg('scope') || 'playlist-read-private playlist-read-collaborative';

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
    state,
    show_dialog: 'true',
  });

  console.log('\nOpen this URL in your browser and approve access:\n');
  console.log(`${SPOTIFY_AUTH_URL}?${params.toString()}\n`);
  console.log('After approval, copy the `code` query parameter from the redirect URL.');
}

async function exchangeCode() {
  const clientId = requireEnv('SPOTIFY_CLIENT_ID');
  const clientSecret = requireEnv('SPOTIFY_CLIENT_SECRET');
  const redirectUri = getEnv('SPOTIFY_REDIRECT_URI', 'http://127.0.0.1:8888/callback');
  const code = getArg('code');
  const shouldSave = Boolean(getArg('save'));

  if (!code || typeof code !== 'string') {
    throw new Error('Missing --code=<spotify_authorization_code>.');
  }

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
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
    throw new Error(`Spotify token exchange failed: ${JSON.stringify(payload, null, 2)}`);
  }

  if (!payload.refresh_token) {
    throw new Error('Spotify did not return a refresh token.');
  }

  console.log('\nRefresh token:\n');
  console.log(`${payload.refresh_token}\n`);

  if (shouldSave) {
    upsertEnv('SPOTIFY_REFRESH_TOKEN', payload.refresh_token);
    console.log('Saved SPOTIFY_REFRESH_TOKEN to .env');
  } else {
    console.log('Re-run with `--save` to store it in .env automatically.');
  }
}

async function main() {
  const command = process.argv[2];

  if (command === 'auth-url') {
    await createAuthUrl();
    return;
  }

  if (command === 'exchange') {
    await exchangeCode();
    return;
  }

  console.error('Usage:');
  console.error('  node scripts/spotify-auth.mjs auth-url');
  console.error('  node scripts/spotify-auth.mjs exchange --code=<code> [--save]');
  process.exit(1);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
