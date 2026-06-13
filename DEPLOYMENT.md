# Bruniverse Deployment

## Project Type

Bruniverse is a full-stack Node application:

- Frontend: Vite + React multi-page static site.
- Backend: Express API in `server.mjs`.
- Storage: JSON files under `BRUNIVERSE_DATA_DIR`.
- AI: DeepSeek or OpenAI through server-side environment variables.

Because the backend writes workspace and user data to disk, the full product is better suited to Render or Railway than Vercel serverless. Vercel can host the static frontend only, but the current product needs the Express API and persistent storage.

## Files That Must Not Be Uploaded

The following are ignored by Git:

- `.env`
- `.env.local`
- `/data/`
- `dist/`
- `node_modules/`

Use `.env.example` as the public template. Put real keys only in the hosting provider environment settings.

## Recommended: Render

The repository includes `render.yaml`.

Render settings:

- Build command: `npm ci && npm run build`
- Start command: `npm start`
- Health check path: `/api/health`
- Persistent disk mount: `/var/data`
- `BRUNIVERSE_DATA_DIR`: `/var/data/bruniverse`

Required environment variable:

- `DEEPSEEK_API_KEY`

Optional environment variables:

- `AI_PROVIDER=deepseek`
- `DEEPSEEK_MODEL=deepseek-chat`
- `DEEPSEEK_BASE_URL=https://api.deepseek.com`
- `CHAT_RATE_LIMIT=30`

## Railway Alternative

Railway can also run this as a Node app.

Use:

- Build command: `npm ci && npm run build`
- Start command: `npm start`
- Add a persistent volume mounted to `/var/data`
- Set `BRUNIVERSE_DATA_DIR=/var/data/bruniverse`
- Add `DEEPSEEK_API_KEY` in Railway Variables

## Vercel Note

Vercel is not recommended for the full version unless the JSON file storage is replaced with a hosted database. If deploying only the static public pages to Vercel, build with:

```bash
npm run build
```

and publish `dist/`. The login workspace and AI features need the separate Node API.

## Domain DNS for bruniverse.org

Render official docs recommend pointing the apex/root domain to the Render service with an `ANAME` or `ALIAS` record when your DNS provider supports it. If your DNS provider does not support `ANAME`, `ALIAS`, or CNAME flattening, use Render's load balancer `A` record instead.

After the Render service is created, replace `your-render-service.onrender.com` with the actual service hostname shown in Render.

Preferred DNS records:

| Type | Name | Value |
| --- | --- | --- |
| ANAME or ALIAS | @ | your-render-service.onrender.com |
| CNAME | www | your-render-service.onrender.com |

Fallback DNS records if your DNS provider does not support `ANAME`/`ALIAS`:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 216.24.57.1 |
| CNAME | www | your-render-service.onrender.com |

Then add both domains in Render:

- `bruniverse.org`
- `www.bruniverse.org`

If Render gives a different DNS target in its dashboard, use Render's dashboard value as the source of truth.

References:

- Render custom DNS docs: https://render.com/docs/configure-other-dns
- Render persistent disk docs: https://render.com/docs/disks
- Render Blueprint YAML reference: https://render.com/docs/blueprint-spec
