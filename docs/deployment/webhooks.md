# Sanity → Netlify Rebuild Webhook

The site is statically generated (`output: 'export'`), so a content change in
Sanity does not appear on the live site until the next Netlify build. To make
publishes auto-deploy, wire a Sanity webhook to a Netlify build hook.

A publish in Studio fires the webhook → Netlify triggers a production build →
the new content is live ~30–90 s later. No code or runtime changes required.

## 1) Create the Netlify build hook (frontend site only)

In the Netlify dashboard for the **frontend** site (the one serving
`mathiasmayrhofer.at`, not the Studio site):

- Site settings → **Build & deploy** → **Continuous deployment**
- Section **Build hooks** → **Add build hook**
- Name: `Sanity content publish`
- Branch: `main`
- Save, then copy the generated URL (looks like
  `https://api.netlify.com/build_hooks/<hash>`)

The URL is the only secret — anyone with it can trigger a build, so don't paste
it into shared chats or commit it. It can be rotated at any time from the same
page.

## 2) Create the Sanity webhook

In <https://www.sanity.io/manage> → portfolio project → **API** →
**Webhooks** → **Create webhook**:

| Field          | Value                                              |
| -------------- | -------------------------------------------------- |
| Name           | `Netlify production rebuild`                       |
| URL            | the Netlify build hook URL from step 1             |
| Dataset        | `production`                                       |
| Trigger on     | Create, Update, Delete (all three checked)         |
| HTTP method    | `POST`                                             |
| HTTP headers   | _(none)_                                           |
| API version    | leave at the default                               |
| Include drafts | unchecked                                          |
| Filter (GROQ)  | see below                                          |

GROQ filter:

```groq
_type in ["sampleProject", "category", "about", "contact", "contacts", "impressum", "siteSettings"] && !(_id in path("drafts.**"))
```

Save.

Equivalent CLI version, from `studio/`:

```bash
npx sanity hook create
```

It prompts for the same fields interactively.

## 3) Verify

1. Edit a project's title in Studio, click **Publish**.
2. Open the Netlify **Deploys** tab on the frontend site — a new deploy should
   appear within a few seconds, sourced from the build hook.
3. Wait for the deploy to finish, hard-refresh the site, confirm the new title.

## Two non-obvious bits in the filter

### Dataset scope (`production`)

The webhook is bound to a single dataset. Without this, edits in the
`development` dataset would fire the webhook too. The build itself reads
`NEXT_PUBLIC_SANITY_DATASET=production` from Netlify env, so the wrong dataset
isn't _published_, but unscoped webhooks waste build minutes on noise. Always
scope to `production`.

### Drafts exclusion (`!(_id in path("drafts.**"))`)

Sanity persists unpublished work as `drafts.<id>` documents (auto-saved on
every keystroke). Without this filter, typing in the editor would fire the
webhook constantly. Publishing replaces `drafts.foo` with `foo`, which passes
the filter — so only an actual publish triggers a rebuild.

### Document types

The list mirrors the document types consumed by the frontend (see
`web/lib/queries.js`):

- `sampleProject` — project list + project detail pages
- `category` — category badges on project detail
- `about`, `contact`, `contacts`, `impressum` — singleton content pages
- `siteSettings` — site title, description, keywords, portrait

If a new document type is added later and the frontend reads it, extend the
filter — otherwise publishes of that type will silently not trigger rebuilds.

Object types (`figure`, `tryout`, `projectMember`, etc.) don't need to be in
the filter. They're embedded inside parent documents; updating them fires as
a parent-document update (e.g. editing a project's `tryout` config fires as a
`sampleProject` change).

## Adding a staging dataset webhook (optional)

If you ever spin up a Netlify branch deploy that reads from `development`,
duplicate the pattern with a second pair:

1. Create a second Netlify build hook on that branch deploy.
2. Create a second Sanity webhook with `Dataset: development` and the new
   build hook URL.

The two webhooks operate independently — no overlap.

## See also

- [`netlify.md`](./netlify.md) — site build configuration
- [`../migration/final-stack-notes.md`](../migration/final-stack-notes.md) —
  dataset isolation strategy and CDN caching caveats
